"use client"

import { useState } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import {
  type HealthMetric,
  deleteMetricStart,
  deleteMetricSuccess,
  deleteMetricFailure,
} from "@/lib/redux/slices/healthMetricsSlice"
import { deleteMetric } from "@/lib/health-metrics"
import { Edit, Trash2 } from "lucide-react"
import { openModal } from "@/lib/redux/slices/uiSlice"

interface HealthMetricsTableProps {
  metrics: HealthMetric[]
}

export function HealthMetricsTable({ metrics }: HealthMetricsTableProps) {
  const dispatch = useAppDispatch()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setIsDeleting(id)
      dispatch(deleteMetricStart())

      try {
        await deleteMetric(id)
        dispatch(deleteMetricSuccess(id))
      } catch (error) {
        dispatch(deleteMetricFailure((error as Error).message))
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const handleEdit = (metric: HealthMetric) => {
    dispatch(openModal({ id: "edit-metric", data: metric }))
  }

  // Sort metrics by date (newest first)
  const sortedMetrics = [...metrics].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sortedMetrics.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">No health metrics recorded yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Heart Rate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Body Temp
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Body Fat %
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Water %
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Muscle Mass
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Calories
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedMetrics.map((metric) => (
            <tr key={metric.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(metric.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.heartRate} bpm</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.bodyTemperature}°C</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.bodyFatPercentage}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.waterPercentage}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.muscleMass} kg</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{metric.caloricIntake} cal</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button onClick={() => handleEdit(metric)} className="text-blue-600 hover:text-blue-900">
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(metric.id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={isDeleting === metric.id}
                  >
                    {isDeleting === metric.id ? (
                      <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-red-600 rounded-full inline-block"></span>
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
