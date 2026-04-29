import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/projects')
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch projects')
    }
  }
)

export const createProject = createAsyncThunk(
  'projects/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/projects', data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create project')
    }
  }
)

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/projects/${id}`, data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update project')
    }
  }
)

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/projects/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete project')
    }
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending,   (state) => { state.loading = true;  state.error = null })
      .addCase(fetchProjects.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchProjects.rejected,  (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload)
      })
  },
})

export default projectsSlice.reducer