import { create } from 'zustand';

const useUiStore = create((set) => ({
  // Theme state
  darkMode: false,
  setDarkMode: (value) => set({ darkMode: value }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  // Modal states
  activeModal: null,
  setActiveModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  
  // Notification state
  notifications: [],
  addNotification: (notification) => 
    set((state) => ({
      notifications: [...state.notifications, { id: Date.now(), ...notification }]
    })),
  removeNotification: (id) => 
    set((state) => ({
      notifications: state.notifications.filter(notification => notification.id !== id)
    })),
  clearNotifications: () => set({ notifications: [] }),
  
  // Sidebar state (for mobile)
  sidebarOpen: false,
  setSidebarOpen: (value) => set({ sidebarOpen: value }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),


}));

export default useUiStore;