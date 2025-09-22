"use client";

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-xl border-t border-white/20 text-white">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6 text-sm text-white/70">
            <Link
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Product
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Resources
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Company
            </Link>
          </div>
          <div className="flex space-x-4 text-white/70">
            <Link
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
