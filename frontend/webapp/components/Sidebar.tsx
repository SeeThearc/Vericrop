"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

import { cn } from "@/lib/utils";

interface Route {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}

interface SidebarProps {
  routes: Route[];
  bottomRoutes: Route[];
  baseHref: string;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export const Sidebar = ({
  routes,
  bottomRoutes,
  baseHref,
  isExpanded = false,
  onExpandedChange,
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed left-0 top-0 space-y-4 py-4 flex flex-col h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-black dark:text-white z-50 transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => onExpandedChange?.(true)}
      onMouseLeave={() => onExpandedChange?.(false)}
    >
      <div className="px-3 py-2 flex-1">
        <Link href={baseHref} className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Home className="h-8 w-8 text-green-600" />
          </div>
          <h1
            className={cn(
              "text-2xl font-bold text-green-600 transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0"
            )}
          >
            VeriCrop
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-green-800 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-all duration-300",
                pathname === route.href
                  ? "text-green-800 dark:text-green-400 bg-green-100 dark:bg-green-900"
                  : "text-zinc-500 dark:text-zinc-400",
                !isExpanded && "justify-center px-3"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn(
                    "h-5 w-5 mr-3 transition-all duration-300",
                    pathname === route.href
                      ? "text-green-600 dark:text-green-400"
                      : "text-zinc-400 dark:text-zinc-500 group-hover:text-green-600 dark:group-hover:text-green-400",
                    !isExpanded && "mr-0"
                  )}
                />
                <span
                  className={cn(
                    "transition-opacity duration-300",
                    isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {route.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="space-y-1">
          {bottomRoutes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-all duration-300 border",
                pathname === route.href
                  ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                  : "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-400",
                !isExpanded && "justify-center px-3"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn(
                    "h-5 w-5 mr-3 transition-all duration-300",
                    !isExpanded && "mr-0"
                  )}
                />
                <span
                  className={cn(
                    "transition-opacity duration-300",
                    isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {route.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
