"use client";
import Nav from "../../components/Nav";

export default function SettingsPage() {
  return (
    <div>
      <Nav />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-2">Profile, identity verification, device and key management settings. Backend implements identity verification and key rotation.</p>
      </main>
    </div>
  );
}
