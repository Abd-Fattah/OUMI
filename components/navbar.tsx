"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { logout } from "@/lib/redux/slices/userSlice"
import { logout as logoutUser } from "@/lib/auth"
import { Menu, X, User, Settings, LogOut, Home, BarChart2, Info, BookOpen } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { isAuthenticated, currentUser } = useAppSelector((state) => state.user)

  const handleLogout = async () => {
    await logoutUser()
    dispatch(logout())
  }

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart2, protected: true },
    { name: "Profile", href: "/profile", icon: User, protected: true },
    { name: "Instructions", href: "/instructions", icon: BookOpen },
    { name: "Settings", href: "/settings", icon: Settings, protected: true },
    { name: "About", href: "/about", icon: Info },
  ]

  const filteredLinks = navLinks.filter((link) => !link.protected || isAuthenticated)

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              HealthAnalytics
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {filteredLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/login" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/register" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pt-2 pb-3 space-y-1">
            {filteredLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <link.icon className="mr-2" size={18} />
                  {link.name}
                </div>
              </Link>
            ))}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="mr-2" size={18} />
                  Logout
                </div>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/login" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === "/register" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
