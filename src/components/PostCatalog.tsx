import PostCard from "./PostCard";

interface Props {
  categoryId: number;
}

async function getPosts(categoryId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=12&_embed`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function PostCatalog({ categoryId }: Props) {
  const posts = await getPosts(categoryId);

  if (!posts.length) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
