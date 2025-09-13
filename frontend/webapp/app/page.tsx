"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import ThemeToggle from "@/components/ThemeToggle";

// Icons
import { Cpu, Database, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import { Leaf, Truck, ShoppingCart } from "lucide-react";

// Local background image
import field from "./field.jpg";
import drone from "./drone-field.jpg";
import logo from "./image.png";

export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 group">
            <Image
              src={logo}
              alt="VeriCrop Logo"
              width={32}
              height={32}
              className="transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="font-bold text-xl text-emerald-600 hover:text-emerald-700 transition-colors">
              VeriCrop
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 text-lg font-medium">
            <Link
              href="#features"
              className="hover:text-emerald-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="hover:text-emerald-600 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="#contact"
              className="hover:text-emerald-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-emerald-600 text-white rounded shadow hover:shadow-lg hover:scale-105 transform transition-all duration-300"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-slate-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 transform transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-emerald-600 text-white rounded shadow hover:shadow-lg hover:scale-105 transform transition-all duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-emerald-50 dark:bg-emerald-950 py-24 text-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={field}
            alt="Field"
            fill
            className="object-cover opacity-30 dark:opacity-20"
          />
        </div>
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
            Blockchain Traceability <br />
            <span className="text-emerald-600">from Seed to Shelf</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 drop-shadow-sm">
            VeriCrop harnesses virtual IoT, blockchain oracles, and AI
            verification to bring unparalleled transparency and trust to your
            agricultural supply chain.
          </p>
          <Link
            href="/get-started"
            className="inline-block px-8 py-4 bg-emerald-600 text-white text-lg rounded shadow hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Core Technologies */}
      <section
        id="features"
        className="relative py-24 px-8 text-center text-white"
      >
        {/* Background overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto space-y-16">
          <div>
            <h2 className="text-4xl font-bold drop-shadow-lg">
              Our Core Technologies
            </h2>
            <p className="text-lg text-slate-300 mt-4 drop-shadow-sm">
              Discover how VeriCrop leverages cutting-edge technology to build a
              transparent and efficient agricultural ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Virtual IoT",
                desc: "Real-time data from IoT devices provides monitoring of environmental conditions.",
                icon: (
                  <Cpu className="w-12 h-12 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                ),
              },
              {
                title: "Blockchain Oracles",
                desc: "Secured and verifiable data feeds from oracles into the blockchain for trusted records.",
                icon: (
                  <Database className="w-12 h-12 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                ),
              },
              {
                title: "AI Verification",
                desc: "Advanced AI ensures quality assurance, detects fraud, and protects supply chain integrity.",
                icon: (
                  <ShieldCheck className="w-12 h-12 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                ),
              },
            ].map((tech, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform transition-all duration-300 flex flex-col items-center text-center space-y-4"
              >
                {tech.icon}
                <h3 className="text-xl font-semibold">{tech.title}</h3>
                <p className="text-slate-300">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-8 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Image
            src={drone}
            alt="Drone in field"
            width={600}
            height={400}
            className="rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
          />
          <div className="space-y-6">
            <p>
              Founded on the principles of transparency and sustainability,
              VeriCrop provides a robust platform that connects farmers,
              distributors, retailers, inspectors, and consumers. We believe in
              a future where every product's journey is clear, verifiable, and
              contributes to a more honest marketplace.
            </p>
            <p>
              Our cutting-edge blockchain technology ensures that critical
              data—from planting to harvest, processing to sale—is immutably
              recorded and easily accessible. This not only prevents fraud and
              ensures compliance but also empowers consumers to make informed
              choices, fostering a healthier, more responsible food ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white">
              What Our Users Say
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
              VeriCrop has transformed the agricultural supply chain for our
              users. Here’s what they have to say:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Farmer",
                role: "Farmer",
                quote:
                  "VeriCrop helped us track crops in real-time. The IoT monitoring and blockchain verification made our supply chain transparent and trustworthy.",
                icon: <Leaf className="w-12 h-12 text-emerald-500" />,
              },
              {
                name: "Sophia Distributor",
                role: "Distributor",
                quote:
                  "Blockchain oracles reduced logistics errors by 30% and improved compliance. VeriCrop is a game-changer for our operations.",
                icon: <Truck className="w-12 h-12 text-emerald-500" />,
              },
              {
                name: "Liam Retailer",
                role: "Retailer",
                quote:
                  "With AI verification, we can guarantee product quality and authenticity to our customers. VeriCrop brings transparency to our shelves.",
                icon: <ShoppingCart className="w-12 h-12 text-emerald-500" />,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-emerald-50 dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              >
                <div className="p-4 bg-white dark:bg-slate-900 rounded-full shadow-md">
                  {testimonial.icon}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-center italic">
                  "{testimonial.quote}"
                </p>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {testimonial.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-8 bg-emerald-50 dark:bg-slate-800"
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-3xl font-bold">Get In Touch</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Have questions or want to learn more about VeriCrop? Contact us
              today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Phone",
                value: "+1 (555) 123-4567",
                icon: <Phone className="w-6 h-6 text-emerald-600" />,
              },
              {
                label: "Email",
                value: "info@vericrop.com",
                icon: <Mail className="w-6 h-6 text-emerald-600" />,
              },
              {
                label: "Address",
                value: "123 Agri-Tech Lane, Green Valley, USA",
                icon: <MapPin className="w-6 h-6 text-emerald-600" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex flex-col items-center space-y-2"
              >
                {item.icon}
                <p className="font-medium">{item.label}</p>
                <p className="text-slate-600 dark:text-slate-300">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/contact-form"
            className="inline-block px-8 py-3 bg-emerald-600 text-white rounded shadow hover:shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Send Us a Message
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; 2025 VeriCrop. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="#contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
