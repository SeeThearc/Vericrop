"use client";
import Link from "next/link";
import Nav from "../components/Nav";
import { Sidebar } from "@/app/consumer/_components/sidebar";
import { Topbar } from "./_components/topbar";
import { Footer } from "./_components/footer";
import { WelcomeBanner } from "./_components/welcome-banner";
import { FilterProducts } from "./_components/filter-products";
import { FeaturedProducts } from "./_components/featured-products";

export default function ConsumerPage() {
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col ml-64">
        <Topbar />
        <div className="flex-grow pt-20 p-6 space-y-6">
          <WelcomeBanner />
          <div className="flex space-x-6">
            <FilterProducts />
            <FeaturedProducts />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
