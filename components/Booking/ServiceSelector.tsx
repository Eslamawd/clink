"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";

interface ServiceSelectorProps {
  onSelect: (serviceId: string) => void;
}

interface Service {
  id: string;
  nameKey: string;
  icon: string;
}

export default function ServiceSelector({ onSelect }: ServiceSelectorProps) {
  const { t } = useTranslation();

  const services: Service[] = [
    { id: "implant", nameKey: "booking.serviceImplant", icon: "🦷" },
    { id: "whitening", nameKey: "booking.serviceWhitening", icon: "✨" },
    { id: "braces", nameKey: "booking.serviceBraces", icon: "😊" },
    { id: "filling", nameKey: "booking.serviceFilling", icon: "🛡️" },
    { id: "cleaning", nameKey: "booking.serviceCleaning", icon: "🧼" },
    { id: "extraction", nameKey: "booking.serviceExtraction", icon: "⚕️" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {services.map((service) => (
        <motion.button
          key={service.id}
          onClick={() => onSelect(service.id)}
          whileHover={{ scale: 1.05, translateY: -5 }}
          whileTap={{ scale: 0.95 }}
          className="p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-cyan-100 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-lg transition-all text-right"
        >
          <div className="text-4xl mb-3">{service.icon}</div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {t(service.nameKey)}
          </p>
        </motion.button>
      ))}
    </motion.div>
  );
}
