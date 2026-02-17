"use client";

import { createContext, useContext, ReactNode } from "react";

// Import messages
import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";

type Messages = typeof arMessages;

interface TranslationContextType {
  t: (key: string) => string;
  locale: string;
  messages: Messages;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export function TranslationProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const messages =
    locale === "en" ? (enMessages as Messages) : (arMessages as Messages);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: Record<string, unknown> | unknown = messages;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if not found
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ t, locale, messages }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}
