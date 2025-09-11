"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	ShieldCheck,
	QrCode,
	Package,
	FileText,
	Cpu,
	Shield,
	AlertTriangle,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const recentVerifications = [
	{
		id: "VC-001",
		product: "Organic Wheat",
		authenticity: "Authentic",
		distributer: "Green Acres Farm",
		inspector: "AgriCert Inc.",
		date: "2024-07-20",
	},
	{
		id: "VC-002",
		product: "Premium Corn",
		authenticity: "Authentic",
		distributer: "Sun Harvest Co.",
		inspector: "BioInspect LLC",
		date: "2024-07-19",
	},
	{
		id: "VC-003",
		product: "Fresh Tomatoes",
		authenticity: "Flagged",
		distributer: "Fieldstone Organics",
		inspector: "AgriCert Inc.",
		date: "2024-07-18",
	},
	{
		id: "VC-004",
		product: "Soybean Batch A",
		authenticity: "Authentic",
		distributer: "Rural Roots",
		inspector: "BioInspect LLC",
		date: "2024-07-17",
	},
	{
		id: "VC-005",
		product: "Durum Wheat",
		authenticity: "Authentic",
		distributer: "Grainbelt Farms",
		inspector: "AgriCert Inc.",
		date: "2024-07-17",
	},
];

const VerifyProductsPage = () => {
	return (
		<div className="p-6 bg-gray-50 min-h-screen text-gray-900">
			{/* Language Selector at the top */}
			<div className="mb-6 flex justify-end">
				<div className="w-48">
					<Label className="text-gray-700">Select Language</Label>
					<Select>
						<SelectTrigger className="bg-white border-gray-300 text-black">
							<SelectValue placeholder="English" />
						</SelectTrigger>
						<SelectContent className="bg-white text-black">
							<SelectItem value="en">English</SelectItem>
							<SelectItem value="es">Hindi</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
				{/* Welcome & QR Scanner */}
				<Card className="lg:col-span-1 bg-green-50 shadow-lg">
					<CardContent className="p-6">
						<div className="flex items-start">
							<ShieldCheck className="h-8 w-8 text-green-700 mr-4 mt-1" />
							<div>
								<h1 className="text-xl font-bold">
									Welcome, VeriCrop Retailer!
								</h1>
								<p className="text-sm text-gray-600">
									Monitor supply chain activities, verify products, and
									detect fraud.
								</p>
							</div>
						</div>
						<div className="mt-4">
							<p className="text-4xl font-bold mb-2">QR SCANNER</p>
							<Button className="w-full bg-green-600 hover:bg-green-700 text-white">
								<QrCode className="mr-2 h-4 w-4" /> Scan QR Code
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Stats Cards - Only Total Products Verified */}
				<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-1 gap-6">
					<Card className="shadow-lg">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-gray-500">
								Total Products Verified
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">1,245 MT</div>
							<p className="text-xs text-green-500">+12% this month</p>
						</CardContent>
					</Card>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				{/* Product Authenticity */}
				<Card className="shadow-lg">
					<CardHeader>
						<CardTitle className="text-md font-semibold">
							Product Authenticity
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-gray-600 mb-2">
							All recent products checked have passed authenticity tests.
						</p>
						<div className="inline-block bg-yellow-400 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
							Verified
						</div>
						<Button variant="outline" className="w-full mt-4">
							View Details
						</Button>
					</CardContent>
				</Card>

				{/* ML Fraud Detection */}
				<Card className="shadow-lg">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="text-md font-semibold">
							ML Fraud Detection
						</CardTitle>
						<Shield className="h-5 w-5 text-yellow-500" />
					</CardHeader>
					<CardContent>
						<div className="inline-block bg-yellow-400 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full mb-2">
							All Clear
						</div>
						<p className="text-sm text-gray-600">
							No suspicious activities or anomalies detected in the last 24
							hours.
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Verifications Table */}
			<Card className="shadow-lg">
				<CardHeader>
					<CardTitle>Recent Verifications</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Product ID</TableHead>
								<TableHead>Product</TableHead>
								<TableHead>Authenticity</TableHead>
								<TableHead>Distributer</TableHead>
								<TableHead>Inspector</TableHead>
								<TableHead>Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentVerifications.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.id}</TableCell>
									<TableCell>{item.product}</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded-full text-xs font-semibold ${
												item.authenticity === "Authentic"
													? "bg-yellow-400 text-white"
													: "bg-red-500 text-white"
											}`}
										>
											{item.authenticity}
										</span>
									</TableCell>
									<TableCell>{item.distributer}</TableCell>
									<TableCell>{item.inspector}</TableCell>
									<TableCell>{item.date}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<div className="mt-8">
				<h1 className="text-3xl font-bold text-blue-800 mb-8">Verify Product</h1>
				<div className="space-y-8">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label
								htmlFor="qr-code"
								className="text-gray-700"
							>
								QR Code/Product ID
							</Label>
							<Input
								id="qr-code"
								placeholder="Scan or enter QR code"
								className="bg-white border-gray-300 text-black"
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="product-name"
								className="text-gray-700"
							>
								Product Name
							</Label>
							<Input
								id="product-name"
								placeholder="Auto-filled from QR"
								className="bg-white border-gray-300 text-black"
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label
								htmlFor="distributer-id"
								className="text-gray-700"
							>
								Distributer ID
							</Label>
							<Input
								id="distributer-id"
								placeholder="Auto-filled from QR"
								className="bg-white border-gray-300 text-black"
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="verification-date"
								className="text-gray-700"
							>
								Verification Date
							</Label>
							<Input
								id="verification-date"
								type="date"
								className="bg-white border-gray-300 text-black"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<Label
							htmlFor="current-location"
							className="text-gray-700"
						>
							Current Location
						</Label>
						<Input
							id="current-location"
							placeholder="e.g., Retail Store A"
							className="bg-white border-gray-300 text-black"
						/>
					</div>
					<div className="space-y-2">
						<Label className="text-gray-700">
							Upload Verification Photos
						</Label>
						<p className="text-sm text-gray-500">
							Take photos to document the verification process.
						</p>
						<div className="relative">
							<Input
								type="text"
								placeholder="Choose file..."
								className="w-full text-gray-700 pr-20 cursor-pointer"
								readOnly
								onClick={() =>
									(document.querySelector(
										'input[type="file"]'
									) as HTMLInputElement)?.click()
								}
							/>
							<Input
								type="file"
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
							<Button
								type="button"
								className="absolute right-0 top-0 h-full px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-l-none"
								onClick={() =>
									(document.querySelector(
										'input[type="file"]'
									) as HTMLInputElement)?.click()
								}
							>
								Browse
							</Button>
						</div>
					</div>
					<div className="space-y-2">
						<Label className="text-gray-700">Verification Notes</Label>
						<Textarea
							placeholder="Add detailed notes about the verification process"
							className="bg-white border-gray-300 text-black"
						/>
					</div>
					<div className="flex justify-end">
						<Button className="bg-blue-600 hover:bg-blue-700 text-white">
							Verify Product and Update Chain
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyProductsPage;
