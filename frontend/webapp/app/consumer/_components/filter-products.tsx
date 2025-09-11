import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { Filter, MapPin, Award, DollarSign } from "lucide-react";
import { useState } from "react";

export const FilterProducts = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="w-full max-w-sm bg-white/95 backdrop-blur-md vericrop-card-shadow border-white/20 sticky top-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold vericrop-text-dark flex items-center space-x-2">
            <Filter className="h-6 w-6 vericrop-text-primary" />
            <span>Filter Products</span>
          </CardTitle>
          <p className="text-sm vericrop-text-light">
            Refine your search to find the perfect products
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Location Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 vericrop-text-secondary" />
              <h3 className="font-semibold text-lg vericrop-text-dark">
                Location
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { id: "california", label: "California, USA" },
                { id: "amazon", label: "Amazon, Brazil" },
                { id: "punjab", label: "Punjab, India" },
                { id: "loire", label: "Loire Valley, France" },
              ].map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                  className="flex items-center space-x-3 group"
                >
                  <Checkbox
                    id={location.id}
                    className="border-2 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-200"
                  />
                  <Label
                    htmlFor={location.id}
                    className="text-base vericrop-text-neutral cursor-pointer group-hover:vericrop-text-primary transition-colors duration-200"
                  >
                    {location.label}
                  </Label>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Price Range Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-5 w-5 vericrop-text-secondary" />
              <h3 className="font-semibold text-lg vericrop-text-dark">
                Price Range
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Min ($)"
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-1/2 border-gray-200 focus:border-primary focus:ring-primary/20"
                />
                <span className="vericrop-text-light font-medium">-</span>
                <Input
                  placeholder="Max ($)"
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-1/2 border-gray-200 focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div className="text-center text-sm vericrop-text-light">
                Range: ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
          </motion.div>

          {/* Certifications Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-5 w-5 vericrop-text-secondary" />
              <h3 className="font-semibold text-lg vericrop-text-dark">
                Certifications
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { id: "organic", label: "Organic Certified", premium: true },
                { id: "fair-trade", label: "Fair Trade", premium: true },
                {
                  id: "rainforest-alliance",
                  label: "Rainforest Alliance",
                  premium: false,
                },
                { id: "non-gmo", label: "Non-GMO", premium: false },
              ].map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                  className="flex items-center space-x-3 group"
                >
                  <Checkbox
                    id={cert.id}
                    className="border-2 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-200"
                  />
                  <Label
                    htmlFor={cert.id}
                    className={`text-base cursor-pointer group-hover:vericrop-text-primary transition-colors duration-200 ${
                      cert.premium
                        ? "vericrop-text-neutral font-medium"
                        : "vericrop-text-light"
                    }`}
                  >
                    {cert.label}
                    {cert.premium && (
                      <span className="ml-1 text-xs vericrop-text-success">
                        ★
                      </span>
                    )}
                  </Label>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Apply Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Button className="w-full vericrop-gradient-primary text-white border-0 hover:shadow-lg transition-all duration-250 py-3 font-semibold">
              Apply Filters
            </Button>
            <Button
              variant="ghost"
              className="w-full mt-2 vericrop-text-light hover:vericrop-text-primary transition-colors duration-200"
              size="sm"
            >
              Clear All Filters
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
