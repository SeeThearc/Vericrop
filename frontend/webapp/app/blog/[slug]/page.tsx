'use client';

import { posts } from '../posts';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';

export default function BlogPostPage() {
  const params = useParams();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-100">
      <header className="relative h-96">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-emerald-600">{post.title}</h1>
            <div className="mt-4 flex items-center justify-center">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4 text-left">
                <p className="font-medium text-slate-700 dark:text-slate-200">{post.author}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <div
          className="prose dark:prose-invert lg:prose-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  );
}
