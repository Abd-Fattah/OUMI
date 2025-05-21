"use client"

import { useEffect, useState } from "react"
import type { HealthMetric } from "@/lib/redux/slices/healthMetricsSlice"
import { calculateLongevityPrediction } from "@/lib/health-metrics"
import { Clock, Heart, TrendingUp, ArrowUp } from "lucide-react"

interface LongevityPredictionProps {
  metrics: HealthMetric[]
}

export function LongevityPrediction({ metrics }: LongevityPredictionProps) {
  const [prediction, setPrediction] = useState(0)
  const [hasImproved, setHasImproved] = useState(false)

  useEffect(() => {
    if (metrics.length > 0) {
      const years = calculateLongevityPrediction(metrics)
      setPrediction(years)
      setHasImproved(metrics.length > 1)
    }
  }, [metrics])

  if (metrics.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">Add health metrics to see your longevity prediction.</p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold flex items-center">
          <Clock className="mr-2" size={20} /> Longevity Prediction
        </h3>
      </div>
      <div className="card-body">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="text-5xl font-bold text-primary mb-2 flex items-center">
            +{prediction.toFixed(1)}
            {hasImproved && <ArrowUp className="ml-2 text-green-500" size={24} />}
          </div>
          <p className="text-xl text-gray-700 mb-4">Potential Years Added</p>
          <div className="flex items-center text-gray-600 mb-6">
            <Heart className="mr-2 text-red-500" size={20} />
            <span>Based on your current health metrics</span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-4 mb-6">
            <div className="bg-primary h-4 rounded-full" style={{ width: `${Math.min(prediction * 10, 100)}%` }}></div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg w-full">
            <h4 className="font-semibold flex items-center mb-2">
              <TrendingUp className="mr-2 text-green-500" size={18} />
              How to Improve
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Reduce your resting heart rate through cardiovascular exercise</li>
              <li>Optimize your body fat percentage through diet and exercise</li>
              <li>Increase your muscle mass with strength training</li>
              <li>Stay hydrated to maintain optimal water percentage</li>
              <li>Balance your caloric intake for optimal health</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
