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
	CheckCircle,
	Clock,
	XCircle,
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
		farmer: "Green Acres Farm",
		inspector: "AgriCert Inc.",
		date: "2024-07-20",
		status: "verified",
	},
	{
		id: "VC-002",
		product: "Premium Corn",
		authenticity: "Authentic",
		farmer: "Sun Harvest Co.",
		inspector: "BioInspect LLC",
		date: "2024-07-19",
		status: "verified",
	},
	{
		id: "VC-003",
		product: "Fresh Tomatoes",
		authenticity: "Flagged",
		farmer: "Fieldstone Organics",
		inspector: "AgriCert Inc.",
		date: "2024-07-18",
		status: "flagged",
	},
	{
		id: "VC-004",
		product: "Soybean Batch A",
		authenticity: "Authentic",
		farmer: "Rural Roots",
		inspector: "BioInspect LLC",
		date: "2024-07-17",
		status: "verified",
	},
	{
		id: "VC-005",
		product: "Durum Wheat",
		authenticity: "Pending",
		farmer: "Grainbelt Farms",
		inspector: "AgriCert Inc.",
		date: "2024-07-17",
		status: "pending",
	},
];

const StatusBadge = ({ status }: { status: string }) => {
	const getStatusConfig = (status: string) => {
		switch (status) {
			case "verified":
				return {
					icon: CheckCircle,
					color: "vericrop-badge-verified",
					text: "Verified"
				};
			case "pending":
				return {
					icon: Clock,
					color: "vericrop-badge-pending",
					text: "Pending"
				};
			case "flagged":
				return {
					icon: XCircle,
					color: "vericrop-badge-error",
					text: "Flagged"
				};
			default:
				return {
					icon: Clock,
					color: "vericrop-badge-info",
					text: status
				};
		}
	};

	const config = getStatusConfig(status);
	const IconComponent = config.icon;

	return (
		<div className={`${config.color} flex items-center gap-1`}>
			<IconComponent className="h-3 w-3" />
			{config.text}
		</div>
	);
};

const VerifyProductsPage = () => {
	return (
		<div className="space-y-6">
			{/* Language Selector */}
			<div className="flex justify-end">
				<div className="w-48">
					<Label className="text-gray-700 text-sm font-medium">Select Language</Label>
					<Select>
						<SelectTrigger className="vericrop-input h-12 mt-1">
							<SelectValue placeholder="English" />
						</SelectTrigger>
						<SelectContent className="bg-white">
							<SelectItem value="en">English</SelectItem>
							<SelectItem value="hi">Hindi</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* QR Scanner Card */}
				<div className="lg:col-span-1">
					<div className="vericrop-qr-scanner-glass p-6 rounded-2xl">
						<div className="flex items-start mb-4">
							<ShieldCheck className="h-8 w-8 text-green-700 mr-3 mt-1" />
							<div>
								<h2 className="text-xl font-bold text-gray-900">
									Welcome, VeriCrop Distributor!
								</h2>
								<p className="text-sm text-gray-600 mt-1">
									Monitor supply chain activities, verify products, and
									detect fraud with AI-powered technology.
								</p>
							</div>
						</div>
						<div className="mt-6">
							<h3 className="text-2xl font-bold mb-4 vericrop-text-primary">QR SCANNER</h3>
							<Button className="w-full vericrop-btn-primary h-12 text-base">
								<QrCode className="mr-2 h-5 w-5" /> Scan QR Code
							</Button>
						</div>
					</div>
				</div>

				{/* Statistics Card */}
				<div className="lg:col-span-2">
					<div className="vericrop-card-secondary">
						<div className="text-center">
							<h3 className="text-sm font-medium text-gray-500 mb-2">
								Total Products Verified
							</h3>
							<div className="text-4xl font-bold vericrop-text-primary mb-2">1,245 MT</div>
							<p className="text-sm text-green-600 font-medium">+12% this month</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Product Authenticity Card */}
				<div className="vericrop-card-secondary vericrop-hover-scale">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Product Authenticity
						</h3>
						<Shield className="h-6 w-6 vericrop-text-primary" />
					</div>
					<p className="text-sm text-gray-600 mb-4">
						All recent products checked have passed authenticity tests with our advanced verification system.
					</p>
					<div className="mb-4">
						<StatusBadge status="verified" />
					</div>
					<Button variant="outline" className="w-full vericrop-btn-secondary">
						View Detailed Report
					</Button>
				</div>

				{/* ML Fraud Detection Card */}
				<div className="vericrop-card-secondary vericrop-hover-scale">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900">
							ML Fraud Detection
						</h3>
						<Cpu className="h-6 w-6 vericrop-text-success" />
					</div>
					<div className="mb-4">
						<StatusBadge status="verified" />
					</div>
					<p className="text-sm text-gray-600">
						No suspicious activities or anomalies detected in the last 24 hours. Machine learning algorithms continuously monitor for fraud patterns.
					</p>
				</div>
			</div>

			{/* Recent Verifications */}
			<div className="vericrop-card-primary">
				<div className="mb-6">
					<h3 className="text-xl font-semibold text-gray-900 mb-2">Recent Verifications</h3>
					<p className="text-gray-600">Latest product verification activities and results</p>
				</div>
				<div className="space-y-4">
					{recentVerifications.map((item) => (
						<div key={item.id} className="vericrop-card-secondary vericrop-hover-lift">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="font-semibold text-gray-900">{item.id}</span>
										<StatusBadge status={item.status} />
									</div>
									<h4 className="font-medium text-gray-900 mb-1">{item.product}</h4>
									<div className="text-sm text-gray-600 space-y-1">
										<p><span className="font-medium">Farmer:</span> {item.farmer}</p>
										<p><span className="font-medium">Inspector:</span> {item.inspector}</p>
										<p><span className="font-medium">Date:</span> {item.date}</p>
									</div>
								</div>
								<div className="flex gap-2">
									<Button variant="outline" size="sm" className="vericrop-btn-secondary">
										View Details
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
							<div>
								<h1 className="text-xl font-bold">
									Welcome, VeriCrop Distributor!
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
								<TableHead>Farmer</TableHead>
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
									<TableCell>{item.farmer}</TableCell>
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
								htmlFor="farmer-id"
								className="text-gray-700"
							>
								Farmer ID
							</Label>
							<Input
								id="farmer-id"
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
							placeholder="e.g., Distribution Center A"
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
