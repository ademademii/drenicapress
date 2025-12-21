const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPostBySlug(slug: string) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.length ? data[0] : null;
}

export async function getRelatedPosts(categoryId: number, excludeId: number) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/posts?categories=${categoryId}&exclude=${excludeId}&per_page=4`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return await res.json();
}
