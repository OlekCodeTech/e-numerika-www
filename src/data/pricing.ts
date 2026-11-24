export type Pack = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  /** liczba dokumentów w cenie; null = pakiet bez twardego limitu (wycena potwierdzana indywidualnie) */
  limit: number | null;
  /** cena za każdy dokument ponad limit */
  extra: number;
  featured?: boolean;
};

export type EntityKind = "spolka" | "jdg";

export const packs: Record<EntityKind, Pack[]> = {
  spolka: [
    { id: "start", name: "Startowy", tagline: "Dla firm na samym początku", price: 320, limit: 10, extra: 15 },
    { id: "standard", name: "Standard", tagline: "Mała firma, proste potrzeby", price: 450, limit: 15, extra: 15 },
    { id: "plus", name: "Plus", tagline: "Więcej dokumentów, więcej możliwości", price: 700, limit: 45, extra: 13, featured: true },
    { id: "premium", name: "Premium", tagline: "Dla firm w fazie wzrostu", price: 1100, limit: 90, extra: 13 },
    { id: "vip", name: "VIP", tagline: "Pełna obsługa bez kompromisów", price: 1400, limit: null, extra: 13 },
  ],
  jdg: [
    { id: "start", name: "Startowy", tagline: "Dla firm na samym początku", price: 200, limit: 10, extra: 10 },
    { id: "standard", name: "Standard", tagline: "Mała firma, proste potrzeby", price: 300, limit: 15, extra: 10 },
    { id: "plus", name: "Plus", tagline: "Więcej dokumentów, więcej możliwości", price: 450, limit: 45, extra: 10, featured: true },
    { id: "premium", name: "Premium", tagline: "Dla firm w fazie wzrostu", price: 700, limit: 90, extra: 10 },
    { id: "vip", name: "VIP", tagline: "Pełna obsługa bez kompromisów", price: 900, limit: null, extra: 10 },
  ],
};

export const packIncludes = [
  "Konsultacje z dedykowaną księgową lub księgowym",
  "Dostęp do systemu i archiwum dokumentów online",
  "Deklaracje VAT, CIT, PIT i PCC – wyliczenie i wysyłka",
];

export const hr = [
  { id: "etat", name: "Umowa o pracę", unit: "osoba / miesiąc", price: 60, desc: "Pełna obsługa pracownika etatowego – od umowy po PIT.", items: ["Sporządzenie umowy o pracę", "Lista płac i rozliczenie ZUS", "Prowadzenie akt osobowych", "Roczny PIT-11"] },
  { id: "zlecenie", name: "Umowa zlecenie / o dzieło", unit: "osoba", price: 45, desc: "Rozliczenie umów cywilnoprawnych z podatkiem i ZUS.", items: ["Sporządzenie umowy", "Rachunek i zgłoszenia do ZUS", "Obsługa podatkowa", "Roczny PIT-11"] },
  { id: "student", name: "Zlecenie bez składek ZUS", unit: "osoba", price: 35, desc: "Rozliczenie młodych zleceniobiorców zwolnionych ze składek.", items: ["Umowa bez składek ZUS", "Rachunek miesięczny", "Obsługa podatkowa", "Roczny PIT-11"] },
  { id: "zarzad", name: "Członek zarządu (powołanie)", unit: "osoba", price: 35, desc: "Wynagrodzenie zarządu z tytułu powołania.", items: ["Ewidencja wynagrodzenia", "Rozliczenie podatkowe", "Miesięczne zestawienie wypłat", "Roczny PIT-11"] },
];

export const invoicingAddon = 10;
export const VAT = 0.23;
/** Na wyciągu bankowym każde rozpoczęte 20 pozycji liczymy jako 1 dokument. */
export const BANK_LINES_PER_DOC = 20;

export type Estimate = {
  pack: Pack;
  docs: number;
  extraDocs: number;
  accounting: number;
  hrCost: number;
  addons: number;
  total: number;
  /** true, gdy liczba dokumentów wykracza poza pakiety z limitem – kwota jest dolnym szacunkiem */
  individual: boolean;
};

export type EstimateInput = {
  kind: EntityKind;
  invoices: number;
  bankLines: number;
  hr: Record<string, number>;
  invoicing: boolean;
};

export const bankDocs = (lines: number) => (lines > 0 ? Math.ceil(lines / BANK_LINES_PER_DOC) : 0);

/** Dobiera najtańszy pakiet dla podanej liczby dokumentów i sumuje kadry oraz dodatki. Kwoty netto. */
export function estimate(input: EstimateInput): Estimate {
  const docs = Math.max(0, Math.round(input.invoices)) + bankDocs(input.bankLines);
  const limited = packs[input.kind].filter((p) => p.limit !== null);
  const vip = packs[input.kind].find((p) => p.limit === null)!;
  let best = limited[0];
  let bestCost = Infinity;
  for (const p of limited) {
    const cost = p.price + Math.max(0, docs - (p.limit as number)) * p.extra;
    if (cost < bestCost) {
      best = p;
      bestCost = cost;
    }
  }
  const individual = bestCost >= vip.price;
  const pack = individual ? vip : best;
  const accounting = individual ? vip.price : bestCost;
  const extraDocs = individual ? 0 : Math.max(0, docs - (best.limit as number));
  const hrCost = hr.reduce((sum, h) => sum + (input.hr[h.id] || 0) * h.price, 0);
  const addons = input.invoicing ? invoicingAddon : 0;
  return { pack, docs, extraDocs, accounting, hrCost, addons, total: accounting + hrCost + addons, individual };
}

export const zl = (n: number) => `${Math.round(n).toLocaleString("pl-PL")} zł`;
