"use client";

import {
  Home,
  Package,
  Search,
  Clipboard,
  Settings,
  HelpCircle,
} from "lucide-react";
import { AceternityLayout } from "@/app/components/AceternityLayout";

const routes = [
  {
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/farmer",
  },
  {
    label: "Register Product",
    icon: <Package className="h-5 w-5" />,
    href: "/farmer/register-product",
  },
  {
    label: "Track My Products",
    icon: <Search className="h-5 w-5" />,
    href: "/farmer/track-products",
  },
  {
    label: "ML Insights",
    icon: <Clipboard className="h-5 w-5" />,
    href: "/farmer/ml-insights",
  },
];

const bottomRoutes = [
  {
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/farmer/settings",
  },
  {
    label: "Help & Support",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/farmer/help-support",
  },
];

export default function FarmerLayout({
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
