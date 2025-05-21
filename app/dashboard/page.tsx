"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchMetricsStart, fetchMetricsSuccess, fetchMetricsFailure } from "@/lib/redux/slices/healthMetricsSlice"
import { fetchMetrics } from "@/lib/health-metrics"
import { openModal } from "@/lib/redux/slices/uiSlice"
import { AuthGuard } from "@/components/auth-guard"
import { Modal } from "@/components/modal"
import { HealthMetricsForm } from "@/components/health-metrics-form"
import { HealthMetricsChart } from "@/components/health-metrics-chart"
import { HealthMetricsTable } from "@/components/health-metrics-table"
import { LongevityPrediction } from "@/components/longevity-prediction"
import { PlusCircle, RefreshCw } from "lucide-react"

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.user)
  const { metrics, loading, error } = useAppSelector((state) => state.healthMetrics)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (currentUser) {
      loadMetrics()
    }
  }, [currentUser])

  const loadMetrics = async () => {
    if (!currentUser) return

    dispatch(fetchMetricsStart())
    try {
      const data = await fetchMetrics(currentUser.id)
      dispatch(fetchMetricsSuccess(data))
    } catch (error) {
      dispatch(fetchMetricsFailure((error as Error).message))
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadMetrics()
    setIsRefreshing(false)
  }

  const handleAddMetric = () => {
    dispatch(openModal({ id: "add-metric" }))
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Health Dashboard</h1>
            <p className="text-gray-600">Track your health metrics and see how they affect your longevity.</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-4">
            <button onClick={handleRefresh} className="flex items-center btn-secondary" disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button onClick={handleAddMetric} className="flex items-center btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Metrics
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">Error: {error}</div>
        )}

        {loading && !isRefreshing ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Longevity Prediction */}
            <div className="mb-8">
              <LongevityPrediction metrics={metrics} />
            </div>

            {/* Charts */}
            <h2 className="text-2xl font-bold mb-4">Health Metrics Trends</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <HealthMetricsChart
                metrics={metrics}
                metricKey="heartRate"
                color="#ef4444"
                title="Heart Rate"
                unit="bpm"
              />
              <HealthMetricsChart
                metrics={metrics}
                metricKey="bodyFatPercentage"
                color="#f97316"
                title="Body Fat Percentage"
                unit="%"
              />
              <HealthMetricsChart
                metrics={metrics}
                metricKey="waterPercentage"
                color="#3b82f6"
                title="Water Percentage"
                unit="%"
              />
              <HealthMetricsChart
                metrics={metrics}
                metricKey="muscleMass"
                color="#10b981"
                title="Muscle Mass"
                unit="kg"
              />
            </div>

            {/* Metrics Table */}
            <h2 className="text-2xl font-bold mb-4">Health Metrics History</h2>
            <div className="card">
              <div className="card-body p-0">
                <HealthMetricsTable metrics={metrics} />
              </div>
            </div>
          </>
        )}

        {/* Add Metric Modal */}
        <Modal id="add-metric" title="Add Health Metrics">
          <HealthMetricsForm modalId="add-metric" />
        </Modal>
      </div>
    </AuthGuard>
  )
}
