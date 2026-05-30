import Link from "next/link";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/news", label: "뉴스 학습" },
  { href: "/about", label: "소개" },
];

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="MIYU SENSEI home">
        <span>MIYU</span>
        <span>SENSEI</span>
      </Link>
      <nav className="global-nav" aria-label="global navigation">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <p>© MIYU SENSEI</p>
    </footer>
  );
}
