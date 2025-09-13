"use client";

import { AceternityLayout } from "@/components/AceternityLayout";
import {
  Home,
  Search,
  ShoppingCart,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/consumer",
  },
  {
    label: "Product Search",
    icon: <Search className="h-5 w-5" />,
    href: "/consumer/product-search",
  },
  {
    label: "My Purchases",
    icon: <ShoppingCart className="h-5 w-5" />,
    href: "/consumer/my-purchases",
  },
  {
    label: "Quality History",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/consumer/quality-history",
  },
];

const bottomRoutes = [
  {
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/consumer/settings",
  },
  {
    label: "Help & Support",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/consumer/help-support",
  },
];

export default function ConsumerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AceternityLayout routes={routes} bottomRoutes={bottomRoutes}>
      {children}
    </AceternityLayout>
  );
}
