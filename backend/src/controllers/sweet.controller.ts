import type { Response } from "express"
import Sweet from "../models/Sweet.model"
import type { AuthRequest, CreateSweetRequest, UpdateSweetRequest, PurchaseRequest, RestockRequest } from "../types"

export const getAllSweets = async (req: AuthRequest, res: Response) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 })
    res.json(sweets)
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch sweets", error: error.message })
  }
}

export const searchSweets = async (req: AuthRequest, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query

    const query: any = {}

    if (name) {
      query.name = { $regex: name, $options: "i" }
    }

    if (category) {
      query.category = { $regex: category, $options: "i" }
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    const sweets = await Sweet.find(query).sort({ createdAt: -1 })
    res.json(sweets)
  } catch (error: any) {
    res.status(500).json({ message: "Search failed", error: error.message })
  }
}

export const createSweet = async (req: AuthRequest<{}, {}, CreateSweetRequest>, res: Response) => {
  try {
    const { name, category, price, quantity, description, imageUrl } = req.body

    // Validate input
    if (!name || !category || price === undefined || quantity === undefined) {
      return res.status(400).json({ message: "Name, category, price, and quantity are required" })
    }

    if (price < 0 || quantity < 0) {
      return res.status(400).json({ message: "Price and quantity cannot be negative" })
    }

    const sweet = new Sweet({
      name,
      category,
      price,
      quantity,
      description,
      imageUrl,
    })

    await sweet.save()
    res.status(201).json({ message: "Sweet created successfully", sweet })
  } catch (error: any) {
    res.status(500).json({ message: "Failed to create sweet", error: error.message })
  }
}

export const updateSweet = async (req: AuthRequest<{ id: string }, {}, UpdateSweetRequest>, res: Response) => {
  try {
    const { id } = req.params
    const updates = req.body

    // Validate price and quantity if provided
    if (updates.price !== undefined && updates.price < 0) {
      return res.status(400).json({ message: "Price cannot be negative" })
    }

    if (updates.quantity !== undefined && updates.quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" })
    }

    const sweet = await Sweet.findByIdAndUpdate(id, updates, { new: true, runValidators: true })

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" })
    }

    res.json({ message: "Sweet updated successfully", sweet })
  } catch (error: any) {
    res.status(500).json({ message: "Failed to update sweet", error: error.message })
  }
}

export const deleteSweet = async (req: AuthRequest<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const sweet = await Sweet.findByIdAndDelete(id)

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" })
    }

    res.json({ message: "Sweet deleted successfully" })
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete sweet", error: error.message })
  }
}

export const purchaseSweet = async (req: AuthRequest<{ id: string }, {}, PurchaseRequest>, res: Response) => {
  try {
    const { id } = req.params
    const { quantity } = req.body

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Valid quantity is required" })
    }

    const sweet = await Sweet.findById(id)

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" })
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({
        message: "Insufficient quantity in stock",
        available: sweet.quantity,
      })
    }

    sweet.quantity -= quantity
    await sweet.save()

    res.json({
      message: "Purchase successful",
      sweet,
      purchased: quantity,
    })
  } catch (error: any) {
    res.status(500).json({ message: "Purchase failed", error: error.message })
  }
}

export const restockSweet = async (req: AuthRequest<{ id: string }, {}, RestockRequest>, res: Response) => {
  try {
    const { id } = req.params
    const { quantity } = req.body

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Valid quantity is required" })
    }

    const sweet = await Sweet.findById(id)

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" })
    }

    sweet.quantity += quantity
    await sweet.save()

    res.json({
      message: "Restock successful",
      sweet,
      added: quantity,
    })
  } catch (error: any) {
    res.status(500).json({ message: "Restock failed", error: error.message })
  }
}
