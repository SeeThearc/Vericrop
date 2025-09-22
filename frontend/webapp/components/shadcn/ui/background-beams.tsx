"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const leaves = [
      {
        initialX: 100,
        initialY: -50,
        translateY: 800,
        duration: 15,
        delay: 0,
        size: 24,
      },
      {
        initialX: 300,
        initialY: -100,
        translateY: 850,
        duration: 18,
        delay: 2,
        size: 20,
      },
      {
        initialX: 500,
        initialY: -75,
        translateY: 900,
        duration: 20,
        delay: 4,
        size: 28,
      },
      {
        initialX: 700,
        initialY: -25,
        translateY: 750,
        duration: 16,
        delay: 1,
        size: 22,
      },
      {
        initialX: 900,
        initialY: -150,
        translateY: 950,
        duration: 22,
        delay: 3,
        size: 26,
      },
      {
        initialX: 200,
        initialY: -80,
        translateY: 820,
        duration: 17,
        delay: 5,
        size: 18,
      },
      {
        initialX: 600,
        initialY: -60,
        translateY: 880,
        duration: 19,
        delay: 0.5,
        size: 24,
      },
      {
        initialX: 800,
        initialY: -120,
        translateY: 920,
        duration: 21,
        delay: 2.5,
        size: 20,
      },
    ];

    return (
      <div
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden",
          className,
        )}
      >
        {leaves.map((leaf, index) => (
          <motion.div
            key={index}
            initial={{
              x: leaf.initialX,
              y: leaf.initialY,
              rotate: 0,
            }}
            animate={{
              y: leaf.translateY,
              rotate: 360,
            }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              ease: "linear",
              delay: leaf.delay,
            }}
            className="absolute text-green-500 opacity-70"
          >
            <Leaf size={leaf.size} />
          </motion.div>
        ))}
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";
