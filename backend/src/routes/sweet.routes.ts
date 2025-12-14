import { Router } from "express"
import {
  getAllSweets,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweet.controller"
import { authenticate, isAdmin } from "../middleware/auth.middleware"

const router = Router()

// Public routes (protected by authentication)
router.get("/", authenticate, getAllSweets)
router.get("/search", authenticate, searchSweets)
router.post("/:id/purchase", authenticate, purchaseSweet)

// Admin only routes
router.post("/", authenticate, isAdmin, createSweet)
router.put("/:id", authenticate, isAdmin, updateSweet)
router.delete("/:id", authenticate, isAdmin, deleteSweet)
router.post("/:id/restock", authenticate, isAdmin, restockSweet)

export default router
