import type { Metadata } from "next";

type PageMetaInput = {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
};

/** Spójne metadane strony: canonical, Open Graph, Twitter card, robots. */
export function pageMeta({ path, title, description, type = "website", noindex, publishedTime, modifiedTime, image = "/og-default.jpg" }: PageMetaInput): Metadata {
  return {
    // tytuły długie (>50 znaków) lub zawierające już nazwę marki nie dostają sufiksu „| E-Numerika”
    title: title.includes("E-Numerika") || title.length > 50 ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "pl_PL",
      siteName: "E-Numerika",
      url: path,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
