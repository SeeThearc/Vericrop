import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const batches = [
	{
		id: "B001",
		distributer: "Rajesh Kumar",
		crop: "Wheat",
		location: "Punjab, India",
		quality: "High",
		items: "500 kg",
		status: "Available",
		statusVariant: "secondary" as BadgeVariant,
	},
	{
		id: "B002",
		distributer: "Maria Silva",
		crop: "Rice",
		location: "Amazon, Brazil",
		quality: "Medium",
		items: "300 kg",
		status: "Limited",
		statusVariant: "destructive" as BadgeVariant,
	},
	{
		id: "B003",
		distributer: "John Doe",
		crop: "Corn",
		location: "California, USA",
		quality: "High",
		items: "700 kg",
		status: "Available",
		statusVariant: "secondary" as BadgeVariant,
	},
	{
		id: "B004",
		distributer: "Amit Singh",
		crop: "Soybean",
		location: "Haryana, India",
		quality: "Low",
		items: "400 kg",
		status: "Seasonal",
		statusVariant: "outline" as BadgeVariant,
	},
];

export const FeaturedBatches = () => {
	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Available Batches</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{batches.map((batch) => (
					<Card key={batch.id} className="shadow-lg">
						<CardHeader>
							<CardTitle className="text-lg">
								{batch.crop} Batch - {batch.id}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<p>
								<strong>Distributer:</strong> {batch.distributer}
							</p>
							<p>
								<strong>Location:</strong> {batch.location}
							</p>
							<p>
								<strong>Quality:</strong> {batch.quality}
							</p>
							<p>
								<strong>Items:</strong> {batch.items}
							</p>
							<Badge variant={batch.statusVariant}>{batch.status}</Badge>
							<Button className="w-full mt-4">Purchase Batch</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};
