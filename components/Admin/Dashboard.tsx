"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/TranslationContext";
import {
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Trash2,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { api } from "@/lib/api";
import StatsCard from "./StatsCard";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentTable from "./AppointmentTable";

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

export default function AdminDashboard() {
  const { t, locale } = useTranslation();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch appointments on mount
  useEffect(() => {
    fetchAppointments();
  }, []);

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

  const handleDelete = async (id: number) => {
    if (!confirm(t("admin.confirmDelete") || "Are you sure?")) return;

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

  const handleWhatsApp = (phone: string, patientName: string) => {
    const message = encodeURIComponent(
      locale === "ar"
        ? `السلام عليكم ورحمة الله وبركاته\n\nمرحباً ${patientName}\n\nموعدك المؤكد في عيادتنا`
        : `Hello ${patientName}\n\nYour confirmed appointment at our clinic`,
    );
    window.open(
      `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {t("admin.title")}
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            {t("admin.subtitle")}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded"
          >
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Calendar}
            label={t("admin.totalAppointments")}
            value={totalAppointments}
            color="cyan"
          />
          <StatsCard
            icon={CheckCircle}
            label={t("admin.confirmed")}
            value={confirmedCount}
            color="green"
          />
          <StatsCard
            icon={AlertCircle}
            label={t("admin.pending")}
            value={pendingCount}
            color="yellow"
          />
          <StatsCard
            icon={TrendingUp}
            label={t("admin.expectedRevenue")}
            value={`${expectedRevenue} ج.م`}
            color="blue"
          />
        </div>

        {/* Appointments Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <AppointmentFilters
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            loading={loading}
          />

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-300">
                {t("admin.noAppointments")}
              </p>
            </div>
          ) : (
            <AppointmentTable
              appointments={filteredAppointments}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onWhatsApp={handleWhatsApp}
              locale={locale}
            />
          )}
        </div>
      </div>
    </div>
  );
}
