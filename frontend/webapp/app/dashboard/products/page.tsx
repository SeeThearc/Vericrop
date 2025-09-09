"use client";
import Link from "next/link";
import Nav from "../../components/Nav";

export default function ProductsPage() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">My Products / Batches</h1>
        <p className="mt-2">List of products will appear here. Backend will provide data via API.</p>
        <ul className="mt-4 list-disc pl-6">
          <li><Link href="/dashboard/products/example-batch">Example Batch (skeleton)</Link></li>
        </ul>
      </main>
    </div>
  );
}
