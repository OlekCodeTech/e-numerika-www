import { CtaBand, PageHero, ServiceCard } from "@/components/blocks";
import { Photo } from "@/components/HeroArt";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { Breadcrumbs, Button, Container, SectionHead } from "@/components/ui";
import { serviceGroups, services } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

export const metadata = pageMeta({
  path: "/oferta/",
  title: "Oferta biura rachunkowego – usługi księgowe i kadrowe",
  description: "Oferta E-Numerika: księgowość JDG i spółek, kadry i płace, sprawozdania finansowe, zakładanie spółek, wsparcie podatkowe oraz schematy dekretacji Rewizor nexo.",
});

export default function OfferPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(siteUrl, [{ name: "Oferta", path: "/oferta/" }])} />
      <PageHero>
        <Breadcrumbs items={[{ name: "Oferta" }]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
         <div>
          <SectionHead as="h1" eyebrow="Oferta" title="Usługi księgowe i kadrowe dla firm" lead="Prowadzimy księgowość jednoosobowych działalności i spółek, rozliczamy pracowników i pomagamy w decyzjach podatkowych. Dla biur rachunkowych i działów księgowych konfigurujemy też Rewizor nexo." />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/kalkulator-ksiegowosci/">Policz koszt księgowości</Button>
            <Button href="/uslugi-ksiegowe-cennik/" variant="ghost">
              Zobacz cennik
            </Button>
          </div>
         </div>
         <Photo name="biuro-rachunkowe-wnetrze" alt="Jasne wnętrze biura rachunkowego z biurkiem i segregatorami" priority />
        </div>
      </PageHero>

      {serviceGroups.map((g, i) => (
        <section key={g.id} className={`py-16 sm:py-20 ${i % 2 ? "border-y border-line bg-paper-2/60" : ""}`}>
          <Container>
            <SectionHead eyebrow={`0${i + 1}`} title={g.title} lead={g.text} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.group === g.id)
                .map((s) => (
                  <ServiceCard key={s.slug} s={s} />
                ))}
            </div>
          </Container>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
