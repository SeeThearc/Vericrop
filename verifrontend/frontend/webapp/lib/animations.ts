// VeriCrop Animation Library
// Consistent animation configurations for the VeriCrop design system

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardHover = {
  whileHover: {
    y: -8,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  whileTap: {
    scale: 0.98,
  },
};

export const buttonHover = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  whileTap: {
    scale: 0.98,
  },
};

// VeriCrop Brand Colors
export const colors = {
  primary: "#22C55E",
  secondary: "#52B788",
  accent: "#16A34A",
  darkGreen: "#1B4332",
  lightGreen: "#D1FAE5",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  text: "#374151",
  textLight: "#6B7280",
  white: "#FFFFFF",
} as const;

// Common gradient backgrounds
export const gradients = {
  primary: "bg-gradient-to-r from-[#22C55E] to-[#16A34A]",
  forest: "bg-gradient-to-br from-[#1B4332] via-[#2D5A3D] to-[#52B788]",
  light: "bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0]",
  glass: "backdrop-blur-xl bg-white/10",
} as const;

// Reusable motion variants
export const motionVariants = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  cardHover,
  buttonHover,
} as const;
