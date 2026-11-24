"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Info, Minus, Plus } from "lucide-react";
import { BANK_LINES_PER_DOC, VAT, bankDocs, estimate, hr, invoicingAddon, zl, type EntityKind } from "@/data/pricing";
import { cn } from "@/lib/utils";

/** Klucz, pod którym kalkulator zostawia wycenę dla formularza kontaktowego. */
export const QUOTE_KEY = "enumerika-wycena";

function Stepper({ label, hint, value, onChange }: { label: string; hint: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="font-medium text-ink">{label}</p>
        <p className="text-sm text-muted">{hint}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1 rounded-full border border-line bg-paper p-1">
        <button type="button" onClick={() => onChange(Math.max(0, value - 1))} aria-label={`Mniej: ${label}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy hover:bg-mint disabled:opacity-40" disabled={value === 0}>
          <Minus className="h-4 w-4" aria-hidden />
        </button>
        <span className="tnum w-8 text-center font-semibold text-ink" aria-live="polite">
          {value}
        </span>
        <button type="button" onClick={() => onChange(Math.min(99, value + 1))} aria-label={`Więcej: ${label}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy hover:bg-mint">
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export default function Calculator({ compact }: { compact?: boolean }) {
  const router = useRouter();
  const [kind, setKind] = useState<EntityKind>("jdg");
  const [invoices, setInvoices] = useState(12);
  const [bankLines, setBankLines] = useState(0);
  const [staff, setStaff] = useState<Record<string, number>>({});
  const [invoicing, setInvoicing] = useState(false);

  const e = useMemo(() => estimate({ kind, invoices, bankLines, hr: staff, invoicing }), [kind, invoices, bankLines, staff, invoicing]);
  const gross = e.total * (1 + VAT);

  const sendQuote = () => {
    const lines = [
      "Dzień dobry, proszę o kontakt w sprawie obsługi księgowej.",
      "",
      "Wycena z kalkulatora:",
      `– forma: ${kind === "jdg" ? "jednoosobowa działalność" : "spółka z o.o."}`,
      `– dokumenty miesięcznie: ${e.docs}${bankLines ? ` (w tym wyciąg bankowy: ${bankLines} pozycji)` : ""}`,
      ...hr.filter((h) => staff[h.id]).map((h) => `– ${h.name}: ${staff[h.id]} os.`),
      ...(invoicing ? ["– program do faktur: tak"] : []),
      `– pakiet: ${e.pack.name}`,
      `– szacunek: ${e.individual ? "od " : ""}${zl(e.total)} netto / mies.`,
    ];
    try {
      sessionStorage.setItem(QUOTE_KEY, lines.join("\n"));
    } catch {}
    router.push("/kontakt/#formularz");
  };

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-line bg-card shadow-[0_30px_80px_-50px_rgba(0,51,102,0.55)] lg:grid-cols-[1.25fr_1fr]">
      <div className="p-6 sm:p-9">
        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">1. Forma działalności</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 rounded-full bg-paper p-1.5">
            {(
              [
                ["jdg", "Jednoosobowa (JDG)"],
                ["spolka", "Spółka z o.o."],
              ] as const
            ).map(([id, label]) => (
              <button key={id} type="button" onClick={() => setKind(id)} aria-pressed={kind === id} className={cn("rounded-full px-4 py-3 text-[0.95rem] font-semibold transition-colors", kind === id ? "bg-navy text-white" : "text-ink hover:bg-white")}>
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <label htmlFor="calc-docs" className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
              2. Dokumenty w miesiącu
            </label>
            <input type="number" min={0} max={300} value={invoices} onChange={(ev) => setInvoices(Math.min(300, Math.max(0, Number(ev.target.value) || 0)))} aria-label="Liczba dokumentów w miesiącu" className="tnum w-24 rounded-xl border border-line bg-paper px-3 py-2 text-right text-xl font-semibold text-ink" />
          </div>
          <input id="calc-docs" type="range" min={0} max={150} value={Math.min(invoices, 150)} onChange={(ev) => setInvoices(Number(ev.target.value))} className="mt-4 w-full" />
          <p className="mt-2 flex gap-2 text-sm text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Faktury kosztowe i sprzedażowe, rachunki, paragony, raporty kasowe, delegacje, polecenia księgowania.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-paper px-4 py-3">
          <label htmlFor="calc-bank" className="text-[0.95rem]">
            <span className="font-medium text-ink">Pozycje na wyciągu bankowym</span>
            <span className="block text-sm text-muted">
              co {BANK_LINES_PER_DOC} pozycji = 1 dokument{bankLines > 0 && ` (teraz: ${bankDocs(bankLines)})`}
            </span>
          </label>
          <input id="calc-bank" type="number" min={0} max={2000} step={10} value={bankLines} onChange={(ev) => setBankLines(Math.min(2000, Math.max(0, Number(ev.target.value) || 0)))} className="tnum w-24 rounded-xl border border-line bg-white px-3 py-2 text-right font-semibold text-ink" />
        </div>

        {!compact && (
          <>
            <fieldset className="mt-8">
              <legend className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">3. Kadry i płace</legend>
              <div className="mt-1 divide-y divide-line">
                {hr.map((h) => (
                  <Stepper key={h.id} label={h.name} hint={`${h.price} zł netto / ${h.unit}`} value={staff[h.id] || 0} onChange={(v) => setStaff((s) => ({ ...s, [h.id]: v }))} />
                ))}
              </div>
            </fieldset>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-line px-4 py-3.5">
              <input type="checkbox" checked={invoicing} onChange={(ev) => setInvoicing(ev.target.checked)} className="mt-1 h-5 w-5 accent-navy" />
              <span>
                <span className="font-medium text-ink">Program do wystawiania faktur</span>
                <span className="block text-sm text-muted">+{invoicingAddon} zł netto miesięcznie</span>
              </span>
            </label>
          </>
        )}
      </div>

      <div className="on-dark relative flex flex-col bg-navy p-6 text-white sm:p-9">
        <div aria-hidden className="dots absolute inset-0 opacity-60" />
        <div className="relative flex h-full flex-col">
          <p className="eyebrow on-dark">Twoja wycena</p>
          <p className="mt-5 text-white/70">Szacunkowy koszt miesięczny</p>
          <p className="tnum mt-1 font-display text-6xl font-semibold tracking-tight text-white" aria-live="polite">
            {e.individual && <span className="mr-2 text-2xl font-normal text-white/70">od</span>}
            {zl(e.total)}
          </p>
          <p className="tnum mt-1 text-white/70">
            netto · {zl(gross)} brutto
          </p>

          <div className="mt-7 rounded-2xl bg-white/10 p-5">
            <p className="text-sm text-white/70">Dopasowany pakiet</p>
            <p className="mt-0.5 font-display text-2xl font-semibold text-sky">Pakiet {e.pack.name}</p>
            <dl className="tnum mt-4 space-y-2 text-[0.95rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-white/75">
                  Księgowość ({e.docs} dok.{e.extraDocs > 0 && `, w tym ${e.extraDocs} ponad limit`})
                </dt>
                <dd className="font-semibold">{zl(e.accounting)}</dd>
              </div>
              {e.hrCost > 0 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-white/75">Kadry i płace</dt>
                  <dd className="font-semibold">{zl(e.hrCost)}</dd>
                </div>
              )}
              {e.addons > 0 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-white/75">Program do faktur</dt>
                  <dd className="font-semibold">{zl(e.addons)}</dd>
                </div>
              )}
            </dl>
          </div>

          {e.individual && <p className="mt-4 text-sm text-white/75">Przy tej liczbie dokumentów przygotujemy indywidualną ofertę w pakiecie VIP. Podana kwota to cena startowa.</p>}

          <div className="mt-auto pt-7">
            <button type="button" onClick={sendQuote} className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky px-6 py-4 font-semibold text-navy transition-colors hover:bg-sky-2">
              Wyślij zapytanie z tą wyceną
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <p className="mt-3 text-center text-xs text-white/60">Wycena orientacyjna, nie stanowi oferty w rozumieniu Kodeksu cywilnego.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
