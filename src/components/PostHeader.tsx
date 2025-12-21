import Image from "next/image";

export default function PostHeader({ post }: { post: any }) {
  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <header className="mb-8">
      {image && (
        <div className="relative w-full h-[420px] mb-6">
          <Image
            src={image}
            alt={post.title.rendered}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <h1
        className="text-4xl font-bold leading-tight"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <p className="text-sm text-gray-500 mt-2">
        {new Date(post.date).toLocaleDateString()}
      </p>
    </header>
  );
}
