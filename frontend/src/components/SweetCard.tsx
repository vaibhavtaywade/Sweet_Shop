"use client"

import { useState } from "react"
import type { Sweet } from "../types"

interface SweetCardProps {
  sweet: Sweet
  onPurchase: (id: string, quantity: number) => void
}

export default function SweetCard({ sweet, onPurchase }: SweetCardProps) {
  const [quantity, setQuantity] = useState(1)

  const handlePurchase = () => {
    if (quantity > 0 && quantity <= sweet.quantity) {
      onPurchase(sweet._id, quantity)
      setQuantity(1)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
        {sweet.imageUrl ? (
          <img src={sweet.imageUrl || "/placeholder.svg"} alt={sweet.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">🍬</span>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{sweet.name}</h3>
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
            {sweet.category}
          </span>
        </div>
        {sweet.description && <p className="text-gray-600 text-sm mb-4">{sweet.description}</p>}
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary">${sweet.price.toFixed(2)}</span>
          <span className={`text-sm font-medium ${sweet.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : "Out of stock"}
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max={sweet.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            disabled={sweet.quantity === 0}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none disabled:bg-gray-100"
          />
          <button
            onClick={handlePurchase}
            disabled={sweet.quantity === 0 || quantity > sweet.quantity}
            className="flex-1 bg-primary hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  )
}
