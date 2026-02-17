"use client";

import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, locale } = useTranslation();

  const navLinks = [
    { label: t("navigation.services"), href: "#services" },
    { label: t("navigation.booking"), href: "#pricing" },
    { label: t("navigation.testimonials"), href: "#testimonials" },
    { label: t("navigation.contact"), href: "#contact" },
    { label: t("navigation.admin"), href: `/${locale}/admin` },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 left-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-cyan-100/30 dark:border-slate-800 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-700 bg-clip-text text-transparent"
          >
            🦷 Dental Pro
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/booking`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                <Phone className="w-4 h-4" />
                {t("navigation.book")}
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-900 dark:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2 bg-white/50 dark:bg-slate-800/50"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 py-2 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href={`/${locale}/booking`} onClick={() => setIsOpen(false)}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold"
              >
                {t("navigation.book")}
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
