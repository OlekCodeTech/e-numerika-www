export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://e-numerika.pl").replace(/\/$/, "");
export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
