"use client";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import Image from "next/image";
import { motion } from "motion/react";
import { Badge } from "@/components/shadcn/ui/badge";

const fruitCategories = [
  {
    name: "Tropical Fruits",
    count: 12,
    image: "/mango2.png",
    description: "Exotic flavors from tropical regions",
    color: "bg-gradient-to-br from-orange-400 to-pink-500",
    products: ["Mangoes", "Avocados", "Pineapples"],
  },
  {
    name: "Stone Fruits",
    count: 8,
    image: "/tomato2.png",
    description: "Fresh and juicy seasonal favorites",
    color: "bg-gradient-to-br from-red-400 to-rose-500",
    products: ["Tomatoes", "Peaches", "Plums"],
  },
  {
    name: "Berries & Grapes",
    count: 15,
    image: "/grapes2.png",
    description: "Antioxidant-rich superfruits",
    color: "bg-gradient-to-br from-purple-400 to-indigo-500",
    products: ["Grapes", "Blueberries", "Strawberries"],
  },
  {
    name: "Root Vegetables",
    count: 6,
    image: "/carrot2.png",
    description: "Nutrient-dense earth treasures",
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
    products: ["Carrots", "Beets", "Radishes"],
  },
];

export const FruitCategories = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold vericrop-text-dark mb-2">
          Shop by Category
        </h2>
        <p className="vericrop-text-light text-base">
          Explore our premium selection organized by product types
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fruitCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group cursor-pointer"
          >
            <Card className="h-full bg-white vericrop-card-shadow vericrop-hover-scale border-0 overflow-hidden">
              <CardContent className="p-0">
                {/* Header with gradient background */}
                <div
                  className={`relative h-24 ${category.color} p-4 flex items-center justify-between`}
                >
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                    <Badge className="bg-white/20 text-white border-white/30 text-xs">
                      {category.count} Products
                    </Badge>
                  </div>
                  <div className="relative w-16 h-16">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm vericrop-text-light mb-3">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.products.map((product) => (
                      <Badge
                        key={product}
                        variant="outline"
                        className="text-xs text-gray-600 border-gray-200"
                      >
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
