import type { Request } from "express"

export interface IUser {
  _id: string
  email: string
  password: string
  role: "user" | "admin"
  createdAt: Date
}

export interface ISweet {
  _id: string
  name: string
  category: string
  price: number
  quantity: number
  description?: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthRequest<P = any, ResBody = any, ReqBody = any, ReqQuery = any>
  extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    userId: string
    email: string
    role: "user" | "admin"
  }
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface CreateSweetRequest {
  name: string
  category: string
  price: number
  quantity: number
  description?: string
  imageUrl?: string
}

export interface UpdateSweetRequest {
  name?: string
  category?: string
  price?: number
  quantity?: number
  description?: string
  imageUrl?: string
}

export interface PurchaseRequest {
  quantity: number
}

export interface RestockRequest {
  quantity: number
}
