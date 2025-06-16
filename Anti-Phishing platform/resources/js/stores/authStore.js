import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      // User state
      user: null,
      isAuthenticated: false,
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // UI state related to auth
      showingNavigationDropdown: false,
      setShowingNavigationDropdown: (value) => set({ showingNavigationDropdown: value }),
      toggleNavigationDropdown: () => set((state) => ({ 
        showingNavigationDropdown: !state.showingNavigationDropdown 
      })),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // only persist these fields
    }
  )
);

export default useAuthStore;