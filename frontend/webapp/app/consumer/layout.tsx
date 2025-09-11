"use client";

import { Home, Search, ShoppingCart, BarChart, Settings, HelpCircle } from "lucide-react";
import { Sidebar } from "@/app/components/Sidebar";
import { Topbar } from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";

const routes = [
	{
		label: "Dashboard",
		icon: Home,
		href: "/consumer",
	},
	{
		label: "Product Search",
		icon: Search,
		href: "/consumer/product-search",
	},
	{
		label: "My Purchases",
		icon: ShoppingCart,
		href: "/consumer/my-purchases",
	},
	{
		label: "Quality History",
		icon: BarChart,
		href: "/consumer/quality-history",
	},
];

const bottomRoutes = [
	{
		label: "Settings",
		icon: Settings,
		href: "/consumer/settings",
	},
	{
		label: "Help & Support",
		icon: HelpCircle,
		href: "/consumer/help-support",
	},
];

const navLinks = [
	{ label: "Product Search", href: "/consumer/product-search" },
	{ label: "My Purchases", href: "/consumer/my-purchases" },
	{ label: "Quality History", href: "/consumer/quality-history" },
];

export default function ConsumerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex bg-white min-h-screen">
			<Sidebar
				routes={routes}
				bottomRoutes={bottomRoutes}
				baseHref="/consumer"
			/>
			<main className="flex-1 flex flex-col ml-64">
				<Topbar
					navLinks={navLinks}
					searchPlaceholder="Search for products..."
					baseHref="/consumer"
				/>
				<div className="flex-grow pt-20 p-6 space-y-6">{children}</div>
				<Footer />
			</main>
		</div>
	);
}
