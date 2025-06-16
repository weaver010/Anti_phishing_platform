import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUrlScanStore } from '@/stores';

// Engine Results Category Component
const EngineResultsCategory = ({ title, category, engineResults, bgColor, borderColor, textColor, badgeBgColor, badgeTextColor }) => {
    const [expanded, setExpanded] = useState(false);

    // Filter engines by category
    const engines = Object.entries(engineResults).filter(([_, result]) =>
        result.category === category
    );

    if (engines.length === 0) return null;

    return (
        <div className={`rounded-lg border ${borderColor} ${bgColor} overflow-hidden`}>
            <button
                className="flex items-center justify-between w-full p-3 text-left"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center space-x-3">
                    <span className={`font-semibold ${textColor}`}>{title}</span>
                    <span className={`${badgeBgColor} ${badgeTextColor} text-xs px-2 py-1 rounded-full`}>
                        {engines.length}
                    </span>
                </div>
                <svg
                    className={`w-5 h-5 transform transition-transform ${expanded ? 'rotate-180' : ''} ${textColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {expanded && (
                <div className="p-3 border-t border-gray-700/50">
                    <div className="pr-2 space-y-2 overflow-y-auto max-h-60 custom-scrollbar">
                        {engines.map(([engine, result]) => (
                            <div key={engine} className="flex items-center justify-between p-2 rounded bg-gray-800/50">
                                <span className="text-sm font-medium">{engine}</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${badgeBgColor} ${badgeTextColor}`}>
                                    {result.result || category}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function UrlCheck() {
    // Local state for report generation
    const [generatingReport, setGeneratingReport] = useState(false);

    // Zustand store
    const {
        url,
        result,
        loading,
        scanData,
        fromCache,
        scanTime,
        jobId,
        progress,
        statusMessage,
        showDetails,
        recentScans,
        showRecentScans,
        statusCheckInterval,
        // Actions
        setUrl,
        setShowDetails,
        setShowRecentScans,
        clearRecentScans,
        handleUrlCheck,
        saveToRecentScans
    } = useUrlScanStore();

    // Clear interval on unmount
    useEffect(() => {
        return () => {
            if (statusCheckInterval) {
                clearInterval(statusCheckInterval);
            }
        };
    }, [statusCheckInterval]);



    const handleGenerateReport = async () => {
        if (!url.trim() || !scanData) return;

        setGeneratingReport(true);

        try {
            // Direct approach - open report URL in a new window/tab
            // This is more reliable than form submission for file downloads
            window.open(`/url-report?url=${encodeURIComponent(url)}`, '_blank');

            // Set timeout to reset the generating state
            setTimeout(() => {
                setGeneratingReport(false);
            }, 1000);

        } catch (error) {
            console.error('Report generation error:', error);
            alert('An error occurred while generating the report.');
            setGeneratingReport(false);
        }
    };

    // Handle keyboard shortcut (Ctrl+Enter) to scan
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                handleUrlCheck();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [url]); // Re-add event listener if url changes

    // Animation Variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const resultVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const detailsVariants = {
        hidden: { opacity: 0, height: 0, overflow: "hidden" },
        visible: { opacity: 1, height: "auto", transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <div className="min-h-screen text-white bg-gray-900">
            <Head title="URL Scanner - AntiPhishing Command" />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="relative flex items-center justify-center min-h-screen pt-20 pb-16 overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-950 to-blue-900">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-cyan-500/10 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 delay-1000 rounded-full w-80 h-80 bg-blue-500/10 blur-3xl animate-pulse"></div>
                </div>

                <motion.div
                    className="relative z-10 max-w-5xl px-4 mx-auto sm:px-6 lg:px-8"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <div className="p-8 border shadow-2xl bg-gray-800/90 backdrop-blur-md rounded-2xl border-cyan-500/30">
                        {/* Top Accent Bar */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-600 to-blue-900" />

                        {/* Header */}
                        <div className="flex items-center mb-8 space-x-6">
                            <img
                                src="/assets/Eye.png"
                                alt="Eye Icon"
                                className="object-contain w-20 h-20 mt-2"
                            />
                            <h1 className="text-4xl font-extrabold tracking-tight text-white">
                                URL Scanner
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="mt-4 font-mono text-lg leading-relaxed text-cyan-200 max-w-prose">
                            Deploy our state-of-the-art scanner powered by VirusTotal to analyze URLs and neutralize phishing threats in real-time. Enter a link below to secure your digital perimeter.
                        </p>

                        {/* Input and Button */}
                        <div className="mt-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="https://example.com"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            className="w-full p-5 text-white transition-all duration-300 border shadow-inner bg-gray-700/50 border-cyan-500/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent placeholder-cyan-400/70 disabled:bg-gray-600/50 disabled:cursor-not-allowed"
                                            disabled={loading}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleUrlCheck();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {recentScans.length > 0 && (
                                    <button
                                        onClick={() => setShowRecentScans(!showRecentScans)}
                                        className="flex items-center px-3 py-2 ml-4 text-sm font-medium transition-colors rounded-lg bg-gray-700/70 hover:bg-gray-600/70 text-cyan-300"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        History
                                    </button>
                                )}
                            </div>

                            {/* Recent Scans Dropdown */}
                            {showRecentScans && recentScans.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 border rounded-lg shadow-lg bg-gray-800/90 border-cyan-500/30"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-cyan-300">Recent Scans</h3>
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href="/url-scan-results"
                                                className="px-3 py-1 text-xs font-medium transition-colors border rounded-lg text-cyan-300 bg-cyan-900/30 border-cyan-700/50 hover:bg-cyan-800/40"
                                                title="View All Results"
                                            >
                                                View All
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to clear all scan history?')) {
                                                        clearRecentScans();
                                                    }
                                                }}
                                                className="p-1 text-gray-400 rounded-full hover:bg-gray-700 hover:text-red-400"
                                                title="Clear History"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => setShowRecentScans(false)}
                                                className="p-1 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white"
                                                title="Close"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="overflow-y-auto max-h-60 custom-scrollbar">
                                        <ul className="space-y-2">
                                            {recentScans.map(scan => (
                                                <li
                                                    key={scan.id}
                                                    className="p-2 transition-colors rounded-md cursor-pointer hover:bg-gray-700"
                                                    onClick={() => {
                                                        setUrl(scan.url);
                                                        setShowRecentScans(false);
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center max-w-[80%]">
                                                            <div className={`w-3 h-3 mr-3 rounded-full ${
                                                                scan.status === 'safe' ? 'bg-green-500' :
                                                                scan.status === 'unsafe' ? 'bg-red-500' :
                                                                scan.status === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                                                            }`} />
                                                            <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">{scan.url}</span>
                                                        </div>
                                                        <span className="text-xs text-gray-400">
                                                            {new Date(scan.date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {/* Progress bar for background job */}
                            {loading && (
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className="bg-cyan-600 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                    {statusMessage && (
                                        <p className="mt-1 text-sm text-cyan-400">{statusMessage}</p>
                                    )}
                                </div>
                            )}

                            <button
                                onClick={handleUrlCheck}
                                className="relative w-full px-6 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                <span className="relative z-10">
                                    {loading ? 'Scanning...' : 'Scan URL'}
                                </span>
                                {loading && (
                                    <div className="absolute inset-0 bg-cyan-500/20 animate-[scan_1.5s_infinite]" />
                                )}
                                <style>{`
                                    @keyframes scan {
                                        0% { transform: translateX(-100%); }
                                        100% { transform: translateX(100%); }
                                    }
                                `}</style>
                            </button>
                        </div>

                        {/* Result Display */}
                        {result && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={resultVariants}
                                className={`mt-8 p-6 rounded-xl border shadow-md ${
                                    result.status === 'safe'
                                        ? 'bg-green-900/30 border-green-500/50'
                                        : result.status === 'unsafe'
                                        ? 'bg-red-900/30 border-red-500/50'
                                        : result.status === 'warning'
                                        ? 'bg-yellow-900/30 border-yellow-500/50'
                                        : 'bg-gray-700/30 border-gray-500/50'
                                }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <svg
                                        className={`w-8 h-8 ${
                                            result.status === 'safe'
                                                ? 'text-green-400'
                                                : result.status === 'unsafe'
                                                ? 'text-red-400'
                                                : result.status === 'warning'
                                                ? 'text-yellow-400'
                                                : 'text-gray-400'
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={
                                                result.status === 'safe'
                                                    ? 'M5 13l4 4L19 7'
                                                    : result.status === 'unsafe'
                                                    ? 'M6 18L18 6M6 6l12 12'
                                                    : 'M12 9v3m0 3h.01'
                                            }
                                        />
                                    </svg>
                                    <div>
                                        <p
                                            className={`text-lg font-semibold ${
                                                result.status === 'safe'
                                                    ? 'text-green-300'
                                                    : result.status === 'unsafe'
                                                    ? 'text-red-300'
                                                    : result.status === 'warning'
                                                    ? 'text-yellow-300'
                                                    : 'text-gray-300'
                                            }`}
                                        >
                                            {result.message}
                                        </p>
                                        <div className="flex items-center mt-2 space-x-3">
                                            {scanTime && (
                                                <span className="text-sm text-cyan-300">
                                                    Scan completed in {scanTime}s
                                                </span>
                                            )}
                                            {fromCache && (
                                                <span className="text-sm bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded-full">
                                                    From cache
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Toggle button for detailed results */}
                                {result.details && (
                                    <div className="flex justify-center mt-4">
                                        <button
                                            onClick={() => setShowDetails(!showDetails)}
                                            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                                                showDetails
                                                ? 'bg-cyan-700 text-white hover:bg-cyan-600'
                                                : 'bg-cyan-900/50 text-cyan-300 hover:bg-cyan-800/50'
                                            }`}
                                        >
                                            <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform ${showDetails ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}

                                {/* Collapsible Detailed Scan Results */}
                                {result.details && (
                                    <motion.div
                                        initial="hidden"
                                        animate={showDetails ? "visible" : "hidden"}
                                        variants={detailsVariants}
                                        className="mt-6 space-y-6 overflow-hidden"
                                    >
                                        {/* Basic Info */}
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="p-4 rounded-lg bg-gray-800/50">
                                                <h3 className="mb-2 text-lg font-semibold text-cyan-300">Threat Level</h3>
                                                <p className="text-xl font-bold capitalize">{result.details.threatLevel}</p>
                                            </div>
                                            <div className="p-4 rounded-lg bg-gray-800/50">
                                                <h3 className="mb-2 text-lg font-semibold text-cyan-300">Reputation Score</h3>
                                                <p className="text-xl font-bold">{result.details.reputation}</p>
                                            </div>
                                        </div>

                                        {/* Categories */}
                                        {result.details.categories && Object.keys(result.details.categories).length > 0 && (
                                            <div className="p-4 rounded-lg bg-gray-800/50">
                                                <h3 className="mb-2 text-lg font-semibold text-cyan-300">Categories</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {Object.entries(result.details.categories).map(([category, _]) => (
                                                        <span
                                                            key={category}
                                                            className="px-3 py-1 text-sm rounded-full bg-cyan-900/50 text-cyan-300"
                                                        >
                                                            {category}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Scan Statistics */}
                                        <div className="p-4 rounded-lg bg-gray-800/50">
                                            <h3 className="mb-4 text-lg font-semibold text-cyan-300">Scan Statistics</h3>
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold">{result.details.stats.total_engines}</p>
                                                    <p className="text-sm text-gray-400">Total Engines</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-red-400">{result.details.stats.malicious}</p>
                                                    <p className="text-sm text-gray-400">Malicious</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-yellow-400">{result.details.stats.suspicious}</p>
                                                    <p className="text-sm text-gray-400">Suspicious</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-green-400">{result.details.stats.harmless}</p>
                                                    <p className="text-sm text-gray-400">Harmless</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold">{result.details.stats.undetected}</p>
                                                    <p className="text-sm text-gray-400">Undetected</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold">{result.details.stats.timeout}</p>
                                                    <p className="text-sm text-gray-400">Timeout</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Engine Results with collapsible sections */}
                                        {result.details.engineResults && Object.keys(result.details.engineResults).length > 0 && (
                                            <div className="p-4 rounded-lg bg-gray-800/50">
                                                <h3 className="mb-4 text-lg font-semibold text-cyan-300">Detailed Engine Results</h3>

                                                {/* Engine Results Categories */}
                                                <div className="space-y-4">
                                                    {/* Malicious Results */}
                                                    <EngineResultsCategory
                                                        title="Malicious Results"
                                                        category="malicious"
                                                        engineResults={result.details.engineResults}
                                                        bgColor="bg-red-900/30"
                                                        borderColor="border-red-500/50"
                                                        textColor="text-red-300"
                                                        badgeBgColor="bg-red-900"
                                                        badgeTextColor="text-red-300"
                                                    />

                                                    {/* Suspicious Results */}
                                                    <EngineResultsCategory
                                                        title="Suspicious Results"
                                                        category="suspicious"
                                                        engineResults={result.details.engineResults}
                                                        bgColor="bg-yellow-900/30"
                                                        borderColor="border-yellow-500/50"
                                                        textColor="text-yellow-300"
                                                        badgeBgColor="bg-yellow-900"
                                                        badgeTextColor="text-yellow-300"
                                                    />

                                                    {/* Harmless Results */}
                                                    <EngineResultsCategory
                                                        title="Harmless Results"
                                                        category="harmless"
                                                        engineResults={result.details.engineResults}
                                                        bgColor="bg-green-900/30"
                                                        borderColor="border-green-500/50"
                                                        textColor="text-green-300"
                                                        badgeBgColor="bg-green-900"
                                                        badgeTextColor="text-green-300"
                                                    />

                                                    {/* Undetected Results */}
                                                    <EngineResultsCategory
                                                        title="Undetected Results"
                                                        category="undetected"
                                                        engineResults={result.details.engineResults}
                                                        bgColor="bg-gray-700/30"
                                                        borderColor="border-gray-500/50"
                                                        textColor="text-gray-300"
                                                        badgeBgColor="bg-gray-900"
                                                        badgeTextColor="text-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Last Analysis */}
                                        {result.details.lastAnalysisDate && (
                                            <div className="p-4 rounded-lg bg-gray-800/50">
                                                <h3 className="mb-2 text-lg font-semibold text-cyan-300">Last Analysis</h3>
                                                <p className="text-gray-300">
                                                    {new Date(result.details.lastAnalysisDate).toLocaleString()}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                                                {/* Generate Report Button */}
                                                                {scanData && (
                                    <div className="flex flex-col gap-3 mt-6 sm:flex-row">
                                        <button
                                            onClick={handleGenerateReport}
                                            disabled={generatingReport}
                                            className="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-all duration-300 border rounded-lg border-cyan-500/50 hover:bg-cyan-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <svg
                                                className="w-5 h-5 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            {generatingReport ? 'Generating...' : 'Generate PDF Report'}
                                        </button>
                                        
                                        <button
                                            onClick={() => window.open('mailto:teamsecura@gmail.com?subject=Report for URL: ' + encodeURIComponent(url), '_blank')}
                                            className="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-all duration-300 border rounded-lg border-yellow-500/50 hover:bg-yellow-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        >
                                            <svg
                                                className="w-5 h-5 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Report to Security Team
                                        </button>
                                    </div>
                                )}

                            </motion.div>
                        )}

                        {/* Additional Information Section */}
                        <div className="p-6 mt-10 border rounded-xl border-cyan-500/30 bg-gray-800/50">
                            <h2 className="mb-4 text-xl font-bold text-cyan-300">How It Works</h2>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    Our URL scanner leverages VirusTotal's powerful API to analyze web links across multiple security engines.
                                    Here's what happens when you scan a URL:
                                </p>
                                <ol className="ml-4 space-y-2 list-decimal list-inside">
                                    <li>Your URL is submitted to our secure backend</li>
                                    <li>The system checks if recent results exist in our cache</li>
                                    <li>If not cached, the URL is analyzed by 70+ security vendors</li>
                                    <li>Results are compiled and presented with threat intelligence</li>
                                    <li>A detailed report is generated for your review</li>
                                </ol>
                                <p className="mt-4 font-medium text-cyan-300">
                                    Stay protected by scanning suspicious links before clicking!
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-sm text-center text-gray-400">
                            <p>Powered by VirusTotal API and Secura Command</p>
                            <p className="mt-1">© {new Date().getFullYear()} Secura Command. All rights reserved.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}