"use client";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Login / Register</h1>
      <p className="mt-4">This is a skeleton login page. Auth will be implemented in the backend.</p>
      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 border rounded">Sign in</button>
        <Link href="/dashboard" className="px-4 py-2 border rounded">Continue to Dashboard (dev)</Link>
      </div>
    </div>
  );
}
