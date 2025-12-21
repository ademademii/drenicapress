// src/components/Card.tsx
interface CardProps {
  post: any;
}

export default function Card({ post }: CardProps) {
  const imageUrl =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";

  return (
    <a href={`/post/${post.slug}`} className="block border p-2">
      <img
        src={imageUrl}
        alt={post.title.rendered}
        className="w-full h-48 object-cover mb-2"
      />

      <h2
        className="font-bold text-lg"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
    </a>
  );
}
