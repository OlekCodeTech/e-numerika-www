import Link from "next/link";
import { ArrowRight, CloudUpload, Calculator as CalcIcon, MapPin, MessagesSquare, ShieldCheck, UserRoundCheck } from "lucide-react";
import Calculator from "@/components/Calculator";
import Deadlines from "@/components/Deadlines";
import Faq from "@/components/Faq";
import HeroArt, { Photo } from "@/components/HeroArt";
import { CtaBand, PostCard, ServiceCard } from "@/components/blocks";
import { Button, CheckList, Container, SectionHead } from "@/components/ui";
import { cities } from "@/data/cities";
import { packs } from "@/data/pricing";
import { services } from "@/data/services";
import { getAllPosts } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/",
  title: "Biuro rachunkowe E-Numerika – księgowość online i w Szczecinie",
  description: "Biuro rachunkowe E-Numerika: księgowość JDG i spółek z o.o., kadry i płace, sprawozdania. Online w całej Polsce i stacjonarnie pod Szczecinem. Od 200 zł netto.",
});

const faq = [
  { q: "Jak rozpocząć współpracę?", a: "Zadzwoń lub wyślij formularz. Zapytamy o formę działalności, liczbę dokumentów i pracowników, a następnie przedstawimy cenę. Po podpisaniu umowy i pełnomocnictw przejmujemy rozliczenia od najbliższego miesiąca." },
  { q: "Czy świadczycie usługi całkowicie online?", a: "Tak. Księgowość i kadry możemy prowadzić w pełni zdalnie: dokumenty przesyłasz przez internet, a umowę podpisujesz elektronicznie. Klientów ze Szczecina i okolic zapraszamy też do biura w Bezrzeczu." },
  { q: "Ile kosztuje księgowość?", a: `Pakiety dla jednoosobowych działalności zaczynają się od ${packs.jdg[0].price} zł netto, a dla spółek od ${packs.spolka[0].price} zł netto miesięcznie. Cena zależy od liczby dokumentów. Kalkulator na stronie pokaże kwotę dla Twojej firmy.` },
  { q: "Czy muszę instalować oprogramowanie?", a: "Nie. Udostępniamy narzędzia online, w tym archiwum dokumentów i program do wystawiania faktur." },
  { q: "Czy zajmujecie się kadrami i płacami?", a: "Tak. Przygotowujemy umowy, listy płac, deklaracje ZUS, akta osobowe i roczne PIT-11. Rozliczenie jednej osoby kosztuje od 35 do 60 zł netto." },
  { q: "Czy przejmiecie księgi od innego biura?", a: "Tak, również w trakcie roku. Odbieramy dokumentację, weryfikujemy salda i kontynuujemy rozliczenia bez przerwy." },
];

const steps = [
  { icon: MessagesSquare, title: "Rozmowa i wycena", text: "Poznajemy firmę: formę prawną, liczbę dokumentów, pracowników. Od razu podajemy cenę pakietu." },
  { icon: UserRoundCheck, title: "Umowa i pełnomocnictwa", text: "Podpisujesz dokumenty elektronicznie. Zgłaszamy pełnomocnictwa do urzędu skarbowego i ZUS." },
  { icon: CloudUpload, title: "Przesyłasz dokumenty", text: "Faktury i wyciągi wgrywasz online lub przekazujesz w biurze, w dowolnym momencie miesiąca." },
  { icon: ShieldCheck, title: "My rozliczamy miesiąc", text: "Księgujemy, wysyłamy deklaracje i informujemy, ile oraz do kiedy zapłacić." },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const featured = ["ksiegowosc-jdg", "ksiegowosc-spolki-z-oo", "obsluga-kadrowa-i-placowa", "sprawozdania-i-bilans", "zakladanie-spolek-z-oo", "schematy-dekretacji-rewizor-nexo"].map((s) => services.find((x) => x.slug === s)!);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="ledger-lines absolute inset-0" />
        <Container className="relative grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="eyebrow">Biuro rachunkowe · Szczecin · Wieluń · online</p>
            <h1 className="mt-5 text-pretty text-[2.4rem] leading-[1.08] sm:text-[3.3rem] lg:text-[3.7rem]">
              Księgowość, w której <span className="text-teal">liczby się zgadzają</span>, a Ty masz spokój.
            </h1>
            <p className="mt-6 max-w-xl text-lg sm:text-xl">Prowadzimy księgi jednoosobowych działalności i spółek z o.o., kadry i płace oraz sprawozdania. Masz jedną, dedykowaną księgową i stałą cenę znaną z góry.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/kalkulator-ksiegowosci/">Policz koszt księgowości</Button>
              <Button href="/oferta/" variant="ghost">
                Zobacz ofertę
              </Button>
            </div>
            <CheckList className="mt-9 grid gap-x-8 gap-y-2.5 text-[0.98rem] sm:grid-cols-2" items={[`JDG od ${packs.jdg[0].price} zł netto`, `Spółki od ${packs.spolka[0].price} zł netto`, "Dokumenty online 24/7", "Przejmujemy księgi w trakcie roku"]} />
          </div>
          <HeroArt />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHead eyebrow="Usługi" title="Wszystko, czego firma potrzebuje od księgowości" lead="Od pierwszej faktury po sprawozdanie roczne. Zakres dobieramy do formy prawnej i etapu rozwoju firmy." />
            <Link href="/oferta/" className="inline-flex shrink-0 items-center gap-2 font-semibold text-navy hover:text-teal">
              Cała oferta <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </Container>
      </section>

      <section id="kalkulator" className="scroll-mt-24 border-y border-line bg-paper-2/60 py-20 sm:py-24">
        <Container>
          <SectionHead center eyebrow="Kalkulator" title="Sprawdź cenę, zanim zadzwonisz" lead="Podaj formę działalności i liczbę dokumentów. Kalkulator dobierze najtańszy pakiet z naszego cennika." />
          <div className="mt-12">
            <Calculator compact />
          </div>
          <p className="mt-6 text-center">
            <Link href="/kalkulator-ksiegowosci/" className="inline-flex items-center gap-2 font-semibold text-navy hover:text-teal">
              <CalcIcon className="h-4 w-4" aria-hidden />
              Pełny kalkulator z kadrami i płacami
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <Photo name="faktura-zdjecie-telefonem" alt="Przedsiębiorca robi telefonem zdjęcie faktury, żeby przesłać ją do biura rachunkowego" />
            <SectionHead eyebrow="Jak pracujemy" title="Cztery kroki do uporządkowanej księgowości" lead="Fakturę fotografujesz telefonem albo wgrywasz plik. Resztą zajmujemy się my: od zaksięgowania po wysyłkę deklaracji." />
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="card relative p-7">
                <span className="tnum font-display text-5xl font-semibold text-paper-2">0{i + 1}</span>
                <s.icon className="absolute right-7 top-7 h-7 w-7 text-teal" aria-hidden />
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-[0.97rem]">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="on-dark relative overflow-hidden bg-navy py-20 text-white sm:py-24">
        <div aria-hidden className="dots absolute inset-0 opacity-50" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead dark eyebrow="Dlaczego E-Numerika" title="Biuro, do którego można zadzwonić" lead="Łączymy wygodę księgowości online z tym, czego automaty nie dają: człowiekiem, który zna Twoją firmę i odpowiada za rozliczenia." />
            <CheckList dark className="mt-8 text-lg" items={["Jedna dedykowana księgowa zamiast infolinii", "Cennik jawny na stronie, bez ukrytych opłat", "Przypomnienia o podatkach i składkach przed terminem", "Bezpieczne archiwum dokumentów dostępne przez całą dobę", "Wsparcie przy kontroli i w kontaktach z urzędem"]} />
            <div className="mt-9">
              <Button href="/o-nas/" variant="sky">
                Poznaj nasze biuro
              </Button>
            </div>
          </div>
          <div className="text-ink">
            <Deadlines />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <SectionHead eyebrow="Gdzie działamy" title="Stacjonarnie pod Szczecinem, online w całej Polsce" lead="Biuro prowadzimy w Bezrzeczu. Firmy z Wielunia i okolic obsługujemy zdalnie, a na miejscu spotykamy się po umówieniu." />
              <Photo className="mt-8" name="kadry-omowienie-dokumentow" alt="Spotkanie księgowej z klientem nad dokumentami firmy" />
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}/`} className="card group flex items-center gap-4 px-5 py-4 transition-colors hover:border-navy/40">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-navy group-hover:bg-navy group-hover:text-sky">
                      <MapPin className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">Biuro rachunkowe {c.name}</span>
                      <span className="text-sm text-muted">{c.mode === "siedziba" ? "siedziba biura" : c.mode === "blisko" ? "biuro w pobliżu i online" : "online i spotkania na miejscu"}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-2/60 py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHead eyebrow="Blog" title="Baza wiedzy dla przedsiębiorców" />
            <Link href="/porady-dla-przedsiebiorcow/" className="inline-flex shrink-0 items-center gap-2 font-semibold text-navy hover:text-teal">
              Wszystkie artykuły <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="max-w-4xl">
          <SectionHead center eyebrow="FAQ" title="Masz pytania? Mamy odpowiedzi" />
          <div className="mt-10">
            <Faq items={faq} />
          </div>
        </Container>
      </section>

      <CtaBand className="pt-0 sm:pt-0" />
    </>
  );
}
