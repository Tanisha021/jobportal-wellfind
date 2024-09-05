import { createStore } from "zustand/vanilla";
import { AppState, AppStore, AppActions } from "@/types/store";

export const initAppStore = (): AppState => {
  return { sidebarOpen: false };
};

export const defaultAppState = {
  sidebarOpen: false,
};

export const createAppStore = (initState: AppState = defaultAppState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    openSidebar: () => set({ sidebarOpen: true }),
    closeSidebar: () => set({ sidebarOpen: false }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  }));
};
