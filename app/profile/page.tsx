"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { updateUserStart, updateUserSuccess, updateUserFailure } from "@/lib/redux/slices/userSlice"
import { updateUser } from "@/lib/auth"
import { AuthGuard } from "@/components/auth-guard"
import { User, Mail, Ruler, Weight, Calendar, Check, AlertCircle } from "lucide-react"


export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const { currentUser, loading, error } = useAppSelector((state) => state.user)
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    age: currentUser?.age || 0,
    gender: currentUser?.gender || "male",
    height: currentUser?.height || 0,
    weight: currentUser?.weight || 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    // Convert numeric inputs to numbers
    const parsedValue = type === "number" ? (value ? Number(value) : "") : value

    setFormData((prev) => ({ ...prev, [name]: parsedValue }))

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.age) {
      newErrors.age = "Age is required"
    } else if (formData.age < 18 || formData.age > 120) {
      newErrors.age = "Age must be between 18 and 120"
    }

    if (!formData.height) {
      newErrors.height = "Height is required"
    } else if (formData.height < 100 || formData.height > 250) {
      newErrors.height = "Height must be between 100 and 250 cm"
    }

    if (!formData.weight) {
      newErrors.weight = "Weight is required"
    } else if (formData.weight < 30 || formData.weight > 300) {
      newErrors.weight = "Weight must be between 30 and 300 kg"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    dispatch(updateUserStart())

    try {
      const updatedUser = await updateUser(formData)
      dispatch(updateUserSuccess(updatedUser))
      setIsEditing(false)
      setSuccessMessage("Profile updated successfully")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (error) {
      dispatch(updateUserFailure((error as Error).message))
      setErrors((prev) => ({ ...prev, form: (error as Error).message }))
    }
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="btn-secondary">
                  Edit Profile
                </button>
              )}
            </div>
            <div className="card-body">
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-start">
                  <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {errors.form && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control pl-10"
                          required
                        />
                      </div>
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control pl-10"
                          required
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="form-control pl-10"
                          min="18"
                          max="120"
                          required
                        />
                      </div>
                      {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                        Height (cm)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Ruler className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="height"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          className="form-control pl-10"
                          min="100"
                          max="250"
                          required
                        />
                      </div>
                      {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height}</p>}
                    </div>

                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Weight className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          className="form-control pl-10"
                          min="30"
                          max="300"
                          required
                        />
                      </div>
                      {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                          Saving...
                        </span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="mt-1 flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        {currentUser?.name}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                      <p className="mt-1 flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-2" />
                        {currentUser?.email}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Age</h3>
                      <p className="mt-1 flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        {currentUser?.age} years
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                      <p className="mt-1 capitalize">{currentUser?.gender}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Height</h3>
                      <p className="mt-1 flex items-center">
                        <Ruler className="h-5 w-5 text-gray-400 mr-2" />
                        {currentUser?.height} cm
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                      <p className="mt-1 flex items-center">
                        <Weight className="h-5 w-5 text-gray-400 mr-2" />
                        {currentUser?.weight} kg
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
