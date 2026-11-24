import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  date: string;
  updated: string;
  categories: string[];
  excerpt: string;
  /** <title> – gdy brak, używany jest title */
  seoTitle: string;
  /** meta description 140–160 znaków – gdy brak, używany jest excerpt */
  seoDescription: string;
  image: string;
  /** Pytania i odpowiedzi pod wpisem (FAQPage schema) – frontmatter `faq: [{q, a}]` */
  faq: { q: string; a: string }[];
  html: string;
  readingMinutes: number;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

marked.setOptions({ gfm: true, breaks: false });

function prefixInternalUrls(html: string) {
  if (!basePath) return html;
  return html.replace(/(src|href)="\/(?!\/)/g, `$1="${basePath}/`);
}

const toDay = (v: unknown): string => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v).slice(0, 10) : "");

const shorten = (s: string, max: number) => (s.length <= max ? s : s.slice(0, max).replace(/\s+\S*$/, "") + "…");
const cleanExcerpt = (s: string) => s.replace(/\s*\[(…|&hellip;)\]\s*$/, "").trim();

function loadPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  // H1 jest tytułem strony – nagłówki „#” w treści schodzą poziom niżej
  const html = prefixInternalUrls((marked.parse(content) as string).replace(/<(\/?)h1(?=[\s>])/g, "<$1h2"));
  const words = content.split(/\s+/).filter(Boolean).length;
  const excerpt = cleanExcerpt(String(data.excerpt ?? data.seoDescription ?? ""));
  return {
    slug,
    title: data.title ?? slug,
    date: toDay(data.date),
    updated: toDay(data.updated) || toDay(data.date),
    categories: data.categories ?? [],
    excerpt: shorten(excerpt, 190),
    seoTitle: data.seoTitle ?? data.title ?? slug,
    seoDescription: data.seoDescription ?? shorten(excerpt, 155),
    image: data.image ?? "",
    faq: Array.isArray(data.faq)
      ? data.faq.filter((f: { q?: string; a?: string }) => f?.q && f?.a).map((f: { q: string; a: string }) => ({ q: String(f.q), a: String(f.a) }))
      : [],
    html,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

/** Pliki zaczynające się od „_” (np. _szablon.md) są pomijane. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(loadPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  if (slug.startsWith("_")) return undefined;
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  return loadPost(`${slug}.md`);
}

export function getPage(slug: string): { title: string; updated?: string; html: string } | undefined {
  const file = path.join(process.cwd(), "content", "pages", `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { title: data.title ?? slug, updated: toDay(data.updated) || undefined, html: prefixInternalUrls(marked.parse(content) as string) };
}

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
