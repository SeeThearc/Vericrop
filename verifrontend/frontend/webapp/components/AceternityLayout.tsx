"use client";
import React from "react";
import { AceternityAppSidebar } from "./AceternityAppSidebar";
import { Footer } from "./Footer";
import { motion } from "motion/react";

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
    <div className="flex bg-transparent min-h-screen">
      <AceternityAppSidebar routes={routes} bottomRoutes={bottomRoutes} />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col overflow-hidden ml-[70px] transition-all duration-300 ease-in-out"
      >
        <div className="flex-grow p-4 space-y-6 overflow-y-auto">
          {children}
        </div>
        <div className="relative z-20">
          <Footer />
        </div>
      </motion.main>
    </div>
  );
}
