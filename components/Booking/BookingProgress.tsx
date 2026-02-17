"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import { Check } from "lucide-react";

interface BookingProgressProps {
  currentStep: number;
}

export default function BookingProgress({ currentStep }: BookingProgressProps) {
  const { t } = useTranslation();

  const steps = [
    { num: 1, label: t("booking.step1") },
    { num: 2, label: t("booking.step2") },
    { num: 3, label: t("booking.step3") },
    { num: 4, label: t("booking.step4") },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
          {t("booking.title")}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          {steps[currentStep - 1]?.label}
        </p>
      </motion.div>

      <div className="flex justify-center gap-3 mb-12">
        {steps.map((step) => (
          <motion.div
            key={step.num}
            className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all ${
              currentStep >= step.num
                ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            }`}
          >
            {currentStep > step.num ? <Check className="w-6 h-6" /> : step.num}
          </motion.div>
        ))}
      </div>
    </>
  );
}
