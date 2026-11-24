import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, Building2, ChartNoAxesCombined, FileText, Globe, Handshake, Phone, Rocket, Scale, UserRound, Users, Workflow } from "lucide-react";
import { Button, Container } from "./ui";
import { site } from "@/data/site";
import type { Service } from "@/data/services";
import { formatDate, type Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

const icons = { book: BookOpenCheck, users: Users, scale: Scale, chart: ChartNoAxesCombined, file: FileText, handshake: Handshake, building: Building2, user: UserRound, rocket: Rocket, workflow: Workflow, globe: Globe };

export function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  const I = icons[name];
  return <I className={className} aria-hidden />;
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link href={`/${s.slug}/`} className="card group relative flex flex-col p-7 transition-all hover:-translate-y-1 hover:border-navy/40 hover:shadow-[0_24px_50px_-34px_rgba(0,51,102,0.6)]">
      {s.badge && <span className="absolute right-5 top-5 rounded-full bg-sky px-3 py-1 text-xs font-semibold text-navy">{s.badge}</span>}
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-navy transition-colors group-hover:bg-navy group-hover:text-sky">
        <ServiceIcon name={s.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-6 text-[1.4rem]">{s.name}</h3>
      <p className="mt-3 flex-1 text-[0.98rem]">{s.teaser}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-navy">
        Zobacz szczegóły
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function PostCard({ post, priority }: { post: Post; priority?: boolean }) {
  return (
    <article className="card group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-navy/40">
      <Link href={`/${post.slug}/`} className="relative block aspect-[16/9] overflow-hidden bg-mint" tabIndex={-1} aria-hidden>
        {post.image && <Image src={post.image} alt="" fill priority={priority} sizes="(min-width: 1024px) 380px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min czytania
        </p>
        <h3 className="mt-3 text-[1.3rem] leading-snug">
          <Link href={`/${post.slug}/`} className="hover:text-navy-2">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.96rem]">{post.excerpt}</p>
        <Link href={`/${post.slug}/`} className="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-navy" aria-label={`Czytaj: ${post.title}`}>
          Czytaj dalej
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function CtaBand({ title = "Porozmawiajmy o Twojej księgowości", text = "Zadzwoń albo napisz. Zapytamy o formę działalności i liczbę dokumentów, a potem podamy konkretną cenę.", className }: { title?: string; text?: string; className?: string }) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <Container>
        <div className="on-dark relative overflow-hidden rounded-[2.25rem] bg-navy px-7 py-12 text-white sm:px-14 sm:py-16">
          <Image src="/images/photos/wspolpraca-uscisk-dloni.webp" alt="" fill sizes="100vw" className="object-cover object-right opacity-40" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-balance text-3xl text-white sm:text-[2.6rem]">{title}</h2>
              <p className="mt-4 max-w-xl text-lg text-white/75">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Button href="/kontakt/" variant="sky">
                Napisz do nas
              </Button>
              <a href={site.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-semibold text-white hover:bg-white/10">
                <Phone className="h-4 w-4" aria-hidden />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Nagłówek podstron: kremowe tło w linie księgi. */
export function PageHero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="ledger-lines absolute inset-0" />
      <div aria-hidden className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-sky/30 blur-3xl" />
      <Container className="relative py-14 sm:py-20">{children}</Container>
    </section>
  );
}
