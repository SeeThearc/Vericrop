"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Sun, Moon } from "lucide-react"; // import icons

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemTheme =
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);

    // Apply the theme
    document.documentElement.setAttribute("data-theme", initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update both data-theme and class for compatibility
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        aria-label="Toggle theme"
        className="border-[#B6E388] text-[#4E3629] hover:bg-[#B6E388] hover:text-[#1A4D2E] transition-colors"
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="border-[#B6E388] text-[#4E3629] hover:bg-[#B6E388] hover:text-[#1A4D2E] transition-colors dark:border-[#B6E388] dark:text-[#B6E388] dark:hover:bg-[#B6E388] dark:hover:text-[#1A4D2E]"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}

