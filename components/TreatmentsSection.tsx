"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Sparkles, CheckCircle, Shield } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

interface Treatment {
  id: string;
  icon: React.ReactNode;
  nameKey: string;
  descKey: string;
  priceKey: string;
  category: string;
}

const treatments: Treatment[] = [
  {
    id: "1",
    icon: <Smile className="w-8 h-8" />,
    nameKey: "treatments.implants",
    descKey: "treatments.implantsDesc",
    priceKey: "treatments.implantsPrice",
    category: "surgery",
  },
  {
    id: "2",
    icon: <Sparkles className="w-8 h-8" />,
    nameKey: "treatments.whitening",
    descKey: "treatments.whiteningDesc",
    priceKey: "treatments.whiteningPrice",
    category: "cosmetic",
  },
  {
    id: "3",
    icon: <CheckCircle className="w-8 h-8" />,
    nameKey: "treatments.orthoLabel",
    descKey: "treatments.orthoDesc",
    priceKey: "treatments.orthoPrice",
    category: "orthodontics",
  },
  {
    id: "4",
    icon: <Shield className="w-8 h-8" />,
    nameKey: "treatments.fillingsLabel",
    descKey: "treatments.fillingsDesc",
    priceKey: "treatments.fillingsPrice",
    category: "fillings",
  },
];

const categoryMap = {
  surgery: "treatments.surgery",
  cosmetic: "treatments.cosmetic",
  orthodontics: "treatments.orthodontics",
  fillings: "treatments.fillings",
};

export default function TreatmentsSection() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("surgery");

  const categories = Object.keys(categoryMap) as Array<
    keyof typeof categoryMap
  >;
  const filteredTreatments = treatments.filter(
    (tr) => tr.category === selectedCategory,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: { y: -10, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)" },
  };

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t("treatments.title")}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-cyan-700 mx-auto rounded-full"></div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {t(categoryMap[cat])}
            </motion.button>
          ))}
        </motion.div>

        {/* Treatment Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredTreatments.map((treatment) => (
            <motion.div
              key={treatment.id}
              variants={cardVariants}
              whileHover="hover"
              className="group p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl border-2 border-cyan-100 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl group-hover:bg-cyan-200 dark:group-hover:bg-cyan-900/50 transition-all">
                  <div className="text-cyan-600 dark:text-cyan-400">
                    {treatment.icon}
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 px-3 py-1 rounded-full">
                  {t(
                    categoryMap[treatment.category as keyof typeof categoryMap],
                  )}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {t(treatment.nameKey)}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t(treatment.descKey)}
              </p>

              <div className="flex items-center justify-between border-t border-cyan-100 dark:border-slate-700 pt-6">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                    {t("treatments.from")}
                  </p>
                  <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                    {t(treatment.priceKey)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {t("navigation.book")}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
