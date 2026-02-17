"use client";

import { useTranslation } from "@/context/TranslationContext";
import { motion } from "framer-motion";

interface SmileCard {
  id: number;
  nameKey: string;
  storyKey: string;
  emoji: string;
  improvementKey: string;
}

const smiles: SmileCard[] = [
  {
    id: 1,
    nameKey: "gallery.smile1Name",
    storyKey: "gallery.smile1Story",
    emoji: "😊",
    improvementKey: "gallery.smile1Improvement",
  },
  {
    id: 2,
    nameKey: "gallery.smile2Name",
    storyKey: "gallery.smile2Story",
    emoji: "😄",
    improvementKey: "gallery.smile2Improvement",
  },
  {
    id: 3,
    nameKey: "gallery.smile3Name",
    storyKey: "gallery.smile3Story",
    emoji: "🤗",
    improvementKey: "gallery.smile3Improvement",
  },
  {
    id: 4,
    nameKey: "gallery.smile4Name",
    storyKey: "gallery.smile4Story",
    emoji: "✨",
    improvementKey: "gallery.smile4Improvement",
  },
  {
    id: 5,
    nameKey: "gallery.smile5Name",
    storyKey: "gallery.smile5Story",
    emoji: "😁",
    improvementKey: "gallery.smile5Improvement",
  },
  {
    id: 6,
    nameKey: "gallery.smile6Name",
    storyKey: "gallery.smile6Story",
    emoji: "😃",
    improvementKey: "gallery.smile6Improvement",
  },
];

export default function SmileGallery() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            🌟 {t("gallery.title")} 🌟
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {t("gallery.subtitle")}
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-cyan-700 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {smiles.map((smile) => (
            <motion.div
              key={smile.id}
              variants={cardVariants}
              whileHover={{
                translateY: -10,
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)",
              }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border-2 border-cyan-100 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all text-center"
            >
              {/* Big Emoji - Smile */}
              <div className="text-8xl mb-4 animate-bounce">{smile.emoji}</div>

              {/* Name */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {t(smile.nameKey)}
              </h3>

              {/* Story */}
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {`${'"'}${t(smile.storyKey)}${'"'}`}
              </p>

              {/* Improvement */}
              <div className="p-4 bg-gradient-to-r from-cyan-50 to-emerald-50 dark:from-slate-700 dark:to-slate-700 rounded-xl border border-cyan-200 dark:border-slate-600">
                <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  ✨ {t(smile.improvementKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Before & After Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 rounded-2xl p-12 text-white text-center mb-16"
        >
          <h3 className="text-3xl font-bold mb-8">{t("gallery.stats")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="text-lg">{t("gallery.stat1")}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">5000+</p>
              <p className="text-lg">{t("gallery.stat2")}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">20+</p>
              <p className="text-lg">{t("gallery.stat3")}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">24/7</p>
              <p className="text-lg">{t("gallery.stat4")}</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            {t("gallery.cta")}
          </h3>
          <motion.a
            href="/booking"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all"
          >
            {t("gallery.ctaButton")} ✨
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
