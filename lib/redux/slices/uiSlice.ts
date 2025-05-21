import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ModalState {
  id: string
  isOpen: boolean
  data?: any
}

interface UiState {
  modals: ModalState[]
  sidebarOpen: boolean
  theme: "light" | "dark"
}

const initialState: UiState = {
  modals: [],
  sidebarOpen: false,
  theme: "light",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ id: string; data?: any }>) => {
      const { id, data } = action.payload
      const existingModalIndex = state.modals.findIndex((modal) => modal.id === id)

      if (existingModalIndex >= 0) {
        state.modals[existingModalIndex].isOpen = true
        if (data) {
          state.modals[existingModalIndex].data = data
        }
      } else {
        state.modals.push({ id, isOpen: true, data })
      }
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const modalIndex = state.modals.findIndex((modal) => modal.id === action.payload)
      if (modalIndex >= 0) {
        state.modals[modalIndex].isOpen = false
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
    },
  },
})

export const { openModal, closeModal, toggleSidebar, setTheme } = uiSlice.actions

export default uiSlice.reducer
