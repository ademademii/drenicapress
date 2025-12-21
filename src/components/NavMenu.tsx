// src/app/components/NavMenu.tsx (Server Component)
import Link from "next/link";

interface MenuItem {
  id: number;
  parent: number;
  title: { rendered: string };
  url: string;
}

async function getMenuItems(): Promise<MenuItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/menu-items?menus=41279`,
    {
      headers: {
        Authorization: `Basic ${process.env.WP_BASIC_AUTH}`,
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

function extractSlug(url: string): string {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts[0] === "category") return parts[1] || "";
    return parts[0] || "";
  } catch {
    return "";
  }
}

export default async function NavMenu() {
  const items = await getMenuItems();

  const parents = items.filter((i) => i.parent === 0);
  const childrenOf = (pid: number) => items.filter((i) => i.parent === pid);

  return (
    <nav style={{ display: "flex", gap: "2rem" }}>
      {parents.map((parent) => {
        const slug = extractSlug(parent.url);
        const children = childrenOf(parent.id);

        return (
          <div
            key={parent.id}
            className="group"
            style={{ position: "relative" }}
          >
            {/* Parent Menu Item */}
            <Link href={`/category/${slug}`} style={{ color: "white" }}>
              {parent.title.rendered}
            </Link>

            {/* Dropdown FIXED – nuk zhduket kur leviz miu */}
            {children.length > 0 && (
              <div
                className="hidden group-hover:block"
                style={{
                  position: "absolute",
                  top: "100%",        // Vendoset direkt poshtë parent
                  left: 0,
                  background: "white",
                  padding: "10px",
                  borderRadius: "4px",
                  minWidth: "180px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  zIndex: 100,
                }}
              >
                {children.map((child) => {
                  const childSlug = extractSlug(child.url);

                  return (
                    <div key={child.id} style={{ marginBottom: "8px" }}>
                      <Link
                        href={`/category/${childSlug}`}
                        style={{ color: "black" }}
                      >
                        {child.title.rendered}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
