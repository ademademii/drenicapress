import Link from "next/link";

export default function RelatedPosts({ posts }: { posts: any[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">
        Lajme të ngjashme
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="block hover:opacity-80"
          >
            <h3
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
