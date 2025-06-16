import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTrainingStore = create(
  persist(
    (set, get) => ({
      // Training state
      activeModule: null,
      completedModules: [],
      progress: {},
      
      // Actions
      setActiveModule: (moduleId) => set({ activeModule: moduleId }),
      
      // Mark module as completed
      completeModule: (moduleId) => {
        const { completedModules } = get();
        if (!completedModules.includes(moduleId)) {
          set({ 
            completedModules: [...completedModules, moduleId],
            progress: {
              ...get().progress,
              [moduleId]: 100
            }
          });
        }
      },
      
      // Update module progress
      updateProgress: (moduleId, progressPercent) => {
        set({
          progress: {
            ...get().progress,
            [moduleId]: progressPercent
          }
        });
      },
      
      // Check if module is completed
      isModuleCompleted: (moduleId) => {
        return get().completedModules.includes(moduleId);
      },
      
      // Get module progress
      getModuleProgress: (moduleId) => {
        return get().progress[moduleId] || 0;
      },
      
      // Get overall training progress
      getOverallProgress: () => {
        const { completedModules } = get();
        const totalModules = 6; // Update this based on your total modules
        return Math.round((completedModules.length / totalModules) * 100);
      },
      
      // Reset training progress
      resetProgress: () => set({ 
        activeModule: null, 
        completedModules: [], 
        progress: {} 
      }),
    }),
    {
      name: 'training-storage',
      partialize: (state) => ({ 
        completedModules: state.completedModules, 
        progress: state.progress 
      }),
    }
  )
);

export default useTrainingStore;
