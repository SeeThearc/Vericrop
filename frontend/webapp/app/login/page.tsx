"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/authSlice";
import { Eye, EyeOff, Leaf, Sprout, Sparkles, Shield } from "lucide-react";
import { Boxes } from "@/components/shadcn/ui/shadcn-io/background-boxes";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [referrerUrl, setReferrerUrl] = useState<string>("");

  useEffect(() => {
    const referrer =
      searchParams.get("referrer") ||
      localStorage.getItem("login_referrer") ||
      "/dashboard";
    setReferrerUrl(referrer);
    localStorage.setItem("login_referrer", referrer);
  }, [searchParams]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const referrer = encodeURIComponent(referrerUrl);
    window.location.href = `http://localhost:3000/signin/google?referrer=${referrer}`;
  };

  const handleDevLogin = () => {
    const userData = {
      email: "dev@vericrop.com",
      name: "Dev User",
      role: "farmer",
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("vericrop_logged_in", "true");
    localStorage.setItem("vericrop_user_email", "dev@vericrop.com");
    localStorage.setItem("vericrop_user_role", "farmer");
    dispatch(setUser(userData));
    router.push(referrerUrl);
  };

  return (
    <div
      className={cn(
        "min-h-screen relative w-full overflow-hidden",
        "bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900"
      )}
    >
      {/* Background Boxes */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Boxes />
        {/* Radial gradient mask for smoother blending */}
        <div
          className={cn(
            "absolute inset-0 bg-emerald-950/90 dark:bg-slate-950/90",
            "[mask-image:radial-gradient(circle,transparent_10%,white_90%)] pointer-events-none"
          )}
        />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Branding */}
          <div className="space-y-8 text-center lg:text-left relative">
            <div className="relative p-12 bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/20 shadow-2xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative space-y-8">
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Leaf className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h1
                    className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-800 dark:from-emerald-300 dark:via-green-300 dark:to-emerald-400 bg-clip-text text-transparent"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                  >
                    VeriCrop
                  </h1>
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                    Sustainable Farming Solutions
                  </h2>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-lg leading-relaxed">
                    Trust from seed to shelf. We ensure top-quality and rigor in
                    every step of our process, delivering nature&apos;s best to your
                    table.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex items-center space-x-3 p-4 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-2xl backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/30">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Carbon Neutral</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">100% Green</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-green-100/50 dark:bg-green-900/20 rounded-2xl backdrop-blur-sm border border-green-200/50 dark:border-green-700/30">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-green-700 dark:text-green-300">Certified Organic</div>
                      <div className="text-xs text-green-600 dark:text-green-400">Trusted Quality</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="w-full max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
              <Card className="relative shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white/10 to-green-50/50 dark:from-emerald-950/30 dark:via-slate-900/10 dark:to-green-950/30"></div>
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-green-500/20 animate-pulse"></div>
                </div>
                <div className="relative z-10">
                  <CardHeader className="space-y-6 text-center pb-8 pt-10">
                    <div className="mx-auto relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <Leaf className="w-10 h-10 text-white drop-shadow-lg" />
                      </div>
                      <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 animate-ping"></div>
                    </div>
                    <div>
                      <CardTitle
                        className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent mb-3"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                      >
                        Welcome Back
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                        Sign in to your VeriCrop account
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8 px-10 pb-10">
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                          Sign in with your Google account to access VeriCrop
                        </p>
                      </div>

                      <Button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full h-16 bg-white hover:bg-gray-50 text-gray-900 font-semibold text-lg rounded-2xl shadow-2xl border-2 border-gray-200 hover:shadow-gray-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-gray-50/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative flex items-center justify-center gap-3">
                          {isLoading ? (
                            <>
                              <div className="w-6 h-6 border-3 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
                              <span>Signing you in...</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.92H12V14.45H18.02C17.73 15.89 16.93 17.13 15.73 17.92V20.59H19.62C21.55 18.83 22.56 15.83 22.56 12.25Z"
                                  fill="#4285F4"
                                />
                                <path
                                  d="M12 23C14.97 23 17.45 22.04 19.28 20.59L15.73 17.92C14.74 18.59 13.45 19 12 19C9.27 19 6.94 17.24 6.02 14.81H2.03V17.5C3.86 20.73 7.63 23 12 23Z"
                                  fill="#34A853"
                                />
                                <path
                                  d="M6.02 14.81C5.79 14.12 5.66 13.38 5.66 12.6C5.66 11.82 5.79 11.08 6.02 10.39V7.7H2.03C1.24 9.23 0.75 10.86 0.75 12.6C0.75 14.34 1.24 15.97 2.03 17.5L6.02 14.81Z"
                                  fill="#FBBC05"
                                />
                                <path
                                  d="M12 5.5C13.59 5.5 15.01 6.08 16.13 7.13L19.35 3.9C17.45 2.18 14.97 1 12 1C7.63 1 3.86 3.27 2.03 6.5L6.02 9.19C6.94 6.76 9.27 5.5 12 5.5Z"
                                  fill="#EA4335"
                                />
                              </svg>
                              <span>Sign in with Google</span>
                            </>
                          )}
                        </div>
                      </Button>

                      <div className="text-center pt-4">
                        <button
                          onClick={handleDevLogin}
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm transition-all duration-200 px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          Developer Login
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
