"use client";

import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Home, Shield, CreditCard, BarChart, Settings, HelpCircle } from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/retailer",
  },
  {
    label: "Verify Products",
    icon: Shield,
    href: "/retailer/verify-products",
  },
  {
    label: "Transactions",
    icon: CreditCard,
    href: "/retailer/transactions",
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "/retailer/analytics",
  },
];

const bottomRoutes = [
  {
    label: "Settings",
    icon: Settings,
    href: "/retailer/settings",
  },
  {
    label: "Help & Support",
    icon: HelpCircle,
    href: "/retailer/help-support",
  },
];

const navLinks = [
  { label: "Verify Products", href: "/retailer/verify-products" },
  { label: "Transactions", href: "/retailer/transactions" },
  { label: "Analytics", href: "/retailer/analytics" },
];

export default function RetailerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar
        routes={routes}
        bottomRoutes={bottomRoutes}
        baseHref="/retailer"
      />
      <main className="flex-1 flex flex-col ml-64">
        <Topbar
          navLinks={navLinks}
          searchPlaceholder="Search retailer products..."
          baseHref="/retailer"
        />
        <div className="flex-grow pt-20 p-6 space-y-6">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
