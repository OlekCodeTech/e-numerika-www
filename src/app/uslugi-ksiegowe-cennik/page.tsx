import Link from "next/link";
import { Check } from "lucide-react";
import Faq from "@/components/Faq";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import Pricing from "@/components/Pricing";
import { CtaBand, PageHero } from "@/components/blocks";
import { Breadcrumbs, Button, Container, SectionHead } from "@/components/ui";
import { BANK_LINES_PER_DOC, hr, invoicingAddon, packs } from "@/data/pricing";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

export const metadata = pageMeta({
  path: "/uslugi-ksiegowe-cennik/",
  title: "Cennik usług księgowych – pakiety od 200 zł netto",
  description: "Jawny cennik biura rachunkowego: księgowość JDG od 200 zł, spółki z o.o. od 320 zł netto, kadry i płace od 35 zł za osobę. Sprawdź, co zawiera każdy pakiet.",
});

const faq = [
  { q: "Co zawiera cena księgowości?", a: "Prowadzenie ksiąg, księgowanie kosztów i przychodów, wyliczenie oraz wysyłkę deklaracji VAT, CIT, PIT i PCC, kontakt z dedykowaną księgową oraz dostęp do archiwum dokumentów online." },
  { q: "Co liczymy jako dokument?", a: `Fakturę, rachunek, paragon, raport kasowy, rozliczenie podróży służbowej, amortyzację środka trwałego i polecenie księgowania. Na wyciągu bankowym każde ${BANK_LINES_PER_DOC} pozycji to jeden dokument.` },
  { q: "Co się dzieje, gdy przekroczę limit dokumentów?", a: "Za każdy dokument ponad limit doliczamy stałą kwotę podaną przy pakiecie. Jeśli przekroczenia powtarzają się, proponujemy przejście na wyższy pakiet, gdy jest tańszy." },
  { q: "Czy ceny są cenami netto?", a: "Tak, wszystkie ceny w cenniku są kwotami netto. Doliczamy do nich 23% VAT." },
  { q: "Czy mogę zmienić pakiet w trakcie współpracy?", a: "Tak. Pakiet dopasowujemy do faktycznej liczby dokumentów, także w dół." },
  { q: "Ile kosztuje sprawozdanie finansowe?", a: "Roczne sprawozdanie finansowe wyceniamy indywidualnie, w zależności od wielkości spółki. Kwotę podajemy przed rozpoczęciem współpracy." },
];

export default function PricingPage() {
  const offers = (["jdg", "spolka"] as const).flatMap((k) => packs[k].map((p) => ({ "@type": "Offer", name: `Księgowość ${k === "jdg" ? "JDG" : "spółki z o.o."} – pakiet ${p.name}`, price: p.price, priceCurrency: "PLN", description: p.limit ? `do ${p.limit} dokumentów miesięcznie` : "powyżej 90 dokumentów miesięcznie" })));
  return (
    <>
      <JsonLd data={breadcrumbSchema(siteUrl, [{ name: "Cennik", path: "/uslugi-ksiegowe-cennik/" }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "OfferCatalog", name: "Cennik usług księgowych E-Numerika", itemListElement: offers }} />
      <PageHero>
        <Breadcrumbs items={[{ name: "Cennik" }]} />
        <div className="mt-8">
          <SectionHead as="h1" eyebrow="Cennik" title="Cennik usług księgowych" lead="Pięć pakietów dla jednoosobowych działalności i pięć dla spółek. Płacisz za liczbę dokumentów, a nie za każdą rozmowę z księgową." />
          <div className="mt-8">
            <Button href="/kalkulator-ksiegowosci/">Policz cenę w kalkulatorze</Button>
          </div>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container>
          <Pricing />
          <p className="mt-8 text-center text-sm text-muted">Ceny netto za miesiąc. Program do wystawiania faktur: {invoicingAddon} zł netto miesięcznie.</p>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-2/60 py-16 sm:py-20">
        <Container>
          <SectionHead eyebrow="Kadry i płace" title="Rozliczenie pracowników i zleceniobiorców" lead="Płacisz za osoby, które faktycznie rozliczamy w danym miesiącu." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hr.map((h) => (
              <div key={h.id} className="card flex flex-col p-6">
                <h3 className="text-xl">{h.name}</h3>
                <p className="mt-2 min-h-12 text-sm text-muted">{h.desc}</p>
                <p className="tnum mt-4 flex items-baseline gap-1.5">
                  <span className="font-display text-[2.4rem] font-semibold leading-none text-ink">{h.price}</span>
                  <span className="text-sm text-muted">zł netto / {h.unit}</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {h.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" strokeWidth={3} aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="card p-8">
            <h2 className="text-2xl">Czym jest dokument?</h2>
            <p className="mt-4">
              Faktura VAT, rachunek, paragon, raport kasowy, rozliczenie podróży służbowej, amortyzacja środka trwałego oraz polecenie księgowania. Wyciąg bankowy liczymy według liczby operacji: każde {BANK_LINES_PER_DOC} pozycji to jeden dokument.
            </p>
          </div>
          <div className="card p-8">
            <h2 className="text-2xl">Co zawiera każdy pakiet?</h2>
            <p className="mt-4">
              Prowadzenie ksiąg, księgowanie kosztów i przychodów, wyliczenie i wysyłkę deklaracji podatkowych (VAT, CIT, PIT, PCC), opiekę dedykowanej księgowej oraz dostęp do archiwum dokumentów online. Sprawdź też <Link href="/oferta/" className="font-semibold text-navy underline">pełną ofertę</Link>.
            </p>
          </div>
        </Container>
        <Container className="mt-16 max-w-4xl">
          <SectionHead center eyebrow="FAQ" title="Pytania o cennik" />
          <div className="mt-8">
            <Faq items={faq} />
          </div>
        </Container>
      </section>
      <CtaBand className="pt-0 sm:pt-0" />
    </>
  );
}
