import { Eye, Handshake, Laptop, Timer } from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { CtaBand, PageHero } from "@/components/blocks";
import { Photo } from "@/components/HeroArt";
import { Breadcrumbs, Button, CheckList, Container, SectionHead } from "@/components/ui";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

export const metadata = pageMeta({
  path: "/o-nas/",
  title: "O nas – biuro rachunkowe E-Numerika",
  description: "E-Numerika to biuro rachunkowe z Bezrzecza pod Szczecinem. Prowadzimy księgowość JDG i spółek stacjonarnie oraz online. Poznaj nasze zasady współpracy.",
});

const values = [
  { icon: Handshake, title: "Indywidualne podejście", text: "Każda firma ma swoją specyfikę. Zakres obsługi i pakiet dobieramy do tego, jak naprawdę działasz." },
  { icon: Eye, title: "Przejrzystość", text: "Cennik publikujemy na stronie. Wiesz, ile zapłacisz, zanim podpiszesz umowę." },
  { icon: Laptop, title: "Nowoczesne narzędzia", text: "Dokumenty przesyłasz online, a archiwum masz pod ręką o każdej porze." },
  { icon: Timer, title: "Terminowość", text: "Deklaracje wysyłamy na czas, a o kwotach do zapłaty informujemy z wyprzedzeniem." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(siteUrl, [{ name: "O nas", path: "/o-nas/" }])} />
      <PageHero>
        <Breadcrumbs items={[{ name: "O nas" }]} />
        <div className="mt-8">
          <SectionHead as="h1" eyebrow="O nas" title="Biuro rachunkowe, które mówi ludzkim językiem" lead="E-Numerika powstała dla przedsiębiorców, którzy cenią rzetelność, terminowość i jasne zasady. Łączymy tradycyjne podejście do klienta z wygodą księgowości online." />
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-5 text-lg">
            <Photo name="kalkulator-i-faktury" alt="Księgowa liczy na kalkulatorze przy stosie faktur" />
            <h2 className="pt-4 text-[2rem] sm:text-[2.4rem]">Kim jesteśmy</h2>
            <p>Prowadzimy księgowość jednoosobowych działalności oraz spółek, a także obsługę kadrowo-płacową. Siedzibę mamy w Bezrzeczu pod Szczecinem, ale większość spraw załatwiamy przez internet, dlatego pracujemy z firmami z całej Polski, w tym z Wielunia i okolic.</p>
            <p>Wierzymy, że dobra księgowość to coś więcej niż poprawne deklaracje. To spokój przedsiębiorcy, który wie, ile zarabia, ile zapłaci podatku i że nikt go nie zaskoczy pismem z urzędu.</p>
            <p>Dlatego każdy klient ma u nas jedną osobę kontaktową. Znasz jej imię i numer telefonu, a ona zna Twoją firmę.</p>
            <div className="pt-3">
              <Button href="/kontakt/">Skontaktuj się z nami</Button>
            </div>
          </div>
          <div className="on-dark relative overflow-hidden rounded-[2rem] bg-navy p-8 text-white sm:p-10">
            <div aria-hidden className="dots absolute inset-0 opacity-60" />
            <div className="relative">
              <p className="eyebrow on-dark">Jak wygląda współpraca</p>
              <ol className="mt-7 space-y-6">
                {[
                  ["Rozmowa wstępna", "Poznajemy Twoje potrzeby i oczekiwania."],
                  ["Dopasowanie oferty", "Dobieramy pakiet do formy działalności i liczby dokumentów."],
                  ["Stały kontakt", "Jesteśmy dostępni telefonicznie, mailowo i online."],
                  ["Raportowanie", "Regularnie informujemy o sytuacji finansowej firmy."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="tnum flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky font-display font-semibold text-navy">{i + 1}</span>
                    <div>
                      <p className="font-display text-xl font-semibold text-white">{t}</p>
                      <p className="mt-0.5 text-white/75">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-2/60 py-16 sm:py-20">
        <Container>
          <SectionHead eyebrow="Zasady" title="Na czym opieramy pracę" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card p-7">
                <v.icon className="h-8 w-8 text-teal" aria-hidden />
                <h3 className="mt-5 text-xl">{v.title}</h3>
                <p className="mt-2 text-[0.97rem]">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Dlaczego my" title="Co zyskujesz" />
            <CheckList className="mt-8 text-lg" items={["Aktualną wiedzę o zmianach w przepisach podatkowych", "Obsługę stacjonarną i w pełni zdalną", "Jasne zasady rozliczeń bez ukrytych kosztów", "Wsparcie przy starcie firmy i przy zmianie biura", "Bezpieczne archiwum dokumentów online"]} />
          </div>
          <div className="card p-8">
            <h2 className="text-2xl">Dane firmy</h2>
            <dl className="mt-5 space-y-3">
              {[
                ["Nazwa", site.legalName],
                ["Adres", `${site.street}, ${site.postal} ${site.city}`],
                ["NIP", site.nip],
                ["REGON", site.regon],
                ["Telefon", site.phone],
                ["E-mail", site.email],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-line pb-3 last:border-0">
                  <dt className="text-muted">{k}</dt>
                  <dd className="tnum text-right font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
      <CtaBand className="pt-0 sm:pt-0" />
    </>
  );
}
