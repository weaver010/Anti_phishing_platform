import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

// Import UI store to show floating messages
let uiStore = null;
const getUiStore = async () => {
  if (!uiStore) {
    const { default: importedUiStore } = await import('./uiStore');
    uiStore = importedUiStore;
  }
  return uiStore;
};

const useUrlScanStore = create(
  persist(
    (set, get) => ({
      // Scan state
      url: '',
      result: null,
      loading: false,
      scanData: null,
      fromCache: false,
      scanTime: null,
      jobId: null,
      progress: 0,
      statusMessage: '',
      showDetails: false,
      recentScans: [],
      showRecentScans: false,
      statusCheckInterval: null,
      
      // Actions
      setUrl: (url) => set({ url }),
      setShowDetails: (value) => set({ showDetails: value }),
      setShowRecentScans: (value) => set({ showRecentScans: value }),
      
      // Clear recent scans
      clearRecentScans: () => set({ recentScans: [] }),
      
      // Handle URL check
      handleUrlCheck: async () => {
        const { url } = get();
        
        if (!url.trim()) {
          set({ 
            result: { status: 'error', message: 'Please enter a valid URL to scan.' },
            loading: false
          });
          return;
        }
        
        set({ 
          loading: true,
          result: null,
          scanData: null,
          fromCache: false,
          progress: 0,
          statusMessage: '',
          showDetails: false
        });
        
        // Clear any existing interval
        const { statusCheckInterval } = get();
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
          set({ statusCheckInterval: null });
        }
        
        const startTime = performance.now();
        
        try {
          const response = await axios.post('/url-scan', { url });
          
          if (response.data.success) {
            // If the results are immediately available (from cache)
            if (response.data.completed) {
              const endTime = performance.now();
              const timeElapsed = ((endTime - startTime) / 1000).toFixed(2);
              
              const scanResults = response.data.results;
              set({
                scanTime: timeElapsed,
                scanData: scanResults,
                fromCache: response.data.fromCache || false,
                loading: false
              });
              
              // Determine if URL is safe based on scan results
              get().handleScanResults(scanResults);
            } else {
              // Job was queued, start polling for status
              set({
                jobId: response.data.jobId,
                statusMessage: 'Analysis queued, starting soon...',
                progress: 5
              });
              
              // Start polling for job status
              const intervalId = setInterval(() => {
                get().checkJobStatus(response.data.jobId, startTime);
              }, 2000); // Check every 2 seconds
              
              set({ statusCheckInterval: intervalId });
            }
          } else {
            set({
              result: {
                status: 'error',
                message: response.data.message || 'Failed to scan URL. Please try again later.'
              },
              loading: false
            });
          }
        } catch (error) {
          console.error('URL scan error:', error);
          
          if (error.response?.status === 429) {
            // Rate limit error
            set({
              result: {
                status: 'error',
                message: 'Rate limit exceeded. Please try again in a few moments.'
              },
              loading: false
            });
          } else {
            set({
              result: {
                status: 'error',
                message: error.response?.data?.message || 'An error occurred while scanning the URL.'
              },
              loading: false
            });
          }
        }
      },
      
      // Check job status
      checkJobStatus: async (jobId, startTime) => {
        try {
          const response = await axios.post('/url-status', { jobId });
          
          if (response.data.success) {
            const status = response.data.status;
            
            // Update progress
            set({
              progress: status.progress || 0,
              statusMessage: status.message || 'Processing...'
            });
            
            if (response.data.completed) {
              // Stop polling
              const { statusCheckInterval } = get();
              if (statusCheckInterval) {
                clearInterval(statusCheckInterval);
                set({ statusCheckInterval: null });
              }
              
              const endTime = performance.now();
              const timeElapsed = ((endTime - startTime) / 1000).toFixed(2);
              set({ scanTime: timeElapsed });
              
              // Handle completed status
              if (status.status === 'completed') {
                set({
                  fromCache: status.fromCache || false,
                  scanData: status.results,
                  loading: false
                });
                get().handleScanResults(status.results);
              } else {
                // Failed
                set({
                  result: {
                    status: 'error',
                    message: status.message || 'Scan failed. Please try again.'
                  },
                  loading: false
                });
              }
            }
          } else {
            // Error getting status
            const { statusCheckInterval } = get();
            if (statusCheckInterval) {
              clearInterval(statusCheckInterval);
              set({ statusCheckInterval: null });
            }
            
            set({
              result: {
                status: 'error',
                message: 'Failed to get scan status. Please try again.'
              },
              loading: false
            });
          }
        } catch (error) {
          console.error('Status check error:', error);
          
          // Stop polling on error
          const { statusCheckInterval } = get();
          if (statusCheckInterval) {
            clearInterval(statusCheckInterval);
            set({ statusCheckInterval: null });
          }
          
          set({
            result: {
              status: 'error',
              message: 'Failed to check scan status. Please try again.'
            },
            loading: false
          });
        }
      },
      
      // Handle scan results
      handleScanResults: async (scanResults) => {
        const maliciousEngines = scanResults.stats.malicious || 0;
        const suspiciousEngines = scanResults.stats.suspicious || 0;
        const totalEngines = scanResults.stats.total_engines || 0;
        const { url, scanTime, fromCache } = get();

        let resultData;
        let floatingMessage;

        if (maliciousEngines > 0) {
          resultData = {
            status: 'unsafe',
            message: `Alert: Potential phishing threat detected! ${maliciousEngines} security vendors flagged this URL as malicious.`,
            details: {
              threatLevel: scanResults.threat_level,
              reputation: scanResults.reputation,
              categories: scanResults.categories,
              engineResults: scanResults.engine_results,
              lastAnalysisDate: scanResults.last_analysis_date,
              stats: scanResults.stats
            }
          };

          floatingMessage = {
            category: 'scan-result',
            scanStatus: 'unsafe',
            title: '🚨 THREAT DETECTED',
            message: `This URL is MALICIOUS! ${maliciousEngines} security vendors detected threats. Do not visit this website.`,
            url: url,
            scanTime: scanTime,
            fromCache: fromCache,
            persistent: false,
            details: true,
            actions: [
              {
                label: 'View Details',
                primary: true,
                onClick: () => get().setShowDetails(true)
              },
              {
                label: 'Report False Positive',
                primary: false,
                onClick: () => window.open('mailto:teamsecura@gmail.com?subject=False Positive Report', '_blank')
              }
            ]
          };
        } else if (suspiciousEngines > 0) {
          resultData = {
            status: 'warning',
            message: `Caution: ${suspiciousEngines} security vendors flagged this URL as suspicious.`,
            details: {
              threatLevel: scanResults.threat_level,
              reputation: scanResults.reputation,
              categories: scanResults.categories,
              engineResults: scanResults.engine_results,
              lastAnalysisDate: scanResults.last_analysis_date,
              stats: scanResults.stats
            }
          };

          floatingMessage = {
            category: 'scan-result',
            scanStatus: 'warning',
            title: '⚠️ SUSPICIOUS ACTIVITY',
            message: `This URL shows suspicious behavior. ${suspiciousEngines} security vendors flagged potential risks. Proceed with caution.`,
            url: url,
            scanTime: scanTime,
            fromCache: fromCache,
            persistent: false,
            details: true,
            actions: [
              {
                label: 'View Details',
                primary: true,
                onClick: () => get().setShowDetails(true)
              },
              {
                label: 'Scan Again',
                primary: false,
                onClick: () => get().handleUrlCheck()
              }
            ]
          };
        } else {
          resultData = {
            status: 'safe',
            message: `This URL appears to be safe. No security vendors flagged this URL out of ${totalEngines} checked.`,
            details: {
              threatLevel: scanResults.threat_level,
              reputation: scanResults.reputation,
              categories: scanResults.categories,
              engineResults: scanResults.engine_results,
              lastAnalysisDate: scanResults.last_analysis_date,
              stats: scanResults.stats
            }
          };

          floatingMessage = {
            category: 'scan-result',
            scanStatus: 'safe',
            title: '🛡️ URL IS SAFE',
            message: `Great news! This URL is safe to visit. All ${totalEngines} security vendors confirmed no threats detected.`,
            url: url,
            scanTime: scanTime,
            fromCache: fromCache,
            persistent: false,
            details: true,
            actions: [
              {
                label: 'View Details',
                primary: true,
                onClick: () => get().setShowDetails(true)
              },
              {
                label: 'Scan Another URL',
                primary: false,
                onClick: () => get().setUrl('')
              }
            ]
          };
        }

        // Set the result state
        set({ result: resultData });

        // Save to recent scans
        get().saveToRecentScans(url, resultData);

        try {
          // Import the store directly from the index.js where it's exported as a named export
          const { useUiStore } = await import('@/stores');
          const addNotification = useUiStore.getState().addNotification;
          
          // Make sure all required properties are set
          addNotification({
            ...floatingMessage,
            category: 'scan-result',  // Ensure category is set correctly
            persistent: false,        // Will auto-dismiss after 8 seconds
          });
        } catch (error) {
          console.error('Failed to show floating message:', error);
        }      },
      
      // Save to recent scans
      saveToRecentScans: (scannedUrl, scanResult) => {
        try {
          const newScan = {
            id: Date.now(),
            url: scannedUrl,
            date: new Date().toISOString(),
            status: scanResult.status,
            threatLevel: scanResult.details?.threatLevel || 'unknown'
          };
          
          const { recentScans } = get();
          const updatedScans = [newScan, ...recentScans.slice(0, 9)]; // Keep only 10 most recent
          set({ recentScans: updatedScans });
        } catch (error) {
          console.error('Error saving recent scan:', error);
        }
      },
    }),
    {
      name: 'url-scan-storage',
      partialize: (state) => ({ recentScans: state.recentScans }), // only persist recent scans
    }
  )
);

export default useUrlScanStore;