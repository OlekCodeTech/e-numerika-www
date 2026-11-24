import { Plus } from "lucide-react";
import JsonLd, { faqSchema } from "./JsonLd";

/** FAQ na natywnych <details> – działa bez JS, treść jest w HTML dla Google. */
export default function Faq({ items, schema = true }: { items: { q: string; a: string }[]; schema?: boolean }) {
  if (!items.length) return null;
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[1.75rem] border border-line bg-card">
      {schema && <JsonLd data={faqSchema(items)} />}
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-[1.08rem] font-semibold text-ink marker:hidden sm:px-8 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint text-navy transition-transform group-open:rotate-45">
              <Plus className="h-4 w-4" aria-hidden />
            </span>
          </summary>
          <p className="px-6 pb-6 text-body sm:px-8">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
