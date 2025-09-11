"use client";

import { Home, Package, Search, Clipboard, Settings, HelpCircle } from "lucide-react";
import { Sidebar } from "@/app/components/Sidebar";
import { Topbar } from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";

const routes = [
	{
		label: "Dashboard",
		icon: Home,
		href: "/farmer",
	},
	{
		label: "Register Product",
		icon: Package,
		href: "/farmer/register-product",
	},
	{
		label: "Track My Products",
		icon: Search,
		href: "/farmer/track-products",
	},
	{
		label: "ML Insights",
		icon: Clipboard,
		href: "/farmer/ml-insights",
	},
];

const bottomRoutes = [
	{
		label: "Settings",
		icon: Settings,
		href: "/farmer/settings",
	},
	{
		label: "Help & Support",
		icon: HelpCircle,
		href: "/farmer/help-support",
	},
];

const navLinks = [
	{ label: "Register Product", href: "/farmer/register-product" },
	{ label: "Track My Products", href: "/farmer/track-products" },
	{ label: "ML Insights", href: "/farmer/ml-insights" },
];

export default function FarmerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex bg-white min-h-screen">
			<Sidebar
				routes={routes}
				bottomRoutes={bottomRoutes}
				baseHref="/farmer"
			/>
			<main className="flex-1 flex flex-col ml-64">
				<Topbar
					navLinks={navLinks}
					searchPlaceholder="Search your products..."
					baseHref="/farmer"
				/>
				<div className="flex-grow pt-20 p-6 space-y-6">
					{children}
				</div>
				<Footer />
			</main>
		</div>
	);
}
