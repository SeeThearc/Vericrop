"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

export const Topbar = () => {
  return (
    <header className="fixed top-0 left-64 right-0 flex items-center justify-between p-4 bg-white shadow-sm border-b z-40">
      <div></div>
      <div className="flex items-center space-x-6">
        <Link href="/farmer/register-produce" className="text-gray-600 hover:text-green-600">
          Register Produce
        </Link>
        <Link href="/farmer/track-products" className="text-gray-600 hover:text-green-600">
          Track My Products
        </Link>
        <Link href="/farmer/ml-insights" className="text-gray-600 hover:text-green-600">
          ML Insights
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input placeholder="Search your products..." className="pl-10 w-64 bg-gray-50" />
        </div>
        <Button variant="outline">Logout</Button>
      </div>
    </header>
  );
};
