"use client";

import { useTranslation } from "@/context/TranslationContext";

interface AppointmentFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  loading: boolean;
}

export default function AppointmentFilters({
  selectedStatus,
  onStatusChange,
  loading,
}: AppointmentFiltersProps) {
  const { t } = useTranslation();

  const statuses = [
    { value: "all", label: t("admin.all") },
    { value: "confirmed", label: t("admin.confirmed") },
    { value: "pending", label: t("admin.pending") },
    { value: "cancelled", label: t("admin.cancelled") },
  ];

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 p-6">
      <div className="flex flex-wrap gap-3">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedStatus === status.value
                ? "bg-cyan-500 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            } disabled:opacity-50`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}
