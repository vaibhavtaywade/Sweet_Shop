import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/database"
import authRoutes from "./routes/auth.routes"
import sweetRoutes from "./routes/sweet.routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/sweets", sweetRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Sweet Shop API is running" })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
})

// Start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`)
      console.log(`📊 Environment: ${process.env.NODE_ENV}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()

export default app
