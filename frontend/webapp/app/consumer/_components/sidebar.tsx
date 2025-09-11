"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, BarChart, Settings, HelpCircle } from "lucide-react";

import { cn } from "@/lib/utils";

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

export const Sidebar = () => {
	const pathname = usePathname();

	return (
		<div className="fixed left-0 top-0 space-y-4 py-4 flex flex-col h-screen bg-white border-r border-gray-200 text-black w-64 z-50">
			<div className="px-3 py-2 flex-1">
				<Link href="/consumer" className="flex items-center pl-3 mb-14">
					<div className="relative h-8 w-8 mr-4">
						<Home className="h-8 w-8 text-green-600" />
					</div>
					<h1 className="text-2xl font-bold text-green-600">
						VeriCrop
					</h1>
				</Link>
				<div className="space-y-1">
					{routes.map((route) => (
						<Link
							href={route.href}
							key={route.href}
							className={cn(
								"text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-green-800 hover:bg-green-100 rounded-lg transition",
								pathname === route.href ? "text-green-800 bg-green-100" : "text-zinc-500",
							)}
						>
							<div className="flex items-center flex-1">
								<route.icon className={cn("h-5 w-5 mr-3", pathname === route.href ? "text-green-600" : "text-zinc-400 group-hover:text-green-600")} />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
			<div className="px-3 py-2">
				<div className="space-y-1">
					{bottomRoutes.map((route) => (
						<Link
							href={route.href}
							key={route.href}
							className={cn(
								"text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition border",
								pathname === route.href 
									? "bg-green-600 text-white border-green-600 hover:bg-green-700" 
									: "border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
							)}
						>
							<div className="flex items-center flex-1">
								<route.icon className="h-5 w-5 mr-3" />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
