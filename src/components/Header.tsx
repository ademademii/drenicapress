import Link from "next/link";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <header
      style={{
        padding: "0.8rem 1.5rem",
        backgroundColor: "#de3333",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Link href="/">
        <img
          src="https://drenicapress.org/wp-content/uploads/2022/01/logo-mobile2022-1.svg"
          alt="DrenicaPress Logo"
          style={{ height: "45px", cursor: "pointer" }}
        />
      </Link>

      {/* Menyja e kategorive — import nga komponenti */}
      <NavMenu />
    </header>
  );
}
