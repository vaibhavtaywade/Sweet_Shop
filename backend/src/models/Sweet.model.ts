import mongoose, { Schema, type Document } from "mongoose"

export interface ISweetDocument extends Document {
  name: string
  category: string
  price: number
  quantity: number
  description?: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

const SweetSchema = new Schema<ISweetDocument>(
  {
    name: {
      type: String,
      required: [true, "Sweet name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
SweetSchema.index({ name: "text", category: "text" })

export default mongoose.model<ISweetDocument>("Sweet", SweetSchema)
