"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "../components/ThemeToggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/authSlice";
import { Eye, EyeOff, Leaf, Sprout } from "lucide-react";

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
    // Get referrer from URL parameters or localStorage
    const referrer =
      searchParams.get("referrer") ||
      localStorage.getItem("login_referrer") ||
      "/dashboard";
    setReferrerUrl(referrer);

    // Store referrer for later use
    localStorage.setItem("login_referrer", referrer);
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication (replace with your actual auth logic)
    if (email && password && stakeholder) {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create user data object
      const userData = {
        email,
        stakeholder,
        name: email.split("@")[0], // Simple name derivation
        loginTime: new Date().toISOString(),
      };

      // Set login state
      localStorage.setItem("vericrop_logged_in", "true");
      localStorage.setItem("vericrop_user_email", email);
      localStorage.setItem("vericrop_stakeholder", stakeholder);

      dispatch(setUser(userData));

      // Redirect to referrer URL or dashboard
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 dark:from-slate-900 dark:via-emerald-950 dark:to-green-950">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 via-green-100/40 to-lime-100/60 dark:from-emerald-900/30 dark:via-green-900/20 dark:to-lime-900/30 animate-gradient-shift"></div>

        {/* Floating organic shapes */}
        <div className="absolute inset-0">
          {/* Large floating circles */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-800/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/4 right-20 w-80 h-80 bg-green-300/15 dark:bg-green-700/15 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-lime-200/25 dark:bg-lime-800/25 rounded-full blur-3xl animate-float-fast"></div>
          <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-emerald-300/20 dark:bg-emerald-700/20 rounded-full blur-3xl animate-float-slow-reverse"></div>

          {/* Medium floating elements */}
          <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-green-200/30 dark:bg-green-800/30 rounded-full blur-2xl animate-float-medium-reverse"></div>
          <div className="absolute top-3/4 right-1/3 w-40 h-40 bg-lime-300/25 dark:bg-lime-700/25 rounded-full blur-2xl animate-float-fast-reverse"></div>

          {/* Small accent elements */}
          <div className="absolute top-20 right-1/4 w-24 h-24 bg-emerald-400/20 dark:bg-emerald-600/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-20 w-32 h-32 bg-green-400/15 dark:bg-green-600/15 rounded-full blur-xl animate-pulse-medium"></div>
        </div>

        {/* Subtle wave pattern overlay */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="wave-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
                  fill="currentColor"
                  className="text-emerald-600 dark:text-emerald-400 animate-wave-flow"
                ></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)"></rect>
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-500/40 rounded-full animate-particle-1"></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-green-500/50 rounded-full animate-particle-2"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-lime-500/60 rounded-full animate-particle-3"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-emerald-400/30 rounded-full animate-particle-4"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400/40 rounded-full animate-particle-5"></div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="space-y-8 text-center lg:text-left relative">
          {/* Semi-transparent overlay for text readability */}
          <div className="absolute inset-0 bg-white/10 dark:bg-slate-900/20 rounded-3xl backdrop-blur-sm"></div>

          <div className="relative space-y-6 p-8">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1
                className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white"
                style={{ fontFamily: "var(--font-libre-baskerville)" }}
              >
                VeriCrop
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-semibold text-emerald-700 dark:text-emerald-300">
                Sustainable Farming Solutions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                Trust from seed to shelf. We ensure top-quality and rigor in
                every step of our process, delivering nature&apos;s best to your
                table.
              </p>
            </div>

            {/* Eco-friendly features */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                <Sprout className="w-5 h-5" />
                <span className="text-sm font-medium">Carbon Neutral</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                <Leaf className="w-5 h-5" />
                <span className="text-sm font-medium">Organic Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl relative overflow-hidden rounded-3xl">
            {/* Green highlight glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-lime-500/10 rounded-3xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl blur opacity-30"></div>

            <div className="relative">
              <CardHeader className="space-y-4 text-center pb-8 pt-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle
                    className="text-3xl font-bold text-slate-800 dark:text-white mb-2"
                    style={{ fontFamily: "var(--font-libre-baskerville)" }}
                  >
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 text-lg">
                    Sign in to your VeriCrop account
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-8">
                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 dark:text-slate-300 font-medium text-sm"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="farmer@vericrop.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20 dark:bg-slate-800 dark:text-slate-100 rounded-xl transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-slate-700 dark:text-slate-300 font-medium text-sm"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pr-12 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20 dark:bg-slate-800 dark:text-slate-100 rounded-xl transition-all duration-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Stakeholder Type */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="stakeholder"
                      className="text-slate-700 dark:text-slate-300 font-medium text-sm"
                    >
                      Stakeholder Type
                    </Label>
                    <Select value={stakeholder} onValueChange={setStakeholder}>
                      <SelectTrigger className="h-12 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20 dark:bg-slate-800 dark:text-slate-100 rounded-xl transition-all duration-200">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-xl rounded-xl">
                        <SelectItem
                          value="farmer"
                          className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 focus:bg-emerald-50 dark:focus:bg-emerald-950/50 cursor-pointer transition-colors rounded-lg"
                        >
                          🌾 Farmer
                        </SelectItem>
                        <SelectItem
                          value="reseller"
                          className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 focus:bg-emerald-50 dark:focus:bg-emerald-950/50 cursor-pointer transition-colors rounded-lg"
                        >
                          🛒 Reseller
                        </SelectItem>
                        <SelectItem
                          value="distributor"
                          className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 focus:bg-emerald-50 dark:focus:bg-emerald-950/50 cursor-pointer transition-colors rounded-lg"
                        >
                          🚛 Distributor
                        </SelectItem>
                        <SelectItem
                          value="consumer"
                          className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 focus:bg-emerald-50 dark:focus:bg-emerald-950/50 cursor-pointer transition-colors rounded-lg"
                        >
                          🛍️ Consumer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Redirecting to your dashboard...</span>
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

                {/* Secondary Links */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors">
                      Forgot Password?
                    </button>
                    <button
                      onClick={handleDevLogin}
                      className="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs transition-colors"
                    >
                      Developer Login
                    </button>
                  </div>

                  <div className="text-center text-slate-600 dark:text-slate-400">
                    Don&apos;t have an account?{" "}
                    <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors">
                      Sign up
                    </button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
