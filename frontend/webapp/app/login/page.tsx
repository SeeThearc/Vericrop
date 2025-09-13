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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stakeholder, setStakeholder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [referrerUrl, setReferrerUrl] = useState<string>("");

  useEffect(() => {
    const referrer =
      searchParams.get("referrer") ||
      localStorage.getItem("login_referrer") ||
      "/dashboard";
    setReferrerUrl(referrer);
    localStorage.setItem("login_referrer", referrer);
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (email && password && stakeholder) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userData = {
        email,
        stakeholder,
        name: email.split("@")[0],
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("vericrop_logged_in", "true");
      localStorage.setItem("vericrop_user_email", email);
      localStorage.setItem("vericrop_stakeholder", stakeholder);
      dispatch(setUser(userData));
      router.push(referrerUrl);
    }
    setIsLoading(false);
  };

  const handleDevLogin = () => {
    const userData = {
      email: "dev@vericrop.com",
      stakeholder: "farmer",
      name: "Dev User",
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("vericrop_logged_in", "true");
    localStorage.setItem("vericrop_user_email", "dev@vericrop.com");
    localStorage.setItem("vericrop_stakeholder", "farmer");
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
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-3">
                        <Label
                          htmlFor="email"
                          className="text-slate-700 dark:text-slate-300 font-semibold text-sm"
                        >
                          Email Address
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            placeholder="farmer@vericrop.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-14 pl-4 pr-4 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:bg-slate-800/50 dark:text-slate-100 rounded-2xl transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                            required
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="password"
                          className="text-slate-700 dark:text-slate-300 font-semibold text-sm"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-14 pl-4 pr-14 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:bg-slate-800/50 dark:text-slate-100 rounded-2xl transition-all duration-300 font-medium"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label
                          htmlFor="stakeholder"
                          className="text-slate-700 dark:text-slate-300 font-semibold text-sm"
                        >
                          What brings you to VeriCrop?
                        </Label>
                        <Select value={stakeholder} onValueChange={setStakeholder}>
                          <SelectTrigger className="h-14 px-4 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:bg-slate-800/50 dark:text-slate-100 rounded-2xl transition-all duration-300 font-medium">
                            <SelectValue placeholder="👋 Tell us about yourself..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-2">
                            <SelectItem
                              value="farmer"
                              className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 focus:bg-emerald-50 dark:focus:bg-emerald-950/50 cursor-pointer transition-all duration-200 rounded-xl p-4 font-medium"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">🌾</span>
                                <div>
                                  <div className="font-semibold">Farmer</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">Growing sustainable crops</div>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="reseller"
                              className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 focus:bg-emerald-50 dark:focus:bg-emerald-950/50 cursor-pointer transition-all duration-200 rounded-xl p-4 font-medium"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">🛒</span>
                                <div>
                                  <div className="font-semibold">Reseller</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">Connecting farms to markets</div>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="distributor"
                              className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 focus:bg-emerald-50 dark:focus:bg-emerald-950/50 cursor-pointer transition-all duration-200 rounded-xl p-4 font-medium"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">🚛</span>
                                <div>
                                  <div className="font-semibold">Distributor</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">Moving products efficiently</div>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="consumer"
                              className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 focus:bg-emerald-50 dark:focus:bg-emerald-950/50 cursor-pointer transition-all duration-200 rounded-xl p-4 font-medium"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">🛍️</span>
                                <div>
                                  <div className="font-semibold">Consumer</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">Seeking quality products</div>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-16 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
                        <div className="relative flex items-center justify-center gap-3">
                          {isLoading ? (
                            <>
                              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Signing you in...</span>
                            </>
                          ) : (
                            <>
                              <span>Sign In to VeriCrop</span>
                              <div className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden">
                                <span className="text-xl">→</span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </form>
                    <div className="space-y-6 pt-4">
                      <div className="flex items-center justify-between">
                        <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-all duration-200 hover:underline decoration-2 underline-offset-4">
                          Forgot Password?
                        </button>
                        <button
                          onClick={handleDevLogin}
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm transition-all duration-200 px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          Developer Login
                        </button>
                      </div>
                      <div className="text-center">
                        <span className="text-slate-600 dark:text-slate-400">New to VeriCrop? </span>
                        <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold transition-all duration-200 hover:underline decoration-2 underline-offset-4">
                          Create your account →
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
