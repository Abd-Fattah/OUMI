import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  name: string
  email: string
  age: number
  gender: string
  height: number
  weight: number
}

interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
      state.loading = false
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    },
    registerStart: (state) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
      state.loading = false
      state.error = null
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions

export default userSlice.reducer
