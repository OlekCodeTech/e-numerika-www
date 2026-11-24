// Pakiet plików logo E-Numerika (SVG z tekstem zamienionym na krzywe + PNG) oraz ikony strony.
// Uruchomienie: node scripts/gen-brand.mjs
import fs from "node:fs";
import sharp from "sharp";
import { C, logoH, logoV, markSvg, tileSvg } from "./lib/brand.mjs";

const out = "public/brand";
fs.rmSync(out, { recursive: true, force: true });
for (const d of ["svg", "png"]) fs.mkdirSync(`${out}/${d}`, { recursive: true });

const save = async (name, svg, width) => {
  fs.writeFileSync(`${out}/svg/${name}.svg`, svg);
  await sharp(Buffer.from(svg), { density: 600 }).resize({ width }).png().toFile(`${out}/png/${name}.png`);
};

for (const t of ["kolor", "jasne", "granat", "czarne", "biale"]) {
  await save(`logo-poziome-${t}`, logoH(t).svg, 2400);
  await save(`logo-pionowe-${t}`, logoV(t).svg, 1600);
  await save(`sygnet-${t}`, markSvg(t), 1024);
}
await save("logo-poziome-bez-podpisu-kolor", logoH("kolor", { tagline: false }).svg, 2400);
await save("logo-poziome-bez-podpisu-jasne", logoH("jasne", { tagline: false }).svg, 2400);
await save("ikona-granatowa", tileSvg(), 1024);
await save("ikona-biala", tileSvg({ bg: C.white, fg: C.navy, accent: C.teal }), 1024);
await save("avatar-social", tileSvg({ rx: 0 }), 1080);

// podglądy na tle (do wklejenia tam, gdzie nie ma przezroczystości)
await sharp(Buffer.from(logoH("jasne", { bg: C.navy }).svg), { density: 600 }).resize({ width: 2400 }).extend({ top: 160, bottom: 160, left: 200, right: 200, background: C.navy }).png().toFile(`${out}/png/logo-poziome-na-granacie.png`);
await sharp(Buffer.from(logoH("kolor", { bg: C.white }).svg), { density: 600 }).resize({ width: 2400 }).extend({ top: 160, bottom: 160, left: 200, right: 200, background: C.white }).png().toFile(`${out}/png/logo-poziome-na-bialym.png`);

// ikony strony
await sharp(Buffer.from(tileSvg({}, 512))).png().toFile("public/logo-512.png");
await sharp(Buffer.from(tileSvg({ rx: 0 }, 180))).png().toFile("src/app/apple-icon.png");
fs.writeFileSync("src/app/icon.svg", tileSvg({}, 48).replace(' width="48" height="48"', "") + "\n");
console.log("pakiet logo gotowy:", fs.readdirSync(`${out}/svg`).length, "SVG,", fs.readdirSync(`${out}/png`).length, "PNG");
