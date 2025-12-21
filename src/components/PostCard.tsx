interface PostCardProps {
  post: any;
}

export default function PostCard({ post }: PostCardProps) {
  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article className="rounded overflow-hidden shadow">
      {image && (
        <img
          src={image}
          alt={post.title.rendered}
          className="w-full h-60 object-cover"
        />
      )}

    <a href={`/post/${post.slug}`} className="block">
      <div className="p-4">
        <h2
          className="font-bold text-lg"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
      </a>
    </article>
  );
}
