"use client";

import {
	Area,
	AreaChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ChartContainer, ChartConfig, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
	{ month: "Jan", sales: 12000, verifications: 150, transactions: 45 },
	{ month: "Feb", sales: 11000, verifications: 140, transactions: 42 },
	{ month: "Mar", sales: 13000, verifications: 160, transactions: 48 },
	{ month: "Apr", sales: 14000, verifications: 180, transactions: 52 },
	{ month: "May", sales: 16500, verifications: 200, transactions: 58 },
	{ month: "Jun", sales: 18000, verifications: 220, transactions: 62 },
];

const chartConfig = {
	sales: {
		label: "Sales ($)",
		color: "hsl(var(--chart-1))",
	},
	verifications: {
		label: "Verifications",
		color: "#3b82f6",
	},
	transactions: {
		label: "Transactions",
		color: "#10b981",
	},
} satisfies ChartConfig;

const AnalyticsPage = () => {
	return (
		<div className="p-8 bg-white text-black">
			<h1 className="text-3xl font-bold mb-8 text-purple-800">
				Analytics Dashboard
			</h1>
			<div className="space-y-8">
				<div className="grid grid-cols-3 gap-4">
					<div className="bg-blue-50 p-4 rounded-lg">
						<h3 className="text-lg font-semibold text-blue-800">
							Total Sales
						</h3>
						<p className="text-2xl font-bold text-blue-600">$83,500</p>
					</div>
					<div className="bg-green-50 p-4 rounded-lg">
						<h3 className="text-lg font-semibold text-green-800">
							Total Verifications
						</h3>
						<p className="text-2xl font-bold text-green-600">1,070</p>
					</div>
					<div className="bg-purple-50 p-4 rounded-lg">
						<h3 className="text-lg font-semibold text-purple-800">
							Total Transactions
						</h3>
						<p className="text-2xl font-bold text-purple-600">307</p>
					</div>
				</div>
				<ChartContainer
					config={chartConfig}
					className="h-[400px] transition-all duration-300"
				>
					<AreaChart data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<YAxis tickLine={false} axisLine={false} tickMargin={8} />
						<Tooltip content={<ChartTooltipContent />} />
						<Area
							dataKey="transactions"
							type="natural"
							fill="var(--color-transactions)"
							fillOpacity={0.4}
							stroke="var(--color-transactions)"
							stackId="a"
						/>
						<Area
							dataKey="verifications"
							type="natural"
							fill="var(--color-verifications)"
							fillOpacity={0.4}
							stroke="var(--color-verifications)"
							stackId="a"
						/>
						<Area
							dataKey="sales"
							type="natural"
							fill="var(--color-sales)"
							fillOpacity={0.4}
							stroke="var(--color-sales)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</div>
		</div>
	);
};

export default AnalyticsPage;
