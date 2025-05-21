import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">HealthAnalytics</h3>
            <p className="text-gray-600">
              Track your health metrics and improve your longevity with our advanced analytics platform.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-primary">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/instructions" className="text-gray-600 hover:text-primary">
                  Instructions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@healthanalytics.com</li>
              <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-600">Address: 123 Health St, Wellness City</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} HealthAnalytics. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-gray-600 flex items-center">
              Made with <Heart className="mx-1 text-red-500" size={16} /> for a healthier world
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
