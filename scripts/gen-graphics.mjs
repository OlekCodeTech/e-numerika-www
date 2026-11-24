// Generuje kartę Open Graph oraz okładki wpisów bloga. Pliki logo i ikony: node scripts/gen-brand.mjs
// Uruchomienie: node scripts/gen-graphics.mjs            – OG i brakujące okładki
//               node scripts/gen-graphics.mjs --force    – nadpisuje także istniejące okładki
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { markAt, textPath, wordmarkAt } from "./lib/brand.mjs";

const PINE = "#003366", PINE2 = "#0a4a85", PINE3 = "#0f6b78", LIME = "#bfe6ea", PAPER = "#f6faf9", MINT = "#dceef0";
const force = process.argv.includes("--force");

const mark = (x, y, size) => markAt(x, y, size, { fg: "#ffffff", accent: LIME });
const dots = (w, h, id = "d") => `<defs><pattern id="${id}" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="${LIME}" opacity=".22"/></pattern></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>`;

/* ---------- karta Open Graph ---------- */
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${PINE}"/>${dots(1200, 630)}
<circle cx="1080" cy="80" r="260" fill="${LIME}" opacity=".13"/>
${mark(80, 76, 84, true)}
${wordmarkAt("jasne", 186, 128, 50)}
${textPath("BIURO RACHUNKOWE", { font: "a600", size: 14, x: 189, y: 158, spacing: 4.6, fill: "#b7c9d6" })}
<text font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-size="78" font-weight="700" fill="#fff" letter-spacing="-1.5"><tspan x="80" y="330">Księgowość, w której</tspan><tspan x="80" y="420" fill="${LIME}">liczby się zgadzają.</tspan></text>
<text x="80" y="520" font-family="Arial, sans-serif" font-size="28" fill="#dbe6ee">JDG i spółki z o.o. · kadry i płace · online i pod Szczecinem</text>
<g transform="translate(880 330)">${[60, 96, 78, 132, 110, 170].map((h, i) => `<rect x="${i * 42}" y="${220 - h}" width="28" height="${h}" rx="8" fill="${i === 5 ? LIME : "#ffffff"}" opacity="${i === 5 ? 1 : 0.2}"/>`).join("")}</g>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 88 }).toFile("public/og-default.jpg");

/* ---------- okładki wpisów ---------- */
const motifs = {
  bars: () => `<g transform="translate(820 250)">${[150, 230, 190, 320, 270, 420, 380, 520].map((h, i) => `<rect x="${i * 86}" y="${560 - h}" width="58" height="${h}" rx="16" fill="${i === 7 ? LIME : "#fff"}" opacity="${i === 7 ? 1 : 0.16}"/>`).join("")}</g><path d="M830 640 L1000 540 L1170 590 L1340 400 L1500 320" fill="none" stroke="${LIME}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="1500" cy="320" r="18" fill="${LIME}"/>`,
  docs: () =>
    [0, 1, 2]
      .map((i) => `<g transform="translate(${900 + i * 150} ${170 + i * 70}) rotate(${-8 + i * 7})"><rect width="360" height="470" rx="28" fill="${i === 2 ? PAPER : "#fff"}" opacity="${i === 2 ? 1 : 0.14 + i * 0.1}"/>${i === 2 ? `<rect x="40" y="50" width="150" height="20" rx="10" fill="${PINE}"/>${[110, 160, 210, 260, 310].map((y, k) => `<rect x="40" y="${y}" width="${k % 2 ? 210 : 280}" height="14" rx="7" fill="${PINE}" opacity=".22"/>`).join("")}<rect x="40" y="370" width="130" height="52" rx="26" fill="${LIME}"/><path d="M78 396l14 14 28-30" fill="none" stroke="${PINE}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>` : ""}</g>`)
      .join(""),
  rings: () => `<circle cx="1180" cy="450" r="330" fill="none" stroke="#fff" stroke-width="56" opacity=".12"/><path d="M1180 120 A330 330 0 0 1 1466 615" fill="none" stroke="${LIME}" stroke-width="56" stroke-linecap="round"/><circle cx="1180" cy="450" r="150" fill="${PINE2}"/><text x="1180" y="486" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-size="110" font-weight="700" fill="${LIME}">%</text>`,
  steps: () => [0, 1, 2, 3].map((i) => `<rect x="${850 + i * 170}" y="${640 - i * 130}" width="150" height="${130 + i * 130}" rx="22" fill="${i === 3 ? LIME : "#fff"}" opacity="${i === 3 ? 1 : 0.12 + i * 0.06}"/><text x="${925 + i * 170}" y="${720 - i * 130}" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-size="64" font-weight="700" fill="${i === 3 ? PINE : "#fff"}" opacity="${i === 3 ? 1 : 0.7}">${i + 1}</text>`).join(""),
  scale: () => `<rect x="1170" y="230" width="20" height="440" rx="10" fill="#fff" opacity=".35"/><rect x="880" y="250" width="600" height="20" rx="10" fill="${LIME}" transform="rotate(-7 1180 260)"/><circle cx="1180" cy="240" r="30" fill="${LIME}"/><g transform="translate(900 300)"><path d="M0 0 L-90 190 H90 Z" fill="none" stroke="#fff" stroke-width="8" opacity=".35"/><path d="M-110 190 A110 70 0 0 0 110 190 Z" fill="#fff" opacity=".2"/></g><g transform="translate(1462 232)"><path d="M0 0 L-90 190 H90 Z" fill="none" stroke="${LIME}" stroke-width="8" opacity=".6"/><path d="M-110 190 A110 70 0 0 0 110 190 Z" fill="${LIME}"/></g><rect x="1060" y="670" width="240" height="26" rx="13" fill="#fff" opacity=".35"/>`,
  car: () => `<g transform="translate(830 330)"><path d="M40 200 L110 70 Q125 40 160 40 H420 Q455 40 478 68 L560 170 L650 190 Q690 200 690 240 V300 H0 V240 Q0 205 40 200 Z" fill="#fff" opacity=".16"/><path d="M150 180 L195 95 H330 V180 Z M360 95 H420 L490 180 H360 Z" fill="${PINE2}"/><circle cx="170" cy="300" r="68" fill="${PINE}"/><circle cx="170" cy="300" r="42" fill="${LIME}"/><circle cx="530" cy="300" r="68" fill="${PINE}"/><circle cx="530" cy="300" r="42" fill="${LIME}"/></g><g transform="translate(1330 150)"><rect width="210" height="110" rx="24" fill="${LIME}"/><text x="105" y="74" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-size="58" font-weight="700" fill="${PINE}">75%</text></g>`,
  cloud: () => `<g transform="translate(860 200)"><rect width="640" height="430" rx="34" fill="#fff" opacity=".12"/><rect x="26" y="26" width="588" height="340" rx="18" fill="${PINE2}"/><path d="M230 250 a70 70 0 0 1 20 -137 a95 95 0 0 1 180 20 a60 60 0 0 1 -10 117 Z" fill="${LIME}"/><path d="M320 235 V165 M290 195 L320 162 L350 195" fill="none" stroke="${PINE}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><rect x="230" y="430" width="180" height="34" rx="10" fill="#fff" opacity=".2"/><rect x="150" y="464" width="340" height="22" rx="11" fill="#fff" opacity=".3"/></g>`,
};

const covers = {
  "koszty-zwiazane-z-zalozeniem-spolki-z-o-o-w-polsce": ["rings", "Spółka z o.o."],
  "jak-zalozyc-spolke-z-o-o-w-polsce-praktyczny-przewodnik-krok-po-kroku": ["steps", "Spółka z o.o."],
  "zalety-i-wady-spolki-z-o-o-w-porownaniu-z-innymi-formami-prawnymi": ["scale", "Formy prawne"],
  "spolka-z-o-o-podstawowe-informacje-ktore-warto-znac": ["docs", "Spółka z o.o."],
  "samochod-w-firmie-a-koszty-dzialalnosci-co-mozna-wrzucic-w-koszty": ["car", "Koszty firmy"],
  "spolka-z-ograniczona-odpowiedzialnoscia-czy-warto-ja-zalozyc-na-start-biznesu-zalety-spolki-z-o-o-krok-po-kroku": ["bars", "Start biznesu"],
  "biuro-rachunkowe-online-rozwiazania-dla-biznesu": ["cloud", "Księgowość online"],
};
const fallback = ["bars", "docs", "rings", "steps", "scale"];

const wrap = (text, max) => {
  const lines = [];
  let cur = "";
  for (const w of text.split(" ")) {
    if ((cur + " " + w).trim().length > max) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 4);
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

fs.mkdirSync("public/images/blog", { recursive: true });
const files = fs.readdirSync("content/posts").filter((f) => f.endsWith(".md") && !f.startsWith("_"));
for (const [idx, f] of files.entries()) {
  const slug = f.replace(/\.md$/, "");
  const out = path.join("public/images/blog", `${slug}.webp`);
  if (fs.existsSync(out) && !force && !covers[slug]?.fresh) { if (!process.argv.includes("--covers")) continue; }
  const raw = fs.readFileSync(path.join("content/posts", f), "utf8");
  const title = (raw.match(/^title:\s*"?(.+?)"?\s*$/m)?.[1] ?? slug).replace(/\\"/g, '"');
  const [motif, label] = covers[slug] ?? [fallback[idx % fallback.length], "Porady dla firm"];
  const short = title.split(/ – | — |: /)[0];
  const lines = wrap(short, 17);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
<rect width="1600" height="900" fill="${PINE}"/>${dots(1600, 900)}
<circle cx="1500" cy="60" r="380" fill="${LIME}" opacity=".09"/>
${motifs[motif]()}
<rect x="90" y="96" width="${label.length * 17 + 74}" height="54" rx="27" fill="${LIME}"/><circle cx="122" cy="123" r="8" fill="${PINE}"/>
<text x="144" y="132" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="${PINE}" letter-spacing=".5">${esc(label)}</text>
<text font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-size="84" font-weight="700" fill="#fff" letter-spacing="-1.5">${lines.map((l, i) => `<tspan x="90" y="${300 + i * 100}">${esc(l)}</tspan>`).join("")}</text>
${mark(90, 760, 60, true)}${wordmarkAt("jasne", 164, 802, 34)}
</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 84 }).toFile(out);
  console.log("cover", slug, motif);
}
console.log("grafiki gotowe", MINT ? "" : "");
