export type City = {
  slug: string;
  name: string;
  /** miejscownik: „w Szczecinie” */
  loc: string;
  /** dopełniacz: „ze Szczecina” */
  from: string;
  region: string;
  /** jak obsługujemy: przy siedzibie, z dojazdem czy zdalnie */
  mode: "siedziba" | "blisko" | "dojazd";
  metaTitle: string;
  metaDescription: string;
  intro: string;
  local: { title: string; text: string }[];
  nearby: string[];
  faq: { q: string; a: string }[];
};

export const cities: City[] = [
  {
    slug: "biuro-rachunkowe-szczecin",
    name: "Szczecin",
    loc: "w Szczecinie",
    from: "ze Szczecina",
    region: "zachodniopomorskie",
    mode: "blisko",
    metaTitle: "Biuro rachunkowe Szczecin – księgowość od 200 zł",
    metaDescription: "Biuro rachunkowe dla firm ze Szczecina: księgowość JDG i spółek, kadry i płace, sprawozdania. Biuro w Bezrzeczu, 15 minut od centrum, obsługa także online.",
    intro: "Prowadzimy księgowość firm ze Szczecina i okolic. Biuro mieści się w Bezrzeczu, tuż za zachodnią granicą miasta, więc dokumenty możesz przywieźć osobiście albo przesłać przez internet.",
    local: [
      {
        title: "Blisko, ale bez stania w korkach",
        text: "Z Pogodna, Gumieniec, Krzekowa czy Głębokiego dojedziesz do nas w kilkanaście minut. Klienci z Prawobrzeża i centrum najczęściej wybierają obsługę online i spotykają się z nami tylko wtedy, gdy sami tego chcą.",
      },
      {
        title: "Znamy szczecińskie urzędy",
        text: "Reprezentujemy klientów przed urzędami skarbowymi w Szczecinie oraz oddziałem ZUS. Pełnomocnictwa składamy elektronicznie, dlatego nie musisz nigdzie jeździć ani stać w kolejkach.",
      },
      {
        title: "Dla kogo pracujemy w Szczecinie",
        text: "Obsługujemy firmy usługowe, handlowe i budowlane, sklepy internetowe, specjalistów IT na B2B oraz spółki, które dopiero zaczynają. Przejmujemy też księgi od innych biur w trakcie roku.",
      },
    ],
    nearby: ["Bezrzecze", "Mierzyn", "Dobra", "Police", "Przecław", "Warzymice", "Kołbaskowo", "Stargard", "Goleniów"],
    faq: [
      { q: "Ile kosztuje biuro rachunkowe w Szczecinie?", a: "U nas pakiety dla jednoosobowej działalności zaczynają się od 200 zł netto, a dla spółek z o.o. od 320 zł netto miesięcznie. Cena zależy od liczby dokumentów, a dokładną kwotę policzysz w kalkulatorze." },
      { q: "Gdzie mieści się biuro?", a: "Przy ul. Korzennej 23 w Bezrzeczu, gmina Dobra. To bezpośrednie sąsiedztwo Szczecina od strony Krzekowa i Głębokiego." },
      { q: "Czy muszę przyjeżdżać z dokumentami?", a: "Nie. Faktury i wyciągi możesz przesyłać online. Spotkania osobiste umawiamy wtedy, gdy są potrzebne." },
    ],
  },
  {
    slug: "biuro-rachunkowe-wielun",
    name: "Wieluń",
    loc: "w Wieluniu",
    from: "z Wielunia",
    region: "łódzkie",
    mode: "dojazd",
    metaTitle: "Biuro rachunkowe Wieluń – księgowość online i spotkania",
    metaDescription: "Księgowość dla firm z Wielunia i powiatu wieluńskiego: JDG, spółki z o.o., kadry i płace. Obsługa online ze spotkaniami na miejscu po umówieniu. Od 200 zł netto.",
    intro: "Obsługujemy przedsiębiorców z Wielunia i powiatu wieluńskiego. Księgowość prowadzimy zdalnie, a z klientami spotykamy się w Wieluniu po wcześniejszym umówieniu terminu.",
    local: [
      {
        title: "Jak pracujemy z firmami z Wielunia",
        text: "Dokumenty przesyłasz przez internet, a z księgową rozmawiasz telefonicznie lub na wideo. Gdy trzeba podpisać umowę, omówić bilans albo po prostu się poznać, umawiamy spotkanie na miejscu w Wieluniu.",
      },
      {
        title: "Rozliczenia w wieluńskim urzędzie skarbowym",
        text: "Na podstawie pełnomocnictwa wysyłamy deklaracje i odbieramy korespondencję z Urzędu Skarbowego w Wieluniu oraz z ZUS. Nie musisz pojawiać się w urzędzie osobiście.",
      },
      {
        title: "Lokalne firmy, które znamy",
        text: "Powiat wieluński to wiele firm rodzinnych: handel, budownictwo, transport, rolnictwo i usługi. Wiemy, z czym mierzą się na co dzień, na przykład z rozliczaniem samochodów, pracowników sezonowych i sprzedaży mieszanej.",
      },
    ],
    nearby: ["Wieruszów", "Pajęczno", "Sieradz", "Praszka", "Działoszyn", "Czarnożyły", "Biała", "Osjaków", "Pątnów"],
    faq: [
      { q: "Czy macie biuro stacjonarne w Wieluniu?", a: "Siedziba biura znajduje się w Bezrzeczu pod Szczecinem. Firmy z Wielunia obsługujemy zdalnie i spotykamy się z nimi na miejscu po umówieniu terminu." },
      { q: "Ile kosztuje księgowość dla firmy z Wielunia?", a: "Tyle samo, co dla wszystkich naszych klientów: od 200 zł netto dla JDG i od 320 zł netto dla spółki z o.o. Dojazd na umówione spotkanie nie zwiększa abonamentu." },
      { q: "Jak przekazać dokumenty?", a: "Najwygodniej przez system online lub zdjęciem z telefonu. Papierowe oryginały zostają u Ciebie, a kopie są dostępne w archiwum online." },
    ],
  },
  {
    slug: "biuro-rachunkowe-bezrzecze",
    name: "Bezrzecze",
    loc: "w Bezrzeczu",
    from: "z Bezrzecza",
    region: "zachodniopomorskie",
    mode: "siedziba",
    metaTitle: "Biuro rachunkowe Bezrzecze, Mierzyn, Dobra – E-Numerika",
    metaDescription: "Biuro rachunkowe w Bezrzeczu przy ul. Korzennej 23. Księgowość dla firm z Bezrzecza, Mierzyna, Dobrej i Wołczkowa: JDG, spółki, kadry i płace. Od 200 zł netto.",
    intro: "Tu mamy siedzibę: ul. Korzenna 23 w Bezrzeczu. Prowadzimy księgowość firm z gminy Dobra, w tym z Mierzyna, Dobrej, Wołczkowa i Dołuj.",
    local: [
      {
        title: "Księgowa po sąsiedzku",
        text: "Gmina Dobra to jedno z najszybciej rosnących miejsc pod Szczecinem i wiele firm prowadzonych z domu. Zamiast jechać z dokumentami do centrum miasta, możesz załatwić wszystko kilka ulic dalej.",
      },
      {
        title: "Obsługa na miejscu i online",
        text: "Spotkanie w biurze umawiamy telefonicznie. Na co dzień większość klientów przesyła dokumenty przez internet i dzwoni wtedy, gdy ma pytanie.",
      },
    ],
    nearby: ["Mierzyn", "Dobra", "Wołczkowo", "Dołuje", "Skarbimierzyce", "Szczecin", "Police"],
    faq: [
      { q: "Jaki jest adres biura?", a: "ul. Korzenna 23, 72-003 Bezrzecze. Prosimy o wcześniejszy kontakt telefoniczny przed wizytą." },
      { q: "Czy obsługujecie firmy zarejestrowane w domu?", a: "Tak. Pomagamy także rozliczyć koszty używania części mieszkania lub domu na potrzeby działalności." },
    ],
  },
  {
    slug: "biuro-rachunkowe-police",
    name: "Police",
    loc: "w Policach",
    from: "z Polic",
    region: "zachodniopomorskie",
    mode: "blisko",
    metaTitle: "Biuro rachunkowe Police – księgowość dla firm",
    metaDescription: "Księgowość dla firm z Polic i powiatu polickiego: JDG, spółki z o.o., kadry i płace. Biuro w Bezrzeczu, kilkanaście kilometrów od Polic. Obsługa online.",
    intro: "Obsługujemy firmy z Polic i powiatu polickiego. Nasze biuro w Bezrzeczu leży w tym samym powiecie, kilkanaście kilometrów od centrum Polic.",
    local: [
      {
        title: "Ten sam powiat, krótki dojazd",
        text: "Do biura dojedziesz przez Tanowo lub Pilchowo. Jeśli wolisz nie tracić czasu na dojazdy, całą współpracę prowadzimy online.",
      },
      {
        title: "Usługi, podwykonawstwo, handel",
        text: "Pracujemy z firmami usługowymi i podwykonawcami współpracującymi z dużymi zakładami w regionie, a także z lokalnym handlem i gastronomią. Dbamy o terminowe rozliczanie faktur i płynność podatkową.",
      },
    ],
    nearby: ["Tanowo", "Trzebież", "Przęsocin", "Pilchowo", "Nowe Warpno", "Szczecin", "Bezrzecze"],
    faq: [
      { q: "Czy dojeżdżacie do klientów w Policach?", a: "Spotkania odbywają się zwykle w naszym biurze w Bezrzeczu lub online. W uzasadnionych sytuacjach umawiamy spotkanie u klienta." },
      { q: "Ile kosztuje księgowość dla firmy z Polic?", a: "Od 200 zł netto dla jednoosobowej działalności i od 320 zł netto dla spółki z o.o. miesięcznie." },
    ],
  },
  {
    slug: "biuro-rachunkowe-stargard",
    name: "Stargard",
    loc: "w Stargardzie",
    from: "ze Stargardu",
    region: "zachodniopomorskie",
    mode: "blisko",
    metaTitle: "Biuro rachunkowe Stargard – księgowość online",
    metaDescription: "Księgowość dla firm ze Stargardu: JDG, spółki z o.o., kadry i płace, sprawozdania finansowe. Obsługa online i spotkania pod Szczecinem. Od 200 zł netto.",
    intro: "Prowadzimy księgowość przedsiębiorców ze Stargardu i powiatu stargardzkiego. Współpraca odbywa się online, a osobiście spotykamy się w biurze pod Szczecinem.",
    local: [
      {
        title: "Księgowość bez dojazdów",
        text: "Dokumenty przesyłasz przez internet, a rozliczenia i deklaracje trafiają do urzędu elektronicznie. Reprezentujemy klientów przed Urzędem Skarbowym w Stargardzie na podstawie pełnomocnictwa.",
      },
      {
        title: "Firmy produkcyjne i usługowe",
        text: "Obsługujemy zarówno jednoosobowe działalności, jak i spółki związane ze stargardzkimi strefami przemysłowymi: produkcję, logistykę i usługi dla biznesu.",
      },
    ],
    nearby: ["Kobylanka", "Stara Dąbrowa", "Dolice", "Suchań", "Goleniów", "Szczecin"],
    faq: [
      { q: "Czy mogę podpisać umowę zdalnie?", a: "Tak. Umowę i pełnomocnictwa podpisujemy elektronicznie, bez wizyty w biurze." },
      { q: "Jak szybko zaczniecie prowadzić moją księgowość?", a: "Zwykle od najbliższego miesiąca rozliczeniowego. Wcześniej odbieramy dokumentację od poprzedniego biura i sprawdzamy salda." },
    ],
  },
  {
    slug: "biuro-rachunkowe-wieruszow",
    name: "Wieruszów",
    loc: "w Wieruszowie",
    from: "z Wieruszowa",
    region: "łódzkie",
    mode: "dojazd",
    metaTitle: "Biuro rachunkowe Wieruszów – księgowość dla firm",
    metaDescription: "Księgowość online dla firm z Wieruszowa i okolic: JDG, spółki z o.o., kadry i płace. Spotkania w regionie po umówieniu. Pakiety od 200 zł netto miesięcznie.",
    intro: "Z firmami z Wieruszowa pracujemy tak samo jak z klientami z sąsiedniego Wielunia: zdalnie na co dzień i osobiście, gdy jest taka potrzeba.",
    local: [
      {
        title: "Meble, transport, handel",
        text: "Powiat wieruszowski stoi branżą meblową, drzewną i transportem. Rozliczamy firmy produkcyjne, przewoźników i handel, w tym transakcje wewnątrzwspólnotowe i delegacje kierowców.",
      },
      {
        title: "Spotkania w regionie",
        text: "Przy okazji wizyt w Wieluniu umawiamy także spotkania z klientami z Wieruszowa. Bieżące sprawy załatwiamy telefonicznie i przez internet.",
      },
    ],
    nearby: ["Wieluń", "Galewice", "Bolesławiec", "Sokolniki", "Czastary", "Kępno"],
    faq: [
      { q: "Czy rozliczacie transport międzynarodowy?", a: "Tak. Księgujemy przewozy krajowe i zagraniczne, rozliczamy VAT od usług transportowych oraz podróże służbowe kierowców." },
      { q: "Jak wygląda pierwszy krok?", a: "Krótka rozmowa telefoniczna, w której poznajemy firmę i liczbę dokumentów. Na tej podstawie proponujemy pakiet i termin przejęcia ksiąg." },
    ],
  },
  {
    slug: "biuro-rachunkowe-sieradz",
    name: "Sieradz",
    loc: "w Sieradzu",
    from: "z Sieradza",
    region: "łódzkie",
    mode: "dojazd",
    metaTitle: "Biuro rachunkowe Sieradz – księgowość online",
    metaDescription: "Księgowość online dla firm z Sieradza: KPiR, ryczałt, pełna księgowość spółek, kadry i płace. Dedykowana księgowa i stała cena od 200 zł netto miesięcznie.",
    intro: "Przedsiębiorcom z Sieradza oferujemy księgowość online z dedykowaną księgową. Sprawy wymagające spotkania łączymy z naszymi wizytami w regionie wieluńskim.",
    local: [
      {
        title: "Jedna osoba zamiast infolinii",
        text: "Twoje księgi prowadzi konkretna księgowa, która zna Twoją firmę. Dzwonisz bezpośrednio do niej, także wtedy, gdy przyjdzie pismo z Urzędu Skarbowego w Sieradzu.",
      },
      {
        title: "Dla małych i rosnących firm",
        text: "Pracujemy z jednoosobowymi działalnościami, które dopiero zaczynają, oraz ze spółkami, które potrzebują pełnej księgowości i comiesięcznych raportów.",
      },
    ],
    nearby: ["Zduńska Wola", "Warta", "Błaszki", "Złoczew", "Burzenin", "Wieluń"],
    faq: [
      { q: "Czy obsługa online jest bezpieczna?", a: "Tak. Dokumenty trafiają do szyfrowanego archiwum, a dostęp ma wyłącznie klient i jego księgowa. Podpisujemy też umowę powierzenia danych." },
      { q: "Czy pomagacie przy zakładaniu firmy?", a: "Tak. Przeprowadzamy przez rejestrację działalności lub spółki i wybór formy opodatkowania." },
    ],
  },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
