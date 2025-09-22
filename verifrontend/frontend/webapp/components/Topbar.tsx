"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
  label: string;
  href: string;
}

interface TopbarProps {
  navLinks: NavLink[];
  searchPlaceholder: string;
  baseHref: string;
  sidebarExpanded?: boolean;
}

export const Topbar = ({
  navLinks,
  searchPlaceholder,
  baseHref
}: TopbarProps) => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-64 right-0 flex items-center justify-between p-4 bg-white/80 shadow-sm border-b z-[1001] backdrop-blur-sm">
      <div></div>
      <div className="flex items-center space-x-6">
        <Link
          href={baseHref}
          className={
            pathname === baseHref
              ? "text-green-600 dark:text-green-400 font-semibold"
              : "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
          }
        >
          Dashboard
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? "text-green-600 dark:text-green-400 font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10 w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500"
          />
        </div>
        <ThemeToggle />
        <Button
          variant="outline"
          className="bg-[#F3F4F6] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
