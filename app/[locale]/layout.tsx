import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { TranslationProvider } from "@/context/TranslationContext";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

const locales = ["ar", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Check if the locale is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <TranslationProvider locale={locale}>
      <>
        {children}
        <div className="fixed bottom-8 right-8 md:right-6 z-50 flex flex-col gap-3">
          <ThemeToggle />
          <LanguageSwitcher locale={locale} />
        </div>
      </>
    </TranslationProvider>
  );
}
