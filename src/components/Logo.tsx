import { cn } from "@/lib/utils";

/** Sygnet: trzy rosnące słupki z linią trendu – wykres, czyli księgowość, w której liczby rosną i się zgadzają. */
export function LogoMark({ className, inverted }: { className?: string; inverted?: boolean }) {
  const bg = inverted ? "#ffffff" : "#003366";
  const fg = inverted ? "#003366" : "#ffffff";
  const accent = inverted ? "#0f6b78" : "#bfe6ea";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="12" fill={bg} />
      <rect x="10" y="27" width="6.5" height="11" rx="2" fill={fg} opacity="0.6" />
      <rect x="20.75" y="20" width="6.5" height="18" rx="2" fill={fg} opacity="0.8" />
      <rect x="31.5" y="12" width="6.5" height="26" rx="2" fill={fg} />
      <path d="M9.5 20.5 L19 13.5 L25 17 L35.5 7.5" fill="none" stroke={accent} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30.5 7.2 H36 V12.7" fill="none" stroke={accent} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
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
