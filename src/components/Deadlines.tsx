"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

const RULES = [
  { day: 15, title: "ZUS – spółki i inne osoby prawne", text: "Składki i deklaracja DRA za poprzedni miesiąc." },
  { day: 20, title: "ZUS – pozostali płatnicy, w tym JDG", text: "Składki społeczne i zdrowotna przedsiębiorcy." },
  { day: 20, title: "Zaliczki PIT i CIT, PIT-4", text: "Zaliczka na podatek dochodowy oraz podatek od wynagrodzeń." },
  { day: 25, title: "VAT i JPK_V7", text: "Plik JPK z deklaracją oraz zapłata podatku VAT." },
];

/** Termin wypadający w sobotę lub niedzielę przesuwa się na poniedziałek (święta sprawdzamy ręcznie). */
function nextDate(day: number, now: Date) {
  let d = new Date(now.getFullYear(), now.getMonth(), day);
  const shift = (x: Date) => {
    const wd = x.getDay();
    if (wd === 6) x.setDate(x.getDate() + 2);
    if (wd === 0) x.setDate(x.getDate() + 1);
    return x;
  };
  d = shift(d);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (d < today) d = shift(new Date(now.getFullYear(), now.getMonth() + 1, day));
  return { date: d, days: Math.round((d.getTime() - today.getTime()) / 86400000) };
}

export default function Deadlines() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const rows = RULES.map((r) => ({ ...r, next: now ? nextDate(r.day, now) : null })).sort((a, b) => (a.next && b.next ? a.next.date.getTime() - b.next.date.getTime() : 0));

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line px-6 py-5 sm:px-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mint text-navy">
          <CalendarClock className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h3 className="text-xl">Najbliższe terminy przedsiębiorcy</h3>
          <p className="text-sm text-muted">Liczone od dzisiejszej daty</p>
        </div>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.title} className="flex items-center gap-4 px-6 py-4 sm:px-8">
            <div className="tnum flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-navy text-white">
              <span className="text-xl font-semibold leading-none">{r.next ? r.next.date.getDate() : r.day}</span>
              <span className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-sky">{r.next ? r.next.date.toLocaleDateString("pl-PL", { month: "short" }).replace(".", "") : "dzień"}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-ink">{r.title}</p>
              <p className="text-sm text-muted">{r.text}</p>
            </div>
            {r.next && (
              <span className={`tnum hidden shrink-0 rounded-full px-3 py-1 text-sm font-semibold sm:inline ${r.next.days <= 3 ? "bg-sky text-navy" : "bg-paper text-body"}`}>
                {r.next.days === 0 ? "dziś" : r.next.days === 1 ? "jutro" : `za ${r.next.days} dni`}
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-6 py-4 text-sm text-muted sm:px-8">Klientom przypominamy o terminach i kwotach sami. Daty nie uwzględniają świąt ustawowo wolnych od pracy.</p>
    </div>
  );
}
