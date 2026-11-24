"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { packIncludes, packs, type EntityKind } from "@/data/pricing";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const [kind, setKind] = useState<EntityKind>("jdg");
  return (
    <div>
      <div role="tablist" aria-label="Rodzaj działalności" className="mx-auto grid w-full max-w-md grid-cols-2 gap-2 rounded-full border border-line bg-white p-1.5">
        {(
          [
            ["jdg", "Pakiety dla JDG"],
            ["spolka", "Pakiety dla spółek"],
          ] as const
        ).map(([id, label]) => (
          <button key={id} role="tab" type="button" aria-selected={kind === id} onClick={() => setKind(id)} className={cn("rounded-full px-5 py-3 font-semibold transition-colors", kind === id ? "bg-navy text-white" : "text-ink hover:bg-paper")}>
            {label}
          </button>
        ))}
      </div>

      {(Object.keys(packs) as EntityKind[]).map((k) => (
        <div key={k} role="tabpanel" hidden={k !== kind} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {packs[k].map((p) => (
            <div key={p.id} className={cn("relative flex flex-col rounded-[1.75rem] border p-6", p.featured ? "border-navy bg-navy text-white shadow-[0_30px_60px_-40px_rgba(0,51,102,0.9)]" : "border-line bg-card")}>
              {p.featured && <span className="absolute -top-3 left-6 rounded-full bg-sky px-3 py-1 text-xs font-semibold text-navy">Najczęściej wybierany</span>}
              <h3 className={cn("text-xl", p.featured && "text-white")}>Pakiet {p.name}</h3>
              <p className={cn("mt-1 min-h-10 text-sm", p.featured ? "text-white/70" : "text-muted")}>{p.tagline}</p>
              <p className="tnum mt-5 flex items-baseline gap-1.5">
                <span className={cn("font-display text-[2.6rem] font-semibold leading-none tracking-tight", p.featured ? "text-sky" : "text-ink")}>{p.price}</span>
                <span className={cn("text-sm", p.featured ? "text-white/70" : "text-muted")}>zł netto / mies.</span>
              </p>
              <p className={cn("mt-4 rounded-xl px-3 py-2 text-sm font-semibold", p.featured ? "bg-white/10 text-white" : "bg-mint text-navy")}>
                {p.limit ? `do ${p.limit} dokumentów` : "powyżej 90 dokumentów"}
              </p>
              <ul className={cn("mt-5 flex-1 space-y-2.5 text-sm", p.featured ? "text-white/85" : "text-body")}>
                {[...packIncludes, p.limit ? `Każdy dokument ponad limit: ${p.extra} zł` : "Zakres i limit ustalamy indywidualnie"].map((i) => (
                  <li key={i} className="flex gap-2">
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", p.featured ? "text-sky" : "text-teal")} strokeWidth={3} aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
              <Link href="/kontakt/#formularz" className={cn("mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors", p.featured ? "bg-sky text-navy hover:bg-sky-2" : "border border-navy/25 text-navy hover:bg-navy hover:text-white")}>
                Wybieram pakiet
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
