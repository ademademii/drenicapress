"use client";

import Image from "next/image";
import { format } from "date-fns";

interface Post {
  title: { rendered: string };
  content: { rendered: string };
  featured_image?: string;
  date: string;
  categories?: string[];
  author?: string;
}

interface PostPageProps {
  post: Post;
}

export default function PostLayout({ post }: PostPageProps) {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Image */}
      {post.featured_image && (
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.featured_image}
            alt={post.title.rendered}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <h1 className="absolute bottom-4 left-4 text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
            {post.title.rendered}
          </h1>
        </div>
      )}

      {/* Meta Info */}
      <div className="flex flex-col sm:flex-row justify-between text-gray-500 text-sm mb-6">
        <span>{format(new Date(post.date), "PPP")}</span>
        {post.categories && (
          <span>{post.categories.join(", ")}</span>
        )}
        {post.author && <span>By {post.author}</span>}
      </div>

      {/* Content */}
      <article
        className="prose prose-lg sm:prose-xl mx-auto text-gray-800"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      ></article>

      {/* Social Share */}
      <div className="flex mt-12 space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Share on Facebook
        </button>
        <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition">
          Share on Twitter
        </button>
      </div>

      {/* Related Posts Placeholder */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Map related posts here */}
        </div>
      </div>
    </main>
  );
}
