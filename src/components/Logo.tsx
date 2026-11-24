import { cn } from "@/lib/utils";

/**
 * Sygnet: litera „e” narysowana jak wykres kołowy – pierścień z wyróżnionym wycinkiem, poprzeczka jako oś.
 * Geometria pochodzi ze scripts/lib/brand.mjs (jedno źródło znaku – po zmianie tam trzeba przenieść ścieżki tutaj).
 */
export function LogoMark({ className, inverted }: { className?: string; inverted?: boolean }) {
  const fg = inverted ? "#ffffff" : "#003366";
  const accent = inverted ? "#bfe6ea" : "#0f6b78";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M25.70 4.57 A19.5 19.5 0 0 1 42.79 18.80 L34.26 18.80 A11.5 11.5 0 0 0 25.70 12.63 Z" fill={accent} />
      <path d="M24 8.50 A15.5 15.5 0 1 0 35.52 34.37" fill="none" stroke={fg} strokeWidth="8" />
      <circle cx="35.52" cy="34.37" r="4" fill={fg} />
      <path d="M10 20.50 H43.18 A19.5 19.5 0 0 1 43.18 27.50 H10 Z" fill={fg} />
    </svg>
  );
}

export default function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-10 w-10 shrink-0" inverted={dark} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.4rem] font-extrabold tracking-tight", dark ? "text-white" : "text-navy")}>
          E<span className={dark ? "text-sky" : "text-teal"}>‑</span>Numerika
        </span>
        <span className={cn("mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em]", dark ? "text-white/60" : "text-muted")}>biuro rachunkowe</span>
      </span>
    </span>
  );
}
