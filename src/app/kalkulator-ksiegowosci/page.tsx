import Calculator from "@/components/Calculator";
import Deadlines from "@/components/Deadlines";
import Faq from "@/components/Faq";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { CtaBand, PageHero } from "@/components/blocks";
import { Photo } from "@/components/HeroArt";
import { Breadcrumbs, Container, SectionHead } from "@/components/ui";
import { BANK_LINES_PER_DOC } from "@/data/pricing";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

export const metadata = pageMeta({
  path: "/kalkulator-ksiegowosci/",
  title: "Kalkulator księgowości – ile kosztuje biuro rachunkowe",
  description: "Policz, ile kosztuje księgowość Twojej firmy. Kalkulator dla JDG i spółek z o.o.: dokumenty, kadry i płace, program do faktur. Wynik od razu, bez podawania danych.",
});

const faq = [
  { q: "Jak działa kalkulator?", a: "Na podstawie formy działalności i liczby dokumentów dobiera najtańszy pakiet z naszego cennika, dolicza dokumenty ponad limit, obsługę kadrowo-płacową i wybrane dodatki." },
  { q: "Czy wynik jest wiążący?", a: "To szacunek oparty na aktualnym cenniku. Ostateczną cenę potwierdzamy po krótkiej rozmowie, bo zależy także od specyfiki branży i nietypowych rozliczeń." },
  { q: "Jak policzyć liczbę dokumentów?", a: `Zsumuj faktury sprzedaży i zakupu, rachunki, paragony oraz raporty kasowe z jednego miesiąca. Operacje na wyciągu bankowym wpisz osobno, bo każde ${BANK_LINES_PER_DOC} pozycji liczy się jako jeden dokument.` },
  { q: "Czy muszę podawać dane kontaktowe?", a: "Nie. Wynik widzisz od razu. Dane podajesz dopiero wtedy, gdy zdecydujesz się wysłać zapytanie." },
];

export default function CalculatorPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(siteUrl, [{ name: "Kalkulator", path: "/kalkulator-ksiegowosci/" }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Kalkulator kosztów księgowości", url: `${siteUrl}/kalkulator-ksiegowosci/`, applicationCategory: "FinanceApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: 0, priceCurrency: "PLN" } }} />
      <PageHero>
        <Breadcrumbs items={[{ name: "Kalkulator" }]} />
        <div className="mt-8">
          <SectionHead as="h1" eyebrow="Kalkulator" title="Ile kosztuje księgowość Twojej firmy?" lead="Ustaw formę działalności, liczbę dokumentów i pracowników. Cenę zobaczysz od razu, bez zostawiania numeru telefonu." />
        </div>
      </PageHero>

      <section className="py-14 sm:py-20">
        <Container>
          <Calculator />
        </Container>
      </section>

      <section className="border-y border-line bg-paper-2/60 py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Photo className="mb-10" name="kalkulator-i-faktury" alt="Liczenie kosztów księgowości na kalkulatorze" />
            <SectionHead eyebrow="Od czego zależy cena" title="Trzy rzeczy, które wpływają na koszt" />
            <ol className="mt-8 space-y-6">
              {[
                ["Forma prawna", "Spółka z o.o. prowadzi pełne księgi rachunkowe i sporządza sprawozdanie finansowe, dlatego jej obsługa kosztuje więcej niż KPiR lub ryczałt."],
                ["Liczba dokumentów", "To główny czynnik. Im więcej faktur i operacji bankowych, tym więcej pracy przy księgowaniu i uzgadnianiu rozrachunków."],
                ["Pracownicy", "Każda osoba na liście płac to umowa, lista płac, deklaracje ZUS i roczny PIT-11. Rozliczamy to osobną stawką za osobę."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5">
                  <span className="tnum flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-semibold text-sky">{i + 1}</span>
                  <div>
                    <h3 className="text-xl">{t}</h3>
                    <p className="mt-1.5">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Deadlines />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHead center eyebrow="FAQ" title="Pytania o kalkulator" />
          <div className="mt-8">
            <Faq items={faq} />
          </div>
        </Container>
      </section>
      <CtaBand className="pt-0 sm:pt-0" />
    </>
  );
}
