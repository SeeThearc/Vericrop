import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id?: string
  email?: string
  name?: string
  picture?: string
  role?: string
  [key: string]: unknown
}

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  status: string | null
  wsConnected: boolean
  messages: string[]
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  status: null,
  wsConnected: false,
  messages: []
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.isLoggedIn = action.payload !== null
    },
    setStatus: (state, action: PayloadAction<string | null>) => {
      state.status = action.payload
    },
    setWebSocket: (state, action: PayloadAction<boolean>) => {
      state.wsConnected = action.payload
    },
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    },
    logout: (state) => {
      state.user = null
      state.isLoggedIn = false
      state.status = null
      state.wsConnected = false
      state.messages = []
    }
  }
})

export const { setUser, setStatus, setWebSocket, addMessage, clearMessages, logout } = authSlice.actions
export default authSlice.reducer
