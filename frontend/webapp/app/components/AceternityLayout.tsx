"use client";
import React from "react";
import { AceternityAppSidebar } from "./AceternityAppSidebar";
import { Footer } from "./Footer";

interface SidebarLinkType {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface AceternityLayoutProps {
  routes: SidebarLinkType[];
  bottomRoutes?: SidebarLinkType[];
  children: React.ReactNode;
}

export function AceternityLayout({
  routes,
  bottomRoutes = [],
  children,
}: AceternityLayoutProps) {
  return (
    <div className="flex bg-white dark:bg-gray-900 min-h-screen">
      <AceternityAppSidebar routes={routes} bottomRoutes={bottomRoutes} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-grow p-6 space-y-6 overflow-y-auto">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
