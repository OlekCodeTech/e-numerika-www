import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { getAllPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics: [string, number][] = [
    ["/", 1],
    ["/oferta/", 0.9],
    ["/uslugi-ksiegowe-cennik/", 0.9],
    ["/kalkulator-ksiegowosci/", 0.9],
    ["/porady-dla-przedsiebiorcow/", 0.8],
    ["/o-nas/", 0.6],
    ["/kontakt/", 0.7],
    ["/polityka-prywatnosci/", 0.2],
  ];
  return [
    ...statics.map(([p, priority]) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority })),
    ...services.map((s) => ({ url: `${siteUrl}/${s.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...cities.map((c) => ({ url: `${siteUrl}/${c.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getAllPosts().map((p) => ({ url: `${siteUrl}/${p.slug}/`, lastModified: new Date(p.updated || p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
