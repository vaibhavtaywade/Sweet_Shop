import request from "supertest"
import mongoose from "mongoose"
import app from "../src/server"
import User from "../src/models/User.model"

describe("Auth API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/sweet-shop-test")
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
      })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty("token")
      expect(response.body.user.email).toBe("test@example.com")
    })

    it("should not register user with existing email", async () => {
      await User.create({
        email: "test@example.com",
        password: "password123",
      })

      const response = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password456",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toContain("already exists")
    })

    it("should validate password length", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "12345",
      })

      expect(response.status).toBe(400)
    })
  })

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/auth/register").send({
        email: "test@example.com",
        password: "password123",
      })
    })

    it("should login successfully with correct credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("token")
    })

    it("should reject incorrect password", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      })

      expect(response.status).toBe(401)
    })

    it("should reject non-existent user", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      })

      expect(response.status).toBe(401)
    })
  })
})
