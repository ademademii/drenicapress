import Link from "next/link";

interface Props {
  category: {
    name: string;
    slug: string;
  };
  title: string;
}

export default function Breadcrumb({ category, title }: Props) {
  return (
    <nav className="text-sm text-gray-500 mb-6">
      <Link href="/">Home</Link>
      {" / "}
      <Link href={`/category/${category.slug}`}>
        {category.name}
      </Link>
      {" / "}
      <span className="text-gray-700">{title}</span>
    </nav>
  );
}
