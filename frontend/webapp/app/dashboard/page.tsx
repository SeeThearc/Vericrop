"use client";
import Link from "next/link";
import Nav from "../components/Nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 dark:from-slate-950 dark:via-emerald-950 dark:to-green-950">
      <Nav />
      <main className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 
              className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent dark:from-emerald-400 dark:to-green-400"
              style={{ fontFamily: 'var(--font-libre-baskerville)' }}
            >
              VeriCrop Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Role-specific overview and management tools for sustainable farming.
            </p>
          </div>

          {/* Dashboard Stats and Backend Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Backend Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">Connected</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🔗</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Batches</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">24</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+12% from last week</p>
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
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Quality Score</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">98.5%</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+2.1% from last month</p>
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
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Revenue</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">$45.2K</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+8.5% from last month</p>
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
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-t-lg"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
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
                      { label: 'Organic Certification', value: 98, color: 'from-green-500 to-emerald-500' },
                      { label: 'Pesticide Levels', value: 95, color: 'from-blue-500 to-cyan-500' },
                      { label: 'Nutrient Content', value: 92, color: 'from-purple-500 to-pink-500' },
                      { label: 'Shelf Life', value: 96, color: 'from-orange-500 to-yellow-500' }
                    ].map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-700 dark:text-slate-300">{metric.label}</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{metric.value}%</span>
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
                    { time: '2m ago', event: 'Batch #VC-2024-001 quality check passed', type: 'success', icon: '✅' },
                    { time: '5m ago', event: 'New farmer registration: Maria Garcia', type: 'info', icon: '👤' },
                    { time: '8m ago', event: 'Temperature alert resolved in Zone A', type: 'warning', icon: '🌡️' },
                    { time: '12m ago', event: 'Blockchain verification completed', type: 'success', icon: '🔗' },
                    { time: '15m ago', event: 'Export shipment dispatched to EU', type: 'info', icon: '🚚' },
                    { time: '18m ago', event: 'Soil moisture levels optimized', type: 'success', icon: '💧' },
                    { time: '22m ago', event: 'Market price update received', type: 'info', icon: '📊' },
                    { time: '25m ago', event: 'Pesticide test results uploaded', type: 'success', icon: '🧪' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                        activity.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                        activity.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                      }`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 dark:text-slate-100 leading-tight">{activity.event}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.time}</p>
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
