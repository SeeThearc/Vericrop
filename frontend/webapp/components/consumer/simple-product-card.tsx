"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { MapPin, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface SimpleProductCardProps {
  product: {
    id: number;
    name: string;
    location: string;
    price: string;
    rating: number;
    image: string;
    description: string;
  };
}

export const SimpleProductCard = ({ product }: SimpleProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="bg-white vericrop-card-shadow vericrop-hover-scale border-0 overflow-hidden">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs font-semibold text-gray-700">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold vericrop-text-dark mb-2 group-hover:vericrop-text-primary transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-sm vericrop-text-light mb-3">
                {product.description}
              </p>
              <div className="flex items-center space-x-1 text-sm vericrop-text-light">
                <MapPin className="h-3 w-3" />
                <span>{product.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold vericrop-text-success">
                {product.price}
              </div>
            </div>

            <Button className="w-full vericrop-gradient-primary text-white border-0 hover:shadow-lg transition-all duration-250">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
