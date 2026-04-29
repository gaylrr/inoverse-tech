import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

export const fetchServices = createAsyncThunk(
  'services/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/services')
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch services')
    }
  }
)

export const createService = createAsyncThunk(
  'services/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/services', data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create service')
    }
  }
)

export const updateService = createAsyncThunk(
  'services/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/services/${id}`, data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update service')
    }
  }
)

export const deleteService = createAsyncThunk(
  'services/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/services/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete service')
    }
  }
)

const servicesSlice = createSlice({
  name: 'services',
  initialState: { items: [], loading: false, error: null },  
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending,   (state) => { state.loading = true;  state.error = null })
      .addCase(fetchServices.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchServices.rejected,  (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.items = state.items.filter(s => s.id !== action.payload)
      })
  },
})

export default servicesSlice.reducer