// Frontend/src/services/api.js
import axios from "axios"

const API_BASE_URL = "http://localhost:5000"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// API endpoints
export const dashboardAPI = {
  getDashboardData: (timeframe = "month", department = "all") =>
    api.get(`/api/dashboard/data?timeframe=${timeframe}&department=${department}`),

  getEmployees: () => api.get("/api/dashboard/employees"),

  getDepartments: () => api.get("/api/dashboard/departments"),

  getAttendance: () => api.get("/api/dashboard/attendance"),

  getPerformance: () => api.get("/api/dashboard/performance"),
}

export const eventsAPI = {
  getEvents: () => api.get("/api/events"),

  createEvent: (eventData) => api.post("/api/events", eventData),
}

export default api
