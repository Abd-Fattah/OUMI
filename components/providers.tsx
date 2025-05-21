"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"
import { useEffect } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { getCurrentUser } from "@/lib/auth"
import { loginSuccess } from "@/lib/redux/slices/userSlice"

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      dispatch(loginSuccess(user))
    }
  }, [dispatch])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  )
}
