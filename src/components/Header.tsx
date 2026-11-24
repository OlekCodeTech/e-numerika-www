"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="E-Numerika – strona główna">
          <Logo />
        </Link>

        <nav aria-label="Główna nawigacja" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => {
            const active = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
            return (
              <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined} className={cn("rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors", active ? "bg-mint text-navy" : "text-ink hover:bg-white")}>
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[0.93rem] font-semibold text-white transition-colors hover:bg-navy-2 sm:inline-flex">
            <Phone className="h-4 w-4" aria-hidden />
            {site.phone}
          </a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Zamknij menu" : "Otwórz menu"} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Menu mobilne" className="border-t border-line bg-paper px-5 pb-6 pt-3 lg:hidden">
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block rounded-2xl px-4 py-3 text-lg font-medium text-ink hover:bg-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.phoneHref} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3.5 font-semibold text-white">
            <Phone className="h-4 w-4" aria-hidden />
            {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
