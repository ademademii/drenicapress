// src/components/Slider.tsx
"use client";

import { useState } from "react";
import Card from "./Card";

interface Post {
  id: number;
  title: { rendered: string };
  slug: string;
  featured_media: number;
}

interface Props {
  posts: Post[];
}

export default function Slider({ posts }: Props) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % posts.length);
  const prev = () => setCurrent((prev) => (prev - 1 + posts.length) % posts.length);

  if (posts.length === 0) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Card post={posts[current]} />

      {/* Prev / Next Buttons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded shadow"
      >
        Prev
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded shadow"
      >
        Next
      </button>
    </div>
  );
}
