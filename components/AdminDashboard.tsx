"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import {
  Calendar,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Trash2,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/api";

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

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminDashboard() {
  const { t, locale } = useTranslation();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getAppointments();
        console.log("Fetched appointments:", data);
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch appointments",
        );
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Calculate stats
  const totalAppointments = appointments.length;
  const confirmedCount = appointments.filter(
    (a) => a.status === "confirmed",
  ).length;
  const pendingCount = appointments.filter(
    (a) => a.status === "pending",
  ).length;
  const expectedRevenue = confirmedCount * 3500; // Average price in EGP

  const filteredAppointments =
    selectedStatus === "all"
      ? appointments
      : appointments.filter((a) => a.status === selectedStatus);

  const handleStatusChange = async (
    id: number,
    newStatus: "confirmed" | "pending" | "cancelled",
  ) => {
    try {
      await api.updateAppointment(id.toString(), { status: newStatus });
      setAppointments(
        appointments.map((a) =>
          a.id === id ? { ...a, status: newStatus } : a,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update appointment",
      );
      console.error("Error updating appointment:", err);
    }
  };

  const handleWhatsApp = (phone: string, patientName: string) => {
    const message = encodeURIComponent(
      locale === "ar"
        ? t("admin.confirmationMessage").replace("{patient}", patientName)
        : t("admin.confirmationMessage").replace("{patient}", patientName),
    );
    window.open(
      `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`,
      "_blank",
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteAppointment(id.toString());
      setAppointments(appointments.filter((a) => a.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete appointment",
      );
      console.error("Error deleting appointment:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
            {t("admin.title")}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {t("admin.subtitle")}
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-cyan-600 dark:text-cyan-400 animate-spin mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                {t("common.loading") || "جاري التحميل..."}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {/* Total Appointments */}
              <motion.div
                variants={statVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border-l-4 border-cyan-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                      {t("admin.totalAppointments")}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {totalAppointments}
                    </p>
                  </div>
                  <div className="p-4 bg-cyan-100 dark:bg-cyan-900 rounded-xl">
                    <Calendar className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                  </div>
                </div>
              </motion.div>

              {/* Confirmed */}
              <motion.div
                variants={statVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border-l-4 border-green-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                      {t("admin.confirmed")}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {confirmedCount}
                    </p>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </motion.div>

              {/* Pending */}
              <motion.div
                variants={statVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                      {t("admin.pending")}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {pendingCount}
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                    <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </motion.div>

              {/* Revenue */}
              <motion.div
                variants={statVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                      {t("admin.expectedRevenue")}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {expectedRevenue.toLocaleString(
                        locale === "ar" ? "ar-SA" : "en-US",
                      )}{" "}
                      {locale === "ar" ? "ج.م" : "EGP"}
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Appointments Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Filter Tabs */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap gap-3">
                  {["all", "confirmed", "pending", "cancelled"].map(
                    (status) => (
                      <motion.button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedStatus === status
                            ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        {status === "all" && t("admin.all")}
                        {status === "confirmed" && t("admin.confirmed")}
                        {status === "pending" && t("admin.pending")}
                        {status === "cancelled" && t("admin.cancelled")}
                      </motion.button>
                    ),
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                    <tr>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                        {t("admin.patientName")}
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                        {t("admin.service")}
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                        {t("admin.dateTime")}
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                        {t("admin.status")}
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                        {t("admin.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment, idx) => (
                      <motion.tr
                        key={appointment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                          {appointment.patient?.name ||
                            `Patient #${appointment.patient_id}`}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                          {appointment.service}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                          {new Date(
                            appointment.appointment_date,
                          ).toLocaleDateString(
                            locale === "ar" ? "ar-SA" : "en-US",
                          )}{" "}
                          - {appointment.appointment_time}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={appointment.status}
                            onChange={(e) =>
                              handleStatusChange(
                                appointment.id,
                                e.target.value as
                                  | "confirmed"
                                  | "pending"
                                  | "cancelled",
                              )
                            }
                            className={`px-3 py-2 rounded-lg font-medium border-0 cursor-pointer dark:text-white ${
                              appointment.status === "confirmed"
                                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                                : appointment.status === "pending"
                                  ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                                  : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                            }`}
                          >
                            <option value="confirmed">
                              {t("admin.confirmed")}
                            </option>
                            <option value="pending">
                              {t("admin.pending")}
                            </option>
                            <option value="cancelled">
                              {t("admin.cancelled")}
                            </option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleWhatsApp(
                                  appointment.patient?.phone ||
                                    appointment.phone ||
                                    "",
                                  appointment.patient?.name ||
                                    `Patient #${appointment.patient_id}`,
                                )
                              }
                              className="p-2 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-700 dark:text-green-400 rounded-lg transition-all"
                              title={t("admin.sendWhatsApp")}
                            >
                              <MessageSquare className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(appointment.id)}
                              className="p-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-400 rounded-lg transition-all"
                              title={t("admin.deleteAppointment")}
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredAppointments.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    {t("admin.noAppointments")}
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
