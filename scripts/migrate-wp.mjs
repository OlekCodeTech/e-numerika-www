// Jednorazowa migracja wpisów i polityki prywatności z WordPressa (REST) do Markdownu.
// Uruchomienie: node scripts/migrate-wp.mjs
import fs from "node:fs";
import path from "node:path";
import TurndownService from "turndown";
import sharp from "sharp";

const BASE = "https://e-numerika.pl/wp-json/wp/v2";
const UA = { headers: { "User-Agent": "Mozilla/5.0 (migration)" } };
const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", emDelimiter: "*" });
td.remove(["script", "style", "noscript"]);

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&hellip;/g, "…");
const strip = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const yaml = (s) => JSON.stringify(s);

const posts = await (await fetch(`${BASE}/posts?per_page=100&_embed=wp:featuredmedia,wp:term`, UA)).json();
fs.mkdirSync("content/posts", { recursive: true });
fs.mkdirSync("public/images/blog", { recursive: true });

for (const p of posts) {
  let image = "";
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  if (media?.source_url) {
    const buf = Buffer.from(await (await fetch(media.source_url, UA)).arrayBuffer());
    const file = `public/images/blog/${p.slug}.webp`;
    await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(file);
    image = `/images/blog/${p.slug}.webp`;
  }
  const cats = (p._embedded?.["wp:term"]?.[0] ?? []).map((t) => decode(t.name)).filter((n) => n !== "Bez kategorii" && n !== "Uncategorized");
  let md = td.turndown(p.content.rendered).replace(/\n{3,}/g, "\n\n");
  md = md.replace(/https?:\/\/e-numerika\.pl\//g, "/");
  const fm = [
    "---",
    `title: ${yaml(strip(p.title.rendered))}`,
    `date: ${yaml(p.date.slice(0, 10))}`,
    `updated: ${yaml(p.modified.slice(0, 10))}`,
    `categories: ${JSON.stringify(cats)}`,
    `excerpt: ${yaml(strip(p.excerpt.rendered))}`,
    `image: ${yaml(image)}`,
    "---",
    "",
  ].join("\n");
  fs.writeFileSync(path.join("content/posts", `${p.slug}.md`), fm + md + "\n");
  console.log("post", p.slug, cats, image ? "img" : "no-img", md.length);
}

const pp = await (await fetch(`${BASE}/pages/291`, UA)).json();
const html = pp.content.rendered.replace(/<style[\s\S]*?<\/style>/g, "");
fs.mkdirSync("content/pages", { recursive: true });
fs.writeFileSync(
  "content/pages/polityka-prywatnosci.md",
  `---\ntitle: "Polityka prywatności"\nupdated: ${yaml(pp.modified.slice(0, 10))}\n---\n\n${td.turndown(html).replace(/\n{3,}/g, "\n\n")}\n`
);
console.log("privacy ok");
