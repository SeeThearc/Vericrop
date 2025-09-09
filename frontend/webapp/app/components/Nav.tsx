"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="w-full border-b py-4 px-6 flex gap-4 items-center">
      <Link href="/" className="font-semibold mr-4">AgriTrace Pro</Link>
      <Link href="/dashboard" className="text-sm nav-link">Dashboard</Link>
      <Link href="/dashboard/products" className="text-sm nav-link">Products</Link>
      <Link href="/dashboard/scan" className="text-sm nav-link">Scan</Link>
      <Link href="/consumer" className="text-sm nav-link">Consumer Portal</Link>
      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />
        <Link href="/login" className="text-sm">Login</Link>
      </div>
    </nav>
  );
}
