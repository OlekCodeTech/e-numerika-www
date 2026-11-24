import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { CtaBand, PageHero, PostCard } from "@/components/blocks";
import { Breadcrumbs, Container, SectionHead } from "@/components/ui";
import { getAllPosts } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";
import { siteUrl } from "@/lib/utils";

export const metadata = pageMeta({
  path: "/porady-dla-przedsiebiorcow/",
  title: "Blog księgowy – porady dla przedsiębiorców",
  description: "Praktyczne porady dla przedsiębiorców: spółka z o.o., koszty firmowe, podatki, ZUS i księgowość online. Artykuły pisane przez biuro rachunkowe E-Numerika.",
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <JsonLd data={breadcrumbSchema(siteUrl, [{ name: "Blog", path: "/porady-dla-przedsiebiorcow/" }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", name: "Porady dla przedsiębiorców – E-Numerika", url: `${siteUrl}/porady-dla-przedsiebiorcow/`, blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${siteUrl}/${p.slug}/`, datePublished: p.date })) }} />
      <PageHero>
        <Breadcrumbs items={[{ name: "Blog" }]} />
        <div className="mt-8">
          <SectionHead as="h1" eyebrow="Blog" title="Porady dla przedsiębiorców" lead="Podatki, ZUS, spółki i koszty firmowe wyjaśnione bez urzędowego języka." />
        </div>
      </PageHero>
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <PostCard key={p.slug} post={p} priority={i < 3} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand className="pt-0 sm:pt-0" />
    </>
  );
}
