// src/app/post/[slug]/page.tsx

import parse from "html-react-parser";

interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed=true`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.length) return null;

    return data[0]; // the single post
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function SinglePostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div className="p-6">Posti nuk u gjet.</div>;
  }

  const featured =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/placeholder.jpg";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {parse(post.title.rendered)}
      </h1>

      {/* Featured Image */}
      <img
        src={featured}
        alt={post.title.rendered}
        className="w-full h-auto rounded mb-6"
      />

      {/* Post Content */}
      <article className="prose prose-lg max-w-none">
        {parse(post.content.rendered)}
      </article>
    </div>
  );
}
