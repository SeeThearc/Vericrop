"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Topbar = () => {
  const pathname = usePathname();
  const isInConsumer = pathname.startsWith('/consumer');

  return (
    <header className="fixed top-0 left-64 right-0 flex items-center justify-between p-4 bg-white/80 shadow-sm border-b z-40 backdrop-blur-sm">
      <div></div>
      <div className="flex items-center space-x-6">
        <Link href="/consumer" className={isInConsumer ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"}>
          Dashboard
        </Link>
        <Link href="/consumer/product-search" className="text-gray-600 hover:text-green-600">
          Product Search
        </Link>
        <Link href="/consumer/my-purchases" className="text-gray-600 hover:text-green-600">
          My Purchases
        </Link>
        <Link href="/consumer/quality-history" className="text-gray-600 hover:text-green-600">
          Quality History
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input placeholder="Search for products..." className="pl-10 w-64 bg-white border-gray-300 text-black focus:ring-1 focus:ring-gray-400" />
        </div>
        <Button variant="outline" className="bg-[#F3F4F6] hover:bg-gray-200 text-gray-700 border-gray-300">
          Logout
        </Button>
      </div>
    </header>
  );
};
