# Website-Wide BackgroundBeamsWithCollision Integration Guide

This guide outlines how to integrate the `BackgroundBeamsWithCollision` component throughout the entire VeriCrop website for a cohesive animated background experience.

## 1. Landing Page Integration

### Hero Section

```tsx
// app/page.tsx - Main landing page
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <BackgroundBeamsWithCollision className="h-screen">
        <div className="text-center z-20 relative px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">
            VeriCrop
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Revolutionary Blockchain Agriculture Platform
          </p>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
```

## 2. Dashboard Landing Sections

### Farmer Dashboard Hero

```tsx
// app/farmer/page.tsx
<BackgroundBeamsWithCollision className="h-64 md:h-80">
  <motion.div className="text-center z-20 relative px-4">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
      Farmer Dashboard
    </h1>
    <p className="text-lg md:text-xl text-gray-700">
      Manage your crops with blockchain transparency
    </p>
  </motion.div>
</BackgroundBeamsWithCollision>
```

### Distributor Dashboard Hero

```tsx
// app/distributer/page.tsx
<BackgroundBeamsWithCollision className="h-64 md:h-80">
  <motion.div className="text-center z-20 relative px-4">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
      Distribution Hub
    </h1>
    <p className="text-lg md:text-xl text-gray-700">
      Streamline supply chain operations
    </p>
  </motion.div>
</BackgroundBeamsWithCollision>
```

### Inspector Dashboard Hero

```tsx
// app/inspector/page.tsx
<BackgroundBeamsWithCollision className="h-64 md:h-80">
  <motion.div className="text-center z-20 relative px-4">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
      Quality Inspector
    </h1>
    <p className="text-lg md:text-xl text-gray-700">
      Ensure product quality and compliance
    </p>
  </motion.div>
</BackgroundBeamsWithCollision>
```

### Retailer Dashboard Hero

```tsx
// app/retailer/page.tsx
<BackgroundBeamsWithCollision className="h-64 md:h-80">
  <motion.div className="text-center z-20 relative px-4">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
      Retail Management
    </h1>
    <p className="text-lg md:text-xl text-gray-700">
      Connect with verified suppliers
    </p>
  </motion.div>
</BackgroundBeamsWithCollision>
```

### Consumer Portal Hero

```tsx
// app/consumer/page.tsx
<BackgroundBeamsWithCollision className="h-64 md:h-80">
  <motion.div className="text-center z-20 relative px-4">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
      Product Verification
    </h1>
    <p className="text-lg md:text-xl text-gray-700">
      Trace your food from farm to table
    </p>
  </motion.div>
</BackgroundBeamsWithCollision>
```

## 3. Authentication Pages

### Login Page

```tsx
// app/login/page.tsx
<div className="min-h-screen relative">
  <BackgroundBeamsWithCollision className="h-screen">
    <div className="flex items-center justify-center min-h-screen z-20 relative">
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome to VeriCrop
        </h2>
        {/* Login form content */}
      </Card>
    </div>
  </BackgroundBeamsWithCollision>
</div>
```

## 4. Feature Showcase Sections

### About Section

```tsx
// components/sections/about-section.tsx
<section className="relative">
  <BackgroundBeamsWithCollision className="h-96">
    <div className="text-center z-20 relative px-4">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">About VeriCrop</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Revolutionizing agriculture through blockchain technology
      </p>
    </div>
  </BackgroundBeamsWithCollision>
</section>
```

### Features Section

```tsx
// components/sections/features-section.tsx
<section className="relative">
  <BackgroundBeamsWithCollision className="h-80">
    <div className="text-center z-20 relative px-4">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Platform Features
      </h2>
      <p className="text-lg text-gray-700">
        Comprehensive blockchain solutions for modern agriculture
      </p>
    </div>
  </BackgroundBeamsWithCollision>
</section>
```

## 5. Modal and Overlay Integration

### Product Detail Modals

```tsx
// components/modals/product-detail-modal.tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden">
    <BackgroundBeamsWithCollision className="h-32">
      <div className="text-center z-20 relative px-4">
        <h3 className="text-2xl font-bold text-gray-900">Product Details</h3>
      </div>
    </BackgroundBeamsWithCollision>
    <div className="p-6">{/* Modal content */}</div>
  </DialogContent>
</Dialog>
```

## 6. Loading and Error States

### Loading Page

```tsx
// components/ui/loading-page.tsx
<div className="min-h-screen relative">
  <BackgroundBeamsWithCollision className="h-screen">
    <div className="flex items-center justify-center min-h-screen z-20 relative">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-700">Loading VeriCrop...</p>
      </div>
    </div>
  </BackgroundBeamsWithCollision>
</div>
```

### Error Page

```tsx
// app/error.tsx
<div className="min-h-screen relative">
  <BackgroundBeamsWithCollision className="h-screen">
    <div className="flex items-center justify-center min-h-screen z-20 relative">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We're working to fix this issue
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    </div>
  </BackgroundBeamsWithCollision>
</div>
```

## 7. Configuration Options

### Reduced Motion Sections

For sections where subtle animation is preferred:

```tsx
<BackgroundBeamsWithCollision
  className="h-48"
  particleCount={20} // Reduced particles
  collisionRadius={60} // Smaller collision radius
>
  {/* Content */}
</BackgroundBeamsWithCollision>
```

### High-Impact Sections

For major hero sections:

```tsx
<BackgroundBeamsWithCollision
  className="h-screen"
  particleCount={50} // More particles
  collisionRadius={100} // Larger collision radius
>
  {/* Content */}
</BackgroundBeamsWithCollision>
```

## 8. Performance Considerations

### Lazy Loading

```tsx
// Use dynamic imports for performance
import dynamic from "next/dynamic";

const BackgroundBeamsWithCollision = dynamic(
  () =>
    import("@/components/ui/background-beams-with-collision").then((mod) => ({
      default: mod.BackgroundBeamsWithCollision,
    })),
  { ssr: false }
);
```

### Viewport-Based Loading

```tsx
// Only load when section is in viewport
import { useInView } from "motion/react";

const SectionWithBeams = () => {
  const { ref, inView } = useInView({ once: true });

  return (
    <section ref={ref}>
      {inView && (
        <BackgroundBeamsWithCollision className="h-64">
          {/* Content */}
        </BackgroundBeamsWithCollision>
      )}
    </section>
  );
};
```

## 9. Implementation Priority

1. **High Priority**: Landing page hero, dashboard heroes
2. **Medium Priority**: About sections, feature showcases
3. **Low Priority**: Modals, loading states

## 10. Testing Checklist

- [ ] Mobile responsiveness across all implementations
- [ ] Performance impact on slower devices
- [ ] Accessibility compliance
- [ ] Animation preferences (prefers-reduced-motion)
- [ ] Cross-browser compatibility

This comprehensive integration will create a cohesive, visually stunning experience across the entire VeriCrop platform while maintaining performance and accessibility standards.
