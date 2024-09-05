import { createAppStore } from "@/store/store";

export type AppState = {
  sidebarOpen: boolean;
};
export type AppActions = {
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

export type AppStore = AppState & AppActions;

export type AppStoreApi = ReturnType<typeof createAppStore>;
