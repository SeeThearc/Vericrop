"use client";

import { Home, Shield, CreditCard, BarChart, Settings, HelpCircle } from "lucide-react";
import { Sidebar } from "@/app/components/Sidebar";
import { Topbar } from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";

const routes = [
	{
		label: "Dashboard",
		icon: Home,
		href: "/distributer",
	},
	{
		label: "Verify Products",
		icon: Shield,
		href: "/distributer/verify-products",
	},
	{
		label: "Transactions",
		icon: CreditCard,
		href: "/distributer/transactions",
	},
	{
		label: "Analytics",
		icon: BarChart,
		href: "/distributer/analytics",
	},
];

const bottomRoutes = [
	{
		label: "Settings",
		icon: Settings,
		href: "/distributer/settings",
	},
	{
		label: "Help & Support",
		icon: HelpCircle,
		href: "/distributer/help-support",
	},
];

const navLinks = [
	{ label: "Verify Products", href: "/distributer/verify-products" },
	{ label: "Transactions", href: "/distributer/transactions" },
	{ label: "Analytics", href: "/distributer/analytics" },
];

export default function DistributerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex bg-white min-h-screen">
			<Sidebar
				routes={routes}
				bottomRoutes={bottomRoutes}
				baseHref="/distributer"
			/>
			<main className="flex-1 flex flex-col ml-64">
				<Topbar
					navLinks={navLinks}
					searchPlaceholder="Search distributer products..."
					baseHref="/distributer"
				/>
				<div className="flex-grow pt-20 p-6 space-y-6">
					{children}
				</div>
				<Footer />
			</main>
		</div>
	);
}
