import Link from "next/link"
import { ArrowRight, Users, Award, Clock, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-400 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About HealthAnalytics</h1>
            <p className="text-xl mb-8">
              We're on a mission to help people live longer, healthier lives through data-driven insights and
              personalized recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto">
              <p>
                HealthAnalytics was founded in 2023 by a team of health professionals, data scientists, and technology
                experts who shared a common vision: to make health optimization accessible to everyone.
              </p>
              <p>
                We recognized that while there was an abundance of health data available through various devices and
                tests, most people lacked the tools to meaningfully interpret this information and translate it into
                actionable insights.
              </p>
              <p>
                Our platform was built to bridge this gap, using advanced analytics and machine learning to help
                individuals understand their health metrics and make informed decisions to improve their longevity and
                quality of life.
              </p>
              <p>
                Today, HealthAnalytics serves thousands of users worldwide, providing personalized health insights and
                recommendations based on individual health metrics and the latest scientific research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User-Centered</h3>
              <p className="text-gray-600">
                We put our users first in everything we do, designing our platform to be intuitive, accessible, and
                valuable for people of all backgrounds.
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scientific Integrity</h3>
              <p className="text-gray-600">
                We base our recommendations on peer-reviewed research and continuously update our algorithms as new
                scientific evidence emerges.
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy & Security</h3>
              <p className="text-gray-600">
                We maintain the highest standards of data protection, ensuring your health information remains private
                and secure.
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Long-Term Focus</h3>
              <p className="text-gray-600">
                We're committed to helping you make sustainable health improvements that extend your lifespan and
                enhance your quality of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Sarah Johnson</h3>
                <p className="text-blue-600 mb-4">Co-Founder & Chief Medical Officer</p>
                <p className="text-gray-600">
                  Board-certified physician with over 15 years of experience in preventive medicine and health
                  optimization.
                </p>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Michael Chen, PhD</h3>
                <p className="text-blue-600 mb-4">Co-Founder & Chief Data Scientist</p>
                <p className="text-gray-600">
                  Former research scientist with expertise in machine learning and health data analytics.
                </p>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Emily Rodriguez</h3>
                <p className="text-blue-600 mb-4">Co-Founder & CEO</p>
                <p className="text-gray-600">
                  Tech entrepreneur with a passion for making healthcare more accessible through technology.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/careers" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Join Our Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scientific Approach */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Scientific Approach</h2>
            <div className="prose prose-lg mx-auto">
              <p>
                At HealthAnalytics, we take a rigorous, evidence-based approach to health optimization. Our
                recommendations are based on:
              </p>
              <ul>
                <li>Peer-reviewed scientific literature from reputable journals</li>
                <li>Large-scale population studies on health and longevity</li>
                <li>Consultation with medical experts and researchers</li>
                <li>Continuous analysis of anonymized user data to identify patterns and trends</li>
              </ul>
              <p>
                We believe that health optimization should be personalized, as each individual has unique genetic,
                lifestyle, and environmental factors that influence their health outcomes. Our platform uses advanced
                algorithms to provide tailored recommendations based on your specific health metrics and goals.
              </p>
              <p>
                While we strive to provide the most accurate and helpful information possible, we always recommend
                consulting with healthcare professionals for medical advice and treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-400 to-pink-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join HealthAnalytics today and discover how our platform can help you optimize your health and extend your
            lifespan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-center"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
