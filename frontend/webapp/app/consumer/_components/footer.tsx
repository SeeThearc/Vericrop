"use client";

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-300 text-black">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6 text-sm text-gray-600">
            <Link href="#" className="hover:text-green-600">Product</Link>
            <Link href="#" className="hover:text-green-600">Resources</Link>
            <Link href="#" className="hover:text-green-600">Company</Link>
          </div>
          <div className="flex space-x-4 text-gray-500">
            <Link href="#" className="hover:text-green-600"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-green-600"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-green-600"><Linkedin className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-green-600"><Instagram className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
