import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "sky" | "ghost" | "outline-light";
  className?: string;
  arrow?: boolean;
};

export function Button({ href, children, variant = "primary", className, arrow = true }: ButtonProps) {
  const styles = {
    primary: "bg-navy text-white hover:bg-navy-2",
    sky: "bg-sky text-navy hover:bg-sky-2",
    ghost: "border border-navy/25 text-navy hover:border-navy hover:bg-white",
    "outline-light": "border border-white/30 text-white hover:bg-white/10",
  }[variant];
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const cls = cn("group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.97rem] font-semibold transition-colors", styles, className);
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </>
  );
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function SectionHead({ eyebrow, title, lead, center, dark, as: Tag = "h2" }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; center?: boolean; dark?: boolean; as?: "h1" | "h2" }) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow", dark && "on-dark")}>{eyebrow}</p>}
      <Tag className={cn("mt-4 text-balance", Tag === "h1" ? "text-4xl sm:text-5xl lg:text-[3.4rem]" : "text-3xl sm:text-[2.6rem]", dark && "text-white")}>{title}</Tag>
      {lead && <p className={cn("mt-5 text-lg", dark ? "text-white/75" : "text-body")}>{lead}</p>}
    </div>
  );
}

export function CheckList({ items, dark, className }: { items: string[]; dark?: boolean; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className={cn("mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", dark ? "bg-sky text-navy" : "bg-mint text-navy")}>
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          </span>
          <span className={dark ? "text-white/85" : undefined}>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumbs({ items, dark }: { items: { name: string; href?: string }[]; dark?: boolean }) {
  return (
    <nav aria-label="Okruszki" className={cn("text-sm", dark ? "text-white/60" : "text-muted")}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className={dark ? "hover:text-sky" : "hover:text-navy"}>
            Strona główna
          </Link>
        </li>
        {items.map((i) => (
          <li key={i.name} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {i.href ? (
              <Link href={i.href} className={dark ? "hover:text-sky" : "hover:text-navy"}>
                {i.name}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white/90" : "text-ink"}>
                {i.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
