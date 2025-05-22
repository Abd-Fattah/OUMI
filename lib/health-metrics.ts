import type { HealthMetric } from "./redux/slices/healthMetricsSlice"

const MOCK_METRICS: HealthMetric[] = [
  {
    id: "1",
    userId: "1",
    date: "2023-01-01",
    heartRate: 72,
    bodyTemperature: 36.6,
    bodyFatPercentage: 22,
    waterPercentage: 60,
    muscleMass: 65,
    caloricIntake: 2200,
  },
  {
    id: "2",
    userId: "1",
    date: "2023-01-02",
    heartRate: 70,
    bodyTemperature: 36.5,
    bodyFatPercentage: 21.8,
    waterPercentage: 61,
    muscleMass: 65.2,
    caloricIntake: 2150,
  },
  {
    id: "3",
    userId: "1",
    date: "2023-01-03",
    heartRate: 68,
    bodyTemperature: 36.6,
    bodyFatPercentage: 21.5,
    waterPercentage: 62,
    muscleMass: 65.5,
    caloricIntake: 2100,
  },
]

export const fetchMetrics = (userId: string): Promise<HealthMetric[]> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      const userMetrics = MOCK_METRICS.filter((metric) => metric.userId === userId)
      resolve(userMetrics)
    }, 1000)
  })
}

export const addMetric = (metric: Omit<HealthMetric, "id">): Promise<HealthMetric> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      const newMetric: HealthMetric = {
        ...metric,
        id: Math.random().toString(36).substring(2, 9),
      }

      // In a real app, we would save to a database
      // For now, we'll just return the new metric
      resolve(newMetric)
    }, 1000)
  })
}

export const updateMetric = (metric: HealthMetric): Promise<HealthMetric> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would update the database
      // For now, we'll just return the updated metric
      resolve(metric)
    }, 1000)
  })
}

export const deleteMetric = (id: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would delete from the database
      // For now, we'll just return the id
      resolve(id)
    }, 1000)
  })
}

export const calculateLongevityPrediction = (metrics: HealthMetric[]): number => {
  if (metrics.length === 0) return 0

  const latestMetric = metrics[metrics.length - 1]

  // Base life expectancy (in years)
  let baseLifeExpectancy = 80

  if (latestMetric.heartRate < 60) {
    baseLifeExpectancy += 2
  } else if (latestMetric.heartRate > 80) {
    baseLifeExpectancy -= 1
  }

  if (latestMetric.bodyFatPercentage < 15) {
    baseLifeExpectancy -= 1 // Too low can be unhealthy
  } else if (latestMetric.bodyFatPercentage > 30) {
    baseLifeExpectancy -= 2 // Too high increases health risks
  }

  if (latestMetric.waterPercentage > 65) {
    baseLifeExpectancy += 1
  } else if (latestMetric.waterPercentage < 50) {
    baseLifeExpectancy -= 1
  }

  if (latestMetric.muscleMass > 70) {
    baseLifeExpectancy += 1
  }

  if (latestMetric.caloricIntake < 2000 && latestMetric.caloricIntake > 1500) {
    baseLifeExpectancy += 1
  } else if (latestMetric.caloricIntake > 3000) {
    baseLifeExpectancy -= 1
  }

  // Calculate improvement potential (in years)
  let improvementPotential = 0

  // Heart rate improvement potential
  if (latestMetric.heartRate > 70) {
    improvementPotential += 1
  }

  // Body fat improvement potential
  if (latestMetric.bodyFatPercentage > 25) {
    improvementPotential += 2
  }

  // Water percentage improvement potential
  if (latestMetric.waterPercentage < 60) {
    improvementPotential += 1
  }

  // Muscle mass improvement potential
  if (latestMetric.muscleMass < 65) {
    improvementPotential += 1
  }

  // Caloric intake improvement potential
  if (latestMetric.caloricIntake > 2500 || latestMetric.caloricIntake < 1500) {
    improvementPotential += 1
  }

  // Calculate improvement over time
  let improvementOverTime = 0

  // Only calculate if we have more than one metric
  if (metrics.length > 1) {
    // Get the first metric to compare with the latest
    const firstMetric = metrics[0]

    // Heart rate improvement
    if (latestMetric.heartRate < firstMetric.heartRate && firstMetric.heartRate > 70) {
      improvementOverTime += 0.5
    }

    // Body fat improvement
    if (latestMetric.bodyFatPercentage < firstMetric.bodyFatPercentage && firstMetric.bodyFatPercentage > 25) {
      improvementOverTime += 0.5
    }

    // Water percentage improvement
    if (latestMetric.waterPercentage > firstMetric.waterPercentage && firstMetric.waterPercentage < 60) {
      improvementOverTime += 0.5
    }

    // Muscle mass improvement
    if (latestMetric.muscleMass > firstMetric.muscleMass && firstMetric.muscleMass < 65) {
      improvementOverTime += 0.5
    }

    // Caloric intake improvement
    if (
      (latestMetric.caloricIntake < firstMetric.caloricIntake && firstMetric.caloricIntake > 2500) ||
      (latestMetric.caloricIntake > firstMetric.caloricIntake && firstMetric.caloricIntake < 1500)
    ) {
      improvementOverTime += 0.5
    }
  }

  // Return the sum of improvement potential and improvement over time
  return improvementPotential + improvementOverTime
}
