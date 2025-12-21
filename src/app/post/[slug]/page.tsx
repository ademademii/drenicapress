// src/app/post/[slug]/page.tsx
import { getPostBySlug, getRelatedPosts } from "@/lib/wordpress";
import PostHeader from "@/components/PostHeader";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedPosts from "@/components/RelatedPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <h1 className="text-center mt-10">Post not found</h1>;
  }

  const category = post._embedded["wp:term"][0][0];
  const relatedPosts = await getRelatedPosts(category.id, post.id);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        category={{ name: category.name, slug: category.slug }}
        title={post.title.rendered}
      />

      {/* Post Header with Image */}
      <PostHeader post={post} />

      {/* Post Content */}
      <article
        className="prose max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800 sm:prose-lg lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Related Posts */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
        <RelatedPosts posts={relatedPosts} />
      </section>
    </main>
  );
}
