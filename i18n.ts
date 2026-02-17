import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["ar", "en"] as const;

export const defaultLocale = "ar";

export function isValidLocale(locale: unknown): locale is "ar" | "en" {
  return locales.includes(locale as any);
}

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!isValidLocale(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
