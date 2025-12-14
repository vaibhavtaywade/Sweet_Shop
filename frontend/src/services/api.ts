import axios from "axios"
import type { Sweet, AuthResponse } from "../types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth API
export const authAPI = {
  register: (email: string, password: string) => api.post<AuthResponse>("/auth/register", { email, password }),

  login: (email: string, password: string) => api.post<AuthResponse>("/auth/login", { email, password }),
}

// Sweets API
export const sweetsAPI = {
  getAll: () => api.get<Sweet[]>("/sweets"),

  search: (params: { name?: string; category?: string; minPrice?: number; maxPrice?: number }) =>
    api.get<Sweet[]>("/sweets/search", { params }),

  create: (data: Omit<Sweet, "_id" | "createdAt" | "updatedAt">) =>
    api.post<{ message: string; sweet: Sweet }>("/sweets", data),

  update: (id: string, data: Partial<Sweet>) => api.put<{ message: string; sweet: Sweet }>(`/sweets/${id}`, data),

  delete: (id: string) => api.delete<{ message: string }>(`/sweets/${id}`),

  purchase: (id: string, quantity: number) =>
    api.post<{ message: string; sweet: Sweet; purchased: number }>(`/sweets/${id}/purchase`, { quantity }),

  restock: (id: string, quantity: number) =>
    api.post<{ message: string; sweet: Sweet; added: number }>(`/sweets/${id}/restock`, { quantity }),
}

export default api
