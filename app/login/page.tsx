"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppDispatch } from "@/lib/redux/hooks"
import { loginStart, loginSuccess, loginFailure } from "@/lib/redux/slices/userSlice"
import { login } from "@/lib/auth"
import { Lock, Mail, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    dispatch(loginStart())

    try {
      const user = await login(formData.email, formData.password)
      dispatch(loginSuccess(user))

      // Redirect to the requested page or dashboard
      const redirectPath = searchParams.get("redirect") || "/dashboard"
      router.push(redirectPath)
    } catch (error) {
      setError((error as Error).message)
      dispatch(loginFailure((error as Error).message))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="card">
          <div className="card-header">
            <h1 className="text-2xl font-bold">Login to Your Account</h1>
          </div>
          <div className="card-body">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="mt-1 text-right">
                  <Link href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button type="submit" className="w-full btn-primary py-2.5" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">For demo purposes, use:</p>
          <p className="text-gray-700 text-sm">Email: john@example.com | Password: password</p>
        </div>
      </div>
    </div>
  )
}
