"use client";

import { Home, Shield, CreditCard, BarChart3, Settings, HelpCircle } from "lucide-react";
import { AceternityLayout } from "@/app/components/AceternityLayout";

const routes = [
	{
		label: "Dashboard",
		icon: <Home className="h-5 w-5" />,
		href: "/distributer",
	},
	{
		label: "Verify Products",
		icon: <Shield className="h-5 w-5" />,
		href: "/distributer/verify-products",
	},
	{
		label: "Transactions",
		icon: <CreditCard className="h-5 w-5" />,
		href: "/distributer/transactions",
	},
	{
		label: "Analytics",
		icon: <BarChart3 className="h-5 w-5" />,
		href: "/distributer/analytics",
	},
];

const bottomRoutes = [
	{
		label: "Settings",
		icon: <Settings className="h-5 w-5" />,
		href: "/distributer/settings",
	},
	{
		label: "Help & Support",
		icon: <HelpCircle className="h-5 w-5" />,
		href: "/distributer/help-support",
	},
];

export default function DistributerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AceternityLayout
			routes={routes}
			bottomRoutes={bottomRoutes}
		>
			{children}
		</AceternityLayout>
	);
}
