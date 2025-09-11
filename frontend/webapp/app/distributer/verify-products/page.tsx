"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const VerifyProductsPage = () => {
	return (
		<div className="p-8 bg-white text-black">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-blue-800">Verify Product</h1>
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
	);
};

export default VerifyProductsPage;
