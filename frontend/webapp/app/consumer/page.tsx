"use client";
import Link from "next/link";
import Nav from "../components/Nav";

export default function ConsumerPage() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Consumer Portal</h1>
        <p className="mt-2">Search and scan products to view provenance and selective disclosures.</p>
        <div className="mt-4">
          <Link href="/consumer/search" className="underline">Search products</Link>
        </div>
      </main>
    </div>
  );
}
