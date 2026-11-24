import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { PageHero } from "@/components/blocks";
import { Breadcrumbs, Container, SectionHead } from "@/components/ui";
import { cities } from "@/data/cities";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

export const metadata = pageMeta({
  path: "/kontakt/",
  title: "Kontakt – biuro rachunkowe E-Numerika",
  description: "Skontaktuj się z biurem rachunkowym E-Numerika: tel. +48 666 665 612, biuro@e-numerika.pl, ul. Korzenna 23, Bezrzecze k. Szczecina. Odpowiedź w 1 dzień roboczy.",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(siteUrl, [{ name: "Kontakt", path: "/kontakt/" }])} />
      <PageHero>
        <Breadcrumbs items={[{ name: "Kontakt" }]} />
        <div className="mt-8">
          <SectionHead as="h1" eyebrow="Kontakt" title="Porozmawiajmy o Twojej księgowości" lead="Zadzwoń, napisz albo wyślij formularz. Wycena jest bezpłatna i do niczego nie zobowiązuje." />
        </div>
      </PageHero>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          <div className="space-y-4">
            <a href={site.phoneHref} className="card flex items-center gap-5 p-6 transition-colors hover:border-navy/40">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-sky">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-muted">Telefon</span>
                <span className="tnum font-display text-2xl font-semibold text-ink">{site.phone}</span>
              </span>
            </a>
            <a href={`mailto:${site.email}`} className="card flex items-center gap-5 p-6 transition-colors hover:border-navy/40">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-sky">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-muted">E-mail</span>
                <span className="break-all font-display text-xl font-semibold text-ink sm:text-2xl">{site.email}</span>
              </span>
            </a>
            <div className="card p-6">
              <div className="flex items-center gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-sky">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-muted">Biuro</span>
                  <span className="font-display text-xl font-semibold text-ink">
                    {site.street}, {site.postal} {site.city}
                  </span>
                </span>
              </div>
              <p className="mt-4 text-[0.97rem]">Przed wizytą prosimy o kontakt telefoniczny. Spotkania w Wieluniu i okolicach umawiamy indywidualnie.</p>
              <a href={site.mapUrl} target="_blank" rel="noopener" className="mt-3 inline-block font-semibold text-navy underline">
                Wyznacz trasę w Mapach Google
              </a>
            </div>
            <div className="card p-6 text-[0.97rem]">
              <p className="font-semibold text-ink">Obsługujemy firmy z miast:</p>
              <p className="mt-2">{cities.map((c) => c.name).join(", ")} oraz zdalnie z całej Polski.</p>
              <p className="tnum mt-4 text-muted">
                NIP {site.nip} · REGON {site.regon}
              </p>
            </div>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
