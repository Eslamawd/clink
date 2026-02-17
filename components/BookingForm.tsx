"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Phone, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

interface BookingFormProps {
  booking: { service: string; date: Date | null; time: string };
  onSubmit: (data: Record<string, string>) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export default function BookingForm({
  booking,
  onSubmit,
  onBack,
  isSubmitting = false,
}: BookingFormProps) {
  const { t, locale } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  const onFormSubmit = (data: Record<string, string>) => {
    // Format date properly
    const formattedDate = booking.date
      ? booking.date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US")
      : "";

    // Get service name from translation keys
    const serviceNamesAr: Record<string, string> = {
      implant: "زراعة أسنان",
      whitening: "تبييض الأسنان",
      braces: "تقويم الأسنان",
      filling: "حشوات الأسنان",
      cleaning: "تنظيف الأسنان",
      extraction: "خلع الأسنان",
    };

    const serviceNamesEn: Record<string, string> = {
      implant: "Dental Implants",
      whitening: "Teeth Whitening",
      braces: "Teeth Alignment",
      filling: "Dental Fillings",
      cleaning: "Teeth Cleaning",
      extraction: "Tooth Extraction",
    };

    const serviceNames = locale === "ar" ? serviceNamesAr : serviceNamesEn;
    const serviceName = serviceNames[booking.service] || booking.service;

    onSubmit({
      ...data,
      service: serviceName,
      date: formattedDate,
      time: booking.time,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-right">
        {t("booking.completeBooking")}
      </h3>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Full Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <label className="block text-right text-sm font-semibold text-slate-900 dark:text-white mb-2">
            {t("booking.fullName")}
          </label>
          <div className="relative">
            <User className="absolute left-4 top-3.5 w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <input
              {...register("fullName", {
                required: t("booking.fullNameRequired"),
              })}
              type="text"
              placeholder={t("booking.fullNamePlaceholder")}
              className="w-full pl-12 pr-4 py-3 border-2 border-cyan-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-all text-right"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.fullName.message}
            </p>
          )}
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <label className="block text-right text-sm font-semibold text-slate-900 dark:text-white mb-2">
            {t("booking.phone")}
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-3.5 w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <input
              {...register("phone", {
                required: t("booking.phoneRequired"),
                pattern: {
                  value: /^(\+20|0)?1[0-2,5,6]\d{8}$/,
                  message: t("booking.phoneInvalid"),
                },
              })}
              type="tel"
              placeholder={t("booking.phonePlaceholder")}
              className="w-full pl-12 pr-4 py-3 border-2 border-cyan-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-all text-right"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <label className="block text-right text-sm font-semibold text-slate-900 dark:text-white mb-2">
            {t("booking.email")}
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <input
              {...register("email", {
                required: t("booking.emailRequired"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("booking.emailInvalid"),
                },
              })}
              type="email"
              placeholder={t("booking.emailPlaceholder")}
              className="w-full pl-12 pr-4 py-3 border-2 border-cyan-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-all text-right"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <label className="block text-right text-sm font-semibold text-slate-900 dark:text-white mb-2">
            {t("booking.notes")}
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <textarea
              {...register("notes")}
              placeholder={t("booking.notesPlaceholder")}
              className="w-full pl-12 pr-4 py-3 border-2 border-cyan-100 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-all resize-none h-24 text-right"
            />
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-700 dark:to-slate-700 rounded-xl p-6 border border-cyan-200 dark:border-slate-600"
        >
          <p className="text-right text-sm text-slate-600 dark:text-slate-300 font-semibold mb-4">
            {t("booking.bookingSummary")}
          </p>
          <div className="space-y-2 text-right">
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-bold">{t("booking.service")}</span>{" "}
              {booking.service}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-bold">{t("booking.date")}</span>{" "}
              {booking.date?.toLocaleDateString("ar-SA")}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-bold">{t("booking.time")}</span>{" "}
              {booking.time}
            </p>
          </div>
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-4 justify-between pt-6">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            type="button"
            disabled={isSubmitting}
            className="px-8 py-3 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 dark:border-cyan-400 rounded-xl font-semibold hover:bg-cyan-50 dark:hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("booking.back")}
          </motion.button>
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSubmitting
              ? t("booking.submitting") || "جاري الحفظ..."
              : t("booking.confirmBooking")}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
