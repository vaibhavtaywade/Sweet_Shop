"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { sweetsAPI } from "../services/api"
import type { Sweet } from "../types"
import SweetCard from "./SweetCard"

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchName, setSearchName] = useState("")
  const [searchCategory, setSearchCategory] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const fetchSweets = async () => {
    try {
      setLoading(true)
      const response = await sweetsAPI.getAll()
      setSweets(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch sweets")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (searchName) params.name = searchName
      if (searchCategory) params.category = searchCategory
      if (minPrice) params.minPrice = Number(minPrice)
      if (maxPrice) params.maxPrice = Number(maxPrice)

      const response = await sweetsAPI.search(params)
      setSweets(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || "Search failed")
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (id: string, quantity: number) => {
    try {
      await sweetsAPI.purchase(id, quantity)
      fetchSweets()
    } catch (err: any) {
      alert(err.response?.data?.message || "Purchase failed")
    }
  }

  useEffect(() => {
    fetchSweets()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">🍬 Sweet Shop</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Welcome, {user?.email} {user?.role === "admin" && "(Admin)"}
              </span>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin")}
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Admin Panel
                </button>
              )}
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
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Sweets</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
            >
              Search
            </button>
          </div>
          <button onClick={fetchSweets} className="mt-4 text-primary hover:text-pink-600 font-medium text-sm">
            Clear filters
          </button>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

        {/* Sweets Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading sweets...</p>
          </div>
        ) : sweets.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg">No sweets found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweets.map((sweet) => (
              <SweetCard key={sweet._id} sweet={sweet} onPurchase={handlePurchase} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
