import Link from "next/link"
import { BarChart2, Heart, Shield } from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Health, Extend Your Life</h1>
              <p className="text-xl mb-8">
                Our advanced analytics platform helps you monitor vital health metrics and provides personalized
                insights to improve your longevity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-center"
                >
                  Get Started
                </Link>
                <Link
                  href="/about"
                  className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Health Analytics Dashboard"
                className="rounded-lg shadow-lg"
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <BarChart2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Analytics</h3>
              <p className="text-gray-600">
                Track and visualize your health metrics over time with intuitive charts and detailed reports.
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Longevity Predictions</h3>
              <p className="text-gray-600">
                Receive personalized insights on how improving your health metrics can extend your lifespan.
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Recommendations</h3>
              <p className="text-gray-600">
                Get actionable recommendations based on your data to improve your overall health and wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create your account and complete your health profile with basic information.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Metrics</h3>
              <p className="text-gray-600">
                Regularly input your health metrics like heart rate, body fat percentage, and more.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">View Analytics</h3>
              <p className="text-gray-600">
                Access detailed charts and visualizations to understand your health trends.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Insights</h3>
              <p className="text-gray-600">
                Receive personalized recommendations to improve your health and longevity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600">
                "This platform has completely changed how I track my health. The longevity predictions motivate me to
                keep improving my metrics every day."
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Health Coach</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I recommend HealthAnalytics to all my clients. The comprehensive tracking and visualization tools make
                it easy to monitor progress and stay motivated."
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-500">Medical Professional</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone in the medical field, I appreciate the scientific approach to health tracking. The insights
                are valuable for both prevention and monitoring."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Health and Extend Your Life?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who are taking control of their health metrics and making informed decisions for a
            longer, healthier life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-center"
            >
              Sign Up Now
            </Link>
            <Link
              href="/login"
              className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg text-center"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
