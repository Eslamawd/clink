"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

interface FAQItem {
  id: number;
  questionKey: string;
  answerKey: string;
}

const faqItems: FAQItem[] = [
  { id: 1, questionKey: "faq.q1", answerKey: "faq.a1" },
  { id: 2, questionKey: "faq.q2", answerKey: "faq.a2" },
  { id: 3, questionKey: "faq.q3", answerKey: "faq.a3" },
  { id: 4, questionKey: "faq.q4", answerKey: "faq.a4" },
  { id: 5, questionKey: "faq.q5", answerKey: "faq.a5" },
];

export default function FAQSection() {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {t("faq.subtitle")}
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-cyan-700 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="border-2 border-cyan-100 dark:border-slate-700 rounded-xl overflow-hidden hover:border-cyan-300 dark:hover:border-cyan-500 transition-all"
            >
              <motion.button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full p-6 bg-white dark:bg-slate-800 hover:bg-cyan-50/50 dark:hover:bg-slate-700/50 transition-all flex items-center justify-between text-right"
                whileHover={{ paddingRight: 28 }}
              >
                <ChevronDown
                  className={`w-6 h-6 text-cyan-600 dark:text-cyan-400 transition-transform ${
                    openId === item.id ? "transform rotate-180" : ""
                  }`}
                />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex-1">
                  {t(item.questionKey)}
                </h3>
              </motion.button>

              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-cyan-50 to-white dark:from-slate-700 dark:to-slate-800 border-t border-cyan-100 dark:border-slate-700"
                  >
                    <p className="p-6 text-slate-700 dark:text-slate-200 leading-relaxed text-right">
                      {t(item.answerKey)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
