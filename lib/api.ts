const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

function getAdminHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  
  if (ADMIN_TOKEN) {
    headers["X-Admin-Token"] = ADMIN_TOKEN;
  }
  
  return headers;
}

export const api = {
  // Health Check
  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error("Health check failed");
    return response.json();
  },

  // Patients API
  getPatients: async () => {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      headers: getAdminHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch patients");
    return response.json();
  },

  createPatient: async (data: {
    name: string;
    email: string;
    phone: string;
    date_of_birth?: string;
    gender?: string;
    address?: string;
    medical_history?: string;
    allergies?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: "POST",
      headers: getAdminHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Failed to create patient:", errorData);
      throw new Error(
        errorData.message ||
          JSON.stringify(errorData) ||
          "Failed to create patient",
      );
    }
    return response.json();
  },

  getPatient: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      headers: getAdminHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch patient");
    return response.json();
  },

  updatePatient: async (
    id: string,
    data: Partial<{
      name: string;
      email: string;
      phone: string;
      date_of_birth?: string;
      gender?: string;
      address?: string;
      medical_history?: string;
      allergies?: string;
    }>,
  ) => {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: "PUT",
      headers: getAdminHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update patient");
    return response.json();
  },

  deletePatient: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: "DELETE",
      headers: getAdminHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete patient");
    return response.json();
  },

  // Appointments API
  getAppointments: async () => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      headers: getAdminHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch appointments");
    return response.json();
  },

  createAppointment: async (data: {
    patient_id: number;
    service: string;
    appointment_date: string;
    appointment_time: string;
    status: "confirmed" | "pending" | "cancelled";
    notes?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: getAdminHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Failed to create appointment:", errorData);
      throw new Error(
        errorData.message || "Failed to create appointment",
      );
    }
    return response.json();
  },

  getAppointment: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      headers: getAdminHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch appointment");
    return response.json();
  },

  updateAppointment: async (
    id: string,
    data: Partial<{
      service: string;
      appointment_date: string;
      appointment_time: string;
      status: "confirmed" | "pending" | "cancelled";
      notes?: string;
    }>,
  ) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: "PUT",
      headers: getAdminHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update appointment");
    return response.json();
  },

  deleteAppointment: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: "DELETE",
      headers: getAdminHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete appointment");
    return response.json();
  },

  getAppointmentsByStatus: async (
    status: "confirmed" | "pending" | "cancelled",
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/appointments/status/${status}`,
      {
        headers: getAdminHeaders(),
      },
    );
    if (!response.ok) throw new Error("Failed to fetch appointments by status");
    return response.json();
  },

  getBookedSlots: async (date: string) => {
    const response = await fetch(
      `${API_BASE_URL}/appointments/booked-slots?date=${date}`,
      {
        headers: getAdminHeaders(),
      },
    );
    if (!response.ok) throw new Error("Failed to fetch booked slots");
    return response.json();
  },

  // Admin Verification
  verifyAdmin: async () => {
    const response = await fetch(`${API_BASE_URL}/verify-admin`, {
      method: "POST",
      headers: getAdminHeaders(),
    });
    if (!response.ok) throw new Error("Admin token verification failed");
    return response.json();
  },
};
