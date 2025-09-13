"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/shadcn/ui/button";
import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/shadcn/ui/dropdown-menu";
import { Bell, User, Settings, LogOut, Home, Package, Scan, BarChart3, Wifi, WifiOff } from "lucide-react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/authSlice";

const BACKEND = "http://localhost:3000";

export default function Nav() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const isDashboard = pathname.startsWith('/dashboard');
  const [userEmail, setUserEmail] = useState('');
  const [backendStatus, setBackendStatus] = useState<'connected' | 'disconnected' | 'loading'>('loading');

  useEffect(() => {
    // Load user email from Redux state
    if (user?.email) {
      setUserEmail(user.email);
    }

    // Check backend connection and refresh data
    checkBackendStatus();
  }, [user]);

  const checkBackendStatus = async () => {
    try {
      const res = await axios.get(`${BACKEND}/user`, { withCredentials: true });
      if (res.data && typeof res.data === 'object') {
        setBackendStatus('connected');
      } else {
        setBackendStatus('disconnected');
      }
    } catch {
      setBackendStatus('disconnected');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  const handleBackendLogin = () => {
    // Store current URL as referrer before redirecting
    const currentUrl = window.location.pathname + window.location.search;
    localStorage.setItem('login_referrer', currentUrl);

    // Pass referrer as query parameter to backend
    const params = new URLSearchParams({ referrer: currentUrl });
    window.location.href = `${BACKEND}/signin/google?${params.toString()}`;
  };

  const handleBackendLogout = async () => {
    try {
      await axios.post(`${BACKEND}/signout`, {}, { withCredentials: true });
      setBackendStatus('disconnected');

    } catch (err) {
      console.error('Backend logout error:', err);
    }
  };

  if (!isDashboard) {
    return null; // Don't show nav on non-dashboard pages
  }

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/products', label: 'Products', icon: Package },
    { href: '/dashboard/scan', label: 'Scan', icon: Scan },
    { href: '/dashboard/alerts', label: 'Alerts', icon: Bell },
    { href: '/dashboard/pricing', label: 'Pricing', icon: BarChart3 },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="w-full bg-white/90 backdrop-blur-xl border-b border-emerald-100 py-4 px-8 flex items-center justify-between shadow-lg dark:bg-slate-900/90 dark:border-slate-800">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg dark:text-white">V</span>
        </div>
        <span
          className="font-bold text-2xl bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent dark:from-emerald-400 dark:to-green-400"
          style={{ fontFamily: 'var(--font-libre-baskerville)' }}
        >
          VeriCrop
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${isActive
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300'
                }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-3 rounded-xl">
              <Bell size={20} className="text-slate-600 dark:text-slate-300" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-slate-800/20 dark:to-slate-900/5"></div>
            <DropdownMenuLabel className="relative p-4 bg-gradient-to-r from-emerald-50/80 to-green-50/80 dark:from-emerald-950/80 dark:to-green-950/80 border-b border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Bell size={16} className="text-white" />
                </div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Notifications</span>
              </div>
            </DropdownMenuLabel>
            <div className="relative p-2 space-y-1">
              <DropdownMenuItem className="p-3 rounded-xl cursor-pointer">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">New product batch ready</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">2m ago</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Batch #VC-2024-001 is now available for distribution</p>
                  <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full h-1">
                    <div className="bg-emerald-500 h-1 rounded-full w-3/4"></div>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 rounded-xl cursor-pointer">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Quality check completed</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">1h ago</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">All tests passed for organic certification</p>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 rounded-xl cursor-pointer">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Price update available</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">3h ago</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Market prices updated for this week</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">+2.3%</span>
                    <div className="w-8 h-1 bg-green-200 dark:bg-green-800 rounded-full">
                      <div className="bg-green-500 h-1 rounded-full w-6"></div>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <Avatar className="h-10 w-10 border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900 dark:to-green-900">
                <AvatarFallback className="bg-transparent">
                  <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72 p-0 border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl overflow-hidden" align="end" forceMount>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-slate-800/20 dark:to-slate-900/5"></div>
            <DropdownMenuLabel className="relative font-normal p-4 bg-gradient-to-r from-emerald-50/80 to-green-50/80 dark:from-emerald-950/80 dark:to-green-950/80 border-b border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900 dark:to-green-900">
                    <AvatarFallback className="bg-transparent">
                      <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold leading-none text-slate-900 dark:text-slate-100">John Doe</p>
                    <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                      {userEmail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${backendStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Backend: {backendStatus === 'connected' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <div className="relative p-2 space-y-1">
              <DropdownMenuItem className="p-3 rounded-xl cursor-pointer">
                <User className="mr-3 h-4 w-4 text-slate-500" />
                <span className="text-slate-900 dark:text-slate-100">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 rounded-xl cursor-pointer">
                <Settings className="mr-3 h-4 w-4 text-slate-500" />
                <span className="text-slate-900 dark:text-slate-100">Settings</span>
              </DropdownMenuItem>

              {/* Backend Authentication Section */}
              <DropdownMenuSeparator className="my-2 border-slate-200/50 dark:border-slate-700/50" />
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 mb-2">
                  {backendStatus === 'connected' ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Backend Connection</span>
                </div>
                {backendStatus === 'connected' ? (
                  <Button
                    onClick={handleBackendLogout}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    Disconnect Backend
                  </Button>
                ) : (
                  <Button
                    onClick={handleBackendLogin}
                    size="sm"
                    className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Connect Backend
                  </Button>
                )}
              </div>

              <DropdownMenuSeparator className="my-2 border-slate-200/50 dark:border-slate-700/50" />
              <DropdownMenuItem onClick={handleLogout} className="p-3 rounded-xl cursor-pointer">
                <LogOut className="mr-3 h-4 w-4 text-red-500" />
                <span className="text-red-600 dark:text-red-400">Log out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
