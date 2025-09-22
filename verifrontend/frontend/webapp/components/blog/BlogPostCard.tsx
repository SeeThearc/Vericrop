'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../../app/blog/posts';

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 shadow-md hover:shadow-xl transition-all duration-300 h-full">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors duration-300">{post.title}</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
          <div className="mt-4 flex items-center">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={post.authorImage}
                alt={post.author}
                fill
                className="object-cover"
              />
            </div>
            <p className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-200">{post.author}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
