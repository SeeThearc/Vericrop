"use client";

import Nav from "@/components/Nav";

export default function AlertsPage() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Alerts</h1>
        <p className="mt-2">Exploitation and fraud alerts will be surfaced here. Alerting engine is part of backend services.</p>
      </main>
    </div>
  );
}
