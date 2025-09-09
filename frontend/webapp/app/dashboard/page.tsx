"use client";
import Link from "next/link";
import Nav from "../components/Nav";

export default function DashboardPage() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Unified Dashboard</h1>
        <p className="mt-2">Role-specific overview will be shown here.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/dashboard/products" className="p-4 border rounded">Products</Link>
          <Link href="/dashboard/scan" className="p-4 border rounded">Scan</Link>
          <Link href="/dashboard/transactions" className="p-4 border rounded">Transactions</Link>
        </div>
      </main>
    </div>
  );
}
