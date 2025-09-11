"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./components/ThemeToggle";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const { isLoggedIn } = useAppSelector(state => state.auth);

  useEffect(() => {
    // Check login status from Redux state
    // The Redux state will be initialized from localStorage or other persistent storage
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 dark:from-slate-900 dark:via-emerald-950 dark:to-green-950">
      {/* Header */}
      <header className="w-full py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span 
              className="font-bold text-2xl text-slate-800 dark:text-slate-100"
              style={{ fontFamily: 'var(--font-libre-baskerville)' }}
            >
              VeriCrop
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">Features</a>
              <a href="#about" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">About</a>
              <a href="#contact" className="text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">Contact</a>
            </nav>
            
            <ThemeToggle />
            
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                Sustainable Farming
                <span className="block text-emerald-600 dark:text-emerald-400">Made Simple</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Trust from seed to shelf. We ensure top-quality in every step of our process, delivering nature&apos;s best with cutting-edge technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isLoggedIn ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
                    Get Started
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 px-8 py-4 text-lg">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">500+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">10K+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">99.9%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Quality</div>
              </div>
            </div>
          </div>

          {/* Right Content - Banner */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              <Image
                src="/Banner.png"
                alt="VeriCrop Banner"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-2xl blur-xl -z-10"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute top-8 -left-8 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 text-sm">✓</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">Verified</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Blockchain</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 -right-8 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm">📊</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">Analytics</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Real-time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Why Choose VeriCrop?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Advanced technology meets sustainable farming practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Sustainable</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Eco-friendly farming practices that protect our planet while maximizing yield
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Verified</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Blockchain traceability ensures complete transparency from seed to consumer
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Real-time insights and data-driven decisions for optimal farming results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of farmers who trust VeriCrop for sustainable, verified agriculture
          </p>
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg">
                Access Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg">
                Start Your Journey
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="font-bold text-xl">VeriCrop</span>
              </div>
              <p className="text-slate-400">
                Sustainable farming solutions for the future
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 VeriCrop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
