"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/authSlice";
import {  Sprout, Sparkles, Shield } from "lucide-react";
import { Boxes } from "@/components/shadcn/ui/shadcn-io/background-boxes";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [referrerUrl, setReferrerUrl] = useState<string>("");

  const handleDevLogin = useCallback(() => {
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
  }, [dispatch, router, referrerUrl]);

  useEffect(() => {
    const referrer =
      searchParams.get("referrer") ||
      localStorage.getItem("login_referrer") ||
      "/dashboard";
    setReferrerUrl(referrer);
    localStorage.setItem("login_referrer", referrer);
    handleDevLogin();
  }, [searchParams, handleDevLogin]);

  return (
    <div
      className={cn(
        "min-h-screen relative w-full overflow-hidden",
        "bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50"
      )}
    >
      {/* Background Boxes */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Boxes />
        {/* Radial gradient mask for smoother blending */}
        <div
          className={cn(
            "absolute inset-0 bg-emerald-950/90 z-10",
            "[mask-image:radial-gradient(circle,transparent_10%,white_90%)] pointer-events-none"
          )}
        />
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-20">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Branding */}
          <div className="space-y-8 text-center lg:text-left relative">
            <div className="relative p-12 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative space-y-8">
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 overflow-hidden">
                      <Image
                        src="/original_logo.png"
                        alt="VeriCrop Logo"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h1
                    className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800 bg-clip-text text-transparent"
                    style={{ fontFamily: "Epunda Slab" }}
                  >
                    VeriCrop
                  </h1>
                </div>
                <div className="space-y-6">
                  <h2
                    className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent"
                    style={{ fontFamily: "Epunda Slab" }}
                  >
                    Sustainable Farming Solutions
                  </h2>
                  <p className="text-xl text-slate-700 max-w-lg leading-relaxed">
                    Trust from seed to shelf. We ensure top-quality in every
                    step of our process, delivering nature&apos;s best to your
                    table.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex items-center space-x-3 p-4 bg-emerald-100/50 rounded-2xl backdrop-blur-sm border border-emerald-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-emerald-700">
                        Carbon Neutral
                      </div>
                      <div className="text-xs text-emerald-600">100% Green</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-green-100/50 rounded-2xl backdrop-blur-sm border border-green-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-green-700">
                        Certified Organic
                      </div>
                      <div className="text-xs text-green-600">
                        Trusted Quality
                      </div>
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
              <Card className="relative shadow-2xl border-0 bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white/10 to-green-50/50"></div>
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-green-500/20 animate-pulse"></div>
                </div>
                <div className="relative z-10">
                  <CardHeader className="space-y-6 text-center pb-8 pt-10">
                    <div className="mx-auto relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                        <Image
                          src="/original_logo.png"
                          alt="VeriCrop Logo"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-3xl"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 animate-ping pointer-events-none"></div>
                    </div>
                    <div>
                      <CardTitle
                        className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-3"
                        style={{ fontFamily: "var(--font-libre-baskerville)" }}
                      >
                        Welcome Back
                      </CardTitle>
                      <CardDescription className="text-slate-600 text-lg font-medium">
                        Sign in to your VeriCrop account
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8 px-10 pb-10">
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-slate-600 mb-6">
                          Sign in with your Google account to access VeriCrop
                        </p>
                      </div>

                      <div className="text-center pt-4">
                        <button
                          onClick={handleDevLogin}
                          className="text-slate-500 hover:text-slate-600 text-sm transition-all duration-200 px-3 py-1 rounded-lg hover:bg-slate-100"
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
