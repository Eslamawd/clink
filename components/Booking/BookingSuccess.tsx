"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

interface BookingSuccessProps {
  onBackHome: () => void;
  serviceName: string;
  date: string;
  time: string;
}

export default function BookingSuccess({
  onBackHome,
  serviceName,
  date,
  time,
}: BookingSuccessProps) {
  const { t, locale } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-10 h-10 text-green-600" />
      </motion.div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        {t("booking.confirmed")}
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
        {t("booking.confirmMessage")}
      </p>
      <div className="bg-cyan-50 dark:bg-slate-700 rounded-xl p-6 text-right mb-8 space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold">{t("booking.service")}</span>{" "}
          {serviceName}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold">{t("booking.date")}</span> {date}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold">{t("booking.time")}</span> {time}
        </p>
      </div>
      <motion.button
        onClick={onBackHome}
        whileHover={{ scale: 1.05 }}
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg"
      >
        {t("booking.backHome")}
      </motion.button>
    </motion.div>
  );
}
