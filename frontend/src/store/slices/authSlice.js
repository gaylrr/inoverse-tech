import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

export const loginAdmin = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/auth/login', credentials)
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token:           localStorage.getItem('token') || null,
    user:            JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading:         false,
    error:           null,
  },
  reducers: {
    logout(state) {
      state.token           = null
      state.user            = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true
        state.error   = null
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading         = false
        state.token           = action.payload.token
        state.user            = action.payload.user
        state.isAuthenticated = true
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false
        state.error   = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer