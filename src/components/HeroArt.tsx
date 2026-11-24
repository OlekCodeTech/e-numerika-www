import Image from "next/image";
import { Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/** Zdjęcie w ramce marki. Pliki w public/images/photos (1400 px, WebP). */
export function Photo({ name, alt, className, priority, ratio = "aspect-[3/2]" }: { name: string; alt: string; className?: string; priority?: boolean; ratio?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-line bg-mint shadow-[0_40px_80px_-50px_rgba(0,51,102,0.7)]", ratio, className)}>
      <Image src={`/images/photos/${name}.webp`} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
    </div>
  );
}

/** Hero strony głównej: zdjęcie pracy księgowej z dwiema kartami statusu. */
export default function HeroArt() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div aria-hidden className="absolute -right-5 -top-5 h-full w-full rounded-[2.25rem] bg-sky/60" />
      <Photo name="ksiegowa-przy-biurku" alt="Księgowa przy biurku sprawdza faktury i zestawienie w laptopie" priority ratio="aspect-[4/3.4]" />

      <div aria-hidden className="absolute -bottom-7 -left-3 w-60 rounded-2xl border border-line bg-white p-4 shadow-xl sm:-left-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          Miesiąc rozliczony
        </p>
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[0.7rem] font-semibold text-navy">
          {["VAT", "PIT / CIT", "ZUS"].map((t) => (
            <span key={t} className="rounded-lg bg-mint py-1.5">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div aria-hidden className="absolute -right-2 top-8 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl sm:-right-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint text-navy">
          <FileText className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">Faktura dodana</span>
          <span className="block text-xs text-muted">zdjęcie z telefonu</span>
        </span>
      </div>
    </div>
  );
}
