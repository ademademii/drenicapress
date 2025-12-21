interface PostContentProps {
  post: any;
}

export default function PostContent({ post }: PostContentProps) {
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article className="space-y-6">
      {/* Title */}
      <h1
        className="text-4xl font-bold leading-tight"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {/* Date */}
      <p className="text-sm text-gray-500">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {/* Featured Image */}
      {featuredImage && (
        <img
          src={featuredImage}
          alt={post.title.rendered}
          className="w-full rounded-xl"
        />
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
