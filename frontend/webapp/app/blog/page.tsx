"use client";

import { posts } from "./posts";
import BlogPostCard from "@/components/blog/BlogPostCard";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-100">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-12 text-center">
          <h1 className="text-5xl font-bold text-emerald-600">VeriCrop Blog</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Insights and stories on sustainable agriculture and food technology.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
