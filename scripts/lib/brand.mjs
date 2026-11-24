// Jedno źródło prawdy o znaku E-Numerika: kolory, sygnet i teksty zamienione na krzywe (pliki logo nie zależą od krojów w systemie).
import fs from "node:fs";
import opentype from "opentype.js";

export const C = {
  navy: "#003366", navy2: "#0a4a85", teal: "#0f6b78", deep: "#083941", ink: "#0a2233",
  body: "#4a585b", muted: "#6b7a7d", paper: "#f6faf9", paper2: "#e8f5ef", line: "#d5e2e4",
  sky: "#bfe6ea", sky2: "#9dd5db", mint: "#dceef0", white: "#ffffff", black: "#111111",
};

const load = (pkg, name) => ["latin", "latin-ext"].map((sub) => {
  const b = fs.readFileSync(`node_modules/@fontsource/${pkg}/files/${pkg}-${sub}-${name}-normal.woff`);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
});
const cache = {};
const fonts = (key) => (cache[key] ??= key.startsWith("j") ? load("plus-jakarta-sans", key.slice(1)) : load("archivo", key.slice(1)));

// własny zapis ścieżki: toPathData() z opentype.js potrafi zwrócić „NaN” przy zaokrąglaniu
const n2 = (v) => String(Math.round(v * 100) / 100);
const toD = (cmds) => cmds.map((c) => (c.type === "Z" ? "Z" : c.type + [c.x1, c.y1, c.x2, c.y2, c.x, c.y].filter((v) => v !== undefined).map(n2).join(" "))).join("");

/** Tekst jako krzywe. font: "j800", "j700", "j500", "a400", "a600", "a700". Zwraca { d, width }. */
export function outline(text, { font = "j800", size = 30, x = 0, y = 0, spacing = 0 } = {}) {
  const set = fonts(font);
  let cx = x, d = "", prev = null, prevFont = null;
  for (const ch of text) {
    const f = set.find((ft) => ft.charToGlyphIndex(ch) !== 0) ?? set[0];
    const g = f.charToGlyph(ch);
    const k = size / f.unitsPerEm;
    if (prev && prevFont === f) cx += f.getKerningValue(prev, g) * k;
    d += toD(g.getPath(cx, y, size).commands);
    cx += g.advanceWidth * k + spacing;
    prev = g; prevFont = f;
  }
  return { d, width: cx - x - spacing };
}
export const textPath = (text, opts = {}) => {
  const o = outline(text, opts);
  if (opts.anchor === "middle") return textPath(text, { ...opts, anchor: undefined, x: (opts.x ?? 0) - o.width / 2 });
  return `<path d="${o.d}" fill="${opts.fill ?? C.navy}"${opts.opacity ? ` opacity="${opts.opacity}"` : ""}/>`;
};

/**
 * Sygnet: litera „e” narysowana jak wykres kołowy – pierścień z wyróżnionym wycinkiem.
 * Poprzeczka litery to znak równości: „winien = ma”, czyli liczby, które się zgadzają.
 * Pole 48×48, środek (24,24). fg – kolor litery, accent – kolor wycinka.
 */
const G = { R: 19.5, r: 11.5, c: 24, gap: 1.7, bar: 3.5, eq: 2.6 };
const f2 = (n) => n.toFixed(2);
const onRight = (rad, dy) => G.c + Math.sqrt(rad * rad - dy * dy); // x na okręgu po prawej
/** Sam znak równości (dwie belki przycięte do okręgu). */
export function equals({ fg = C.navy } = {}) {
  const { R, c, bar, eq } = G;
  return [-(eq / 2 + bar), eq / 2].map((o) => {
    const y1 = c + o, y2 = y1 + bar;
    return `<path d="M10 ${f2(y1)} H${f2(onRight(R, Math.abs(y1 - c)))} A${R} ${R} 0 0 1 ${f2(onRight(R, Math.abs(y2 - c)))} ${f2(y2)} H10 Z" fill="${fg}"/>`;
  }).join("");
}
export function mark({ fg = C.navy, accent = C.teal } = {}) {
  const { R, r, c, gap, bar, eq } = G;
  const up = (rad, dx) => c - Math.sqrt(rad * rad - dx * dx); // y na okręgu nad środkiem
  const dyS = eq / 2 + bar + gap; // wycinek kończy się `gap` nad górną belką
  const slice = `M${f2(c + gap)} ${f2(up(R, gap))} A${R} ${R} 0 0 1 ${f2(onRight(R, dyS))} ${f2(c - dyS)} L${f2(onRight(r, dyS))} ${f2(c - dyS)} A${r} ${r} 0 0 0 ${f2(c + gap)} ${f2(up(r, gap))} Z`;
  const mid = (R + r) / 2, w = R - r, ang = (44 * Math.PI) / 180;
  const ex = c + mid * Math.cos(ang), ey = c + mid * Math.sin(ang);
  return (
    `<path d="${slice}" fill="${accent}"/>` +
    `<path d="M${c} ${f2(c - mid)} A${mid} ${mid} 0 1 0 ${f2(ex)} ${f2(ey)}" fill="none" stroke="${fg}" stroke-width="${w}"/>` +
    `<circle cx="${f2(ex)}" cy="${f2(ey)}" r="${w / 2}" fill="${fg}"/>` +
    equals({ fg })
  );
}
export const markAt = (x, y, size, opts) => `<g transform="translate(${x} ${y}) scale(${size / 48})">${mark(opts)}</g>`;

/** Sygnet na kafelku (ikona aplikacji, avatar, favicon). */
export const tile = ({ bg = C.navy, fg = C.white, accent = C.sky, rx = 11 } = {}) =>
  `<rect width="48" height="48" rx="${rx}" fill="${bg}"/><g transform="translate(7.2 7.2) scale(0.7)">${mark({ fg, accent })}</g>`;
export const tileAt = (x, y, size, opts) => `<g transform="translate(${x} ${y}) scale(${size / 48})">${tile(opts)}</g>`;

const themes = {
  kolor: { fg: C.navy, accent: C.teal, dash: C.teal, sub: C.muted },
  jasne: { fg: C.white, accent: C.sky, dash: C.sky, sub: "#b7c9d6" },
  granat: { fg: C.navy, accent: C.navy, dash: C.navy, sub: C.navy },
  czarne: { fg: C.black, accent: C.black, dash: C.black, sub: C.black },
  biale: { fg: C.white, accent: C.white, dash: C.white, sub: C.white },
};

function wordmark(t, x, y, size) {
  const e = outline("E", { size, x, y });
  const dash = outline("-", { size, x: x + e.width + size * 0.02, y });
  const n = outline("Numerika", { size, x: x + e.width + dash.width + size * 0.04, y });
  const width = e.width + dash.width + n.width + size * 0.04;
  return { svg: `<path d="${e.d}${n.d}" fill="${t.fg}"/><path d="${dash.d}" fill="${t.dash}"/>`, width };
}

/** Logo poziome. Zwraca { svg, w, h } – pełny dokument SVG bez zależności od krojów. */
export function logoH(theme = "kolor", { tagline = true, bg, noMark = false } = {}) {
  const t = themes[theme];
  const wm = wordmark(t, 62, 33.5, 31);
  const tag = tagline ? outline("BIURO RACHUNKOWE", { font: "a600", size: 8.4, x: 63.2, y: 46.5, spacing: 2.75 }) : null;
  const w = Math.ceil(62 + Math.max(wm.width, tag?.width ?? 0) + 2), h = 52;
  return { w, h, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * 6}" height="${h * 6}">${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""}${noMark ? "" : markAt(2, 2, 48, t)}${wm.svg}${tag ? `<path d="${tag.d}" fill="${t.sub}"/>` : ""}</svg>` };
}

/** Logo pionowe (sygnet nad nazwą). */
export function logoV(theme = "kolor", { bg } = {}) {
  const t = themes[theme];
  const probe = wordmark(t, 0, 0, 30);
  const tagProbe = outline("BIURO RACHUNKOWE", { font: "a600", size: 8, spacing: 2.6 });
  const w = Math.ceil(Math.max(probe.width, tagProbe.width) + 12), h = 122;
  const wm = wordmark(t, (w - probe.width) / 2, 96, 30);
  const tag = outline("BIURO RACHUNKOWE", { font: "a600", size: 8, x: (w - tagProbe.width) / 2, y: 112, spacing: 2.6 });
  return { w, h, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * 6}" height="${h * 6}">${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""}${markAt((w - 60) / 2, 4, 60, t)}${wm.svg}<path d="${tag.d}" fill="${t.sub}"/></svg>` };
}

export const wordmarkAt = (theme, x, y, size) => wordmark(themes[theme], x, y, size).svg;
export const markSvg = (theme = "kolor", size = 512) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}">${mark(themes[theme])}</svg>`;
export const tileSvg = (opts, size = 512) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}">${tile(opts)}</svg>`;
export { themes };
