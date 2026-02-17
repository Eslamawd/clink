"use client";

import { useTranslation } from "@/context/TranslationContext";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send to WhatsApp clinic reception
    const clinicPhone = process.env.NEXT_PUBLIC_CLINIC_PHONE || "201110215455";
    const text = encodeURIComponent(
      `${t("contact.greeting")}\n\n${t("contact.name")}: ${formData.name}\n${t("contact.email")}: ${formData.email}\n${t("contact.phone")}: ${formData.phone}\n\n${t("contact.message")}:\n${formData.message}`,
    );
    window.open(
      `https://wa.me/${clinicPhone.replace(/\D/g, "")}?text=${text}`,
      "_blank",
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="contact"
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
            {t("contact.title")}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {t("contact.subtitle")}
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-cyan-700 mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="space-y-8"
          >
            <div className="space-y-6">
              {/* Phone */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className="p-4 bg-cyan-100 dark:bg-slate-800 rounded-xl">
                  <Phone className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {t("contact.phone")}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    <a
                      href="tel:+201001234567"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400"
                    >
                      +20 100 123 4567
                    </a>
                  </p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className="p-4 bg-cyan-100 dark:bg-slate-800 rounded-xl">
                  <Mail className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {t("contact.email")}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    <a
                      href="mailto:clinck.dental@gmail.com"
                      className="hover:text-cyan-600 dark:hover:text-cyan-400"
                    >
                      clinck.dental@gmail.com
                    </a>
                  </p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <div className="p-4 bg-cyan-100 dark:bg-slate-800 rounded-xl">
                  <MapPin className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    {t("contact.address")}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {t("contact.address_text")}
                  </p>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-cyan-200 dark:border-slate-600"
              >
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-right">
                  {t("contact.workHours")}
                </h3>
                <div className="space-y-2 text-right text-slate-600 dark:text-slate-300">
                  <p>{t("contact.hours_text")}</p>
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-2">
                    {t("contact.emergency")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border-2 border-cyan-100 dark:border-slate-600"
          >
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-right text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="محمد أحمد"
                  className="w-full px-4 py-3 border-2 border-cyan-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-all text-right"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-right text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="example@mail.com"
                  className="w-full px-4 py-3 border-2 border-cyan-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-all text-right"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-right text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+966501234567"
                  className="w-full px-4 py-3 border-2 border-cyan-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-all text-right"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-right text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="أكتب رسالتك هنا..."
                  className="w-full px-4 py-3 border-2 border-cyan-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none transition-all resize-none h-32 text-right"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {t("contact.send")}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
