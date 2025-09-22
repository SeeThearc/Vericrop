"use client";
import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

interface LeafData {
  id: number;
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  size: number;
  rotation: number;
  rotationSpeed: number; // degrees per second (fixed rotation speed)
  rotationDirection: number; // 1 or -1 for clockwise/counterclockwise
  windOffset: number;
  windPhase: number;
  mass: number; // affects how much it responds to forces
  opacity: number;
}

interface MouseData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  prevX: number;
  prevY: number;
}

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [leaves, setLeaves] = useState<LeafData[]>([]);
    const mouseRef = useRef<MouseData>({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      prevX: 0,
      prevY: 0,
    });
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const lastSpawnTimeRef = useRef<number>(0);
    const leafIdCounterRef = useRef<number>(0);

    // Initialize window dimensions
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Create a single leaf with random properties
    const createLeaf = useCallback((x?: number, y?: number): LeafData => {
      // Random rotation speed: 5-10 seconds per full revolution
      const revolutionTime = 225 + Math.random() * 15; // 5 to 10 seconds
      const rotationSpeed = 360 / revolutionTime; // degrees per second
      
      return {
        id: leafIdCounterRef.current++,
        x: x ?? Math.random() * windowWidth,
        y: y ?? (-100 - Math.random() * 100),
        vx: (Math.random() - 0.5) * 0.5,
        vy: 0.2 + Math.random() * 0.3,
        size: 16 + Math.random() * 16,
        rotation: Math.random() * 360,
        rotationSpeed: rotationSpeed,
        rotationDirection: Math.random() < 0.5 ? 1 : -1, // Random direction
        windOffset: Math.random() * Math.PI * 2,
        windPhase: Math.random() * Math.PI * 2,
        mass: 0.3 + Math.random() * 0.7, // Wider mass range for more variation
        opacity: 0.6 + Math.random() * 0.4,
      };
    }, [windowWidth]);


    useEffect(() => {
      setLeaves([]);
      leafIdCounterRef.current = 0;
      lastSpawnTimeRef.current = 0;
    }, [windowWidth, windowHeight]);

    // Mouse tracking with bounds checking
    const handleMouseMove = useCallback((e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      
      // Only update if mouse is within browser bounds
      if (e.clientX >= 0 && e.clientX <= windowWidth && 
          e.clientY >= 0 && e.clientY <= windowHeight) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // Calculate mouse velocity (smoothed)
        mouse.vx = (mouse.x - mouse.prevX) * 0.8 + mouse.vx * 0.2;
        mouse.vy = (mouse.y - mouse.prevY) * 0.8 + mouse.vy * 0.2;
      } else {
        // Gradually reduce mouse velocity when outside bounds
        mouse.vx *= 0.9;
        mouse.vy *= 0.9;
      }
    }, [windowWidth, windowHeight]);

    // Track mouse leave to stop wind effects
    const handleMouseLeave = useCallback(() => {
      const mouse = mouseRef.current;
      mouse.vx *= 0.5;
      mouse.vy *= 0.5;
    }, []);

    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [handleMouseMove, handleMouseLeave]);

    // Animation loop
    useEffect(() => {
      if (windowWidth === 0 || windowHeight === 0) return;

      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        // Skip if delta is too large (tab was inactive)
        if (deltaTime > 100) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }

        // Spawn new leaves
        const spawnInterval = leaves.length > 15 ? 1000 + (leaves.length - 15) * 200 : 1000;
        if (currentTime - lastSpawnTimeRef.current >= spawnInterval) {
          const numNewLeaves = Math.floor(Math.random() * 3); // 0-2 leaves to be gentler
          
          setLeaves(prevLeaves => {
            const newLeaves = [];
            for (let i = 0; i < numNewLeaves; i++) {
              newLeaves.push(createLeaf(Math.random() * windowWidth, -100 - Math.random() * 50));
            }
            return [...prevLeaves, ...newLeaves];
          });
          
          lastSpawnTimeRef.current = currentTime;
        }

        const dt = deltaTime * 0.016; // Normalize to ~60fps
        const mouse = mouseRef.current;
        const time = currentTime * 0.001; // Convert to seconds

        setLeaves(prevLeaves => 
          prevLeaves.map(leaf => {
            // Calculate distance to mouse
            const dx = mouse.x - leaf.x;
            const dy = mouse.y - leaf.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Calculate forces
            let fx = 0;
            let fy = 0;

            // Natural wind force (very gentle environmental wind)
            const windStrength = 0.05;
            const windX = Math.sin(time * 0.15 + leaf.windPhase) * windStrength;
            const windY = Math.sin(time * 0.1 + leaf.windOffset) * windStrength * 0.2;
            fx += windX;
            fy += windY;

            // Mass-affected gravity - heavier leaves fall faster
            // F = ma, so a = F/m, but for gravity F = mg, so a = g (constant)
            // But we can simulate different drag coefficients based on mass
            const gravityForce = leaf.mass * 0.18; // Heavier leaves have more gravitational force
            fy += gravityForce;

            // Enhanced mouse horizontal wind effect
            const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
            const mouseInBounds = mouse.x >= 0 && mouse.x <= windowWidth && mouse.y >= 0 && mouse.y <= windowHeight;
            
            if (mouseSpeed > 0.3 && mouseInBounds && distance > 0) {
              // Mouse wind force - lighter leaves are more affected
              const distanceFactor = Math.exp(-distance / 180);
              const massResistanceFactor = 1 / Math.sqrt(leaf.mass); // Lighter leaves are more affected
              
              fx += mouse.vx * 0.05 * distanceFactor * massResistanceFactor;
              fy += mouse.vy * 0.008 * distanceFactor * massResistanceFactor;
              
              // Additional directional wind based on mouse speed
              if (mouseSpeed > 1) {
                const horizontalBoost = Math.sign(mouse.vx) * Math.min(mouseSpeed * 0.02, 0.3);
                fx += horizontalBoost * distanceFactor * massResistanceFactor;
              }
            }

            // Simplified leaf-to-leaf collision (reduced intensity)
            const leafCollisionForce = { x: 0, y: 0 };
            prevLeaves.forEach(otherLeaf => {
              if (otherLeaf.id !== leaf.id) {
                const ldx = otherLeaf.x - leaf.x;
                const ldy = otherLeaf.y - leaf.y;
                const leafDistance = Math.sqrt(ldx * ldx + ldy * ldy);
                const minDistance = (leaf.size + otherLeaf.size) * 0.6;

                if (leafDistance < minDistance && leafDistance > 0) {
                  const pushAngle = Math.atan2(-ldy, -ldx);
                  const overlap = minDistance - leafDistance;
                  const pushForce = overlap * 0.02; // Much weaker collision
                  
                  leafCollisionForce.x += Math.cos(pushAngle) * pushForce;
                  leafCollisionForce.y += Math.sin(pushAngle) * pushForce;
                }
              }
            });
            
            fx += leafCollisionForce.x;
            fy += leafCollisionForce.y;

            // Mass-based air resistance - heavier leaves have less air resistance relative to their mass
            // Air resistance is proportional to velocity^2 and inversely related to mass
            const airResistanceCoeff = 0.04 / leaf.mass; // Lighter leaves experience more air resistance
            const horizontalAirResistance = leaf.vx * Math.abs(leaf.vx) * airResistanceCoeff;
            const verticalAirResistance = leaf.vy * Math.abs(leaf.vy) * airResistanceCoeff * 0.5; // Less vertical resistance
            
            fx -= horizontalAirResistance;
            fy -= verticalAirResistance;

            // Update velocity using F = ma (a = F/m)
            const acceleration = 1 / leaf.mass;
            leaf.vx += fx * acceleration * dt;
            leaf.vy += fy * acceleration * dt;

            // Mass-based velocity limits - heavier leaves can move faster
            const baseMassMultiplier = Math.sqrt(leaf.mass);
            const maxHorizontalVel = 1.5 * baseMassMultiplier; // Heavier leaves can move faster horizontally
            const maxVerticalVel = 2.5 * baseMassMultiplier; // Heavier leaves fall faster

            if (Math.abs(leaf.vx) > maxHorizontalVel) {
              leaf.vx = Math.sign(leaf.vx) * maxHorizontalVel;
            }
            
            if (leaf.vy > maxVerticalVel) {
              leaf.vy = maxVerticalVel;
            } else if (leaf.vy < -maxVerticalVel * 0.1) {
              leaf.vy = -maxVerticalVel * 0.1;
            }

            // Update position
            leaf.x += leaf.vx * dt * 0.8;
            leaf.y += leaf.vy * dt * 0.6;

            // Fixed rotation - independent of mouse or other forces
            leaf.rotation += leaf.rotationSpeed * leaf.rotationDirection * dt;

            return { ...leaf };
          }).filter(leaf => {
            // Remove leaves that are far off screen
            return leaf.y < windowHeight + 200 && leaf.x > -200 && leaf.x < windowWidth + 200;
          })
        );

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [windowWidth, windowHeight, createLeaf]);

    return (
      <div
        className={cn(
          "absolute inset-0 h-full w-full overflow-hidden pointer-events-none",
          className,
        )}
      >
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            style={{
              position: 'absolute',
              left: leaf.x,
              top: leaf.y,
              transform: `rotate(${leaf.rotation}deg)`,
              opacity: leaf.opacity,
            }}
            className="text-green-200 drop-shadow-lg transition-opacity"
          >
            <Leaf size={leaf.size} />
          </motion.div>
        ))}
        
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";