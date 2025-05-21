"use client"

import { useEffect, useState } from "react"
import type { HealthMetric } from "@/lib/redux/slices/healthMetricsSlice"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

type MetricKey = keyof Omit<HealthMetric, "id" | "userId" | "date">

interface HealthMetricsChartProps {
  metrics: HealthMetric[]
  metricKey: MetricKey
  color: string
  title: string
  unit: string
}

export function HealthMetricsChart({ metrics, metricKey, color, title, unit }: HealthMetricsChartProps) {
  const [chartData, setChartData] = useState<{ date: string; value: number }[]>([])

  useEffect(() => {
    if (metrics.length > 0) {
      // Sort metrics by date
      const sortedMetrics = [...metrics].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      // Format data for the chart
      const formattedData = sortedMetrics.map((metric) => ({
        date: metric.date,
        value: metric[metricKey] as number,
      }))

      setChartData(formattedData)
    }
  }, [metrics, metricKey])

  if (chartData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    )
  }

  return (
    <div className="card h-80">
      <div className="card-header">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="card-body p-0">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return `${date.getMonth() + 1}/${date.getDate()}`
              }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`${value} ${unit}`, title]}
              labelFormatter={(label) => {
                const date = new Date(label)
                return date.toLocaleDateString()
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="value" name={title} stroke={color} activeDot={{ r: 8 }} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
