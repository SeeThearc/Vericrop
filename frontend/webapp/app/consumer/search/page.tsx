"use client";
import Link from "next/link";
import Nav from "../../components/Nav";

export default function SearchPage() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Search Products</h1>
        <p className="mt-2">Product search UI placeholder. Backend provides search/indexing.</p>
        <ul className="mt-4 list-disc pl-6">
          <li><Link href="/consumer/product/example-batch">Example Batch</Link></li>
        </ul>
      </main>
    </div>
  );
}
