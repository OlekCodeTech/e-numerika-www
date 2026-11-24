// Plansza z propozycjami sygnetu (B – wybrany i używany na stronie, A i C – odrzucone alternatywy). node scripts/gen-logo-sheet.mjs
import sharp from "sharp";

const NAVY = "#003366", SKY = "#bfe6ea", TEAL = "#0f6b78";
const box = `<rect width="48" height="48" rx="12" fill="${NAVY}"/>`;
const marks = {
  A: `${box}<rect x="11" y="10" width="5.5" height="28" rx="2.75" fill="#fff"/><rect x="11" y="10" width="26" height="5.5" rx="2.75" fill="#fff"/><rect x="11" y="32.5" width="26" height="5.5" rx="2.75" fill="#fff"/><rect x="16" y="23.25" width="21" height="1.5" rx=".75" fill="#fff" opacity=".55"/><circle cx="21.6" cy="24" r="3.6" fill="${SKY}"/><circle cx="29" cy="24" r="3.6" fill="${SKY}"/><circle cx="36.4" cy="24" r="3.6" fill="${SKY}" opacity=".55"/>`,
  B: `${box}<rect x="10" y="27" width="6.5" height="11" rx="2" fill="#fff" opacity=".6"/><rect x="20.75" y="20" width="6.5" height="18" rx="2" fill="#fff" opacity=".8"/><rect x="31.5" y="12" width="6.5" height="26" rx="2" fill="#fff"/><path d="M9.5 20.5 L19 13.5 L25 17 L35.5 7.5" fill="none" stroke="${SKY}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M30.5 7.2 H36 V12.7" fill="none" stroke="${SKY}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  C: `${box}<path d="M14 9.5 H28 L35 16.5 V36 A2.5 2.5 0 0 1 32.5 38.5 H14 A2.5 2.5 0 0 1 11.5 36 V12 A2.5 2.5 0 0 1 14 9.5 Z" fill="#fff"/><path d="M28 9.5 V16.5 H35 Z" fill="${SKY}"/><rect x="15.5" y="16" width="8" height="2.4" rx="1.2" fill="${NAVY}"/><rect x="15.5" y="21.5" width="15" height="2.2" rx="1.1" fill="${NAVY}" opacity=".3"/><rect x="15.5" y="26" width="15" height="2.2" rx="1.1" fill="${NAVY}" opacity=".3"/><circle cx="34" cy="35" r="8" fill="${TEAL}" stroke="${NAVY}" stroke-width="2"/><path d="M30.3 35.2 L33 37.9 L37.8 32.6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
};
const names = { A: "A · E z liczydłem", B: "B · słupki i trend (wybrany, na stronie)", C: "C · dokument z zatwierdzeniem" };
const font = "'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif";

const row = (k, i) => `<g transform="translate(70 ${70 + i * 250})">
<rect x="-30" y="-30" width="1260" height="220" rx="28" fill="#fff" stroke="#d5e2e4"/>
<g transform="scale(3.3)">${marks[k]}</g>
<text x="200" y="88" font-family="${font}" font-size="74" font-weight="800" letter-spacing="-2" fill="${NAVY}">E<tspan fill="${TEAL}">-</tspan>Numerika</text>
<text x="204" y="128" font-family="${font}" font-size="19" font-weight="700" letter-spacing="6.5" fill="#6b7a7d">BIURO RACHUNKOWE</text>
<g transform="translate(760 20)"><rect width="250" height="118" rx="20" fill="${NAVY}"/><g transform="translate(22 27) scale(1.33)">${marks[k].replace(box, `<rect width="48" height="48" rx="12" fill="#0a4a85"/>`)}</g><text x="104" y="68" font-family="${font}" font-size="26" font-weight="800" fill="#fff">E-Numerika</text></g>
<g transform="translate(1050 34) scale(1.9)">${marks[k]}</g>
<text x="200" y="170" font-family="Arial, sans-serif" font-size="17" fill="#6b7a7d">${names[k]}</text>
</g>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="830" viewBox="0 0 1400 830"><rect width="1400" height="830" fill="#f6faf9"/>${["A", "B", "C"].map(row).join("")}</svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/brand/propozycje-logo.png");
for (const k of ["A", "C"]) await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="512" height="512">${marks[k]}</svg>`)).png().toFile(`public/brand/sygnet-wariant-${k}.png`);
console.log("ok");
