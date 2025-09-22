"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

// Icons
import { Cpu, Database, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import { Leaf, Truck, ShoppingCart } from "lucide-react";

// Local background image
import drone from "./drone-field.jpg";
import logo from "./image.png";

export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      duration: string;
      delay: string;
    }>
  >([]);
  const [floatingElements, setFloatingElements] = useState<
    Array<{
      left: string;
      top: string;
      animation: string;
    }>
  >([]);

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add("dark");

    // Generate particles on client side to avoid hydration mismatch
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          duration: `${3 + Math.random() * 4}s`,
          delay: `${Math.random() * 10}s`,
        });
      }
      setParticles(newParticles);
    };

    // Generate floating elements for hero section
    const generateFloatingElements = () => {
      const newElements = [];
      for (let i = 0; i < 20; i++) {
        newElements.push({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `pulse ${2 + Math.random() * 3}s infinite ease-in-out`,
        });
      }
      setFloatingElements(newElements);
    };

    generateParticles();
    generateFloatingElements();
    setMounted(true);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-slate-100 overflow-x-hidden">
      {/* Fixed Background Image for Whole Page */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/parallex.png"
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-green-900/60 to-emerald-900/70"></div>
      </div>
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
        </div>
        {mounted &&
          particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
                animation: `float ${particle.duration} ${particle.delay} infinite ease-in-out`,
              }}
            />
          ))}
      </div>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-emerald-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <Image
                src={logo}
                alt="VeriCrop Logo"
                width={40}
                height={40}
                className="transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent hover:from-emerald-300 hover:to-blue-300 transition-all duration-300">
              VeriCrop
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8 text-lg font-medium">
            <Link
              href="#features"
              className="relative hover:text-emerald-400 transition-all duration-300 group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#about"
              className="relative hover:text-emerald-400 transition-all duration-300 group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#contact"
              className="relative hover:text-emerald-400 transition-all duration-300 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transform transition-all duration-300 font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-3 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/10 hover:border-emerald-400 hover:scale-105 transform transition-all duration-300 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transform transition-all duration-300 font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden z-20">
        {/* Floating elements for depth */}
        <div className="absolute inset-0 z-10">
          {mounted &&
            floatingElements.map((element, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400/30 rounded-full blur-sm"
                style={{
                  left: element.left,
                  top: element.top,
                  transform: `translateY(${
                    scrollY * (0.05 + (i % 3) * 0.03)
                  }px)`,
                  animation: element.animation,
                }}
              />
            ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
                Blockchain Traceability
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-500 bg-clip-text text-transparent">
                from Seed to Shelf
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            VeriCrop harnesses{" "}
            <span className="text-emerald-400 font-semibold">virtual IoT</span>,
            <span className="text-blue-400 font-semibold">
              {" "}
              blockchain oracles
            </span>
            , and
            <span className="text-emerald-400 font-semibold">
              {" "}
              AI verification
            </span>{" "}
            to bring unparalleled transparency and trust to your agricultural
            supply chain.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link
              href="/get-started"
              className="group relative px-10 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transform transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Get Started Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>

            <Link
              href="#features"
              className="group px-10 py-4 border-2 border-emerald-400/50 text-emerald-300 text-lg font-semibold rounded-xl hover:bg-emerald-400/10 hover:border-emerald-400 hover:scale-105 transform transition-all duration-300"
            >
              Learn More
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      {/* Core Technologies */}
      <section
        id="features"
        className="relative py-32 px-8 text-center overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        {/* Background with parallax */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-emerald-900 opacity-50"></div>

        <div className="relative max-w-7xl mx-auto space-y-20">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Our Core Technologies
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto rounded-full"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover how VeriCrop leverages cutting-edge technology to build a
              transparent and efficient agricultural ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Virtual IoT",
                desc: "Real-time data from IoT devices provides monitoring of environmental conditions with unprecedented accuracy.",
                icon: (
                  <Cpu className="w-16 h-16 text-emerald-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                ),
                gradient: "from-emerald-500/20 to-green-500/20",
                hoverGradient:
                  "group-hover:from-emerald-500/30 group-hover:to-green-500/30",
              },
              {
                title: "Blockchain Oracles",
                desc: "Secured and verifiable data feeds from oracles into the blockchain for trusted, immutable records.",
                icon: (
                  <Database className="w-16 h-16 text-blue-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                ),
                gradient: "from-blue-500/20 to-cyan-500/20",
                hoverGradient:
                  "group-hover:from-blue-500/30 group-hover:to-cyan-500/30",
              },
              {
                title: "AI Verification",
                desc: "Advanced AI ensures quality assurance, detects fraud, and protects supply chain integrity with machine learning.",
                icon: (
                  <ShieldCheck className="w-16 h-16 text-purple-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                ),
                gradient: "from-purple-500/20 to-pink-500/20",
                hoverGradient:
                  "group-hover:from-purple-500/30 group-hover:to-pink-500/30",
              },
            ].map((tech, idx) => (
              <div
                key={idx}
                className={`group relative p-10 bg-gradient-to-br ${tech.gradient} ${tech.hoverGradient} backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transform transition-all duration-500 flex flex-col items-center text-center space-y-6 overflow-hidden`}
              >
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon container with glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-4 bg-slate-800/50 rounded-2xl border border-white/10">
                    {tech.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white relative z-10">
                  {tech.title}
                </h3>
                <p className="text-slate-300 leading-relaxed relative z-10">
                  {tech.desc}
                </p>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        className="relative py-32 px-8 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.03}px)`,
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-900/50 to-slate-800/30"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src={drone}
                alt="Drone in field"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  About VeriCrop
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
            </div>

            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                Founded on the principles of{" "}
                <span className="text-emerald-400 font-semibold">
                  transparency
                </span>{" "}
                and
                <span className="text-blue-400 font-semibold">
                  {" "}
                  sustainability
                </span>
                , VeriCrop provides a robust platform that connects farmers,
                distributors, retailers, inspectors, and consumers. We believe
                in a future where every product&apos;s journey is clear, verifiable,
                and contributes to a more honest marketplace.
              </p>
              <p>
                Our cutting-edge{" "}
                <span className="text-emerald-400 font-semibold">
                  blockchain technology
                </span>{" "}
                ensures that critical data—from planting to harvest, processing
                to sale—is immutably recorded and easily accessible. This not
                only prevents fraud and ensures compliance but also empowers
                consumers to make informed choices, fostering a healthier, more
                responsible food ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-2xl border border-emerald-500/20">
                <div className="text-2xl font-bold text-emerald-400">1000+</div>
                <div className="text-slate-400">Verified Farms</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">50M+</div>
                <div className="text-slate-400">Products Tracked</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section
        className="relative py-32 px-8 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.02}px)`,
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-800"></div>

        <div className="relative max-w-7xl mx-auto text-center space-y-20">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                What Our Users Say
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto rounded-full"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              VeriCrop has transformed the agricultural supply chain for our
              users. Here&apos;s what they have to say:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "John Farmer",
                role: "Organic Farmer",
                quote:
                  "VeriCrop helped us track crops in real-time. The IoT monitoring and blockchain verification made our supply chain transparent and trustworthy.",
                icon: <Leaf className="w-16 h-16 text-emerald-400" />,
                gradient: "from-emerald-500/20 to-green-500/20",
                avatar: "JF",
              },
              {
                name: "Sophia Distributor",
                role: "Supply Chain Manager",
                quote:
                  "Blockchain oracles reduced logistics errors by 30% and improved compliance. VeriCrop is a game-changer for our operations.",
                icon: <Truck className="w-16 h-16 text-blue-400" />,
                gradient: "from-blue-500/20 to-cyan-500/20",
                avatar: "SD",
              },
              {
                name: "Liam Retailer",
                role: "Retail Chain Owner",
                quote:
                  "With AI verification, we can guarantee product quality and authenticity to our customers. VeriCrop brings transparency to our shelves.",
                icon: <ShoppingCart className="w-16 h-16 text-purple-400" />,
                gradient: "from-purple-500/20 to-pink-500/20",
                avatar: "LR",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className={`group relative p-8 bg-gradient-to-br ${testimonial.gradient} backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transform transition-all duration-500 space-y-6 overflow-hidden`}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-4 bg-slate-800/50 rounded-2xl border border-white/10 w-fit mx-auto">
                    {testimonial.icon}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-slate-300 text-lg italic leading-relaxed relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* User info */}
                <div className="flex items-center justify-center space-x-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex justify-center space-x-1 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400">
                      ⭐
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-32 px-8 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.01}px)`,
        }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-900 to-slate-800"></div>

        <div className="relative max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto rounded-full"></div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Have questions or want to learn more about VeriCrop? Contact us
              today and let&apos;s revolutionize agriculture together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: "Phone",
                value: "+1 (555) 123-4567",
                icon: <Phone className="w-8 h-8 text-emerald-400" />,
                gradient: "from-emerald-500/20 to-green-500/20",
              },
              {
                label: "Email",
                value: "info@vericrop.com",
                icon: <Mail className="w-8 h-8 text-blue-400" />,
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
              {
                label: "Address",
                value: "123 Agri-Tech Lane, Green Valley, USA",
                icon: <MapPin className="w-8 h-8 text-purple-400" />,
                gradient: "from-purple-500/20 to-pink-500/20",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`group p-8 bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transform transition-all duration-500 space-y-4 overflow-hidden`}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative p-4 bg-slate-800/50 rounded-2xl border border-white/10 w-fit mx-auto">
                    {item.icon}
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="font-semibold text-xl text-white">
                    {item.label}
                  </p>
                  <p className="text-slate-300 mt-2">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/contact-form"
            className="group relative inline-block px-12 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transform transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Send Us a Message</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-emerald-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative py-16 px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src={logo}
                  alt="VeriCrop Logo"
                  width={40}
                  height={40}
                  className="drop-shadow-lg"
                />
                <span className="font-bold text-2xl bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  VeriCrop
                </span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                Revolutionizing agriculture through blockchain technology, IoT
                monitoring, and AI verification for complete supply chain
                transparency.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                  <div
                    key={social}
                    className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-emerald-500/20 transition-colors cursor-pointer"
                  >
                    <span className="text-slate-400 hover:text-emerald-400 transition-colors">
                      {social[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <div className="space-y-2">
                {["Features", "About Us", "Contact", "Pricing"].map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="block text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Legal</h3>
              <div className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (link) => (
                    <Link
                      key={link}
                      href="#"
                      className="block text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {link}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400">
              &copy; 2025 VeriCrop. All rights reserved. Built with ❤️ for
              sustainable agriculture.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-slate-500 text-sm">Made with</span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">Next.js</span>
                <span className="text-slate-500">•</span>
                <span className="text-blue-400">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
