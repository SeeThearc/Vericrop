"use client";
import React, { useState, useEffect } from "react";

export const Meteors = ({ number }: { number?: number }) => {
  const [mounted, setMounted] = useState(false);
  const [meteors, setMeteors] = useState<
    Array<{ id: number; position: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    setMounted(true);
    // Generate meteor data only on client side to avoid hydration mismatch
    const meteorCount = number || 20;
    const meteorData = new Array(meteorCount).fill(null).map((_, idx) => ({
      id: idx,
      position: Math.random() * 100, // Random horizontal position across the container
      delay: Math.random() * 15, // Stagger over 15 seconds
      duration: Math.random() * 3 + 2, // Duration between 2-5 seconds
    }));
    setMeteors(meteorData);
  }, [number]);

  if (!mounted) {
    // Return empty div during SSR to avoid hydration mismatch
    return <div className="absolute inset-0 pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {meteors.map((meteor) => (
        <div
          key={"meteor" + meteor.id}
          className="absolute animate-meteor"
          style={{
            left: `${meteor.position}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        >
          {/* Meteor head */}
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow-lg relative z-10" />
          {/* Meteor trail */}
          <div className="absolute top-0.5 left-0 w-32 h-0.5 bg-gradient-to-r from-white via-blue-200/80 via-cyan-200/60 via-transparent transform -rotate-12 origin-left opacity-80" />
          <div className="absolute top-0.5 left-0 w-24 h-0.5 bg-gradient-to-r from-blue-100/60 via-cyan-100/40 via-transparent transform -rotate-12 origin-left opacity-60" />
        </div>
      ))}
    </div>
  );
};
