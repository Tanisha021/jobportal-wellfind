"use client";
import { AppStoreContext } from "@/providers/StoreProvider";
import { AppStore } from "@/types/store";
import { useContext } from "react";
import { useStore } from "zustand";

export const useAppStore = <T>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
