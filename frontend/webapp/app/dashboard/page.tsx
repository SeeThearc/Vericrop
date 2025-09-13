"use client";
import Nav from "../components/Nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setUser,
  setStatus,
  setWebSocket,
  addMessage,
  logout,
} from "@/lib/authSlice";

const BACKEND = "http://localhost:3000";
const WS_URL = "ws://localhost:3000/ws";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { user, isLoggedIn, status, wsConnected, messages } = useAppSelector(
    (state) => state.auth
  );
  const [mounted, setMounted] = useState(false);
  const [outgoing, setOutgoing] = useState("hello");
  const [ws, setWs] = useState<WebSocket | null>(null);

  function formatError(err: unknown): string {
    if (err instanceof Error) return err.message;
    try {
      return typeof err === "string" ? err : JSON.stringify(err);
    } catch {
      return String(err);
    }
  }

  useEffect(() => {
    setMounted(true);
    
    // Show current Redux state status
    if (user) {
      dispatch(setStatus("User data loaded from Redux state"));
    } else {
      dispatch(setStatus("No user data in Redux state"));
    }
  }, [user, dispatch]);

  // Setup WebSocket connection when user is logged in
  useEffect(() => {
    if (!mounted || !user || !isLoggedIn) return;

    let socket: WebSocket | null = null;
    try {
      socket = new WebSocket(WS_URL);
      socket.onopen = () => {
        dispatch(addMessage("connected"));
      };
      socket.onmessage = (ev) => {
        dispatch(addMessage(`recv: ${ev.data}`));
      };
      socket.onclose = () => {
        dispatch(addMessage("closed"));
      };
      socket.onerror = () => {
        dispatch(addMessage("error"));
      };
      setWs(socket);
      dispatch(setWebSocket(true));
    } catch (err) {
      dispatch(addMessage(`ws error: ${err}`));
    }

    return () => {
      if (socket) socket.close();
      setWs(null);
      dispatch(setWebSocket(false));
    };
  }, [mounted, user, isLoggedIn, dispatch]);

  const signIn = () => {
    // Store current URL as referrer before redirecting
    const currentUrl = window.location.pathname + window.location.search;
    localStorage.setItem("login_referrer", currentUrl);

    // Pass referrer as query parameter to backend
    const params = new URLSearchParams({ referrer: currentUrl });
    window.location.href = `${BACKEND}/signin/google?${params.toString()}`;
  };

  const signOut = async () => {
    dispatch(setStatus("Signing out..."));
    try {
      const res = await axios.post(
        `${BACKEND}/signout`,
        {},
        { withCredentials: true }
      );
      const data = res.data as unknown;
      const text = typeof data === "string" ? data : JSON.stringify(data);
      dispatch(setStatus(`Sign out response: ${res.status} ${text}`));
      dispatch(logout());

      // Clear localStorage
      localStorage.removeItem("vericrop_logged_in");
      localStorage.removeItem("vericrop_user_email");
    } catch (err: unknown) {
      dispatch(setStatus(`Sign out error: ${formatError(err)}`));
    }
  };

  const verify = async () => {
    dispatch(setStatus("Verifying session..."));
    try {
      const res = await axios.get(`${BACKEND}/verify`, {
        withCredentials: true,
      });
      const data = res.data as unknown;
      const text = typeof data === "string" ? data : JSON.stringify(data);
      dispatch(setStatus(`Verify response: ${res.status} ${text}`));
    } catch (err: unknown) {
      dispatch(setStatus(`Verify error: ${formatError(err)}`));
    }
  };

  const sendMessage = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      dispatch(addMessage("not connected"));
      return;
    }
    ws.send(outgoing);
    dispatch(addMessage(`sent: ${outgoing}`));
  };

  const handleBackendLogin = () => {
    signIn();
  };

  const handleBackendLogout = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 dark:from-slate-950 dark:via-emerald-950 dark:to-green-950">
      <Nav />
      <main className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1
              className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent dark:from-emerald-400 dark:to-green-400"
              style={{ fontFamily: "var(--font-libre-baskerville)" }}
            >
              VeriCrop Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Role-specific overview and management tools for sustainable
              farming.
            </p>
          </div>

          {/* Backend Authentication Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🔐</span>
                </div>
                Backend Authentication
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Connect to the Python backend for real-time features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                {!isLoggedIn ? (
                  <Button
                    onClick={handleBackendLogin}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    Login to Backend
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleBackendLogout}
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                    >
                      Logout from Backend
                    </Button>
                    <Button
                      onClick={verify}
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
                    >
                      Verify Session
                    </Button>
                    <Button
                      onClick={() => dispatch(setStatus("User data refreshed from Redux state"))}
                      variant="outline"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-950"
                    >
                      Show Redux User
                    </Button>
                  </>
                )}
              </div>

              {status && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <strong className="text-slate-900 dark:text-slate-100">
                    Status:
                  </strong>
                  <div className="text-slate-700 dark:text-slate-300 mt-1 whitespace-pre-wrap">
                    {status}
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Session cookies: {document.cookie.includes('session_id') ? 'Present' : 'Not found'}
                  </div>
                </div>
              )}

              {user && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                  <strong className="text-emerald-900 dark:text-emerald-100">
                    Redux User Data:
                  </strong>
                  <pre className="text-emerald-800 dark:text-emerald-200 mt-1 text-sm overflow-x-auto">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* WebSocket Section - Only show when logged in */}
          {isLoggedIn && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🌐</span>
                  </div>
                  WebSocket Connection
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Real-time communication with the backend
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-center">
                  <Input
                    value={outgoing}
                    onChange={(e) => setOutgoing(e.target.value)}
                    className="flex-1"
                    placeholder="Enter message..."
                  />
                  <Button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    Send
                  </Button>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <strong className="text-slate-900 dark:text-slate-100">
                    Messages:
                  </strong>
                  <div className="mt-2 space-y-1">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className="text-sm text-slate-700 dark:text-slate-300 font-mono"
                      >
                        {msg}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dashboard Stats and Backend Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Backend Status
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isLoggedIn ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {isLoggedIn ? "Connected" : "Disconnected"}
                      </p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">
                      {wsConnected ? "🔗" : "❌"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Active Batches
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      24
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +12% from last week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">📦</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Quality Score
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      98.5%
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +2.1% from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">⭐</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Revenue
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      $45.2K
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +8.5% from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">💰</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Production Trends Chart */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/50"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📈</span>
                    </div>
                    Production Trends
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Monthly production volume over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[65, 78, 82, 75, 88, 92].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-t-lg"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quality Metrics Chart */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/50"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🎯</span>
                    </div>
                    Quality Metrics
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Quality assurance scores by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-4">
                    {[
                      {
                        label: "Organic Certification",
                        value: 98,
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        label: "Pesticide Levels",
                        value: 95,
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        label: "Nutrient Content",
                        value: 92,
                        color: "from-purple-500 to-pink-500",
                      },
                      {
                        label: "Shelf Life",
                        value: 96,
                        color: "from-orange-500 to-yellow-500",
                      },
                    ].map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-700 dark:text-slate-300">
                            {metric.label}
                          </span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {metric.value}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${metric.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Feed */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/50"></div>
              <CardHeader className="relative">
                <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  Live Activity
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Real-time system updates
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {[
                    {
                      time: "2m ago",
                      event: "Batch #VC-2024-001 quality check passed",
                      type: "success",
                      icon: "✅",
                    },
                    {
                      time: "5m ago",
                      event: "New farmer registration: Maria Garcia",
                      type: "info",
                      icon: "👤",
                    },
                    {
                      time: "8m ago",
                      event: "Temperature alert resolved in Zone A",
                      type: "warning",
                      icon: "🌡️",
                    },
                    {
                      time: "12m ago",
                      event: "Blockchain verification completed",
                      type: "success",
                      icon: "🔗",
                    },
                    {
                      time: "15m ago",
                      event: "Export shipment dispatched to EU",
                      type: "info",
                      icon: "🚚",
                    },
                    {
                      time: "18m ago",
                      event: "Soil moisture levels optimized",
                      type: "success",
                      icon: "💧",
                    },
                    {
                      time: "22m ago",
                      event: "Market price update received",
                      type: "info",
                      icon: "📊",
                    },
                    {
                      time: "25m ago",
                      event: "Pesticide test results uploaded",
                      type: "success",
                      icon: "🧪",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                          activity.type === "success"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                            : activity.type === "warning"
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                        }`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 dark:text-slate-100 leading-tight">
                          {activity.event}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
