"use client";

import Nav from "@/components/Nav";

interface Props {
  params: { batchId: string };
}

export default function BatchPage({ params }: Props) {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Batch: {params.batchId}</h1>
        <p className="mt-2">Provenance, quality reports, and custody timeline will be shown here. On-chain verification comes from backend/blockchain layer.</p>
      </main>
    </div>
  );
}
