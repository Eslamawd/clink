"use client";

import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useTranslation } from "@/context/TranslationContext";

interface DateTimeSelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  bookedSlots: string[];
  isLoading: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const allTimeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

export default function DateTimeSelector({
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
  bookedSlots,
  isLoading,
}: DateTimeSelectorProps) {
  const { t, locale } = useTranslation();

  const availableSlots: TimeSlot[] = allTimeSlots.map((time) => ({
    time,
    available: !bookedSlots.includes(time),
  }));

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {t("booking.selectDate")}
          </h3>
          <div className="rounded-xl border-2 border-cyan-100 dark:border-slate-700 p-4 bg-cyan-50/50 dark:bg-slate-700/50">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              disabled={(date) => date < new Date()}
              className="booking-calendar"
              locale={locale === "ar" ? ar : undefined}
            />
          </div>
        </div>

        {/* Time Slots */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {t("booking.selectTime")}
          </h3>
          <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
            {isLoading ? (
              <div className="col-span-2 text-center py-8">
                <p className="text-slate-600 dark:text-slate-300">
                  {t("booking.loadingSlots") || "جاري تحميل الأوقات..."}
                </p>
              </div>
            ) : (
              availableSlots.map((slot) => (
                <motion.button
                  key={slot.time}
                  onClick={() => onTimeSelect(slot.time)}
                  whileHover={slot.available ? { scale: 1.05 } : {}}
                  whileTap={slot.available ? { scale: 0.95 } : {}}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg font-semibold transition-all
                    ${
                      selectedTime === slot.time
                        ? "bg-cyan-500 text-white border-2 border-cyan-600"
                        : slot.available
                          ? "bg-cyan-50 dark:bg-slate-700 text-slate-900 dark:text-white border-2 border-cyan-200 dark:border-slate-600 hover:border-cyan-400"
                          : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-2 border-red-200 dark:border-red-800 cursor-not-allowed opacity-50"
                    }`}
                >
                  {slot.time}
                  {!slot.available && (
                    <span className="text-xs block">
                      {t("booking.booked") || "محجوز"}
                    </span>
                  )}
                </motion.button>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .booking-calendar {
          font-family: 'Cairo', sans-serif;
          direction: rtl;
        }
        .booking-calendar .rdp {
          --rdp-cell-size: 40px;
          --rdp-accent-color: #06b6d4;
        }
        .booking-calendar .rdp-day_selected {
          background-color: #06b6d4;
          color: white;
        }
        .booking-calendar .rdp-day:hover {
          background-color: #cffafe;
        }
        .dark .booking-calendar .rdp-caption,
        .dark .booking-calendar .rdp-head_cell,
        .dark .booking-calendar .rdp-day:not(.rdp-day_disabled):not(.rdp-day_outside) {
          color: white;
        }
        .dark .booking-calendar .rdp-button:not(.rdp-day_selected) {
          color: #e2e8f0;
        }
        .dark .booking-calendar .rdp-button:hover:not(.rdp-day_selected) {
          background-color: #475569;
        }
        .dark .booking-calendar .rdp-day_selected {
          background-color: #06b6d4;
          color: white;
        }
      `}</style>
    </motion.div>
  );
}
