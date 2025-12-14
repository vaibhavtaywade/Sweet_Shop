"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { sweetsAPI } from "../services/api"
import type { Sweet } from "../types"

export default function AdminPanel() {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    imageUrl: "",
  })
  const { logout } = useAuth()
  const navigate = useNavigate()

  const fetchSweets = async () => {
    try {
      setLoading(true)
      const response = await sweetsAPI.getAll()
      setSweets(response.data)
    } catch (err) {
      alert("Failed to fetch sweets")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSweets()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        description: formData.description,
        imageUrl: formData.imageUrl,
      }

      if (editingSweet) {
        await sweetsAPI.update(editingSweet._id, data)
      } else {
        await sweetsAPI.create(data)
      }

      setShowForm(false)
      setEditingSweet(null)
      setFormData({ name: "", category: "", price: "", quantity: "", description: "", imageUrl: "" })
      fetchSweets()
    } catch (err: any) {
      alert(err.response?.data?.message || "Operation failed")
    }
  }

  const handleEdit = (sweet: Sweet) => {
    setEditingSweet(sweet)
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
      description: sweet.description || "",
      imageUrl: sweet.imageUrl || "",
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this sweet?")) {
      try {
        await sweetsAPI.delete(id)
        fetchSweets()
      } catch (err: any) {
        alert(err.response?.data?.message || "Delete failed")
      }
    }
  }

  const handleRestock = async (id: string) => {
    const quantityStr = prompt("Enter quantity to restock:")
    if (quantityStr) {
      const quantity = Number(quantityStr)
      if (quantity > 0) {
        try {
          await sweetsAPI.restock(id, quantity)
          fetchSweets()
        } catch (err: any) {
          alert(err.response?.data?.message || "Restock failed")
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-secondary">🛠️ Admin Panel</h1>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Back to Shop
              </button>
              <button
                onClick={logout}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingSweet(null)
              setFormData({ name: "", category: "", price: "", quantity: "", description: "", imageUrl: "" })
            }}
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
          >
            {showForm ? "Cancel" : "+ Add New Sweet"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingSweet ? "Edit Sweet" : "Add New Sweet"}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              />
              <input
                type="number"
                placeholder="Quantity"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              />
              <textarea
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none md:col-span-2"
                rows={3}
              />
              <button
                type="submit"
                className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors font-semibold md:col-span-2"
              >
                {editingSweet ? "Update Sweet" : "Add Sweet"}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sweets.map((sweet) => (
                  <tr key={sweet._id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{sweet.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sweet.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${sweet.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sweet.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleEdit(sweet)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRestock(sweet._id)}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Restock
                      </button>
                      <button
                        onClick={() => handleDelete(sweet._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
