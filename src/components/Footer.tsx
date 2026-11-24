import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

const col = "text-sm font-semibold uppercase tracking-[0.16em] text-sky";
const link = "text-white/75 transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="on-dark bg-deep text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="E-Numerika – strona główna">
              <Logo dark />
            </Link>
            <p className="mt-6 max-w-xs text-white/75">Biuro rachunkowe dla jednoosobowych działalności i spółek. Stacjonarnie pod Szczecinem i online w całej Polsce.</p>
            <ul className="mt-6 space-y-3 text-white/85">
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-3 hover:text-sky">
                  <Phone className="h-4 w-4 text-sky" aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-sky">
                  <Mail className="h-4 w-4 text-sky" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-sky" aria-hidden />
                <span>
                  {site.street}
                  <br />
                  {site.postal} {site.city}
                </span>
              </li>
            </ul>
          </div>

          <nav aria-label="Usługi">
            <p className={col}>Usługi</p>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}/`} className={link}>
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Lokalizacje">
            <p className={col}>Gdzie działamy</p>
            <ul className="mt-5 space-y-2.5">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}/`} className={link}>
                    Biuro rachunkowe {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Firma">
            <p className={col}>Firma</p>
            <ul className="mt-5 space-y-2.5">
              {[
                ["/oferta/", "Oferta"],
                ["/uslugi-ksiegowe-cennik/", "Cennik"],
                ["/kalkulator-ksiegowosci/", "Kalkulator wyceny"],
                ["/porady-dla-przedsiebiorcow/", "Blog"],
                ["/o-nas/", "O nas"],
                ["/kontakt/", "Kontakt"],
                ["/polityka-prywatnosci/", "Polityka prywatności"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className={link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-7 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · NIP {site.nip} · REGON {site.regon}
          </p>
          <p>
            Realizacja:{" "}
            <a href="https://olekcodetech.pl" className="hover:text-sky">
              OlekCodeTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
