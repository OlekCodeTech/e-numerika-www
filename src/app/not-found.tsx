import { Button, Container } from "@/components/ui";

export const metadata = { title: "Nie znaleziono strony", robots: { index: false } };

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="tnum font-display text-8xl font-semibold text-navy">404</p>
      <h1 className="mt-4 text-4xl">Tej strony nie ma w naszych księgach</h1>
      <p className="mx-auto mt-4 max-w-md text-lg">Adres mógł się zmienić po przebudowie serwisu. Wróć na stronę główną albo sprawdź ofertę.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href="/">Strona główna</Button>
        <Button href="/oferta/" variant="ghost">
          Oferta
        </Button>
      </div>
    </Container>
  );
}
