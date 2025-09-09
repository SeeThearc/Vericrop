"use client";
import Nav from "../../components/Nav";

export default function ScanPage() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">QR Scanner</h1>
        <p className="mt-2">Mobile-first QR scanner UI placeholder. Scanning and verification logic lives in backend/blockchain services.</p>
      </main>
    </div>
  );
}
