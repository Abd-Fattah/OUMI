import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import healthMetricsReducer from "./slices/healthMetricsSlice"
import uiReducer from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    healthMetrics: healthMetricsReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
