import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const products = [
	{
		name: "Organic Roma Tomatoes",
		location: "California, USA",
		status: "Available",
		image: "/tomatoes.jpg",
		statusVariant: "secondary" as BadgeVariant,
	},
	{
		name: "Hass Avocados",
		location: "Amazon, Brazil",
		status: "Available",
		image: "/avocados.jpg",
		statusVariant: "secondary" as BadgeVariant,
	},
	{
		name: "Alphonso Mangoes",
		location: "Punjab, India",
		status: "Limited Stock",
		image: "/mangoes.jpg",
		statusVariant: "destructive" as BadgeVariant,
	},
	{
		name: "Chardonnay Grapes",
		location: "Loire Valley, France",
		status: "Available",
		image: "/grapes.jpg",
		statusVariant: "secondary" as BadgeVariant,
	},
	{
		name: "Heirloom Carrots",
		location: "California, USA",
		status: "Seasonal",
		image: "/carrots.jpg",
		statusVariant: "outline" as BadgeVariant,
	},
	{
		name: "Butterhead Lettuce",
		location: "Oregon, USA",
		status: "Available",
		image: "/lettuce.jpg",
		statusVariant: "secondary" as BadgeVariant,
	},
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
	return (
		<Card>
			<CardContent className="p-4">
				<div className="relative w-full h-40 mb-4">
					<Image
						src={product.image}
						alt={product.name}
						layout="fill"
						objectFit="cover"
						className="rounded-lg"
					/>
				</div>
				<h3 className="text-lg font-semibold">{product.name}</h3>
				<p className="text-sm text-gray-500 mb-2">{product.location}</p>
				<Badge
					variant={product.statusVariant}
					className={
						product.status === "Seasonal" || product.status === "Available"
							? "bg-green-500/20 text-green-700 border-green-500"
							: ""
					}
				>
					{product.status}
				</Badge>
				<Button className="w-full mt-4 bg-green-600 text-white hover:bg-green-700">
					View Journey
				</Button>
			</CardContent>
		</Card>
	);
};

export const FeaturedProducts = () => {
	return (
		<div>
			<h2 className="text-3xl font-bold mb-6">Featured Products</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product) => (
					<ProductCard key={product.name} product={product} />
				))}
			</div>
		</div>
	);
};
