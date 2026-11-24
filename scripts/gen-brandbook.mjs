// Składa brandbook E-Numerika: brand/brandbook.html → brand/E-Numerika-brandbook.pdf (druk przez Edge/Chrome headless).
// Uruchomienie: node scripts/gen-brandbook.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { C, logoH, logoV, mark, tile } from "./lib/brand.mjs";

const inner = (doc) => doc.svg.replace(/ width="\d+" height="\d+"/, "");
const H = (t = "kolor", o) => inner(logoH(t, o));
const V = (t = "kolor", o) => inner(logoV(t, o));
const M = (o) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${mark(o)}</svg>`;
const T = (o) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${tile(o)}</svg>`;
const white = { fg: "#fff", accent: C.sky };

/* ---------- kolory ---------- */
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const cmyk = (hex) => {
  const [r, g, b] = rgb(hex).map((v) => v / 255);
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return "0 / 0 / 0 / 100";
  return [(1 - r - k) / (1 - k), (1 - g - k) / (1 - k), (1 - b - k) / (1 - k), k].map((v) => Math.round(v * 100)).join(" / ");
};
const lum = (hex) => {
  const [r, g, b] = rgb(hex).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const grade = (r) => (r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA (duży tekst)" : "nie stosować");

const primary = [
  { name: "Granat księgowy", hex: C.navy, role: "Kolor główny: logo, nagłówki, przyciski, ciemne tła." },
  { name: "Morska zieleń", hex: C.teal, role: "Akcent: wycinek w znaku, wyróżnienia w tekście, linki." },
  { name: "Błękit bilansu", hex: C.sky, role: "Akcent na ciemnym tle, podkreślenia, tła kart i ikon." },
];
const secondary = [
  { name: "Głęboka zieleń", hex: C.deep, role: "Stopka, sekcje zamykające." },
  { name: "Granat jasny", hex: C.navy2, role: "Stany aktywne, gradienty z granatem." },
  { name: "Atrament", hex: C.ink, role: "Tekst nagłówków na jasnym tle." },
  { name: "Grafit", hex: C.body, role: "Tekst podstawowy." },
  { name: "Szary opisowy", hex: C.muted, role: "Podpisy, etykiety, metadane." },
  { name: "Mięta", hex: C.mint, role: "Tła ikon i etykiet." },
  { name: "Papier", hex: C.paper, role: "Tło strony." },
  { name: "Linia", hex: C.line, role: "Obramowania, linie księgi." },
];
const swatch = (c, big) => {
  const dark = lum(c.hex) < 0.4;
  return `<div class="sw ${big ? "big" : ""}"><div class="chip" style="background:${c.hex};color:${dark ? "#fff" : C.ink};${c.hex === C.paper ? "border:0.3mm solid " + C.line : ""}"><b>${c.name}</b></div>
  <dl><dt>HEX</dt><dd>${c.hex.toUpperCase()}</dd><dt>RGB</dt><dd>${rgb(c.hex).join(" / ")}</dd><dt>CMYK*</dt><dd>${cmyk(c.hex)}</dd></dl><p>${c.role}</p></div>`;
};
const pairs = [[C.navy, "#ffffff", "Granat na bieli"], ["#ffffff", C.navy, "Biel na granacie"], [C.sky, C.navy, "Błękit na granacie"], [C.teal, "#ffffff", "Morska zieleń na bieli"], [C.body, C.paper, "Grafit na papierze"], [C.muted, "#ffffff", "Szary opisowy na bieli"], ["#ffffff", C.deep, "Biel na głębokiej zieleni"], [C.sky, "#ffffff", "Błękit na bieli"]];

/* ---------- drobne ikony liniowe (styl Lucide: kreska 2, zaokrąglone końce) ---------- */
const ico = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const icons = [
  ico('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
  ico('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>'),
  ico('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  ico('<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'),
  ico('<path d="M12 3 4 6v6c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.500 8-9V6z"/><path d="m9 12 2 2 4-4"/>'),
  ico('<circle cx="9" cy="8" r="3.5"/><path d="M2.500 20a6.500 6.500 0 0 1 13 0M17 5.500a3.500 3.500 0 0 1 0 6M19 20a6 6 0 0 0-2-4.500"/>'),
  ico('<path d="M7 18a4.500 4.500 0 0 1-.5-9 6 6 0 0 1 11.500 1.500A3.800 3.800 0 0 1 17.500 18z"/><path d="M12 16v-5M9.500 13 12 10.500 14.500 13"/>'),
  ico('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
];

const photo = (n) => `../public/images/photos/${n}.webp`;
let no = 0;
const page = (section, title, body, cls = "") => {
  no++;
  return `<section class="page ${cls}"><header><span class="kicker">${String(no).padStart(2, "0")} · ${section}</span>${title ? `<h2>${title}</h2>` : ""}</header><div class="body">${body}</div><footer><span class="fl">${H("kolor", { tagline: false })}</span><span>Księga znaku · wersja 1.0 · listopad 2026</span><span>${String(no).padStart(2, "0")}</span></footer></section>`;
};

const toc = ["Marka", "Głos marki", "Logo – idea", "Budowa znaku", "Wersje logo", "Wersje kolorystyczne", "Pole ochronne i wielkość minimalna", "Logo na tłach", "Czego nie robimy", "Kolory podstawowe", "Kolory uzupełniające i kontrast", "Typografia – kroje", "Typografia – hierarchia", "Elementy graficzne", "Fotografia", "Druki firmowe", "Media cyfrowe", "Pliki i kontakt"];

const pages = [];

/* okładka */
no++;
pages.push(`<section class="page cover"><div class="cmark">${M(white)}</div><div class="ctext"><p class="kicker light">Księga znaku</p><h1>E‑Numerika</h1><p class="sub">Biuro rachunkowe · system identyfikacji wizualnej</p></div><p class="cfoot">Wersja 1.0 · listopad 2026</p><div class="cring">${M({ fg: "#0a4a85", accent: "#0f6b78" })}</div></section>`);

/* spis treści */
pages.push(page("Spis treści", "Co znajdziesz w tej księdze", `<div class="toc">${toc.map((t, i) => `<div><span>${String(i + 3).padStart(2, "0")}</span>${t}</div>`).join("")}</div>
<p class="note">Księga opisuje, jak wygląda i jak mówi marka E‑Numerika. Korzysta z niej każdy, kto przygotowuje materiały biura: stronę, druki, posty, oferty. W razie wątpliwości obowiązuje prosta zasada: czytelnie, spokojnie, bez ozdobników.</p>`));

/* marka */
pages.push(page("Marka", "Księgowość, w której liczby się zgadzają", `<div class="cols c2">
<div><p class="lead">E‑Numerika to biuro rachunkowe z Bezrzecza pod Szczecinem. Prowadzi księgi jednoosobowych działalności i spółek, kadry i płace oraz sprawozdania, stacjonarnie i online w całej Polsce.</p>
<h3>Obietnica</h3><p>Przedsiębiorca ma jedną, dedykowaną księgową, stałą cenę znaną z góry i pewność, że terminy są dopilnowane.</p>
<h3>Dla kogo</h3><p>Właściciele małych firm i spółek z o.o., którzy chcą mieć porządek w dokumentach bez uczenia się księgowości.</p></div>
<div class="values">
<div><b>Rzetelność</b><p>Liczby muszą się zgadzać. Sprawdzamy dwa razy, zanim wyślemy.</p></div>
<div><b>Jasność</b><p>Mówimy, ile i do kiedy zapłacić. Bez żargonu i bez drobnego druku.</p></div>
<div><b>Dostępność</b><p>Dokumenty online o każdej porze, odpowiedź od człowieka.</p></div>
<div><b>Spokój</b><p>Klient zajmuje się firmą, a nie terminami w urzędzie.</p></div>
</div></div>
<div class="traits"><span>rzeczowa</span><span>życzliwa</span><span>uporządkowana</span><span>nowoczesna</span><span class="no">nie: urzędowa</span><span class="no">nie: krzykliwa</span></div>`));

/* głos */
pages.push(page("Głos marki", "Jak mówimy", `<div class="cols c2"><div>
<ul class="rules"><li><b>Do klienta na „Ty”.</b> W umowach i pismach formalnych używamy formy „Państwo”.</li><li><b>Najpierw konkret.</b> Kwota, termin, co trzeba zrobić. Wyjaśnienie dopiero potem.</li><li><b>Prosto.</b> „Podatek do zapłaty” zamiast „zobowiązanie podatkowe podlegające uregulowaniu”.</li><li><b>Liczby zapisujemy dokładnie.</b> „200 zł netto miesięcznie”, nigdy „już od” bez kwoty.</li><li><b>Bez obietnic, których nie da się sprawdzić.</b> Nie piszemy „najlepsze biuro” ani „gwarancja oszczędności”.</li></ul></div>
<div class="yn"><div class="y"><span>Tak</span><p>„VAT za październik: 1 240 zł. Termin: 25 listopada. Przelew przygotowaliśmy w załączniku.”</p></div><div class="n"><span>Nie</span><p>„Uprzejmie informujemy, iż w związku z rozliczeniem okresu powstało zobowiązanie…”</p></div>
<div class="y"><span>Tak</span><p>„Policz koszt księgowości” · „Zobacz cennik” · „Zadzwoń: 666 665 612”</p></div><div class="n"><span>Nie</span><p>„Sprawdź naszą wyjątkową ofertę!!!” · „Kliknij tutaj”</p></div></div></div>
<p class="note">Nazwę zapisujemy zawsze <b>E‑Numerika</b>: wielkie E, łącznik, wielkie N. W adresach: e-numerika.pl. Nie piszemy „eNumerika”, „E Numerika” ani „Numerika”.</p>`));

/* logo – idea */
pages.push(page("Logo – idea", "Litera „e”, która jest wykresem", `<div class="cols idea"><div class="stage">${H()}</div>
<div><p class="lead">Sygnet to litera „e” od E‑Numeriki narysowana jak wykres kołowy.</p>
<div class="idea3"><div>${M({ fg: C.navy, accent: C.line })}<b>Pierścień</b><p>Całość finansów firmy, zamknięta i policzona.</p></div><div>${M({ fg: C.line, accent: C.teal })}<b>Wycinek</b><p>Ćwiartka koła: kwartał, udział, wynik, który widać od razu.</p></div><div><svg viewBox="0 0 48 48"><g opacity=".18">${mark()}</g><path d="M10 20.5 H43.18 A19.5 19.5 0 0 1 43.18 27.5 H10 Z" fill="${C.navy}"/></svg><b>Poprzeczka</b><p>Linia księgi: wiersz, w którym zapisuje się liczby.</p></div></div></div></div>`));

/* budowa */
const grid = Array.from({ length: 13 }, (_, i) => `<path d="M${i * 4} 0V48M0 ${i * 4}H48" stroke="${C.line}" stroke-width=".12"/>`).join("");
pages.push(page("Budowa znaku", "Konstrukcja sygnetu", `<div class="cols build"><div class="stage gridst"><svg viewBox="-4 -4 56 56">${grid}<circle cx="24" cy="24" r="19.5" fill="none" stroke="${C.teal}" stroke-width=".15" stroke-dasharray=".8 .6"/><circle cx="24" cy="24" r="11.5" fill="none" stroke="${C.teal}" stroke-width=".15" stroke-dasharray=".8 .6"/><path d="M24 -3V51M-3 24H51" stroke="${C.teal}" stroke-width=".15"/>${mark()}<path d="M4.5 49.500H43.500" stroke="${C.ink}" stroke-width=".2"/><path d="M4.500 48.700v1.600M43.500 48.700v1.600" stroke="${C.ink}" stroke-width=".2"/><text x="24" y="51.600" text-anchor="middle" font-size="1.700" fill="${C.ink}" font-family="Archivo">39 j.</text></svg></div>
<div><table class="spec"><tr><td>Pole znaku</td><td>48 × 48 jednostek</td></tr><tr><td>Średnica zewnętrzna</td><td>39 j.</td></tr><tr><td>Grubość pierścienia</td><td>8 j.</td></tr><tr><td>Grubość poprzeczki</td><td>7 j.</td></tr><tr><td>Odstęp wycinka</td><td>1,7 j. od pierścienia i poprzeczki</td></tr><tr><td>Wycinek</td><td>prawa górna ćwiartka koła</td></tr><tr><td>Zakończenie litery</td><td>zaokrąglone, 42° poniżej osi</td></tr></table>
<p class="note">Sygnetu nie rysujemy od nowa. Zawsze używamy gotowych plików z pakietu (strona „Pliki i kontakt”). Proporcje sygnetu do napisu są stałe i zapisane w plikach.</p></div></div>`));

/* wersje */
pages.push(page("Wersje logo", "Cztery układy na różne sytuacje", `<div class="grid4">
<div class="cell wide"><div class="stage">${H()}</div><b>Pozioma, podstawowa</b><p>Strona, druki, dokumenty. Używamy jej wszędzie, gdzie jest miejsce.</p></div>
<div class="cell"><div class="stage">${V()}</div><b>Pionowa</b><p>Pola zbliżone do kwadratu: pieczątka, roll‑up, gadżety.</p></div>
<div class="cell"><div class="stage pad">${M()}</div><b>Sygnet</b><p>Gdy nazwa pada obok, np. w nagłówku strony lub stopce pisma.</p></div>
<div class="cell"><div class="stage pad">${T()}</div><b>Ikona</b><p>Avatar w mediach społecznościowych, favicon, ikona aplikacji.</p></div>
<div class="cell wide"><div class="stage">${H("kolor", { tagline: false })}</div><b>Pozioma bez podpisu</b><p>Małe rozmiary, w których „Biuro rachunkowe” byłoby nieczytelne.</p></div>
</div>`));

/* wersje kolorystyczne */
pages.push(page("Wersje kolorystyczne", "Kolor, kontra i jeden kolor", `<div class="grid5">
<div><div class="stage">${H("kolor")}</div><b>Kolorowa</b><p>Podstawowa. Jasne tła.</p></div>
<div><div class="stage navy">${H("jasne")}</div><b>Jasna (kontra)</b><p>Granat i ciemne zdjęcia.</p></div>
<div><div class="stage">${H("granat")}</div><b>Jednokolorowa granatowa</b><p>Druk jednym kolorem, pieczątka.</p></div>
<div><div class="stage">${H("czarne")}</div><b>Czarna</b><p>Faks, ksero, grawer, druk czarno‑biały.</p></div>
<div><div class="stage teal">${H("biale")}</div><b>Biała</b><p>Jednolite, ciemne tła w innym kolorze.</p></div>
<div><div class="stage deep">${H("jasne")}</div><b>Jasna na głębokiej zieleni</b><p>Stopka strony i materiały zamykające.</p></div>
</div>`));

/* pole ochronne */
pages.push(page("Pole ochronne i wielkość minimalna", "Logo potrzebuje oddechu", `<div class="cols c2"><div>
<div class="stage clear"><div class="cz">${H()}<i class="x t">½ S</i><i class="x l">½ S</i></div></div>
<p>Wokół logo zostawiamy wolne pole równe <b>połowie wysokości sygnetu (½ S)</b>. W tym polu nie umieszczamy tekstu, zdjęć, krawędzi ani innych znaków.</p></div>
<div><table class="spec"><tr><th></th><th>Druk</th><th>Ekran</th></tr><tr><td>Pozioma z podpisem</td><td>min. 35 mm szer.</td><td>min. 160 px szer.</td></tr><tr><td>Pozioma bez podpisu</td><td>min. 22 mm szer.</td><td>min. 100 px szer.</td></tr><tr><td>Pionowa</td><td>min. 22 mm szer.</td><td>min. 110 px szer.</td></tr><tr><td>Sygnet / ikona</td><td>min. 6 mm</td><td>min. 16 px</td></tr></table>
<div class="mins"><div style="width:35mm">${H()}</div><div style="width:22mm">${H("kolor", { tagline: false })}</div><div style="width:6mm">${M()}</div></div>
<p class="note">Wielkości minimalne w skali 1:1 przy wydruku na A4 poziomo.</p></div></div>`));

/* tła */
pages.push(page("Logo na tłach", "Zawsze wyraźny kontrast", `<div class="grid6">
<div class="bgx" style="background:#fff;border:0.3mm solid ${C.line}">${H()}</div>
<div class="bgx" style="background:${C.paper}">${H()}</div>
<div class="bgx" style="background:${C.mint}">${H()}</div>
<div class="bgx" style="background:${C.navy}">${H("jasne")}</div>
<div class="bgx" style="background:${C.deep}">${H("jasne")}</div>
<div class="bgx ph" style="background-image:linear-gradient(90deg,rgba(0,51,102,.92),rgba(0,51,102,.55)),url('${photo("wspolpraca-uscisk-dloni")}')">${H("jasne")}</div>
</div><p class="note">Na zdjęciach logo stawiamy wyłącznie na spokojnym, przyciemnionym fragmencie (nakładka w kolorze granatu, min. 55% krycia). Na jasnych tłach wersja kolorowa, na ciemnych jasna.</p>`));

/* niedozwolone */
const bad = (inner, label, st = "") => `<div class="bad"><div class="stage" ${st}><div class="bi">${inner}</div></div><p><i>✕</i>${label}</p></div>`;
pages.push(page("Czego nie robimy", "Niedozwolone modyfikacje", `<div class="grid3">
${bad(`<div style="transform:scaleX(1.35) scaleY(.75)">${H()}</div>`, "Nie rozciągamy ani nie ściskamy.")}
${bad(`<div style="transform:rotate(-9deg)">${H()}</div>`, "Nie obracamy.")}
${bad(`<div style="filter:hue-rotate(150deg) saturate(1.6)">${H()}</div>`, "Nie zmieniamy kolorów.")}
${bad(`<div style="filter:drop-shadow(1.2mm 1.2mm 0.8mm rgba(0,0,0,.45))">${H()}</div>`, "Nie dodajemy cieni, obrysów i efektów.")}
${bad(H(), "Nie stawiamy na tle o słabym kontraście.", `style="background:${C.teal}"`)}
${bad(`<div style="display:flex;align-items:center;gap:3mm"><div style="width:62%">${H("kolor").replace(/<path d="M25\.70[\s\S]*?H10 Z" fill="[^"]+"\/>/, "")}</div><div style="width:26%">${M()}</div></div>`, "Nie przestawiamy elementów i nie zmieniamy proporcji.")}
</div>`));

/* kolory podstawowe */
pages.push(page("Kolory podstawowe", "Trzy kolory, które niosą markę", `<div class="swrow p3">${primary.map((c) => swatch(c, true)).join("")}</div>
<div class="prop"><span style="flex:60;background:${C.paper};color:${C.ink};border:0.3mm solid ${C.line}">60% jasne tła</span><span style="flex:25;background:${C.navy}">25% granat</span><span style="flex:10;background:${C.teal}">10%</span><span style="flex:5;background:${C.sky};color:${C.ink}">5%</span></div>
<p class="note">* Wartości CMYK są orientacyjne (przeliczenie z RGB). Przed drukiem nakładowym trzeba je potwierdzić z drukarnią na próbnym wydruku.</p>`));

/* kolory uzupełniające */
pages.push(page("Kolory uzupełniające i kontrast", "Paleta pomocnicza", `<div class="swrow p8">${secondary.map((c) => swatch(c)).join("")}</div>
<h3>Kontrast tekstu (WCAG 2.1)</h3><div class="contrast">${pairs.map(([f, b, n]) => { const r = ratio(f, b); return `<div><span class="cs" style="color:${f};background:${b};${lum(b) > 0.8 ? "border:0.3mm solid " + C.line : ""}">Aa</span><div><b>${n}</b><p>${(Math.floor(r * 10) / 10).toFixed(1).replace(".", ",")} : 1 · ${grade(r)}</p></div></div>`; }).join("")}</div>`));

/* typografia kroje */
pages.push(page("Typografia – kroje", "Dwa kroje, oba bezpłatne", `<div class="cols c2 type">
<div><p class="kicker">Nagłówki</p><p class="spec1" style="font-family:'Plus Jakarta Sans';font-weight:800">Plus Jakarta Sans</p><p class="abc" style="font-family:'Plus Jakarta Sans';font-weight:800">AĄBCĆDEĘ abcćdeę<br>0123456789 zł %</p><p>Odmiany: <b>ExtraBold 800</b> do nagłówków, <b>Bold 700</b> do śródtytułów i przycisków. Odstępy między literami lekko ściśnięte (−2%).</p></div>
<div><p class="kicker">Tekst</p><p class="spec1" style="font-family:'Archivo';font-weight:600">Archivo</p><p class="abc" style="font-family:'Archivo';font-weight:400">AĄBCĆDEĘ abcćdeę<br>0123456789 zł %</p><p>Odmiany: <b>Regular 400</b> do tekstu, <b>SemiBold 600</b> do wyróżnień i etykiet. Etykiety wersalikami, rozstrzelone (+14–24%).</p></div></div>
<p class="note">Oba kroje pochodzą z Google Fonts (licencja SIL OFL) i zawierają polskie znaki. W programach biurowych bez tych krojów zastępujemy je krojem <b>Arial</b>. W liczbach w tabelach używamy cyfr o stałej szerokości.</p>`));

/* typografia hierarchia */
pages.push(page("Typografia – hierarchia", "Od tytułu po przypis", `<div class="hier">
<div><span>H1 · Plus Jakarta Sans 800 · 44–60 px · interlinia 1,08</span><p style="font:800 30pt/1.08 'Plus Jakarta Sans';letter-spacing:-.02em;color:${C.ink}">Księgowość, w której <em>liczby się zgadzają</em></p></div>
<div><span>H2 · Plus Jakarta Sans 800 · 32–38 px · interlinia 1,15</span><p style="font:800 20pt/1.15 'Plus Jakarta Sans';letter-spacing:-.02em;color:${C.ink}">Cztery kroki do uporządkowanej księgowości</p></div>
<div><span>H3 · Plus Jakarta Sans 700 · 20–22 px</span><p style="font:700 13pt/1.25 'Plus Jakarta Sans';color:${C.ink}">Umowa i pełnomocnictwa</p></div>
<div><span>Lead · Archivo 400 · 18–20 px · interlinia 1,55</span><p style="font:400 12pt/1.55 Archivo">Masz jedną, dedykowaną księgową i stałą cenę znaną z góry.</p></div>
<div><span>Tekst · Archivo 400 · 16–17 px · interlinia 1,65 · maks. 70 znaków w wierszu</span><p style="font:400 10pt/1.65 Archivo">Faktury i wyciągi wgrywasz online lub przekazujesz w biurze, w dowolnym momencie miesiąca. Księgujemy, wysyłamy deklaracje i informujemy, ile oraz do kiedy zapłacić.</p></div>
<div><span>Etykieta · Archivo 600 · 12–13 px · wersaliki · rozstrzelenie 14%</span><p class="kicker">Biuro rachunkowe · Szczecin · online</p></div>
</div>`));

/* elementy graficzne */
pages.push(page("Elementy graficzne", "Linie księgi, karty i ikony", `<div class="grid3 gfx">
<div><div class="stage ledger"></div><b>Linie księgi</b><p>Delikatne poziome linie co 26 px jako tło sekcji. Nawiązują do liniatury księgi rachunkowej.</p></div>
<div><div class="stage"><div class="democard"><span class="kicker">Miesiąc rozliczony</span><div class="chips"><i>VAT</i><i>PIT / CIT</i><i>ZUS</i></div></div></div><b>Karty</b><p>Białe tło, obramowanie w kolorze linii, zaokrąglenie 16–32 px, miękki cień w granacie.</p></div>
<div><div class="stage navy"><div class="bars">${[38, 55, 46, 72, 64, 100].map((h, i) => `<i style="height:${h}%;${i === 5 ? "background:" + C.sky : ""}"></i>`).join("")}</div></div><b>Wykresy</b><p>Słupki o zaokrąglonych rogach. Jeden, najważniejszy słupek w błękicie, pozostałe przygaszone.</p></div>
<div><div class="stage"><div class="icons">${icons.join("")}</div></div><b>Ikony</b><p>Liniowe, kreska 2 px, zaokrąglone końce (zestaw Lucide). W kolorze granatu, na tle mięty.</p></div>
<div><div class="stage"><div class="btns"><span class="b1">Policz koszt księgowości →</span><span class="b2">Zobacz ofertę</span></div></div><b>Przyciski</b><p>Kształt pigułki. Główny granatowy, pomocniczy biały z obramowaniem.</p></div>
<div><div class="stage"><div class="wedge">${M({ fg: C.mint, accent: C.teal })}</div></div><b>Wycinek</b><p>Powiększony fragment sygnetu jako dekoracja narożnika okładki lub slajdu. Nigdy pod tekstem.</p></div>
</div>`));

/* fotografia */
pages.push(page("Fotografia", "Jasno, spokojnie, przy pracy", `<div class="photos"><img src="${photo("hero-ksiegowa-portret")}"><img src="${photo("hero-rozmowa-z-klientem")}"><img src="${photo("hero-klientka-paragon")}"><img src="${photo("kalkulator-i-faktury")}"></div>
<div class="cols c2"><div class="yn one"><div class="y"><span>Tak</span><p>Naturalne światło dzienne, jasne wnętrza, drewno i zieleń. Ludzie przy pracy i w rozmowie, naturalny uśmiech. W kadrze akcenty granatu i morskiej zieleni.</p></div></div>
<div class="yn one"><div class="n"><span>Nie</span><p>Pozowane ujęcia ze splecionymi rękami, stosy monet i skarbonki, ciemne biura, mocne filtry, dokumenty z czytelnymi danymi lub w obcym języku.</p></div></div></div>
<p class="note">Zdjęcia w tej wersji księgi są poglądowe (wygenerowane). Docelowo zastępujemy je sesją z prawdziwym zespołem i biurem, utrzymaną w tym samym stylu.</p>`));

/* druki */
pages.push(page("Druki firmowe", "Wizytówka i papier firmowy", `<div class="print">
<div><div class="bc front">${V("jasne")}</div><div class="bc back"><div class="bl">${H("kolor", { tagline: false })}</div><p class="nm">Imię Nazwisko</p><p class="rl">Księgowa</p><p class="ct">tel. 666 665 612<br>biuro@e-numerika.pl<br>e-numerika.pl</p><p class="ad">ul. Korzenna 23, 72‑003 Bezrzecze</p></div><b>Wizytówka 90 × 50 mm</b><p>Awers granatowy z logo pionowym, rewers biały. Papier niepowlekany 350 g.</p></div>
<div><div class="lh"><div class="lhl">${H()}</div><div class="lines">${"<i></i>".repeat(11)}</div><div class="lhf"><span>E‑Numerika · ul. Korzenna 23, 72‑003 Bezrzecze</span><span>tel. 666 665 612 · biuro@e-numerika.pl · e-numerika.pl</span></div></div><b>Papier firmowy A4</b><p>Logo w lewym górnym rogu, margines 20 mm. Dane w stopce, Archivo 8 pt, kolor szary opisowy.</p></div>
<div><div class="stamp">${V("granat")}</div><b>Pieczątka</b><p>Wersja jednokolorowa granatowa lub czarna, układ pionowy.</p><div class="env"><div>${H("kolor", { tagline: false })}</div></div><b>Koperta DL</b><p>Logo bez podpisu w lewym górnym rogu.</p></div>
</div><p class="note">Dane na wizytówce są przykładowe. Imię, nazwisko i stanowisko uzupełniamy przed drukiem.</p>`));

/* cyfrowe */
pages.push(page("Media cyfrowe", "Ekran, poczta i media społecznościowe", `<div class="digital">
<div><div class="mail"><p>Pozdrawiam</p><p class="nm">Imię Nazwisko</p><p class="rl">Księgowa · E‑Numerika</p><div class="ml">${H("kolor", { tagline: false })}</div><p class="ct">tel. 666 665 612 · biuro@e-numerika.pl<br>ul. Korzenna 23, 72‑003 Bezrzecze · e-numerika.pl</p></div><b>Stopka e‑mail</b><p>Tekst w kroju Arial 10 pt, logo 140 px szerokości, bez grafik reklamowych.</p></div>
<div><div class="soc"><div class="av">${T({ rx: 24 })}</div><div class="av sq">${T()}</div></div><b>Avatar</b><p>Ikona granatowa. Na platformach z okrągłym kadrem sygnet mieści się w środku z zapasem.</p></div>
<div><div class="post"><span class="tag">Porady dla firm</span><p>Samochód w firmie: co można wrzucić w koszty?</p><div class="pl">${H("jasne", { tagline: false })}</div><div class="pw">${M({ fg: "#0a4a85", accent: C.sky })}</div></div><b>Post / okładka wpisu</b><p>Granatowe tło, etykieta w błękicie, tytuł do 4 wierszy, logo w lewym dolnym rogu.</p></div>
</div>`));

/* pliki */
pages.push(page("Pliki i kontakt", "Który plik do czego", `<div class="cols c2"><div><table class="spec files"><tr><th>Plik</th><th>Zastosowanie</th></tr>
<tr><td>svg/logo-poziome-kolor.svg</td><td>Strona, prezentacje, druk (wektor)</td></tr><tr><td>svg/logo-poziome-jasne.svg</td><td>Ciemne tła</td></tr><tr><td>svg/logo-pionowe-*.svg</td><td>Pola kwadratowe, pieczątka</td></tr><tr><td>svg/logo-poziome-bez-podpisu-*.svg</td><td>Małe rozmiary, stopka e‑mail</td></tr><tr><td>svg/sygnet-*.svg</td><td>Sam znak</td></tr><tr><td>png/ikona-granatowa.png</td><td>Favicon, ikona aplikacji</td></tr><tr><td>png/avatar-social.png</td><td>Facebook, Instagram, Google</td></tr><tr><td>png/*-granat, -czarne, -biale</td><td>Druk jednym kolorem</td></tr></table></div>
<div><h3>Formaty</h3><p><b>SVG</b> do druku i wszędzie, gdzie da się użyć wektora (napis jest zamieniony na krzywe, kroje nie są potrzebne). <b>PNG</b> z przezroczystym tłem do dokumentów biurowych i internetu.</p>
<h3>Gdzie są pliki</h3><p>Folder <b>public/brand</b> w repozytorium strony (podfoldery svg i png).</p>
<h3>Pytania o użycie znaku</h3><p>biuro@e-numerika.pl · tel. 666 665 612</p><div class="endlogo">${H()}</div></div></div>`));

const css = `
@page { size: 297mm 210mm; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font: 400 10pt/1.55 Archivo, Arial, sans-serif; color: ${C.body}; background: #cfd8da; }
svg { display: block; width: 100%; height: auto; }
.page { width: 297mm; height: 210mm; padding: 15mm 18mm 13mm; background: ${C.paper}; position: relative; overflow: hidden; display: flex; flex-direction: column; page-break-after: always; break-after: page; }
header { margin-bottom: 7mm; }
.kicker { font: 600 7.5pt/1 Archivo; letter-spacing: .16em; text-transform: uppercase; color: ${C.teal}; }
.kicker.light { color: ${C.sky}; }
h1, h2, h3 { font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: ${C.ink}; letter-spacing: -.02em; }
h2 { font-weight: 800; font-size: 24pt; line-height: 1.12; margin-top: 3mm; }
h3 { font-weight: 700; font-size: 11.500pt; margin: 5mm 0 1.500mm; }
em { font-style: normal; color: ${C.teal}; }
b { color: ${C.ink}; font-weight: 600; }
.body { flex: 1; min-height: 0; }
footer { display: flex; justify-content: space-between; align-items: center; font-size: 7pt; color: ${C.muted}; border-top: 0.3mm solid ${C.line}; padding-top: 3.500mm; }
footer .fl { width: 26mm; }
.lead { font-size: 13pt; line-height: 1.5; color: ${C.ink}; }
.note { margin-top: 5mm; font-size: 8.500pt; color: ${C.muted}; max-width: 190mm; border-left: 0.8mm solid ${C.sky2}; padding-left: 3.500mm; }
.cols { display: grid; gap: 12mm; }
.c2 { grid-template-columns: 1fr 1fr; }
.stage { background: #fff; border: 0.3mm solid ${C.line}; border-radius: 4mm; display: flex; align-items: center; justify-content: center; padding: 8mm; }
.stage.navy { background: ${C.navy}; border-color: ${C.navy}; } .stage.teal { background: ${C.teal}; border-color: ${C.teal}; } .stage.deep { background: ${C.deep}; border-color: ${C.deep}; }

/* okładka */
.cover { background: ${C.navy}; color: #fff; padding: 22mm; justify-content: space-between; }
.cover .cmark { width: 30mm; position: relative; z-index: 1; }
.cover h1 { color: #fff; font-weight: 800; font-size: 64pt; line-height: 1; margin: 5mm 0 4mm; }
.cover .sub { font-size: 14pt; color: #dbe6ee; }
.cover .ctext { position: relative; z-index: 1; }
.cover .cfoot { font-size: 8.500pt; letter-spacing: .14em; text-transform: uppercase; color: #b7c9d6; position: relative; z-index: 1; }
.cover .cring { position: absolute; right: -45mm; top: -30mm; width: 230mm; opacity: .55; }

.toc { columns: 2; column-gap: 14mm; max-width: 220mm; }
.toc div { display: flex; gap: 5mm; padding: 2.600mm 0; border-bottom: 0.3mm solid ${C.line}; font: 700 11.500pt 'Plus Jakarta Sans'; color: ${C.ink}; break-inside: avoid; }
.toc span { color: ${C.teal}; width: 8mm; }

.values { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
.values div { background: #fff; border: 0.3mm solid ${C.line}; border-radius: 4mm; padding: 5mm; }
.values b { font: 700 12pt 'Plus Jakarta Sans'; color: ${C.navy}; }
.values p { margin-top: 1.500mm; font-size: 9.500pt; }
.traits { display: flex; gap: 2.500mm; margin-top: 8mm; flex-wrap: wrap; }
.traits span { background: ${C.navy}; color: #fff; border-radius: 99mm; padding: 1.800mm 5mm; font: 600 9pt Archivo; }
.traits .no { background: none; color: ${C.muted}; border: 0.3mm dashed ${C.muted}; }

.rules { list-style: none; } .rules li { padding: 3mm 0; border-bottom: 0.3mm solid ${C.line}; }
.yn { display: grid; gap: 3.500mm; align-content: start; }
.yn > div { background: #fff; border-radius: 4mm; padding: 4.500mm 5mm; border: 0.3mm solid ${C.line}; border-left: 1.200mm solid ${C.teal}; }
.yn .n { border-left-color: #c0392b; }
.yn span { font: 700 7.500pt Archivo; letter-spacing: .16em; text-transform: uppercase; color: ${C.teal}; } .yn .n span { color: #c0392b; }
.yn p { margin-top: 1.200mm; color: ${C.ink}; }

.idea { grid-template-columns: 1.05fr 1fr; align-items: center; } .idea .stage { padding: 16mm 14mm; }
.idea3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm; margin-top: 9mm; }
.idea3 svg { width: 22mm; margin-bottom: 3mm; } .idea3 b { font: 700 11pt 'Plus Jakarta Sans'; } .idea3 p { font-size: 9pt; margin-top: 1mm; }

.build { grid-template-columns: 118mm 1fr; align-items: start; } .gridst { padding: 3mm; }
.spec { width: 100%; border-collapse: collapse; font-size: 9.500pt; }
.spec td, .spec th { padding: 2.600mm 0; border-bottom: 0.3mm solid ${C.line}; text-align: left; vertical-align: top; }
.spec td:first-child { color: ${C.ink}; font-weight: 600; padding-right: 6mm; } .spec th { font: 600 7.500pt Archivo; letter-spacing: .14em; text-transform: uppercase; color: ${C.muted}; }
.files td:first-child { font-family: Consolas, monospace; font-size: 8.500pt; font-weight: 400; color: ${C.navy}; }

.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6mm; }
.grid4 .wide { grid-column: span 2; } .grid4 .stage { height: 44mm; } .grid4 .wide .stage svg { max-width: 82mm; } .grid4 .stage svg { max-height: 30mm; width: auto; max-width: 100%; } .grid4 .stage.pad svg { height: 24mm; }
.cell b, .grid5 b, .gfx b, .print b, .digital b { display: block; margin-top: 3mm; font: 700 10.500pt 'Plus Jakarta Sans'; } .cell p, .grid5 p, .gfx p, .print p, .digital p { font-size: 8.800pt; }
.grid5 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm 7mm; } .grid5 .stage { height: 38mm; padding: 8mm 14mm; }

.clear { padding: 10mm; margin-bottom: 5mm; }
.cz { position: relative; width: 100mm; padding: 9.600mm; border: 0.3mm dashed ${C.teal}; background: repeating-linear-gradient(45deg, transparent 0 2mm, rgba(15,107,120,.07) 2mm 2.300mm); }
.cz svg { background: #fff; } .cz .x { position: absolute; font: 600 7pt Archivo; color: ${C.teal}; font-style: normal; } .cz .t { top: 3mm; left: 50%; } .cz .l { left: 1.500mm; top: 50%; }
.mins { display: flex; align-items: flex-end; gap: 10mm; margin-top: 8mm; padding: 6mm; background: #fff; border: 0.3mm solid ${C.line}; border-radius: 4mm; }

.grid6 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm; } .bgx { height: 50mm; border-radius: 4mm; display: flex; align-items: center; justify-content: center; padding: 0 16mm; background-size: cover; background-position: center; }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5mm 7mm; }
.bad .stage { height: 46mm; overflow: hidden; } .bad .bi { width: 62mm; } .bad p { margin-top: 2mm; font-size: 9.300pt; color: ${C.ink}; } .bad i { color: #c0392b; font-style: normal; font-weight: 700; margin-right: 2mm; }

.swrow { display: grid; gap: 6mm; } .p3 { grid-template-columns: repeat(3, 1fr); } .p8 { grid-template-columns: repeat(4, 1fr); gap: 4.500mm 6mm; }
.sw .chip { height: 16mm; border-radius: 3mm; padding: 3mm 4mm; display: flex; align-items: flex-end; } .sw.big .chip { height: 46mm; padding: 5mm; }
.sw .chip b { color: inherit; font: 700 9.500pt 'Plus Jakarta Sans'; } .sw.big .chip b { font-size: 14pt; }
.sw dl { display: grid; grid-template-columns: 13mm 1fr; font-size: 8pt; margin-top: 2mm; } .sw.big dl { font-size: 9.500pt; margin-top: 3.500mm; } .sw dt { color: ${C.muted}; } .sw dd { color: ${C.ink}; font-weight: 600; }
.sw p { font-size: 8pt; margin-top: 1mm; line-height: 1.35; } .sw.big p { font-size: 9.500pt; margin-top: 2.500mm; }
.prop { display: flex; height: 13mm; border-radius: 3mm; overflow: hidden; margin-top: 8mm; } .prop span { display: flex; align-items: center; padding-left: 4mm; color: #fff; font: 600 8pt Archivo; }
.contrast { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3.500mm 6mm; } .contrast > div { display: flex; gap: 3.500mm; align-items: center; }
.cs { width: 13mm; height: 11mm; border-radius: 2.500mm; display: flex; align-items: center; justify-content: center; font: 800 12pt 'Plus Jakarta Sans'; flex: none; } .contrast b { font-size: 8.800pt; } .contrast p { font-size: 8pt; }

.type .spec1 { font-size: 34pt; line-height: 1.1; color: ${C.navy}; margin: 3mm 0 4mm; letter-spacing: -.02em; } .type .abc { font-size: 17pt; line-height: 1.35; color: ${C.ink}; margin-bottom: 5mm; padding: 5mm 6mm; background: #fff; border: 0.3mm solid ${C.line}; border-radius: 4mm; }
.hier > div { padding: 2.900mm 0; border-bottom: 0.3mm solid ${C.line}; display: grid; grid-template-columns: 78mm 1fr; gap: 8mm; align-items: center; } .hier span { font-size: 8pt; color: ${C.muted}; }

.gfx .stage { height: 36mm; padding: 5mm; }
.ledger { background: repeating-linear-gradient(${C.paper} 0 5.700mm, ${C.line} 5.700mm 6mm) !important; }
.democard { background: #fff; border: 0.3mm solid ${C.line}; border-radius: 4mm; padding: 4mm 5mm; box-shadow: 0 5mm 10mm -5mm rgba(0,51,102,.35); } .chips { display: flex; gap: 1.500mm; margin-top: 3mm; } .chips i { font: 600 7.500pt Archivo; font-style: normal; background: ${C.mint}; color: ${C.navy}; border-radius: 2mm; padding: 1.500mm 3.500mm; }
.bars { display: flex; align-items: flex-end; gap: 2mm; height: 22mm; width: 46mm; } .bars i { flex: 1; background: rgba(255,255,255,.3); border-radius: 1.200mm; }
.icons { display: grid; grid-template-columns: repeat(4, 10mm); gap: 2.500mm; } .icons svg { background: ${C.mint}; color: ${C.navy}; border-radius: 2.500mm; padding: 2.300mm; }
.btns { display: flex; flex-direction: column; gap: 2.500mm; align-items: flex-start; } .btns span { border-radius: 99mm; padding: 2.600mm 6mm; font: 600 9pt Archivo; } .b1 { background: ${C.navy}; color: #fff; } .b2 { border: 0.3mm solid ${C.line}; color: ${C.navy}; background: #fff; }
.gfx .stage:has(.wedge) { overflow: hidden; padding: 0; align-items: flex-start; justify-content: flex-end; } .wedge { width: 70mm; margin: -22mm -18mm 0 0; }

.photos { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; margin-bottom: 6mm; } .photos img { width: 100%; height: 62mm; object-fit: cover; border-radius: 4mm; display: block; } .yn.one { display: block; }

.print { display: grid; grid-template-columns: 1fr 1.050fr .850fr; gap: 9mm; }
.bc { width: 90mm; height: 50mm; border-radius: 1.500mm; box-shadow: 0 4mm 9mm -4mm rgba(0,51,102,.4); margin-bottom: 4mm; }
.bc.front { background: ${C.navy}; display: flex; align-items: center; justify-content: center; } .bc.front svg { width: 34mm; }
.bc.back { background: #fff; padding: 6mm 7mm; position: relative; } .bc .bl { width: 30mm; } .nm { font: 700 11pt 'Plus Jakarta Sans'; color: ${C.ink}; margin-top: 4.500mm; } .rl { font-size: 7.500pt; color: ${C.teal}; } .ct { font-size: 7.500pt; margin-top: 2mm; line-height: 1.5; color: ${C.ink}; } .bc .ad { position: absolute; right: 7mm; bottom: 6mm; font-size: 6.500pt; color: ${C.muted}; }
.lh { width: 84mm; height: 118mm; background: #fff; box-shadow: 0 4mm 9mm -4mm rgba(0,51,102,.4); padding: 8mm; display: flex; flex-direction: column; } .lhl { width: 30mm; } .lines { flex: 1; padding-top: 12mm; } .lines i { display: block; height: .5mm; background: ${C.line}; margin-bottom: 4mm; } .lines i:nth-child(4n) { width: 60%; margin-bottom: 8mm; }
.lhf { border-top: 0.3mm solid ${C.line}; padding-top: 2mm; font-size: 4.500pt; color: ${C.muted}; display: flex; flex-direction: column; }
.stamp { width: 44mm; padding: 4mm 6mm; border: 0.3mm solid ${C.line}; background: #fff; border-radius: 2mm; } .env { width: 74mm; height: 37mm; background: #fff; box-shadow: 0 3mm 8mm -4mm rgba(0,51,102,.4); padding: 5mm; margin-top: 7mm; } .env div { width: 26mm; }

.digital { display: grid; grid-template-columns: 1.150fr .750fr 1fr; gap: 9mm; }
.mail { background: #fff; border: 0.3mm solid ${C.line}; border-radius: 4mm; padding: 7mm; height: 78mm; font-family: Arial, sans-serif; } .mail > p:first-child { color: ${C.ink}; margin-bottom: 3mm; } .mail .nm { font-family: Arial; margin-top: 0; } .ml { width: 37mm; margin: 4mm 0 3mm; }
.soc { display: flex; gap: 6mm; align-items: center; height: 78mm; justify-content: center; background: #fff; border: 0.3mm solid ${C.line}; border-radius: 4mm; } .av { width: 30mm; } .av.sq { width: 14mm; }
.post { height: 78mm; background: ${C.navy}; border-radius: 4mm; padding: 7mm; position: relative; overflow: hidden; } .post .tag { background: ${C.sky}; color: ${C.navy}; font: 700 7.500pt Archivo; border-radius: 99mm; padding: 1.500mm 4mm; position: relative; z-index: 1; } .post p { font: 800 17pt/1.15 'Plus Jakarta Sans'; color: #fff; margin-top: 6mm; max-width: 62mm; position: relative; z-index: 1; } .pl { position: absolute; left: 7mm; bottom: 7mm; width: 34mm; z-index: 1; } .pw { position: absolute; right: -22mm; bottom: -24mm; width: 80mm; opacity: .5; }
.endlogo { width: 62mm; margin-top: 12mm; }
`;

const fontCss = ["plus-jakarta-sans/700.css", "plus-jakarta-sans/800.css", "archivo/400.css", "archivo/600.css"].map((f) => `<link rel="stylesheet" href="../node_modules/@fontsource/${f}">`).join("");
const html = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>E-Numerika – księga znaku</title>${fontCss}<style>${css}</style></head><body>${pages.join("\n")}</body></html>`;
fs.mkdirSync("brand", { recursive: true });
fs.writeFileSync("brand/brandbook.html", html);

const browser = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find((p) => fs.existsSync(p));
const pdf = path.resolve("brand/E-Numerika-brandbook.pdf");
execFileSync(browser, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--user-data-dir=${path.resolve("scripts/_src/tmp/edge-profile")}`, "--virtual-time-budget=8000", `--print-to-pdf=${pdf}`, pathToFileURL(path.resolve("brand/brandbook.html")).href], { stdio: "ignore" });
console.log("brandbook:", pages.length, "stron,", Math.round(fs.statSync(pdf).size / 1024), "kB");
