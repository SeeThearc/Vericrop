import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { MapPin, Star, Truck, Shield } from "lucide-react";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const products = [
  {
    name: "Organic Roma Tomatoes",
    location: "California, USA",
    status: "Available",
    price: "$4.99/kg",
    rating: 4.8,
    image: "/tomatoes.jpg",
    statusVariant: "secondary" as BadgeVariant,
    certification: "Organic Certified",
    description: "Premium vine-ripened tomatoes with exceptional taste",
  },
  {
    name: "Hass Avocados",
    location: "Amazon, Brazil",
    status: "Available",
    price: "$7.50/kg",
    rating: 4.9,
    image: "/avocados.jpg",
    statusVariant: "secondary" as BadgeVariant,
    certification: "Fair Trade",
    description: "Creamy, nutrient-rich avocados from sustainable farms",
  },
  {
    name: "Alphonso Mangoes",
    location: "Punjab, India",
    status: "Limited Stock",
    price: "$12.99/kg",
    rating: 4.7,
    image: "/mangoes.jpg",
    statusVariant: "destructive" as BadgeVariant,
    certification: "Premium Grade",
    description: "The king of mangoes with unmatched sweetness",
  },
  {
    name: "Chardonnay Grapes",
    location: "Loire Valley, France",
    status: "Available",
    price: "$8.99/kg",
    rating: 4.6,
    image: "/grapes.jpg",
    statusVariant: "secondary" as BadgeVariant,
    certification: "AOC Certified",
    description: "Premium wine grapes from renowned French vineyards",
  },
  {
    name: "Heirloom Carrots",
    location: "California, USA",
    status: "Seasonal",
    price: "$5.49/kg",
    rating: 4.5,
    image: "/carrots.jpg",
    statusVariant: "outline" as BadgeVariant,
    certification: "Non-GMO",
    description: "Colorful heritage varieties with exceptional flavor",
  },
  {
    name: "Butterhead Lettuce",
    location: "Oregon, USA",
    status: "Available",
    price: "$3.99/kg",
    rating: 4.4,
    image: "/lettuce.jpg",
    statusVariant: "secondary" as BadgeVariant,
    certification: "Hydroponic",
    description: "Fresh, crisp lettuce grown in controlled environments",
  },
];

const ProductCard = ({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) => {
  const getStatusColor = () => {
    switch (product.status) {
      case "Available":
        return "bg-green-100 text-green-700 border-green-200";
      case "Limited Stock":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Seasonal":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="group h-full bg-white vericrop-card-shadow vericrop-hover-scale border-0 overflow-hidden">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <Badge className={`${getStatusColor()} font-medium px-2 py-1`}>
                {product.status}
              </Badge>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs font-semibold text-gray-700">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-xl font-semibold vericrop-text-dark mb-1 group-hover:vericrop-text-primary transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-sm vericrop-text-light mb-2">
                {product.description}
              </p>
              <div className="flex items-center space-x-1 text-sm vericrop-text-light">
                <MapPin className="h-3 w-3" />
                <span>{product.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 vericrop-text-success" />
                <span className="text-xs font-medium vericrop-text-success">
                  {product.certification}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold vericrop-text-success">
                  {product.price}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                className="flex-1 vericrop-gradient-primary text-white border-0 hover:shadow-lg transition-all duration-250"
                size="sm"
              >
                <Truck className="h-4 w-4 mr-2" />
                View Journey
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const FeaturedProducts = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2
          className="text-3xl font-bold vericrop-text-dark mb-2"
          style={{ fontFamily: "Inter, system-ui" }}
        >
          Featured Products
        </h2>
        <p className="vericrop-text-light text-base">
          Discover premium agricultural products with complete traceability and
          quality assurance
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.name} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};
