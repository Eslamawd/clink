"use client";

import { motion } from "framer-motion";
import { Users, Award, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

export default function HeroSection() {
  const { t, locale } = useTranslation();

  const stats = [
    {
      icon: Users,
      label: t("hero.stats.patients"),
      desc: t("hero.stats.patientsDesc"),
    },
    {
      icon: Award,
      label: t("hero.stats.doctors"),
      desc: t("hero.stats.doctorsDesc"),
    },
    {
      icon: ShieldCheck,
      label: t("hero.stats.experience"),
      desc: t("hero.stats.experienceDesc"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight"
              variants={itemVariants}
            >
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-cyan-700 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>{" "}
              {locale === "ar" && "جميلة"}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all"
              >
                {t("hero.cta")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 dark:border-cyan-400 rounded-2xl font-bold text-lg hover:bg-cyan-50 dark:hover:bg-slate-800 transition-all"
              >
                {t("hero.learnMore")}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1650803075918-efbee311735d?w=800&q=80"
              alt={t("hero.imageAlt")}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ translateY: -10 }}
                className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-cyan-100/50 dark:border-slate-700 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30">
                    <IconComponent className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                  {stat.label}
                </p>
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
