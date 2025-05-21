"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { addMetricStart, addMetricSuccess, addMetricFailure } from "@/lib/redux/slices/healthMetricsSlice"
import { addMetric } from "@/lib/health-metrics"
import { closeModal } from "@/lib/redux/slices/uiSlice"

interface HealthMetricsFormProps {
  modalId: string
}

export function HealthMetricsForm({ modalId }: HealthMetricsFormProps) {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.user)
  const [formData, setFormData] = useState({
    heartRate: 70,
    bodyTemperature: 36.6,
    bodyFatPercentage: 20,
    waterPercentage: 60,
    muscleMass: 65,
    caloricIntake: 2000,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) }))

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

    if (formData.heartRate < 40 || formData.heartRate > 200) {
      newErrors.heartRate = "Heart rate should be between 40 and 200 bpm"
    }

    if (formData.bodyTemperature < 35 || formData.bodyTemperature > 42) {
      newErrors.bodyTemperature = "Body temperature should be between 35°C and 42°C"
    }

    if (formData.bodyFatPercentage < 3 || formData.bodyFatPercentage > 50) {
      newErrors.bodyFatPercentage = "Body fat percentage should be between 3% and 50%"
    }

    if (formData.waterPercentage < 30 || formData.waterPercentage > 80) {
      newErrors.waterPercentage = "Water percentage should be between 30% and 80%"
    }

    if (formData.muscleMass < 20 || formData.muscleMass > 100) {
      newErrors.muscleMass = "Muscle mass should be between 20kg and 100kg"
    }

    if (formData.caloricIntake < 500 || formData.caloricIntake > 5000) {
      newErrors.caloricIntake = "Caloric intake should be between 500 and 5000 calories"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate() || !currentUser) return

    setIsSubmitting(true)
    dispatch(addMetricStart())

    try {
      const newMetric = await addMetric({
        userId: currentUser.id,
        date: new Date().toISOString().split("T")[0],
        ...formData,
      })

      dispatch(addMetricSuccess(newMetric))
      dispatch(closeModal(modalId))
    } catch (error) {
      dispatch(addMetricFailure((error as Error).message))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700 mb-1">
            Heart Rate (bpm)
          </label>
          <input
            type="number"
            id="heartRate"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            className="form-control"
            min="40"
            max="200"
            step="1"
            required
          />
          {errors.heartRate && <p className="mt-1 text-sm text-red-600">{errors.heartRate}</p>}
        </div>

        <div>
          <label htmlFor="bodyTemperature" className="block text-sm font-medium text-gray-700 mb-1">
            Body Temperature (°C)
          </label>
          <input
            type="number"
            id="bodyTemperature"
            name="bodyTemperature"
            value={formData.bodyTemperature}
            onChange={handleChange}
            className="form-control"
            min="35"
            max="42"
            step="0.1"
            required
          />
          {errors.bodyTemperature && <p className="mt-1 text-sm text-red-600">{errors.bodyTemperature}</p>}
        </div>

        <div>
          <label htmlFor="bodyFatPercentage" className="block text-sm font-medium text-gray-700 mb-1">
            Body Fat Percentage (%)
          </label>
          <input
            type="number"
            id="bodyFatPercentage"
            name="bodyFatPercentage"
            value={formData.bodyFatPercentage}
            onChange={handleChange}
            className="form-control"
            min="3"
            max="50"
            step="0.1"
            required
          />
          {errors.bodyFatPercentage && <p className="mt-1 text-sm text-red-600">{errors.bodyFatPercentage}</p>}
        </div>

        <div>
          <label htmlFor="waterPercentage" className="block text-sm font-medium text-gray-700 mb-1">
            Water Percentage (%)
          </label>
          <input
            type="number"
            id="waterPercentage"
            name="waterPercentage"
            value={formData.waterPercentage}
            onChange={handleChange}
            className="form-control"
            min="30"
            max="80"
            step="0.1"
            required
          />
          {errors.waterPercentage && <p className="mt-1 text-sm text-red-600">{errors.waterPercentage}</p>}
        </div>

        <div>
          <label htmlFor="muscleMass" className="block text-sm font-medium text-gray-700 mb-1">
            Muscle Mass (kg)
          </label>
          <input
            type="number"
            id="muscleMass"
            name="muscleMass"
            value={formData.muscleMass}
            onChange={handleChange}
            className="form-control"
            min="20"
            max="100"
            step="0.1"
            required
          />
          {errors.muscleMass && <p className="mt-1 text-sm text-red-600">{errors.muscleMass}</p>}
        </div>

        <div>
          <label htmlFor="caloricIntake" className="block text-sm font-medium text-gray-700 mb-1">
            Caloric Intake (calories)
          </label>
          <input
            type="number"
            id="caloricIntake"
            name="caloricIntake"
            value={formData.caloricIntake}
            onChange={handleChange}
            className="form-control"
            min="500"
            max="5000"
            step="10"
            required
          />
          {errors.caloricIntake && <p className="mt-1 text-sm text-red-600">{errors.caloricIntake}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={() => dispatch(closeModal(modalId))}
          className="btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
              Saving...
            </span>
          ) : (
            "Save Metrics"
          )}
        </button>
      </div>
    </form>
  )
}
