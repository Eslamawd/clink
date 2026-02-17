"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useTranslation } from "@/context/TranslationContext";
import { api } from "@/lib/api";
import BookingProgress from "./BookingProgress";
import ServiceSelector from "./ServiceSelector";
import DateTimeSelector from "./DateTimeSelector";
import BookingForm from "../BookingForm";
import BookingSuccess from "./BookingSuccess";

interface BookingStep {
  service: string;
  date: Date | null;
  time: string;
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
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Service name translations
  const serviceNames: Record<string, Record<string, string>> = {
    ar: {
      implant: "زراعة أسنان",
      whitening: "تبييض الأسنان",
      braces: "تقويم الأسنان",
      filling: "حشوات الأسنان",
      cleaning: "تنظيف الأسنان",
      extraction: "خلع الأسنان",
    },
    en: {
      implant: "Dental Implants",
      whitening: "Teeth Whitening",
      braces: "Teeth Alignment",
      filling: "Dental Fillings",
      cleaning: "Teeth Cleaning",
      extraction: "Tooth Extraction",
    },
  };

  const handleSelectService = (serviceId: string) => {
    setBooking({ ...booking, service: serviceId });
    setStep(2);
  };

  const handleSelectDate = async (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setBooking({ ...booking, date });
      // Fetch booked slots for this date
      setIsLoadingSlots(true);
      try {
        const formattedDate = format(date, "yyyy-MM-dd");
        const response = await api.getBookedSlots(formattedDate);
        setBookedSlots(response.booked_slots || []);
      } catch (err) {
        console.error("Failed to fetch booked slots:", err);
        setBookedSlots([]);
      } finally {
        setIsLoadingSlots(false);
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

      // Get service name translated
      const serviceName =
        serviceNames[locale as keyof typeof serviceNames][booking.service] ||
        booking.service;

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

      const displayDate = format(booking.date, "dd MMMM yyyy", {
        locale: locale === "ar" ? require("date-fns/locale/ar").default : undefined,
      });

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
        <BookingProgress currentStep={step} />

        {/* Step 1: Select Service */}
        <AnimatePresence>
          {step === 1 && <ServiceSelector onSelect={handleSelectService} />}
        </AnimatePresence>

        {/* Step 2: Select Date & Time */}
        <AnimatePresence>
          {step === 2 && (
            <DateTimeSelector
              selectedDate={selectedDate}
              onDateSelect={handleSelectDate}
              selectedTime={booking.time}
              onTimeSelect={handleSelectTime}
              bookedSlots={bookedSlots}
              isLoading={isLoadingSlots}
            />
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
                    {error}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12"
            >
              <BookingSuccess
                onBackHome={() =>
                  (window.location.href = locale === "ar" ? "/ar" : "/en")
                }
                serviceName={
                  serviceNames[locale as keyof typeof serviceNames][
                    booking.service
                  ] || booking.service
                }
                date={
                  booking.date
                    ? format(booking.date, "dd MMMM yyyy", {
                        locale:
                          locale === "ar"
                            ? require("date-fns/locale/ar").default
                            : undefined,
                      })
                    : ""
                }
                time={booking.time}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
