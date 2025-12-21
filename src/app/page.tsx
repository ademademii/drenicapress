// src/app/page.tsx
import Slider from "../components/Home/Slider";

interface Post {
  id: number;
  title: { rendered: string };
  link: string;
  featured_media: number;
}

async function getTopNews(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/posts?per_page=5&_embed=true`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function HomePage() {
  const topNews = await getTopNews();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Portali i Lajmeve</h1>

      {topNews.length > 0 ? (
        <Slider posts={topNews} />
      ) : (
        <p>Nuk ka lajme për momentin.</p>
      )}
    </div>
  );
}
