"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileTabs from "@/components/ProfileTabs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function ProfileEditPage() {
  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900`}>
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
          <div className="mx-auto space-y-3">
            {/* <h1 className="text-3xl font-medium">Profile</h1> */}
            <ProfileTabs />
            <Button className="w-full">Save Changes</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
