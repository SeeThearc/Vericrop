"use client";

import Nav from "@/components/Nav";

export default function TransactionsPage() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="mt-2">
          Transaction history and dispute initiation UI. Actual transaction
          verification is handled by smart contracts and backend services.
        </p>
      </main>
    </div>
  );
}
