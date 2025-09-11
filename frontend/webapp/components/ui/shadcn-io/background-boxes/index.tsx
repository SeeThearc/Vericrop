"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BoxesProps {
  className?: string;
}

export const Boxes = ({ className, ...rest }: BoxesProps) => {
  const [mounted, setMounted] = useState(false);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate colors only on client side to avoid hydration mismatch
    const colorPalette = [
      "rgb(34 139 34)", // forest green
      "rgb(107 142 35)", // olive green
      "rgb(85 107 47)", // dark olive
      "rgb(154 205 50)", // yellow green (fresh leaves)
      "rgb(205 133 63)", // peru (tree bark)
      "rgb(139 69 19)", // saddle brown (earth/wood)
      "rgb(70 130 180)", // steel blue (clear sky)
      "rgb(135 206 235)", // sky blue (soft daylight)
      "rgb(222 184 135)", // burlywood (sand/soil)
      "rgb(255 250 240)", // floral white (flowers, light accents)
    ];

    setColors(colorPalette);
  }, []);

  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);

  const getRandomColor = () => {
    if (!mounted || colors.length === 0) return "rgb(125 211 252)"; // Default color during SSR
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!mounted) {
    // Return empty div during SSR to avoid hydration mismatch
    return <div className={cn("absolute inset-0", className)} />;
  }

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8 border-l border-slate-700 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-16 h-8 border-r border-t border-slate-700 relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};
