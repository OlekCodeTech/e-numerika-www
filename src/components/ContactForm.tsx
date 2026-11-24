"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { QUOTE_KEY } from "./Calculator";
import { site } from "@/data/site";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/contact.php`;

const field = "mt-1.5 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted/70 focus:border-teal focus:bg-white focus:outline-none";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  // Wycena przekazana z kalkulatora trafia do treści wiadomości.
  useEffect(() => {
    try {
      const quote = sessionStorage.getItem(QUOTE_KEY);
      if (quote) {
        setMessage(quote);
        sessionStorage.removeItem(QUOTE_KEY);
      }
    } catch {}
  }, []);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const payload = { ...Object.fromEntries(fd.entries()), message, consent: fd.get("consent") === "on", source: window.location.pathname };
    setState("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) throw new Error(json?.error || "");
      setState("sent");
    } catch (e) {
      setError((e as Error).message || `Nie udało się wysłać formularza. Napisz na ${site.email} lub zadzwoń: ${site.phone}.`);
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-[1.75rem] border border-navy/20 bg-mint p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-navy" aria-hidden />
        <h3 className="mt-4 text-2xl">Dziękujemy, wiadomość dotarła</h3>
        <p className="mt-2">Odpowiemy najszybciej, jak to możliwe, zwykle w ciągu jednego dnia roboczego.</p>
      </div>
    );
  }

  return (
    <form id="formularz" onSubmit={onSubmit} className="card scroll-mt-28 p-6 sm:p-9" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ink">
          Imię i nazwisko
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-semibold text-ink">
          Nazwa firmy <span className="font-normal text-muted">(opcjonalnie)</span>
          <input name="subject" autoComplete="organization" className={field} />
        </label>
        <label className="block text-sm font-semibold text-ink">
          E-mail
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block text-sm font-semibold text-ink">
          Telefon <span className="font-normal text-muted">(opcjonalnie)</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="mt-5 block text-sm font-semibold text-ink">
        W czym możemy pomóc?
        <textarea name="message" required rows={7} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Napisz kilka słów o firmie: forma działalności, liczba dokumentów w miesiącu, liczba pracowników." className={field} />
      </label>
      {/* pułapka na boty */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <label className="mt-5 flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-navy" />
        <span>
          Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na zapytanie. Szczegóły w{" "}
          <Link href="/polityka-prywatnosci/" className="font-semibold text-navy underline">
            polityce prywatności
          </Link>
          .
        </span>
      </label>
      {state === "error" && (
        <p role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 font-semibold text-white transition-colors hover:bg-navy-2 disabled:opacity-60 sm:w-auto">
        <Send className="h-4 w-4" aria-hidden />
        {state === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>
    </form>
  );
}
