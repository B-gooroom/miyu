import Link from "next/link";
import { AdminNavLink } from "./admin-nav-link";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/news", label: "뉴스 학습" },
  { href: "/about", label: "소개" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-start justify-between gap-3 border-b border-[var(--line)] bg-white/90 px-[clamp(20px,5vw,64px)] py-[18px] backdrop-blur-md md:items-center">
      <Link className="flex gap-[7px] text-[15px] font-bold tracking-normal text-[var(--navy)]" href="/" aria-label="MIYU SENSEI home">
        <span>MIYU</span>
        <span className="text-[var(--gold)]">SENSEI</span>
      </Link>
      <nav className="flex gap-[clamp(14px,3vw,32px)] text-[13px] font-semibold text-[var(--muted)]" aria-label="global navigation">
        {navItems.map((item) => (
          <Link className="hover:text-[var(--navy)]" href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <AdminNavLink />
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-[72px] bg-[var(--navy-dark)] px-5 py-7 text-center text-white">
      <p className="m-0 text-xs tracking-normal">© MIYU SENSEI</p>
    </footer>
  );
}
