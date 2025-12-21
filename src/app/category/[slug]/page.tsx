import PostCatalog from "../../../components/PostCatalog";

interface Category {
  id: number;
  name: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/categories?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.length ? data[0] : null;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params; // 👈 KJO ËSHTË FIX-i

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return <h1>Category not found</h1>;
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {category.name}
      </h1>

      <PostCatalog categoryId={category.id} />
    </main>
  );
}
