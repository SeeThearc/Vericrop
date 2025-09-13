"use client";

import { AceternityLayout } from "@/components/AceternityLayout";
import {
  Home,
  AlertTriangle,
  CheckCircle,
  Shield,
  Settings,
  HelpCircle,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/inspector",
  },
  {
    label: "Flagged Shipments",
    icon: <AlertTriangle className="h-5 w-5" />,
    href: "/inspector/flagged-shipments",
  },
  {
    label: "Quality Verification",
    icon: <CheckCircle className="h-5 w-5" />,
    href: "/inspector/quality-verification",
  },
  {
    label: "Compliance",
    icon: <Shield className="h-5 w-5" />,
    href: "/inspector/compliance",
  },
];

const bottomRoutes = [
  {
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/inspector/settings",
  },
  {
    label: "Help & Support",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/inspector/help-support",
  },
];

export default function InspectorLayout({
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
