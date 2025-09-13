import { motion } from "motion/react";
import { SimpleProductCard } from "./simple-product-card";

const products = [
  {
    id: 1001,
    name: "Organic Roma Tomatoes",
    location: "California, USA",
    price: "$4.99/kg",
    rating: 4.8,
    image: "/tomato.png",
    description: "Premium vine-ripened tomatoes with exceptional taste",
  },
  {
    id: 1002,
    name: "Premium Hass Avocados",
    location: "Amazon Basin, Brazil",
    price: "$7.50/kg",
    rating: 4.9,
    image: "/avocado.png",
    description: "Creamy, nutrient-rich avocados from sustainable farms",
  },
  {
    id: 1003,
    name: "Alphonso Mangoes",
    location: "Ratnagiri, India",
    price: "$12.99/kg",
    rating: 4.7,
    image: "/mango.png",
    description: "The king of mangoes with unmatched sweetness and aroma",
  },
  {
    id: 1004,
    name: "Premium Wine Grapes",
    location: "Loire Valley, France",
    price: "$8.99/kg",
    rating: 4.6,
    image: "/grapes.png",
    description: "Premium wine grapes from renowned French vineyards",
  },
  {
    id: 1005,
    name: "Heritage Rainbow Carrots",
    location: "California Central Valley, USA",
    price: "$5.49/kg",
    rating: 4.5,
    image: "/carrot.png",
    description:
      "Colorful heritage varieties with exceptional flavor and nutrition",
  },
  {
    id: 1006,
    name: "Hydroponic Butterhead Lettuce",
    location: "Portland, Oregon, USA",
    price: "$3.99/kg",
    rating: 4.4,
    image: "/lettuce.png",
    description:
      "Fresh, crisp lettuce grown in controlled hydroponic environments",
  },
];

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
          Discover premium agricultural products with complete blockchain
          traceability and quality assurance
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <SimpleProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
