// src/app/components/NavMenu.tsx (Server Component)
import Link from "next/link";

interface MenuItem {
  id: number;
  title: { rendered: string };
  url: string;
}

async function getMenuItems(): Promise<MenuItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/menu-items?menus=41279`,
    {
      headers: {
        // Nëse ke token ose app password
        Authorization: `Basic ${process.env.WP_BASIC_AUTH}`, 
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function NavMenu() {
  const items = await getMenuItems();

  const getSlugFromUrl = (url: string) => {
    try {
      const u = new URL(url);
      const paths = u.pathname.split("/").filter(Boolean);
      return paths[0] || "";
    } catch {
      return "";
    }
  };

  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      {items.map((item) => {
        const slug = getSlugFromUrl(item.url);
        return (
          <Link key={item.id} href={`/category/${slug}`} style={{ color: "white" }}>
            {item.title.rendered}
          </Link>
        );
      })}
    </nav>
  );
}