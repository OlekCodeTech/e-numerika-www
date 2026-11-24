export type Service = {
  slug: string;
  name: string;
  /** krótka nazwa do menu i kafli */
  short: string;
  icon: "book" | "users" | "scale" | "chart" | "file" | "handshake" | "building" | "user" | "rocket" | "workflow" | "globe";
  teaser: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  highlights: string[];
  sections: { title: string; text: string; bullets?: string[] }[];
  faq: { q: string; a: string }[];
  /** grupa na stronie oferty */
  group: "ksiegowosc" | "kadry" | "doradztwo" | "wdrozenia";
  badge?: string;
};

export const services: Service[] = [
  {
    slug: "kompletna-obsluga-ksiegowa",
    name: "Kompletna obsługa księgowa",
    short: "Obsługa księgowa",
    icon: "book",
    group: "ksiegowosc",
    teaser: "Księgi rachunkowe, KPiR i ryczałt. Rozliczamy VAT, CIT i PIT, wysyłamy deklaracje i pilnujemy terminów.",
    metaTitle: "Kompleksowa obsługa księgowa firm – online i stacjonarnie",
    metaDescription: "Kompleksowa obsługa księgowa: pełna księgowość, KPiR i ryczałt, VAT, CIT, PIT, JPK. Dedykowana księgowa, dokumenty online. Pakiety od 200 zł netto.",
    h1: "Kompleksowa obsługa księgowa firm",
    lead: "Prowadzimy księgowość spółek i jednoosobowych działalności: od pierwszej faktury po sprawozdanie roczne. Ty przesyłasz dokumenty, my księgujemy, rozliczamy podatki i przypominamy o terminach.",
    highlights: ["Dedykowana księgowa lub księgowy", "Dokumenty przesyłasz online", "Stała cena w pakiecie"],
    sections: [
      {
        title: "Co obejmuje obsługa księgowa",
        text: "Zakres dopasowujemy do formy prawnej i sposobu opodatkowania. W każdym pakiecie dostajesz komplet czynności potrzebnych do poprawnego rozliczenia miesiąca.",
        bullets: [
          "Prowadzenie ksiąg rachunkowych, KPiR lub ewidencji ryczałtu",
          "Ewidencje VAT i wysyłka JPK_V7",
          "Zaliczki na PIT i CIT oraz deklaracje roczne",
          "Ewidencja środków trwałych i amortyzacja",
          "Rozrachunki z kontrahentami i uzgadnianie sald",
          "Reprezentacja przed urzędem skarbowym i ZUS w ramach pełnomocnictwa",
        ],
      },
      {
        title: "Jak wygląda współpraca na co dzień",
        text: "Dokumenty wgrywasz do systemu online albo przekazujesz w biurze. Po zaksięgowaniu miesiąca dostajesz informację o podatkach do zapłaty wraz z terminami. Pytania zadajesz bezpośrednio osobie, która prowadzi Twoje księgi, a nie anonimowej infolinii.",
      },
      {
        title: "Dla kogo",
        text: "Obsługujemy spółki z o.o., spółki osobowe i jednoosobowe działalności z różnych branż: usługi, handel, e-commerce, IT, budownictwo i transport. Jeśli zmieniasz biuro, przejmiemy księgi w trakcie roku i zadbamy o ciągłość rozliczeń.",
      },
    ],
    faq: [
      { q: "Ile kosztuje obsługa księgowa?", a: "Cena zależy od formy prawnej i liczby dokumentów w miesiącu. Pakiety dla JDG zaczynają się od 200 zł netto, a dla spółek od 320 zł netto. Dokładną kwotę policzysz w kalkulatorze na stronie." },
      { q: "Czy mogę zmienić biuro rachunkowe w trakcie roku?", a: "Tak. Odbieramy dokumentację od poprzedniego biura, sprawdzamy salda otwarcia i kontynuujemy rozliczenia bez przerwy. Najwygodniej zrobić to z początkiem miesiąca." },
      { q: "Co liczy się jako dokument księgowy?", a: "Faktura, rachunek, paragon, raport kasowy, rozliczenie podróży służbowej, amortyzacja środka trwałego i polecenie księgowania. Na wyciągu bankowym każde 20 pozycji liczymy jako jeden dokument." },
      { q: "Czy obsługujecie firmy spoza Szczecina?", a: "Tak. Większość spraw załatwiamy online, dlatego prowadzimy księgowość firm z całej Polski, między innymi ze Szczecina, Wielunia i okolic." },
    ],
  },
  {
    slug: "ksiegowosc-spolki-z-oo",
    name: "Księgowość dla spółki z o.o.",
    short: "Księgowość spółek",
    icon: "building",
    group: "ksiegowosc",
    badge: "Najczęściej wybierane",
    teaser: "Pełna księgowość spółek kapitałowych: księgi rachunkowe, CIT, VAT, sprawozdanie finansowe i zgłoszenia do KRS.",
    metaTitle: "Księgowość spółki z o.o. – pełna księgowość od 320 zł",
    metaDescription: "Pełna księgowość dla spółki z o.o.: księgi rachunkowe, CIT, VAT, JPK, sprawozdanie finansowe i e-KRS. Obsługa online i w Szczecinie. Od 320 zł netto.",
    h1: "Księgowość dla spółki z o.o.",
    lead: "Spółka z o.o. musi prowadzić pełne księgi rachunkowe od pierwszego dnia. Przejmujemy cały ten obowiązek: od planu kont i polityki rachunkowości po roczne sprawozdanie finansowe.",
    highlights: ["Pełne księgi rachunkowe", "Sprawozdanie finansowe i e-KRS", "Wsparcie zarządu w decyzjach"],
    sections: [
      {
        title: "Zakres obsługi spółki",
        text: "Zajmujemy się wszystkim, czego wymaga ustawa o rachunkowości i przepisy podatkowe.",
        bullets: [
          "Zakładowy plan kont i polityka rachunkowości",
          "Bieżące księgowanie dokumentów i wyciągów bankowych",
          "CIT (także estoński CIT), VAT, JPK_V7 i deklaracje PCC",
          "Rozliczenie wynagrodzeń zarządu i wspólników",
          "Bilans, rachunek zysków i strat, informacja dodatkowa",
          "Przygotowanie sprawozdania do podpisu i złożenia w e-KRS",
        ],
      },
      {
        title: "Spółka dopiero powstaje?",
        text: "Pomagamy od etapu rejestracji: wybór formy opodatkowania, zgłoszenia do urzędu skarbowego, VAT-R, CRBR i pierwsze kroki po wpisie do KRS. Dzięki temu księgi od początku są prowadzone tak, jak będzie tego wymagał bilans.",
      },
      {
        title: "Raporty, które rozumiesz",
        text: "Oprócz obowiązkowych deklaracji możesz otrzymywać zestawienie wyniku, należności i zobowiązań. Zarząd widzi, ile spółka zarabia i jaki podatek zapłaci, zanim minie termin.",
      },
    ],
    faq: [
      { q: "Ile kosztuje księgowość spółki z o.o.?", a: "Pakiety dla spółek zaczynają się od 320 zł netto miesięcznie (do 10 dokumentów). Przy 45 dokumentach to 700 zł netto. Dokładną kwotę dla swojej liczby dokumentów policzysz w kalkulatorze." },
      { q: "Czy spółka bez obrotów też musi prowadzić księgowość?", a: "Tak. Spółka z o.o. prowadzi księgi i składa sprawozdanie finansowe nawet wtedy, gdy nie wystawiła żadnej faktury. Dla takich spółek sprawdza się pakiet Startowy." },
      { q: "Czy rozliczacie estoński CIT?", a: "Tak. Sprawdzamy, czy spółka spełnia warunki, pomagamy w wejściu w ryczałt od dochodów spółek i prowadzimy rozliczenia zgodnie z jego zasadami." },
    ],
  },
  {
    slug: "ksiegowosc-jdg",
    name: "Księgowość dla JDG",
    short: "Księgowość JDG",
    icon: "user",
    group: "ksiegowosc",
    teaser: "KPiR, ryczałt i VAT dla jednoosobowych działalności. Jasne rozliczenia i pomoc w wyborze formy opodatkowania.",
    metaTitle: "Księgowość JDG – KPiR i ryczałt od 200 zł netto",
    metaDescription: "Księgowość dla jednoosobowej działalności: KPiR, ryczałt, VAT, ZUS, PIT roczny. Pomoc w wyborze formy opodatkowania. Obsługa online od 200 zł netto.",
    h1: "Księgowość dla jednoosobowej działalności",
    lead: "Prowadzisz firmę sam i nie chcesz tracić wieczorów na faktury i terminy. Prowadzimy KPiR albo ewidencję ryczałtu, liczymy podatki i składki, a Ty co miesiąc dostajesz krótką informację: ile i do kiedy zapłacić.",
    highlights: ["KPiR, ryczałt, karta podatkowa", "VAT i JPK w cenie", "Pomoc przy ZUS i ulgach na start"],
    sections: [
      {
        title: "Co robimy za Ciebie",
        text: "Zakres obejmuje wszystkie bieżące obowiązki przedsiębiorcy wobec urzędu skarbowego i ZUS.",
        bullets: [
          "Księga przychodów i rozchodów lub ewidencja przychodów",
          "Rejestry VAT i JPK_V7",
          "Zaliczki na podatek dochodowy i zeznanie roczne",
          "Deklaracje ZUS przedsiębiorcy, w tym składka zdrowotna",
          "Ewidencja środków trwałych i samochodu w firmie",
        ],
      },
      {
        title: "Wybór formy opodatkowania",
        text: "Skala, podatek liniowy czy ryczałt? Liczymy warianty na Twoich liczbach, z uwzględnieniem składki zdrowotnej i kosztów. Decyzję podejmujesz, widząc konkretne kwoty, a nie ogólne zasady.",
      },
      {
        title: "Start działalności",
        text: "Pomagamy wypełnić wniosek CEIDG, wybrać kody PKD, zgłosić się do VAT i skorzystać z ulgi na start oraz małego ZUS. Jeśli rozważasz przejście na spółkę z o.o., porównamy oba rozwiązania.",
      },
    ],
    faq: [
      { q: "Ile kosztuje księgowość JDG?", a: "Od 200 zł netto miesięcznie za pakiet do 10 dokumentów. Pakiet do 15 dokumentów kosztuje 300 zł netto, a do 45 dokumentów 450 zł netto. Każdy dokument ponad limit to 10 zł." },
      { q: "Czy pomagacie przy zakładaniu działalności?", a: "Tak. Przeprowadzamy przez rejestrację w CEIDG, zgłoszenie do VAT i ZUS oraz wybór formy opodatkowania." },
      { q: "Mam tylko kilka faktur miesięcznie. Czy to się opłaca?", a: "Pakiet Startowy jest przygotowany właśnie dla małej liczby dokumentów. W cenie masz księgową, która odpowiada na pytania i pilnuje terminów." },
    ],
  },
  {
    slug: "obsluga-kadrowa-i-placowa",
    name: "Obsługa kadrowa i płacowa",
    short: "Kadry i płace",
    icon: "users",
    group: "kadry",
    teaser: "Umowy, listy płac, ZUS, akta osobowe i PIT-11. Rozliczamy pracowników, zleceniobiorców i zarząd.",
    metaTitle: "Obsługa kadrowa i płacowa firm – kadry i płace online",
    metaDescription: "Kadry i płace dla firm: umowy o pracę i zlecenia, listy płac, ZUS, akta osobowe, PIT-11. Od 35 zł netto za osobę. Obsługa online i stacjonarnie.",
    h1: "Obsługa kadrowa i płacowa",
    lead: "Zatrudniasz pierwszą osobę albo cały zespół? Przygotowujemy umowy, naliczamy wynagrodzenia, rozliczamy ZUS i podatki, prowadzimy akta osobowe. Pracownicy dostają wypłatę na czas, a Ty masz porządek w dokumentach.",
    highlights: ["Rozliczenie od 35 zł netto za osobę", "Pracownicy, zleceniobiorcy i zarząd", "Akta osobowe i dokumentacja ZUS"],
    sections: [
      {
        title: "Kadry",
        text: "Prowadzimy dokumentację pracowniczą zgodnie z Kodeksem pracy.",
        bullets: ["Umowy o pracę, aneksy, wypowiedzenia i świadectwa pracy", "Akta osobowe i ewidencja czasu pracy", "Urlopy, zwolnienia lekarskie i inne nieobecności", "Zgłoszenia i wyrejestrowania w ZUS"],
      },
      {
        title: "Płace",
        text: "Co miesiąc dostajesz listę płac z kwotami do wypłaty, składkami i zaliczką na podatek.",
        bullets: ["Listy płac i paski wynagrodzeń", "Deklaracje ZUS DRA i raporty imienne", "Zaliczki PIT-4 i roczne PIT-11", "Rozliczanie umów zlecenia, o dzieło i powołań zarządu", "PPK oraz potrącenia komornicze"],
      },
      {
        title: "Dlaczego warto zlecić kadry na zewnątrz",
        text: "Przepisy płacowe zmieniają się kilka razy w roku. Zlecając kadry biuru, nie musisz śledzić każdej zmiany ani utrzymywać własnego programu. Płacisz tylko za osoby, które faktycznie rozliczamy w danym miesiącu.",
      },
    ],
    faq: [
      { q: "Ile kosztuje obsługa kadrowo-płacowa?", a: "Pracownik na umowie o pracę to 60 zł netto miesięcznie, umowa zlecenie lub o dzieło 45 zł netto, zlecenie bez składek ZUS oraz członek zarządu z powołania 35 zł netto." },
      { q: "Czy mogę zlecić same kadry i płace, bez księgowości?", a: "Tak. Kadry i płace prowadzimy także jako osobną usługę i przekazujemy Twojej księgowości gotowe dane do zaksięgowania." },
      { q: "Czy przygotowujecie umowy?", a: "Tak. Sporządzenie umowy o pracę lub umowy cywilnoprawnej jest częścią obsługi danej osoby." },
    ],
  },
  {
    slug: "sprawozdania-i-bilans",
    name: "Sprawozdania finansowe i bilans",
    short: "Sprawozdania i bilans",
    icon: "chart",
    group: "ksiegowosc",
    teaser: "Roczne sprawozdanie finansowe, bilans i rachunek zysków i strat. Także na żądanie banku lub inwestora.",
    metaTitle: "Sprawozdanie finansowe i bilans – sporządzenie dla spółek",
    metaDescription: "Sporządzamy sprawozdania finansowe: bilans, rachunek zysków i strat, informację dodatkową. Przygotowanie do e-KRS, bilans na żądanie banku. Sprawdź ofertę.",
    h1: "Sprawozdania finansowe i bilans",
    lead: "Przygotowujemy roczne sprawozdanie finansowe zgodne z ustawą o rachunkowości oraz bilans śródroczny, gdy potrzebuje go bank, leasingodawca albo inwestor.",
    highlights: ["Format e-Sprawozdania", "Przygotowanie do podpisu i e-KRS", "Bilans na żądanie w ciągu roku"],
    sections: [
      {
        title: "Co przygotowujemy",
        text: "Zakres zależy od wielkości jednostki i wybranych uproszczeń.",
        bullets: ["Bilans oraz rachunek zysków i strat", "Informacja dodatkowa i wprowadzenie do sprawozdania", "Zestawienie zmian w kapitale i rachunek przepływów, jeśli są wymagane", "Uchwały o zatwierdzeniu sprawozdania i podziale wyniku"],
      },
      {
        title: "Terminy, o których pamiętamy",
        text: "Sprawozdanie trzeba sporządzić w ciągu trzech miesięcy od dnia bilansowego, zatwierdzić w ciągu sześciu miesięcy, a następnie złożyć w KRS w ciągu piętnastu dni od zatwierdzenia. Prowadzimy klienta przez każdy z tych kroków.",
      },
      {
        title: "Sprawozdanie dla spółki prowadzonej gdzie indziej",
        text: "Możemy sporządzić sprawozdanie także wtedy, gdy księgi prowadziło inne biuro lub własny dział księgowy. Zaczynamy od weryfikacji zestawienia obrotów i sald.",
      },
    ],
    faq: [
      { q: "Kto musi sporządzić sprawozdanie finansowe?", a: "Każda jednostka prowadząca księgi rachunkowe, w tym wszystkie spółki z o.o., również te bez przychodów." },
      { q: "Czy pomagacie złożyć sprawozdanie w KRS?", a: "Tak. Przygotowujemy pliki w wymaganym formacie i prowadzimy zarząd przez podpis elektroniczny oraz wysyłkę w systemie e-KRS." },
    ],
  },
  {
    slug: "polityka-rachunkowosci",
    name: "Polityka rachunkowości",
    short: "Polityka rachunkowości",
    icon: "file",
    group: "ksiegowosc",
    teaser: "Opracowanie i aktualizacja polityki rachunkowości oraz zakładowego planu kont dopasowanego do firmy.",
    metaTitle: "Polityka rachunkowości – opracowanie i aktualizacja",
    metaDescription: "Opracowujemy politykę rachunkowości i zakładowy plan kont: zasady wyceny, amortyzacji i ewidencji dopasowane do Twojej firmy. Aktualizacja istniejącej dokumentacji.",
    h1: "Polityka rachunkowości przedsiębiorstwa",
    lead: "Polityka rachunkowości to dokument, który każda jednostka prowadząca księgi musi mieć na piśmie. Opracowujemy ją od zera albo aktualizujemy istniejącą, tak aby opisywała to, jak firma naprawdę działa.",
    highlights: ["Zgodność z ustawą o rachunkowości", "Plan kont dopasowany do firmy", "Uproszczenia dla małych jednostek"],
    sections: [
      {
        title: "Z czego składa się dokumentacja",
        text: "Przygotowujemy komplet elementów wymaganych przez ustawę.",
        bullets: ["Określenie roku obrotowego i okresów sprawozdawczych", "Metody wyceny aktywów i pasywów oraz ustalania wyniku", "Zakładowy plan kont z zasadami klasyfikacji zdarzeń", "Wykaz ksiąg i opis systemu informatycznego", "Zasady ochrony danych i archiwizacji dokumentów"],
      },
      {
        title: "Kiedy warto ją zaktualizować",
        text: "Po zmianie programu księgowego, wejściu w estoński CIT, przekroczeniu progów dla jednostek mikro i małych albo gdy firma zaczyna nowy rodzaj działalności. Nieaktualna polityka bywa pierwszą rzeczą, o którą pyta biegły rewident i urząd.",
      },
    ],
    faq: [
      { q: "Czy mała spółka też potrzebuje polityki rachunkowości?", a: "Tak. Obowiązek dotyczy każdej jednostki prowadzącej księgi rachunkowe. Małe jednostki mogą natomiast skorzystać z uproszczeń, które wpisujemy do dokumentu." },
      { q: "Kto zatwierdza politykę rachunkowości?", a: "Kierownik jednostki, czyli najczęściej zarząd spółki. Przygotowujemy dokument gotowy do podpisu." },
    ],
  },
  {
    slug: "doradztwo-podatkowe",
    name: "Wsparcie podatkowe dla firm",
    short: "Wsparcie podatkowe",
    icon: "scale",
    group: "doradztwo",
    teaser: "Wybór formy opodatkowania, analiza ulg i skutków podatkowych planowanych decyzji. Konkretne liczby zamiast ogólników.",
    metaTitle: "Wsparcie i doradztwo podatkowe dla firm – online",
    metaDescription: "Pomagamy wybrać formę opodatkowania, policzyć warianty i ocenić skutki podatkowe decyzji. Ulgi, estoński CIT, kontakt z urzędem skarbowym. Konsultacje online.",
    h1: "Wsparcie podatkowe dla przedsiębiorców",
    lead: "Zanim podpiszesz umowę, kupisz samochód albo zmienisz formę działalności, sprawdź, co to oznacza dla podatków. Liczymy warianty na Twoich danych i tłumaczymy wynik prostym językiem.",
    highlights: ["Porównanie form opodatkowania", "Ulgi i zwolnienia", "Pomoc w kontaktach z urzędem"],
    sections: [
      {
        title: "W czym pomagamy",
        text: "Najczęściej klienci przychodzą do nas z jednym z poniższych tematów.",
        bullets: ["Skala, podatek liniowy, ryczałt czy estoński CIT", "JDG czy spółka z o.o. – porównanie obciążeń", "Leasing, zakup lub najem samochodu w firmie", "Ulgi: na start, IP Box, B+R, na robotyzację", "Wypłata zysku ze spółki i wynagrodzenie zarządu", "Pisma i wyjaśnienia dla urzędu skarbowego"],
      },
      {
        title: "Jak wygląda konsultacja",
        text: "Opisujesz sytuację, przesyłasz dane i dostajesz pisemne podsumowanie z wyliczeniem wariantów. Konsultacje dla stałych klientów są częścią pakietu, a dla pozostałych firm wyceniamy je przed rozpoczęciem pracy.",
      },
    ],
    faq: [
      { q: "Czy konsultacja odbywa się online?", a: "Tak, przez telefon lub wideorozmowę. W Szczecinie i okolicach możemy spotkać się także osobiście." },
      { q: "Kiedy najlepiej zmienić formę opodatkowania?", a: "Co do zasady na początku roku podatkowego, dlatego analizę warto zrobić w ostatnim kwartale. Policzymy warianty na podstawie Twoich tegorocznych wyników." },
    ],
  },
  {
    slug: "wspieramy-i-doradzamy",
    name: "Stałe wsparcie i doradztwo dla firm",
    short: "Wsparcie biznesu",
    icon: "handshake",
    group: "doradztwo",
    teaser: "Przejęcie ksiąg od innego biura, optymalizacja ZUS i kosztów, pomoc przy przekształceniach i bieżących problemach.",
    metaTitle: "Doradztwo księgowe i wsparcie dla firm – E-Numerika",
    metaDescription: "Stałe wsparcie księgowe: przejęcie ksiąg od innego biura, optymalizacja ZUS i podatków, przekształcenia, analiza kosztów. Szybkie odpowiedzi dedykowanej księgowej.",
    h1: "Stałe wsparcie i doradztwo księgowe",
    lead: "Księgowość to nie tylko deklaracje. Pomagamy w sytuacjach, które wykraczają poza zwykły miesiąc: zmiana biura, kontrola, nowy wspólnik, pierwszy pracownik albo problem z płynnością.",
    highlights: ["Przejęcie ksiąg bez przestoju", "Optymalizacja ZUS i kosztów", "Szybka odpowiedź na pytania"],
    sections: [
      {
        title: "Przejęcie ksiąg od innego biura",
        text: "Przygotowujemy listę dokumentów do odebrania, sprawdzamy salda i poprawność poprzednich okresów, a następnie kontynuujemy rozliczenia. Jeśli znajdziemy błędy, mówimy o nich wprost i proponujemy korekty.",
      },
      {
        title: "Optymalizacja ZUS i podatków",
        text: "Sprawdzamy, czy korzystasz ze wszystkich przysługujących ulg i czy forma opodatkowania nadal się opłaca. Proponujemy wyłącznie rozwiązania zgodne z przepisami.",
        bullets: ["Ulga na start, preferencyjny ZUS, mały ZUS plus", "Analiza kosztów i rentowności", "Planowanie zaliczek i płynności podatkowej"],
      },
      {
        title: "Zakładanie i przekształcenia",
        text: "Wspieramy przy rejestracji działalności i spółek, przekształceniu JDG w spółkę z o.o. oraz zmianach w strukturze wspólników. Współpracujemy z kancelariami notarialnymi i prawnymi, gdy sprawa tego wymaga.",
      },
    ],
    faq: [
      { q: "Jak długo trwa przejęcie księgowości?", a: "Zwykle kilka dni roboczych od otrzymania dokumentów z poprzedniego biura. Rozliczenie bieżącego miesiąca odbywa się już u nas." },
      { q: "Czy pomagacie w razie kontroli?", a: "Tak. Przygotowujemy dokumenty i wyjaśnienia oraz reprezentujemy klienta w ramach udzielonego pełnomocnictwa." },
    ],
  },
  {
    slug: "zakladanie-spolek-z-oo",
    name: "Zakładanie spółek z o.o.",
    short: "Zakładanie spółek",
    icon: "rocket",
    group: "doradztwo",
    teaser: "Rejestracja spółki przez S24 lub u notariusza, zgłoszenia do urzędów i księgowość od pierwszego dnia.",
    metaTitle: "Zakładanie spółki z o.o. – rejestracja i księgowość",
    metaDescription: "Pomagamy założyć spółkę z o.o.: rejestracja w S24 lub u notariusza, NIP-8, VAT-R, CRBR, wybór opodatkowania i księgowość od pierwszego dnia. Sprawdź, jak to działa.",
    h1: "Zakładanie spółki z o.o. krok po kroku",
    lead: "Przeprowadzamy przez rejestrację spółki i wszystkie zgłoszenia, o których łatwo zapomnieć po wpisie do KRS. Od pierwszego dnia masz też prowadzone księgi.",
    highlights: ["Rejestracja przez S24 lub notarialnie", "Komplet zgłoszeń po wpisie", "Księgowość od pierwszego dnia"],
    sections: [
      {
        title: "Jak przebiega rejestracja",
        text: "Wspólnie ustalamy kształt spółki, a potem pilnujemy formalności.",
        bullets: ["Ustalenie wspólników, kapitału, zarządu i przedmiotu działalności (PKD)", "Umowa spółki w systemie S24 albo w formie aktu notarialnego", "Wniosek o wpis do KRS i opłaty sądowe", "NIP-8, zgłoszenie do VAT (VAT-R) i deklaracja PCC-3", "Zgłoszenie beneficjentów rzeczywistych do CRBR", "Wybór formy opodatkowania i roku obrotowego"],
      },
      {
        title: "Ile to kosztuje",
        text: "Opłaty sądowe przy rejestracji w S24 są niższe niż przy tradycyjnej, a do tego dochodzi podatek PCC od kapitału zakładowego. Szczegółowe wyliczenie znajdziesz w naszym artykule o kosztach założenia spółki, a wycenę naszej pomocy przygotujemy po krótkiej rozmowie.",
      },
      {
        title: "Co dalej",
        text: "Po rejestracji spółka od razu ma obowiązki: pełne księgi, sprawozdanie finansowe i comiesięczne deklaracje. Dlatego rejestrację najwygodniej połączyć z pakietem księgowości dla spółek.",
      },
    ],
    faq: [
      { q: "Ile trwa założenie spółki z o.o.?", a: "Wpis w systemie S24 zwykle pojawia się w ciągu kilku dni roboczych. Rejestracja z aktem notarialnym trwa dłużej, bo zależy od obciążenia sądu rejestrowego." },
      { q: "Jaki jest minimalny kapitał zakładowy?", a: "5 000 zł. Wspólnicy mogą ustalić wyższą kwotę, jeśli wymaga tego skala działalności." },
      { q: "Czy jedna osoba może założyć spółkę z o.o.?", a: "Tak, spółka może mieć jednego wspólnika. Warto wtedy sprawdzić skutki w ZUS, bo jedyny wspólnik opłaca składki jak przedsiębiorca." },
    ],
  },
  {
    slug: "schematy-dekretacji-rewizor-nexo",
    name: "Schematy dekretacji w Rewizor nexo",
    short: "Rewizor nexo",
    icon: "workflow",
    group: "wdrozenia",
    badge: "Nowość",
    teaser: "Projektujemy i wdrażamy schematy dekretacji, plan kont i automatyzacje w Rewizor nexo dla biur rachunkowych i działów księgowych.",
    metaTitle: "Schematy dekretacji Rewizor nexo – tworzenie i wdrożenie",
    metaDescription: "Tworzymy schematy dekretacji w Rewizor nexo: lista płac, wyciągi bankowe, faktury, podatki. Konfiguracja planu kont i rozrachunków. Zdalnie dla biur i firm.",
    h1: "Schematy dekretacji w Rewizor nexo",
    lead: "Dobrze ustawiony schemat dekretacji księguje dokument jednym kliknięciem. Źle ustawiony przerywa dekretację albo tworzy bałagan w rozrachunkach. Projektujemy i wdrażamy schematy w Rewizor nexo i Rewizor nexo PRO, a wiedzę bierzemy z własnej, codziennej pracy na tym programie.",
    highlights: ["Dla biur rachunkowych i księgowości wewnętrznej", "Praca zdalna na Twojej bazie", "Test na symulacji przed wdrożeniem"],
    sections: [
      {
        title: "Jakie schematy przygotowujemy",
        text: "Każdy schemat dopasowujemy do planu kont i zwyczajów księgowych danej firmy.",
        bullets: [
          "Lista płac: wynagrodzenie brutto, składki pracownika i pracodawcy, zaliczka PIT, rozrachunki z pracownikami na kontach analitycznych",
          "Wyciągi bankowe i dyspozycje: rozpoznawanie operacji po kontrahencie i tytule przelewu",
          "Faktury zakupu i sprzedaży z podziałem na rodzaje kosztów i stawki VAT",
          "Podatki i ZUS: przypisanie CIT, PIT i składek na właściwe konta rozrachunków publicznoprawnych",
          "Amortyzacja, różnice kursowe i polecenia księgowania",
        ],
      },
      {
        title: "Detale, które decydują, czy automat działa",
        text: "Większość problemów ze schematami bierze się z kilku ustawień. Sprawdzamy je przy każdym wdrożeniu.",
        bullets: [
          "Data operacji i data zapisu, na przykład ostatni dzień miesiąca listy płac",
          "Warunki uruchomienia schematu, tak aby właściwy schemat wybierał się sam",
          "Tryb rozrachunków na pozycjach: podłączenie istniejącego czy utworzenie nowego",
          "Kontekst pozycji i analityka kont, na przykład osobne konto dla każdego pracownika",
          "Rejestr księgowy i numeracja dowodów",
        ],
      },
      {
        title: "Jak wygląda zlecenie",
        text: "Zaczynamy od rozmowy i przeglądu planu kont. Następnie budujemy schematy na kopii lub firmie wzorcowej, testujemy je w symulacji dekretacji na prawdziwych dokumentach i dopiero wtedy przenosimy do bazy produkcyjnej. Na koniec przekazujemy krótką instrukcję: co schemat robi i co zmienić, gdy zmieni się plan kont.",
      },
      {
        title: "Dla kogo",
        text: "Dla biur rachunkowych, które chcą skrócić czas księgowania powtarzalnych dokumentów, oraz dla firm z własną księgowością na InsERT nexo. Pracujemy zdalnie, więc lokalizacja nie ma znaczenia.",
      },
    ],
    faq: [
      { q: "Ile kosztuje przygotowanie schematu dekretacji?", a: "Wycena zależy od liczby schematów i stopnia skomplikowania planu kont. Po krótkiej rozmowie i przeglądzie bazy podajemy stałą cenę za cały zakres." },
      { q: "Czy pracujecie na Rewizor nexo PRO?", a: "Tak. Konfigurujemy schematy zarówno w wersji standardowej, jak i PRO." },
      { q: "Czy muszę dawać dostęp do danych firmy?", a: "Schematy najlepiej budować i testować na kopii bazy lub na firmie wzorcowej. Dostęp zdalny ustalamy indywidualnie, a zakres pracy potwierdzamy umową z klauzulą poufności." },
      { q: "Schemat przerywa dekretację listy płac. Czy to da się naprawić?", a: "Zazwyczaj tak. Najczęstszą przyczyną jest tryb rozrachunków ustawiony na podłączenie istniejącego rozrachunku, którego jeszcze nie ma. Diagnozujemy problem na symulacji i poprawiamy ustawienia pozycji." },
    ],
  },
  {
    slug: "biuro-rachunkowe-online",
    name: "Biuro rachunkowe online",
    short: "Księgowość online",
    icon: "globe",
    group: "ksiegowosc",
    teaser: "Cała księgowość bez wizyt w biurze: dokumenty w chmurze, podpis elektroniczny i stały kontakt z księgową.",
    metaTitle: "Biuro rachunkowe online – księgowość przez internet",
    metaDescription: "Biuro rachunkowe online dla JDG i spółek z całej Polski. Dokumenty wysyłasz przez internet, masz dedykowaną księgową i stałą cenę. Pakiety od 200 zł netto.",
    h1: "Biuro rachunkowe online",
    lead: "Prowadzimy księgowość firm z całej Polski bez konieczności przywożenia segregatorów. Dokumenty przesyłasz przez internet, a po drugiej stronie jest konkretna osoba, która zna Twoją firmę.",
    highlights: ["Obsługa firm z całej Polski", "Archiwum dokumentów online 24/7", "Bez instalowania programów"],
    sections: [
      {
        title: "Jak działa księgowość online",
        text: "Cały proces mieści się w trzech krokach.",
        bullets: ["Wgrywasz faktury i wyciągi do systemu albo wysyłasz zdjęcia dokumentów", "Księgujemy miesiąc i wyliczamy podatki oraz składki", "Dostajesz informację, ile i do kiedy zapłacić, a dokumenty zostają w archiwum online"],
      },
      {
        title: "Czym różnimy się od automatów księgowych",
        text: "Nie jesteśmy aplikacją z infolinią. Twoje księgi prowadzi jedna, dedykowana osoba, do której możesz zadzwonić. Jednocześnie masz wygodę narzędzi online, w tym program do wystawiania faktur za 10 zł netto miesięcznie.",
      },
      {
        title: "Bezpieczeństwo danych",
        text: "Dokumenty przechowujemy w szyfrowanym archiwum z kontrolą dostępu. Z każdym klientem zawieramy umowę powierzenia przetwarzania danych osobowych.",
      },
    ],
    faq: [
      { q: "Czy muszę instalować oprogramowanie?", a: "Nie. Korzystasz z narzędzi dostępnych w przeglądarce i w telefonie." },
      { q: "Jak podpisujemy umowę?", a: "Zdalnie, podpisem elektronicznym lub profilem zaufanym. Pełnomocnictwa do urzędu skarbowego i ZUS również składamy elektronicznie." },
      { q: "Czy mogę przyjechać do biura?", a: "Tak. Siedziba biura mieści się w Bezrzeczu pod Szczecinem, a z klientami z Wielunia i okolic spotykamy się po wcześniejszym umówieniu." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceGroups: { id: Service["group"]; title: string; text: string }[] = [
  { id: "ksiegowosc", title: "Księgowość", text: "Bieżące prowadzenie ksiąg, rozliczenia podatkowe i sprawozdawczość." },
  { id: "kadry", title: "Kadry i płace", text: "Obsługa pracowników, zleceniobiorców i zarządu." },
  { id: "doradztwo", title: "Doradztwo i start firmy", text: "Decyzje podatkowe, rejestracja spółek i zmiana biura." },
  { id: "wdrozenia", title: "Wdrożenia dla księgowości", text: "Automatyzacja pracy w programach InsERT nexo." },
];
