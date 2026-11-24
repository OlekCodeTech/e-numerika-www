import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks";
import { Breadcrumbs, Container, SectionHead } from "@/components/ui";
import { formatDate, getPage } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/polityka-prywatnosci/",
  title: "Polityka prywatności",
  description: "Polityka prywatności serwisu e-numerika.pl: kto jest administratorem danych, w jakim celu je przetwarzamy i jakie prawa Ci przysługują.",
});

export default function PrivacyPage() {
  const page = getPage("polityka-prywatnosci");
  if (!page) notFound();
  return (
    <>
      <PageHero>
        <Breadcrumbs items={[{ name: page.title }]} />
        <div className="mt-8">
          <SectionHead as="h1" title={page.title} lead={page.updated ? `Ostatnia aktualizacja: ${formatDate(page.updated)}` : undefined} />
        </div>
      </PageHero>
      <Container className="max-w-3xl py-14 sm:py-20">
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
      </Container>
    </>
  );
}
