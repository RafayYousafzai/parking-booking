"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"

export default function BookSlot() {
  const searchParams = useSearchParams()
  const slotIndex = Number(searchParams.get("slot"))
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState("")
  const [vehicle, setVehicle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        alert("You must be signed in!")
        return
      }

      const { error } = await supabase.from("bookings").insert({
        slot_index: slotIndex,
        name,
        vehicle_number: vehicle,
        user_id: user.id,
      })

      if (error) {
        alert("Booking failed: " + error.message)
      } else {
        router.push("/")
      }
    } catch (error) {
      alert("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-medium text-gray-800 mb-6">Booking Slot #{slotIndex + 1}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle Number
            </label>
            <input
              id="vehicle"
              type="text"
              placeholder="Enter your vehicle number"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name || !vehicle}
            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  )
}
