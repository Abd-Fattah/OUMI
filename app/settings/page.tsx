"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setTheme } from "@/lib/redux/slices/uiSlice"
import { AuthGuard } from "@/components/auth-guard"
import { Moon, Sun, Bell, Lock, Shield, Download, Trash2, Check } from "lucide-react"

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector((state) => state.ui)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    tips: true,
  })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleThemeChange = (newTheme: "light" | "dark") => {
    dispatch(setTheme(newTheme))
    showSuccessMessage("Theme updated successfully")
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSaveNotifications = () => {
    // In a real app, we would save to the backend
    showSuccessMessage("Notification preferences updated successfully")
  }

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          {successMessage && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-start">
              <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Appearance */}
          <div className="card mb-8">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center ${
                    theme === "light" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <Sun className={`h-8 w-8 mb-2 ${theme === "light" ? "text-blue-500" : "text-gray-400"}`} />
                  <span className={theme === "light" ? "font-medium text-blue-700" : "text-gray-700"}>Light Mode</span>
                </button>

                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center ${
                    theme === "dark" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <Moon className={`h-8 w-8 mb-2 ${theme === "dark" ? "text-blue-500" : "text-gray-400"}`} />
                  <span className={theme === "dark" ? "font-medium text-blue-700" : "text-gray-700"}>Dark Mode</span>
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card mb-8">
            <div className="card-header">
              <h2 className="text-xl font-semibold flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive updates and alerts via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="email"
                      className="sr-only peer"
                      checked={notifications.email}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="push"
                      className="sr-only peer"
                      checked={notifications.push}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekly Reports</h3>
                    <p className="text-sm text-gray-500">Receive weekly summary of your health metrics</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="weekly"
                      className="sr-only peer"
                      checked={notifications.weekly}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Health Tips</h3>
                    <p className="text-sm text-gray-500">Receive personalized health tips and recommendations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="tips"
                      className="sr-only peer"
                      checked={notifications.tips}
                      onChange={handleNotificationChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button onClick={handleSaveNotifications} className="btn-primary">
                  Save Notification Preferences
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="card mb-8">
            <div className="card-header">
              <h2 className="text-xl font-semibold flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Security
              </h2>
            </div>
            <div className="card-body">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <button className="btn-secondary">Update Password</button>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <button className="btn-secondary">Enable 2FA</button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-gray-500" />
                    Privacy Settings
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Control how your data is used and shared within the platform
                  </p>
                  <button className="btn-secondary">Manage Privacy Settings</button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="card mb-8">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Data Management</h2>
            </div>
            <div className="card-body">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <Download className="mr-2 h-5 w-5 text-gray-500" />
                    Export Your Data
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Download all your health metrics and account information</p>
                  <button className="btn-secondary">Export Data</button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2 flex items-center text-red-600">
                    <Trash2 className="mr-2 h-5 w-5 text-red-600" />
                    Delete Account
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
