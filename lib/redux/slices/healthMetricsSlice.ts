import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface HealthMetric {
  id: string
  userId: string
  date: string
  heartRate: number
  bodyTemperature: number
  bodyFatPercentage: number
  waterPercentage: number
  muscleMass: number
  caloricIntake: number
}

interface HealthMetricsState {
  metrics: HealthMetric[]
  loading: boolean
  error: string | null
}

const initialState: HealthMetricsState = {
  metrics: [],
  loading: false,
  error: null,
}

const healthMetricsSlice = createSlice({
  name: "healthMetrics",
  initialState,
  reducers: {
    fetchMetricsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchMetricsSuccess: (state, action: PayloadAction<HealthMetric[]>) => {
      state.metrics = action.payload
      state.loading = false
      state.error = null
    },
    fetchMetricsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    addMetricStart: (state) => {
      state.loading = true
      state.error = null
    },
    addMetricSuccess: (state, action: PayloadAction<HealthMetric>) => {
      state.metrics.push(action.payload)
      state.loading = false
      state.error = null
    },
    addMetricFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateMetricStart: (state) => {
      state.loading = true
      state.error = null
    },
    updateMetricSuccess: (state, action: PayloadAction<HealthMetric>) => {
      const index = state.metrics.findIndex((metric) => metric.id === action.payload.id)
      if (index !== -1) {
        state.metrics[index] = action.payload
      }
      state.loading = false
      state.error = null
    },
    updateMetricFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    deleteMetricStart: (state) => {
      state.loading = true
      state.error = null
    },
    deleteMetricSuccess: (state, action: PayloadAction<string>) => {
      state.metrics = state.metrics.filter((metric) => metric.id !== action.payload)
      state.loading = false
      state.error = null
    },
    deleteMetricFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchMetricsStart,
  fetchMetricsSuccess,
  fetchMetricsFailure,
  addMetricStart,
  addMetricSuccess,
  addMetricFailure,
  updateMetricStart,
  updateMetricSuccess,
  updateMetricFailure,
  deleteMetricStart,
  deleteMetricSuccess,
  deleteMetricFailure,
} = healthMetricsSlice.actions

export default healthMetricsSlice.reducer
