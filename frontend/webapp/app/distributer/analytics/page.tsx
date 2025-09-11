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
import { AlertTriangle, UploadCloud } from "lucide-react";

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

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Fraud Detection Overview */}
					<div className="border rounded-lg p-6 shadow-sm">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold">
								Fraud Detection Overview
							</h2>
							<AlertTriangle className="text-red-500" />
						</div>
						<p className="text-sm text-gray-600 mb-6">
							Identified potential fraud and discrepancies in recent supply
							chain activities.
						</p>
						<div className="space-y-4">
							<div className="flex items-start">
								<AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
								<div>
									<p className="font-semibold">
										Fake Label:{" "}
										<span className="font-normal">
											Detected counterfeit labels on "Organic Apples" shipment
											#45678.
										</span>
									</p>
								</div>
							</div>
							<div className="flex items-start">
								<AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
								<div>
									<p className="font-semibold">
										Product Substitution:{" "}
										<span className="font-normal">
											"Premium Oranges" substituted with lower-grade oranges in
											batch #91011.
										</span>
									</p>
								</div>
							</div>
							<div className="flex items-start">
								<AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
								<div>
									<p className="font-semibold">
										Quantity Mismatch:{" "}
										<span className="font-normal">
											Received 150 units of "Cherry Tomatoes" instead of 200
											units for order #12131.
										</span>
									</p>
								</div>
							</div>
							<div className="flex items-start">
								<AlertTriangle className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
								<div>
									<p className="font-semibold">
										Product Type Mismatch:{" "}
										<span className="font-normal">
											Shipment #14151 contained "Red Bell Peppers" instead of
											"Yellow Bell Peppers".
										</span>
									</p>
								</div>
							</div>
						</div>
						<button className="w-full mt-6 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-colors">
							View Full Report
						</button>
					</div>

					{/* Fruit/Vegetable Quality Classifier */}
					<div className="border rounded-lg p-6 shadow-sm">
						<h2 className="text-xl font-semibold mb-2">
							Fruit/Vegetable Quality Classifier
						</h2>
						<p className="text-sm text-gray-600 mb-6">
							Determine produce quality based on visual data inputs.
						</p>
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center mb-4">
							<UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
							<p className="text-gray-600">Drag & drop or click to upload</p>
						</div>
						<div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center mb-4">
							<span className="font-semibold">Result: Bad</span>
						</div>
						<button className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-colors">
							Classify
						</button>
					</div>

					{/* Carton Quality Inspection */}
					<div className="border rounded-lg p-6 shadow-sm">
						<h2 className="text-xl font-semibold mb-2">
							Carton Quality Inspection
						</h2>
						<p className="text-sm text-gray-600 mb-6">
							Upload or select a package for inspection.
						</p>
						<div className="mb-4">
							<label
								htmlFor="package-select"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Select Package
							</label>
							<input
								type="text"
								id="package-select"
								value="No package selected"
								readOnly
								className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-gray-500"
							/>
						</div>
						<button className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-colors">
							Inspect Package
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsPage;
