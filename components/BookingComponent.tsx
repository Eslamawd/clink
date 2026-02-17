"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { Check } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";
import { api } from "@/lib/api";
import "react-day-picker/dist/style.css";
import BookingForm from "./BookingForm";

interface BookingStep {
  service: string;
  date: Date | null;
  time: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookingComponent() {
  const { t, locale } = useTranslation();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingStep>({
    service: "",
    date: null,
    time: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Services list
  const services = [
    { id: "implant", nameKey: "booking.serviceImplant", icon: "🦷" },
    { id: "whitening", nameKey: "booking.serviceWhitening", icon: "✨" },
    { id: "braces", nameKey: "booking.serviceBraces", icon: "😊" },
    { id: "filling", nameKey: "booking.serviceFilling", icon: "🛡️" },
    { id: "cleaning", nameKey: "booking.serviceCleaning", icon: "🧼" },
    { id: "extraction", nameKey: "booking.serviceExtraction", icon: "⚕️" },
  ];

  // All available time slots
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

  // Generate time slots with availability based on booked slots
  const availableSlots: TimeSlot[] = allTimeSlots.map((time) => ({
    time,
    available: !bookedSlots.includes(time),
  }));

  const handleSelectService = (serviceId: string) => {
    setBooking({ ...booking, service: serviceId });
    setStep(2);
  };

  const handleSelectDate = async (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setBooking({ ...booking, date });
      // Fetch booked slots for this date
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const response = await api.getBookedSlots(formattedDate);
        setBookedSlots(response.booked_slots || []);
      } catch (err) {
        console.error("Failed to fetch booked slots:", err);
        setBookedSlots([]);
      }
    }
  };

  const handleSelectTime = (time: string) => {
    setBooking({ ...booking, time });
    setStep(3);
  };

  const handleConfirmBooking = async (formData: Record<string, string>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate booking data before submitting
      if (!booking.date || !booking.time) {
        setError(
          locale === "ar"
            ? "يرجى التأكد من اختيار التاريخ والوقت"
            : "Please make sure to select date and time",
        );
        setIsSubmitting(false);
        return;
      }

      // 1. Create or get patient
      const patientData = {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
      };

      const patientResponse = await api.createPatient(patientData);
      const patientId = patientResponse.data?.id || patientResponse.id;

      // 2. Format date for API (YYYY-MM-DD)
      const formattedDate = format(booking.date, "yyyy-MM-dd");

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

      // 3. Create appointment
      const appointmentData = {
        patient_id: patientId,
        service: serviceName,
        appointment_date: formattedDate,
        appointment_time: booking.time,
        status: "pending" as const,
        notes: formData.notes || "",
      };

      console.log("Creating appointment with data:", appointmentData);
      await api.createAppointment(appointmentData);

      // 4. Send confirmation via WhatsApp
      const clinicPhone =
        process.env.NEXT_PUBLIC_CLINIC_PHONE || "+201110215455";

      const displayDate = booking.date
        ? booking.date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")
        : "";

      const message = encodeURIComponent(
        locale === "ar"
          ? `السلام عليكم ورحمة الله وبركاته\n\n📋 حجز جديد!\n\n👤 اسم المريض: ${formData.fullName}\n📱 رقم الهاتف: ${formData.phone}\n📧 البريد الإلكتروني: ${formData.email}\n\n🏥 الخدمة: ${serviceName}\n📅 التاريخ: ${displayDate}\n⏰ الوقت: ${booking.time}\n\n📝 ملاحظات: ${formData.notes || "لا توجد"}`
          : `Hello and Greetings 👋\n\n📋 New Booking!\n\n👤 Patient Name: ${formData.fullName}\n📱 Phone: ${formData.phone}\n📧 Email: ${formData.email}\n\n🏥 Service: ${serviceName}\n📅 Date: ${displayDate}\n⏰ Time: ${booking.time}\n\n📝 Notes: ${formData.notes || "None"}`,
      );

      window.open(
        `https://wa.me/${clinicPhone.replace(/\D/g, "")}?text=${message}`,
        "_blank",
      );

      // 5. Move to success step
      setStep(4);
    } catch (err: any) {
      console.error("Error creating booking:", err);

      // Check if it's a time slot taken error
      if (
        err.message?.includes("time slot") ||
        err.message?.includes("already booked")
      ) {
        setError(
          locale === "ar"
            ? "⚠️ عذراً، هذا الموعد تم حجزه للتو. يرجى اختيار وقت آخر."
            : "⚠️ Sorry, this time slot was just booked. Please select another time.",
        );
        // Go back to time selection
        setStep(2);
      } else {
        setError(
          err instanceof Error
            ? err.message
            : locale === "ar"
              ? "حدث خطأ أثناء إنشاء الحجز. يرجى المحاولة مرة أخرى."
              : "An error occurred while creating the booking. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t("booking.title")}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {step === 1 && t("booking.step1")}
            {step === 2 && t("booking.step2")}
            {step === 3 && t("booking.step3")}
            {step === 4 && t("booking.step4")}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center gap-3 mb-12">
          {[1, 2, 3, 4].map((num) => (
            <motion.div
              key={num}
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all ${
                step >= num
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {step > num ? <Check className="w-6 h-6" /> : num}
            </motion.div>
          ))}
        </div>

        {/* Step 1: Select Service */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
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
          )}
        </AnimatePresence>

        {/* Step 2: Select Date & Time */}
        <AnimatePresence>
          {step === 2 && (
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
                      onSelect={handleSelectDate}
                      locale={locale === "ar" ? ar : undefined}
                      disabled={(date) =>
                        date < new Date() || date.getDay() === 5
                      } // 5 = Friday
                      className="booking-calendar"
                    />
                  </div>
                  {selectedDate && (
                    <p className="mt-4 text-lg font-semibold text-cyan-600 dark:text-cyan-400">
                      {format(selectedDate, "EEEE، dd MMMM yyyy", {
                        locale: locale === "ar" ? ar : undefined,
                      })}
                    </p>
                  )}
                </div>

                {/* Time Slots */}
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    {t("booking.selectTime")}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {availableSlots.map((slot) => (
                      <motion.button
                        key={slot.time}
                        onClick={() =>
                          slot.available && handleSelectTime(slot.time)
                        }
                        disabled={!slot.available}
                        whileHover={slot.available ? { scale: 1.05 } : {}}
                        whileTap={slot.available ? { scale: 0.95 } : {}}
                        className={`p-4 rounded-xl font-semibold transition-all ${
                          slot.available
                            ? booking.time === slot.time
                              ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-cyan-100 dark:hover:bg-slate-600"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed opacity-50"
                        }`}
                      >
                        {slot.time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 justify-between">
                <motion.button
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 dark:border-cyan-400 rounded-xl font-semibold hover:bg-cyan-50 dark:hover:bg-slate-700 transition-all"
                >
                  {t("booking.back")}
                </motion.button>
                <motion.button
                  onClick={() => booking.time && setStep(3)}
                  disabled={!booking.time}
                  whileHover={booking.time ? { scale: 1.05 } : {}}
                  className={`px-8 py-3 rounded-xl font-semibold ${
                    booking.time
                      ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {t("booking.continue")}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Booking Details Form */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-xl text-right"
                >
                  <p className="text-red-700 dark:text-red-300 font-semibold">
                    ⚠️ {error}
                  </p>
                </motion.div>
              )}

              <BookingForm
                booking={booking}
                onSubmit={handleConfirmBooking}
                onBack={() => setStep(2)}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Success Modal */}
        <AnimatePresence>
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-12 text-center max-w-md mx-auto"
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
                  {booking.service}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">{t("booking.date")}</span>{" "}
                  {booking.date &&
                    format(booking.date, "dd MMMM yyyy", {
                      locale: locale === "ar" ? ar : undefined,
                    })}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">{t("booking.time")}</span>{" "}
                  {booking.time}
                </p>
              </div>
              <motion.button
                onClick={() =>
                  (window.location.href = locale === "ar" ? "/ar" : "/en")
                }
                whileHover={{ scale: 1.05 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg"
              >
                {t("booking.backHome")}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
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
        /* Dark mode styles for calendar */
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
    </section>
  );
}
