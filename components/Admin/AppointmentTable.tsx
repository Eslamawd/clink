"use client";

import { motion } from "framer-motion";
import { Trash2, MessageSquare } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

interface Appointment {
  id: number;
  patient_id: number;
  patient?: {
    id: number;
    name: string;
    phone: string;
  };
  service: string;
  appointment_date: string;
  appointment_time: string;
  status: "confirmed" | "pending" | "cancelled";
  phone?: string;
}

interface AppointmentTableProps {
  appointments: Appointment[];
  onStatusChange: (id: number, status: "confirmed" | "pending" | "cancelled") => void;
  onDelete: (id: number) => void;
  onWhatsApp: (phone: string, patientName: string) => void;
  locale: string;
}

export default function AppointmentTable({
  appointments,
  onStatusChange,
  onDelete,
  onWhatsApp,
  locale,
}: AppointmentTableProps) {
  const { t } = useTranslation();

  const statusColors = {
    confirmed: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    cancelled: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <th className={`px-6 py-4 text-${locale === "ar" ? "right" : "left"} text-sm font-semibold text-slate-700 dark:text-slate-300`}>
              {t("admin.patientName")}
            </th>
            <th className={`px-6 py-4 text-${locale === "ar" ? "right" : "left"} text-sm font-semibold text-slate-700 dark:text-slate-300`}>
              {t("admin.service")}
            </th>
            <th className={`px-6 py-4 text-${locale === "ar" ? "right" : "left"} text-sm font-semibold text-slate-700 dark:text-slate-300`}>
              {t("admin.dateTime")}
            </th>
            <th className={`px-6 py-4 text-${locale === "ar" ? "right" : "left"} text-sm font-semibold text-slate-700 dark:text-slate-300`}>
              {t("admin.status")}
            </th>
            <th className={`px-6 py-4 text-${locale === "ar" ? "right" : "left"} text-sm font-semibold text-slate-700 dark:text-slate-300`}>
              {t("admin.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <motion.tr
              key={appointment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                {appointment.patient?.name || "Unknown"}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                {appointment.service}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                {appointment.appointment_date} - {appointment.appointment_time}
              </td>
              <td className="px-6 py-4">
                <select
                  value={appointment.status}
                  onChange={(e) =>
                    onStatusChange(
                      appointment.id,
                      e.target.value as "confirmed" | "pending" | "cancelled",
                    )
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status]} border-none cursor-pointer`}
                >
                  <option value="pending">{t("admin.pending")}</option>
                  <option value="confirmed">{t("admin.confirmed")}</option>
                  <option value="cancelled">{t("admin.cancelled")}</option>
                </select>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() =>
                    onWhatsApp(
                      appointment.patient?.phone || "",
                      appointment.patient?.name || "",
                    )
                  }
                  className="p-2 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-lg transition-colors"
                  title={t("admin.sendWhatsApp")}
                >
                  <MessageSquare className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </button>
                <button
                  onClick={() => onDelete(appointment.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  title={t("admin.deleteAppointment")}
                >
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
