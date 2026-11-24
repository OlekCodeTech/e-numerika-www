import Image from "next/image";
import { Check, FileText, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Zdjęcie w ramce marki. Pliki w public/images/photos (1400 px, WebP). */
export function Photo({ name, alt, className, priority, ratio = "aspect-[3/2]" }: { name: string; alt: string; className?: string; priority?: boolean; ratio?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-line bg-mint shadow-[0_40px_80px_-50px_rgba(0,51,102,0.7)]", ratio, className)}>
      <Image src={`/images/photos/${name}.webp`} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
    </div>
  );
}

const slides = [
  { name: "hero-ksiegowa-portret", alt: "Uśmiechnięta księgowa przy biurku z laptopem w jasnym biurze" },
  { name: "hero-rozmowa-z-klientem", alt: "Księgowa i przedsiębiorca omawiają wyniki firmy przy laptopie" },
  { name: "hero-klientka-paragon", alt: "Właścicielka kwiaciarni fotografuje paragon telefonem, żeby wysłać go do księgowej" },
];

/** Hero strony głównej: pokaz trzech zdjęć (przenikanie + powolne zbliżenie) i trzy „żywe” karty statusu. Animacje w globals.css (.hero-*). */
export default function HeroArt() {
  return (
    <div className="hero-art relative mx-auto w-full max-w-lg lg:max-w-none">
      <div aria-hidden className="hero-plate absolute -right-5 -top-5 h-full w-full rounded-[2.25rem] bg-sky/60" />

      <div className="relative aspect-[5/4.3] overflow-hidden rounded-[2rem] border border-line bg-mint shadow-[0_40px_80px_-50px_rgba(0,51,102,0.7)]">
        {/* warstwa bazowa: widoczna od razu i przy wyłączonych animacjach */}
        <Image src={`/images/photos/${slides[0].name}.webp`} alt={slides[0].alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        {slides.map((s, i) => (
          <Image key={s.name} src={`/images/photos/${s.name}.webp`} alt={i === 0 ? "" : s.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="hero-slide object-cover" style={{ animationDelay: `${i * 5}s` }} />
        ))}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/55 to-transparent" />
        <div aria-hidden className="absolute bottom-5 right-6 flex gap-1.5">
          {slides.map((s, i) => (
            <span key={s.name} className="h-1.5 w-7 overflow-hidden rounded-full bg-white/35">
              <span className="hero-tick block h-full w-full origin-left rounded-full bg-white" style={{ animationDelay: `${i * 5}s` }} />
            </span>
          ))}
        </div>
      </div>

      <div aria-hidden className="hero-float absolute -bottom-7 -left-3 w-60 rounded-2xl border border-line bg-white p-4 shadow-xl sm:-left-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className="hero-pulse flex h-6 w-6 items-center justify-center rounded-full bg-navy text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          Miesiąc rozliczony
        </p>
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[0.7rem] font-semibold text-navy">
          {["VAT", "PIT / CIT", "ZUS"].map((t, i) => (
            <span key={t} className="hero-chip rounded-lg bg-mint py-1.5" style={{ animationDelay: `${1 + i * 0.25}s` }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div aria-hidden className="hero-float absolute -right-2 top-8 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:-right-6" style={{ animationDelay: "-2.5s" }}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-navy">
          <FileText className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">Faktura dodana</span>
          <span className="block text-xs text-muted">zdjęcie z telefonu</span>
        </span>
      </div>

      <div aria-hidden className="hero-float absolute -left-4 top-[30%] hidden w-40 rounded-2xl border border-white/15 bg-navy p-4 text-white shadow-xl sm:block lg:-left-16" style={{ animationDelay: "-4s" }}>
        <p className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-sky">
          Wyniki
          <TrendingUp className="h-4 w-4" />
        </p>
        <div className="mt-3 flex h-14 items-end gap-1.5">
          {[38, 55, 46, 72, 64, 100].map((h, i) => (
            <span key={i} className={cn("hero-bar flex-1 origin-bottom rounded-[4px]", i === 5 ? "bg-sky" : "bg-white/30")} style={{ height: `${h}%`, animationDelay: `${0.6 + i * 0.12}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
