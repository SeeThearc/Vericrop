"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "motion/react";

interface SidebarLinkType {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface AceternityAppSidebarProps {
  routes: SidebarLinkType[];
  bottomRoutes?: SidebarLinkType[];
}

export function AceternityAppSidebar({
  routes,
  bottomRoutes = [],
}: AceternityAppSidebarProps) {
  const [open, setOpen] = useState(false);

  // Convert the routes to the format expected by SidebarLink
  const convertedRoutes = routes.map((route) => ({
    ...route,
    icon: (
      <div className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200">
        {route.icon}
      </div>
    ),
  }));

  const convertedBottomRoutes = bottomRoutes.map((route) => ({
    ...route,
    icon: (
      <div className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200">
        {route.icon}
      </div>
    ),
  }));

  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <>
            <Logo />
          </>
                      <div className="mt-8 flex flex-col gap-2">
              {convertedRoutes.map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SidebarLink link={link} />
                </motion.div>
              ))}
            </div>
        </div>
                  <div className="flex flex-col gap-2">
            {convertedBottomRoutes.map((link, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (convertedRoutes.length + idx) * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SidebarLink link={link} />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (convertedRoutes.length + convertedBottomRoutes.length) * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SidebarLink
                link={{
                  label: "User Profile",
                  href: "#",
                  icon: (
                    <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                      U
                    </div>
                  ),
                }}
              />
            </motion.div>
          </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        VeriCrop
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};
