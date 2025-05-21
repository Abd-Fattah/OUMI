import type { User } from "./redux/slices/userSlice"

// Mock user data for demonstration
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    age: 35,
    gender: "male",
    height: 180,
    weight: 80,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    age: 28,
    gender: "female",
    height: 165,
    weight: 60,
  },
]

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      const user = MOCK_USERS.find((u) => u.email === email)

      if (user && password === "password") {
        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(user))
        resolve(user)
      } else {
        reject(new Error("Invalid email or password"))
      }
    }, 1000)
  })
}

export const register = (userData: Omit<User, "id">): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === userData.email)

      if (existingUser) {
        reject(new Error("User with this email already exists"))
      } else {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substring(2, 9),
        }

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(newUser))
        resolve(newUser)
      }
    }, 1000)
  })
}

export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    // Remove from localStorage
    localStorage.removeItem("user")
    resolve()
  })
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") {
    return null
  }

  const userJson = localStorage.getItem("user")
  if (userJson) {
    return JSON.parse(userJson)
  }

  return null
}

export const updateUser = (userData: Partial<User>): Promise<User> => {
  return new Promise((resolve, reject) => {
    const currentUser = getCurrentUser()

    if (!currentUser) {
      reject(new Error("No user logged in"))
      return
    }

    const updatedUser: User = {
      ...currentUser,
      ...userData,
    }

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser))
    resolve(updatedUser)
  })
}
