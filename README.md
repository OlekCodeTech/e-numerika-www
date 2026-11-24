# e-numerika.pl

Strona biura rachunkowego E-Numerika. Next.js 16 (App Router, eksport statyczny do `out/`), React 19, Tailwind 4.

## Uruchomienie

```
npm install
npm run dev -- -p 3141     # podgląd: http://localhost:3141
npm run build              # gotowa strona w katalogu out/
```

## Nowy artykuł na blogu

1. Skopiuj `content/posts/_szablon.md` pod nazwą `content/posts/<adres-wpisu>.md`. Nazwa pliku to adres: `/<adres-wpisu>/`.
2. Uzupełnij nagłówek (tytuł, daty, `seoTitle`, `seoDescription`, `faq`) i treść w Markdownie.
3. Okładka: `node scripts/gen-graphics.mjs` wygeneruje brakującą okładkę w stylu marki do `public/images/blog/<adres-wpisu>.webp` (motyw i etykietę można przypisać w obiekcie `covers` w skrypcie). Można też wgrać własny plik WebP 1600×900.
4. `npm run build` i wdrożenie katalogu `out/`.

Wpis pojawia się automatycznie na blogu, stronie głównej, w mapie strony i dostaje dane strukturalne (BlogPosting, FAQPage).

## Gdzie co jest

| Co | Plik |
| --- | --- |
| Dane firmy, menu | `src/data/site.ts` |
| Cennik i logika kalkulatora | `src/data/pricing.ts` |
| Usługi (treść podstron) | `src/data/services.ts` |
| Strony lokalne (miasta) | `src/data/cities.ts` |
| Polityka prywatności | `content/pages/polityka-prywatnosci.md` |
| Przekierowania starych adresów | `public/.htaccess` |
| Formularz kontaktowy (PHP) | `public/api/contact.php` + `contact-config.php` na serwerze |
| Logo (pakiet SVG + PNG) | `public/brand/` – generuje `node scripts/gen-brand.mjs`, znak zdefiniowany w `scripts/lib/brand.mjs` |
| Księga znaku (brandbook) | `brand/E-Numerika-brandbook.pdf` – składa `node scripts/gen-brandbook.mjs` |

## Zmienne środowiskowe

- `NEXT_PUBLIC_NOINDEX=1` – wersja podglądowa (noindex, robots disallow).
- `NEXT_PUBLIC_BASE_PATH=/e-numerika-www` – podgląd w podkatalogu (np. GitHub Pages).
- `NEXT_PUBLIC_FORM_ENDPOINT` – inny adres obsługi formularza niż `/api/contact.php`.
