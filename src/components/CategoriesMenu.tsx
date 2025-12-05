"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoriesMenu() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/wp-json/wp/v2/categories`
        );
        const data = await res.json();

        // Selected Cateogires to show on Menu
        const allowedIds = [4,5,6,7]; // ndrysho sipas nevojës

        const filtered = data.filter((c: Category) => allowedIds.includes(c.id));

        setCategories(filtered);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    }

    loadCategories();
  }, []);

  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          style={{ color: "white", fontWeight: 500 }}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
