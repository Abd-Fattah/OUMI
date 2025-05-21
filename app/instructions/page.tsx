import Link from "next/link"
import { ClipboardList, Heart, BarChart2, Thermometer, Droplet, Dumbbell, Coffee, ArrowRight } from "lucide-react"

export default function InstructionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">How to Use HealthAnalytics</h1>
        <p className="text-xl text-gray-600 mb-12">
          Follow these instructions to get the most out of our health analytics platform.
        </p>

        <div className="space-y-12">
          {/* Getting Started */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <ClipboardList className="mr-2 text-blue-600" size={24} />
              Getting Started
            </h2>
            <div className="card p-6">
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li className="pl-2">
                  <span className="font-semibold">Create an account</span> - Sign up with your email address and set up
                  your profile with basic information like age, gender, height, and weight.
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Log in to your dashboard</span> - After creating your account, you'll
                  be directed to your personal dashboard where you can track and analyze your health metrics.
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Add your first health metrics</span> - Click on the "Add Metrics"
                  button to input your first set of health data.
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Explore your dashboard</span> - Once you've added metrics, you'll see
                  charts, tables, and predictions based on your data.
                </li>
              </ol>
            </div>
          </section>

          {/* Understanding Your Health Metrics */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Heart className="mr-2 text-red-500" size={24} />
              Understanding Your Health Metrics
            </h2>
            <div className="card p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Heart className="mr-2 text-red-500" size={20} />
                    Heart Rate
                  </h3>
                  <p className="text-gray-700 pl-8">
                    Your resting heart rate is the number of times your heart beats per minute when you're at rest. A
                    lower resting heart rate generally indicates better cardiovascular fitness and more efficient heart
                    function. The normal range for adults is 60-100 beats per minute, with athletes often having rates
                    as low as 40-60 beats per minute.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Thermometer className="mr-2 text-orange-500" size={20} />
                    Body Temperature
                  </h3>
                  <p className="text-gray-700 pl-8">
                    Normal body temperature is around 36.5-37.5°C (97.7-99.5°F). Variations outside this range could
                    indicate illness or other health conditions. Regular monitoring can help you identify patterns and
                    potential health issues.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <BarChart2 className="mr-2 text-yellow-500" size={20} />
                    Body Fat Percentage
                  </h3>
                  <p className="text-gray-700 pl-8">
                    Body fat percentage is the amount of fat in your body compared to everything else (muscles, organs,
                    bones, water). Healthy ranges vary by gender and age, but generally 10-20% for men and 18-28% for
                    women is considered healthy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Droplet className="mr-2 text-blue-500" size={20} />
                    Water Percentage
                  </h3>
                  <p className="text-gray-700 pl-8">
                    Water makes up about 50-65% of your total body weight. Proper hydration is essential for many bodily
                    functions, including temperature regulation, joint lubrication, and nutrient transportation. Higher
                    water percentage is generally associated with better health.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Dumbbell className="mr-2 text-green-500" size={20} />
                    Muscle Mass
                  </h3>
                  <p className="text-gray-700 pl-8">
                    Muscle mass refers to the amount of muscle in your body. Higher muscle mass is associated with
                    better strength, metabolism, and overall health. Regular strength training can help increase and
                    maintain muscle mass.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Coffee className="mr-2 text-brown-500" size={20} />
                    Caloric Intake
                  </h3>
                  <p className="text-gray-700 pl-8">
                    Caloric intake is the number of calories you consume daily. The right amount depends on factors like
                    age, gender, weight, height, and activity level. Balancing caloric intake with energy expenditure is
                    key to maintaining a healthy weight.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Longevity Prediction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <BarChart2 className="mr-2 text-blue-600" size={24} />
              Understanding Your Longevity Prediction
            </h2>
            <div className="card p-6">
              <p className="text-gray-700 mb-4">
                Our longevity prediction feature estimates how many potential years you could add to your life by
                improving your health metrics. This prediction is based on scientific research linking various health
                indicators to longevity.
              </p>

              <h3 className="text-lg font-semibold mb-2">How It Works:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li className="pl-2">We analyze your current health metrics against optimal ranges</li>
                <li className="pl-2">We calculate potential improvement areas based on scientific research</li>
                <li className="pl-2">We estimate additional years of life expectancy based on these improvements</li>
                <li className="pl-2">We provide specific recommendations to help you achieve these improvements</li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">
                  Note: This prediction is an estimate based on current scientific understanding and should not be
                  considered medical advice. Always consult with healthcare professionals for personalized health
                  guidance.
                </p>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Best Practices for Accurate Tracking</h2>
            <div className="card p-6">
              <ul className="list-disc list-inside space-y-4 text-gray-700">
                <li className="pl-2">
                  <span className="font-semibold">Consistency is key</span> - Try to measure your metrics at the same
                  time of day for the most accurate tracking.
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Regular updates</span> - Update your metrics at least once a week for
                  the best insights.
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Use reliable equipment</span> - For the most accurate readings, use
                  quality measurement tools like digital scales, heart rate monitors, and body composition analyzers.
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Be honest with your inputs</span> - The more accurate your data, the
                  more valuable your insights will be.
                </li>
                <li className="pl-2">
                  <span className="font-semibold">Track additional factors</span> - Consider noting lifestyle factors
                  like sleep, stress, and exercise alongside your metrics for more comprehensive insights.
                </li>
              </ul>
            </div>
          </section>

          {/* Get Started CTA */}
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Ready to start tracking your health?</h3>
            <p className="text-gray-700 mb-4">Head to your dashboard and begin adding your health metrics today.</p>
            <Link href="/dashboard" className="btn-primary inline-flex items-center">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
