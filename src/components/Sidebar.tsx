"use client";
import { BriefcaseIcon, BuildingIcon, UserIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/hooks/useAppStore";
import { Logo } from "./Logo";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const { sidebarOpen, toggleSidebar } = useAppStore((state) => state);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 transition duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <svg
                className="h-7 w-7 fill-blue-600 dark:fill-blue-400"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M64.66 175.57V67.57L74.94 55.57V171.35C81.1929 167.743 86.3854 162.553 89.9947 156.302C93.6041 150.05 95.5029 142.959 95.5 135.74V0L44.1 60V176.9H54.38C57.8491 176.893 61.3034 176.446 64.66 175.57Z" />
                <path d="M157.19 187.15V98.53L105.78 38.53V135.72C105.767 149.349 100.347 162.416 90.7113 172.054C81.0751 181.692 68.009 187.114 54.38 187.13H21V200H126.35V94.14L136.63 106.14V200H179V187.15H157.19Z" />
              </svg>
              <Logo />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={toggleSidebar}
            >
              <XIcon className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            <Button
              variant="ghost"
              className="w-full justify-start mb-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              Jobs
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start mb-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <BuildingIcon className="mr-2 h-4 w-4" />
              Companies
            </Button>
            <Button
              onClick={() => router.push("/profile")}
              variant="ghost"
              className="w-full justify-start mb-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
