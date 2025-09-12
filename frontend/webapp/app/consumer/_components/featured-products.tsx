import { motion } from "motion/react";
import { useState } from "react";
import { EnhancedProductCard } from "./enhanced-product-card";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const products = [
  {
    id: 1001,
    name: "Organic Roma Tomatoes",
    location: "California, USA",
    status: "VERIFIED",
    productState: "LISTED",
    price: "$4.99/kg",
    rating: 4.8,
    image: "/tomato.png",
    statusVariant: "secondary" as BadgeVariant,
    certification: "Grade A - Organic Certified",
    description: "Premium vine-ripened tomatoes with exceptional taste",
    currentStage: "RETAIL",
    overallGrade: "A",
    qualityScore: 92,
    temperature: 18,
    farmer: "Green Valley Farms",
    distributor: "Fresh Supply Co.",
    retailer: "FreshMart",
    expiresAt: "2025-09-20",
    traceabilityId: "TV-1001-2025",
  },
  {
    id: 1002,
    name: "Premium Hass Avocados",
    location: "Amazon Basin, Brazil",
    status: "VERIFIED",
    productState: "LISTED",
    price: "$7.50/kg",
    rating: 4.9,
    image: "/avocado.png",
    statusVariant: "secondary" as BadgeVariant,
    certification: "Grade A - Fair Trade",
    description: "Creamy, nutrient-rich avocados from sustainable farms",
    currentStage: "RETAIL",
    overallGrade: "A",
    qualityScore: 95,
    temperature: 16,
    farmer: "Sustainable Avocado Co.",
    distributor: "Eco Logistics",
    retailer: "Premium Produce",
    expiresAt: "2025-09-18",
    traceabilityId: "AV-1002-2025",
  },
  {
    id: 1003,
    name: "Alphonso Mangoes",
    location: "Ratnagiri, India",
    status: "RECEIVED",
    productState: "PENDING_PICKUP",
    price: "$12.99/kg",
    rating: 4.7,
    image: "/mango.png",
    statusVariant: "destructive" as BadgeVariant,
    certification: "Grade A - Premium Export",
    description: "The king of mangoes with unmatched sweetness and aroma",
    currentStage: "DISTRIBUTION",
    overallGrade: "A",
    qualityScore: 88,
    temperature: 20,
    farmer: "Konkan Mango Growers",
    distributor: "International Fresh",
    retailer: "Exotic Fruits Ltd",
    expiresAt: "2025-09-15",
    traceabilityId: "MG-1003-2025",
  },
  {
    id: 1004,
    name: "Premium Wine Grapes",
    location: "Loire Valley, France",
    status: "VERIFIED",
    productState: "LISTED",
    price: "$8.99/kg",
    rating: 4.6,
    image: "/grapes.png",
    statusVariant: "secondary" as BadgeVariant,
    certification: "Grade B - AOC Certified",
    description: "Premium wine grapes from renowned French vineyards",
    currentStage: "RETAIL",
    overallGrade: "B",
    qualityScore: 78,
    temperature: 14,
    farmer: "Château Vignobles",
    distributor: "Wine Route Logistics",
    retailer: "Gourmet Market",
    expiresAt: "2025-09-25",
    traceabilityId: "GR-1004-2025",
  },
  {
    id: 1005,
    name: "Heritage Rainbow Carrots",
    location: "California Central Valley, USA",
    status: "VERIFIED",
    productState: "LISTED",
    price: "$5.49/kg",
    rating: 4.5,
    image: "/carrot.png",
    statusVariant: "outline" as BadgeVariant,
    certification: "Grade B - Non-GMO Verified",
    description:
      "Colorful heritage varieties with exceptional flavor and nutrition",
    currentStage: "RETAIL",
    overallGrade: "B",
    qualityScore: 75,
    temperature: 12,
    farmer: "Rainbow Roots Farm",
    distributor: "Veggie Express",
    retailer: "Healthy Choice Market",
    expiresAt: "2025-10-01",
    traceabilityId: "CR-1005-2025",
  },
  {
    id: 1006,
    name: "Hydroponic Butterhead Lettuce",
    location: "Portland, Oregon, USA",
    status: "VERIFIED",
    productState: "LISTED",
    price: "$3.99/kg",
    rating: 4.4,
    image: "/lettuce.png",
    statusVariant: "secondary" as BadgeVariant,
    certification: "Grade A - Hydroponic Grown",
    description:
      "Fresh, crisp lettuce grown in controlled hydroponic environments",
    currentStage: "RETAIL",
    overallGrade: "A",
    qualityScore: 86,
    temperature: 8,
    farmer: "Urban Greens Hydroponics",
    distributor: "Fresh Leaf Co.",
    retailer: "Green Market",
    expiresAt: "2025-09-16",
    traceabilityId: "LT-1006-2025",
  },
];

export const FeaturedProducts = () => {
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(
    new Set()
  );

  const toggleExpanded = (productId: number) => {
    setExpandedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

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
          Discover premium agricultural products with complete blockchain
          traceability and quality assurance
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <EnhancedProductCard
            key={product.id}
            product={product}
            isExpanded={expandedProducts.has(product.id)}
            onToggle={() => toggleExpanded(product.id)}
          />
        ))}
      </div>
    </div>
  );
};
