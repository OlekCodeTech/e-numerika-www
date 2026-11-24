import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, RefreshCw } from "lucide-react";
import Faq from "@/components/Faq";
import { Photo } from "@/components/HeroArt";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { CtaBand, PageHero, PostCard, ServiceCard, ServiceIcon } from "@/components/blocks";
import { Breadcrumbs, Button, CheckList, Container, SectionHead } from "@/components/ui";
import { cities, getCity, type City } from "@/data/cities";
import { packs } from "@/data/pricing";
import { getService, services, type Service } from "@/data/services";
import { site } from "@/data/site";
import { formatDate, getAllPosts, getPost, type Post } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

/** Jeden segment obsługuje usługi, strony lokalne i wpisy bloga (adresy wpisów jak w starym WordPressie). */
export function generateStaticParams(): Params[] {
  return [...services.map((s) => ({ slug: s.slug })), ...cities.map((c) => ({ slug: c.slug })), ...getAllPosts().map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return pageMeta({ path: `/${slug}/`, title: service.metaTitle, description: service.metaDescription });
  const city = getCity(slug);
  if (city) return pageMeta({ path: `/${slug}/`, title: city.metaTitle, description: city.metaDescription });
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({ path: `/${slug}/`, title: post.seoTitle, description: post.seoDescription, type: "article", publishedTime: post.date, modifiedTime: post.updated, image: post.image || undefined });
}

export default async function SlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return <ServiceView s={service} />;
  const city = getCity(slug);
  if (city) return <CityView c={city} />;
  const post = getPost(slug);
  if (!post) notFound();
  return <PostView post={post} />;
}

const servicePhoto: Record<string, [string, string]> = {
  "kompletna-obsluga-ksiegowa": ["ksiegowa-przy-biurku", "Księgowa pracuje nad dokumentami firmy przy biurku"],
  "ksiegowosc-spolki-z-oo": ["kalkulator-i-faktury", "Księgowanie faktur spółki z kalkulatorem"],
  "ksiegowosc-jdg": ["faktura-zdjecie-telefonem", "Przedsiębiorca fotografuje fakturę telefonem, aby wysłać ją do księgowej"],
  "obsluga-kadrowa-i-placowa": ["kadry-omowienie-dokumentow", "Omówienie dokumentów kadrowych z pracodawcą"],
  "sprawozdania-i-bilans": ["program-ksiegowy-ekran", "Zestawienie księgowe na ekranie monitora"],
  "polityka-rachunkowosci": ["biuro-rachunkowe-wnetrze", "Biurko i segregatory w biurze rachunkowym"],
  "doradztwo-podatkowe": ["kadry-omowienie-dokumentow", "Konsultacja podatkowa nad dokumentami"],
  "wspieramy-i-doradzamy": ["wspolpraca-uscisk-dloni", "Uścisk dłoni księgowej i klienta nad dokumentami"],
  "zakladanie-spolek-z-oo": ["wspolpraca-uscisk-dloni", "Uścisk dłoni po podpisaniu dokumentów spółki"],
  "schematy-dekretacji-rewizor-nexo": ["program-ksiegowy-ekran", "Program księgowy z tabelami zapisów na monitorze"],
  "biuro-rachunkowe-online": ["faktura-zdjecie-telefonem", "Zdjęcie faktury telefonem do księgowości online"],
};

function ServiceView({ s }: { s: Service }) {
  const [photo, photoAlt] = servicePhoto[s.slug] ?? ["ksiegowa-przy-biurku", s.name];
  const related = services.filter((x) => x.slug !== s.slug && x.group === s.group).slice(0, 3);
  const others = related.length >= 2 ? related : services.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={breadcrumbSchema(siteUrl, [{ name: "Oferta", path: "/oferta/" }, { name: s.name, path: `/${s.slug}/` }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.metaDescription, url: `${siteUrl}/${s.slug}/`, provider: { "@id": `${siteUrl}/#firma` }, areaServed: "PL", serviceType: s.name }} />
      <PageHero>
        <Breadcrumbs items={[{ name: "Oferta", href: "/oferta/" }, { name: s.short }]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-sky">
              <ServiceIcon name={s.icon} className="h-7 w-7" />
            </span>
            <h1 className="mt-6 text-balance text-4xl sm:text-5xl lg:text-[3.4rem]">{s.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg sm:text-xl">{s.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/kontakt/#formularz">Zapytaj o wycenę</Button>
              <Button href={s.group === "wdrozenia" ? site.phoneHref : "/uslugi-ksiegowe-cennik/"} variant="ghost">
                {s.group === "wdrozenia" ? `Zadzwoń: ${site.phone}` : "Zobacz cennik"}
              </Button>
            </div>
          </div>
          <div className="relative pb-24 sm:pb-20">
            <Photo name={photo} alt={photoAlt} priority />
            <div className="card absolute bottom-0 left-5 right-5 p-5 shadow-xl sm:left-8 sm:right-8">
              <CheckList className="text-[0.95rem]" items={s.highlights} />
            </div>
          </div>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-12">
            {s.sections.map((sec) => (
              <div key={sec.title}>
                <h2 className="text-[1.9rem] sm:text-[2.2rem]">{sec.title}</h2>
                <p className="mt-4 text-lg">{sec.text}</p>
                {sec.bullets && <CheckList className="mt-6" items={sec.bullets} />}
              </div>
            ))}
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="on-dark rounded-[1.75rem] bg-navy p-7 text-white">
              <p className="eyebrow on-dark">Bezpłatna wycena</p>
              <p className="mt-4 font-display text-2xl font-semibold leading-tight text-white">Opowiedz nam o swojej firmie</p>
              <p className="mt-3 text-white/75">Odpowiadamy zwykle w ciągu jednego dnia roboczego.</p>
              <div className="mt-6 space-y-3">
                <Button href="/kontakt/#formularz" variant="sky" className="w-full">
                  Napisz do nas
                </Button>
                <Button href={site.phoneHref} variant="outline-light" className="w-full" arrow={false}>
                  {site.phone}
                </Button>
              </div>
            </div>
            {s.group !== "wdrozenia" && (
              <Link href="/kalkulator-ksiegowosci/" className="card mt-4 block p-6 transition-colors hover:border-navy/40">
                <p className="font-semibold text-ink">Kalkulator księgowości</p>
                <p className="mt-1 text-sm text-muted">
                  JDG od {packs.jdg[0].price} zł, spółki od {packs.spolka[0].price} zł netto. Policz cenę dla swojej liczby dokumentów.
                </p>
              </Link>
            )}
          </aside>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-2/60 py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHead eyebrow="FAQ" title={`${s.short}: najczęstsze pytania`} />
          <div className="mt-8">
            <Faq items={s.faq} />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHead eyebrow="Zobacz także" title="Powiązane usługi" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ServiceCard key={o.slug} s={o} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand className="pt-0 sm:pt-0" />
    </>
  );
}

function CityView({ c }: { c: City }) {
  const main = ["ksiegowosc-jdg", "ksiegowosc-spolki-z-oo", "obsluga-kadrowa-i-placowa", "sprawozdania-i-bilans", "zakladanie-spolek-z-oo", "biuro-rachunkowe-online"].map((s) => getService(s)!);
  const modeText = { siedziba: "Siedziba biura", blisko: "Biuro w pobliżu i obsługa online", dojazd: "Obsługa online i spotkania na miejscu" }[c.mode];
  return (
    <>
      <JsonLd data={breadcrumbSchema(siteUrl, [{ name: `Biuro rachunkowe ${c.name}`, path: `/${c.slug}/` }])} />
      <PageHero>
        <Breadcrumbs items={[{ name: `Biuro rachunkowe ${c.name}` }]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
         <div>
          <p className="eyebrow">
            {modeText} · woj. {c.region}
          </p>
          <h1 className="mt-5 text-balance text-4xl sm:text-5xl lg:text-[3.4rem]">Biuro rachunkowe {c.name}</h1>
          <p className="mt-5 text-lg sm:text-xl">{c.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/kalkulator-ksiegowosci/">Policz koszt księgowości</Button>
            <Button href={site.phoneHref} variant="ghost" arrow={false}>
              Zadzwoń: {site.phone}
            </Button>
          </div>
         </div>
         <Photo name={c.mode === "dojazd" ? "faktura-zdjecie-telefonem" : "ksiegowa-przy-biurku"} alt={`Księgowość dla firm ${c.from}`} priority />
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-10">
            {c.local.map((l) => (
              <div key={l.title}>
                <h2 className="text-[1.9rem] sm:text-[2.2rem]">{l.title}</h2>
                <p className="mt-4 text-lg">{l.text}</p>
              </div>
            ))}
            <div>
              <h2 className="text-[1.9rem] sm:text-[2.2rem]">Ile kosztuje księgowość {c.loc}?</h2>
              <p className="mt-4 text-lg">
                Cennik jest taki sam dla wszystkich klientów i zależy od liczby dokumentów w miesiącu. Jednoosobowa działalność płaci od {packs.jdg[0].price} zł netto, a spółka z o.o. od {packs.spolka[0].price} zł netto. Obsługa pracownika na umowie o pracę kosztuje 60 zł netto miesięcznie.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/uslugi-ksiegowe-cennik/" variant="ghost">
                  Pełny cennik
                </Button>
              </div>
            </div>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-7">
              <p className="flex items-center gap-2 font-semibold text-ink">
                <MapPin className="h-5 w-5 text-teal" aria-hidden />
                Obsługujemy też okolice
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.nearby.map((n) => (
                  <li key={n} className="rounded-full bg-mint px-3 py-1 text-sm font-medium text-navy">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-7">
              <p className="font-semibold text-ink">Adres biura</p>
              <p className="mt-2">
                {site.street}
                <br />
                {site.postal} {site.city}
              </p>
              <a href={site.mapUrl} target="_blank" rel="noopener" className="mt-3 inline-block text-sm font-semibold text-navy underline">
                Pokaż na mapie
              </a>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-y border-line bg-paper-2/60 py-16 sm:py-20">
        <Container>
          <SectionHead eyebrow="Usługi" title={`Co robimy dla firm ${c.from}`} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {main.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHead eyebrow="FAQ" title={`Księgowość ${c.loc}: pytania i odpowiedzi`} />
          <div className="mt-8">
            <Faq items={c.faq} />
          </div>
        </Container>
      </section>
      <CtaBand className="pt-0 sm:pt-0" />
    </>
  );
}

function PostView({ post }: { post: Post }) {
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    dateModified: post.updated,
    image: post.image ? `${siteUrl}${post.image}` : undefined,
    mainEntityOfPage: `${siteUrl}/${post.slug}/`,
    author: { "@type": "Organization", name: site.name, url: siteUrl },
    publisher: { "@id": `${siteUrl}/#firma` },
  };
  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={breadcrumbSchema(siteUrl, [{ name: "Blog", path: "/porady-dla-przedsiebiorcow/" }, { name: post.title, path: `/${post.slug}/` }])} />
      <article>
        <PageHero>
          <div className="mx-auto max-w-3xl">
            <Link href="/porady-dla-przedsiebiorcow/" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-teal">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Wszystkie artykuły
            </Link>
            {post.categories.length > 0 && <p className="eyebrow mt-6">{post.categories.join(" · ")}</p>}
            <h1 className="mt-5 text-balance text-[2.2rem] leading-tight sm:text-5xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              {post.updated !== post.date && (
                <span className="inline-flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4" aria-hidden />
                  aktualizacja {formatDate(post.updated)}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {post.readingMinutes} min czytania
              </span>
            </div>
          </div>
        </PageHero>

        <Container className="max-w-3xl py-12 sm:py-16">
          {post.image && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-line bg-mint">
              <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faq.length > 0 && (
            <div className="mt-14">
              <h2 className="text-[1.9rem]">Najczęstsze pytania</h2>
              <div className="mt-6">
                <Faq items={post.faq} />
              </div>
            </div>
          )}

          <div className="on-dark mt-14 rounded-[1.75rem] bg-navy p-7 text-white sm:p-9">
            <p className="eyebrow on-dark">Potrzebujesz wsparcia?</p>
            <p className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">Zajmiemy się księgowością Twojej firmy</p>
            <p className="mt-3 text-white/75">Policz cenę w kalkulatorze albo napisz, a odpowiemy na pytania dotyczące Twojej sytuacji.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/kalkulator-ksiegowosci/" variant="sky">
                Policz koszt księgowości
              </Button>
              <Button href="/kontakt/" variant="outline-light">
                Kontakt
              </Button>
            </div>
          </div>
        </Container>
      </article>

      <section className="border-t border-line bg-paper-2/60 py-16 sm:py-20">
        <Container>
          <SectionHead eyebrow="Blog" title="Czytaj także" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
