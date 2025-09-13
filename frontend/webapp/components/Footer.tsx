"use client";

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-700 text-black dark:text-white">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              Product
            </Link>
            <Link
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              Resources
            </Link>
            <Link
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              Company
            </Link>
          </div>
          <div className="flex space-x-4 text-gray-500 dark:text-gray-400">
            <Link
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
