"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication (replace with your actual auth logic)
    if (email && password) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set login state
      localStorage.setItem('vericrop_logged_in', 'true');
      localStorage.setItem('vericrop_user_email', email);
      
      router.push('/dashboard');
    }
    
    setIsLoading(false);
  };

  const handleDevLogin = () => {
    localStorage.setItem('vericrop_logged_in', 'true');
    localStorage.setItem('vericrop_user_email', 'dev@vericrop.com');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 dark:from-emerald-950 dark:via-green-950 dark:to-lime-950 flex items-center justify-center p-6 relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent dark:from-emerald-400 dark:to-green-300" style={{ fontFamily: 'var(--font-libre-baskerville)' }}>
              VeriCrop
            </h1>
            <p className="text-2xl text-emerald-600 dark:text-emerald-400 font-semibold">
              Sustainable Farming Solutions
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Trust from seed to shelf. We ensure top-quality and rigor in every step in our process, delivering nature's best.
            </p>
          </div>
          
          {/* Banner image */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-2xl blur-xl"></div>
            <Image
              src="/Banner.png"
              alt="VeriCrop Banner"
              width={400}
              height={200}
              className="relative rounded-2xl shadow-2xl border border-white/20"
            />
          </div>
        </div>

        {/* Right side - Login form */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative">
            <CardHeader className="space-y-3 text-center pb-6">
              <div className="relative">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300" style={{ fontFamily: 'var(--font-libre-baskerville)' }}>
                  Welcome Back
                </CardTitle>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-lg blur-lg -z-10"></div>
              </div>
              <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
                Sign in to your VeriCrop account
              </CardDescription>
            </CardHeader>
          
          <CardContent className="space-y-6 p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@vericrop.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-xl transition-all duration-200"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-xl transition-all duration-200"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                size="lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <div className="w-0 group-hover:w-4 transition-all duration-200 overflow-hidden">
                        <span className="ml-1">→</span>
                      </div>
                    </>
                  )}
                </div>
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-slate-900 px-4 text-slate-500 dark:text-slate-400 font-medium">or</span>
              </div>
            </div>
            
            <Button 
              onClick={handleDevLogin}
              variant="outline" 
              className="w-full h-12 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/50 dark:hover:border-emerald-700 rounded-xl transition-all duration-200 font-medium"
              size="lg"
            >
              Continue to Dashboard (dev)
            </Button>
            
            <div className="text-center text-sm text-slate-600 dark:text-slate-400 pt-4">
              Don't have an account?{" "}
              <span className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer font-semibold transition-colors">
                Sign up
              </span>
            </div>
          </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
