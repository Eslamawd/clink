"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

interface LanguageSwitcherProps {
  locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Replace the current locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  const languages = [
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700"
        aria-label="Switch language"
      >
        <Globe className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
      </motion.button>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`absolute ${locale === "ar" ? "right-0" : "left-0"} bottom-16 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`w-full px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors ${
                locale === lang.code
                  ? "bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
