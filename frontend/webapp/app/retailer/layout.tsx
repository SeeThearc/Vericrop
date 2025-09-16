"use client";

import { AceternityLayout } from "@/components/AceternityLayout";
import {
  Home,
  Shield,
  CreditCard,
  BarChart,
  Settings,
  HelpCircle,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/retailer",
  },
  {
    label: "Verify Products",
    icon: <Shield className="h-5 w-5" />,
    href: "/retailer/verify-products",
  },
  {
    label: "Transactions",
    icon: <CreditCard className="h-5 w-5" />,
    href: "/retailer/transactions",
  },
  {
    label: "Analytics",
    icon: <BarChart className="h-5 w-5" />,
    href: "/retailer/analytics",
  },
];

const bottomRoutes = [
  {
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/retailer/settings",
  },
  {
    label: "Help & Support",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/retailer/help-support",
  },
];

export default function RetailerLayout({
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
