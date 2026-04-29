import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

export const fetchMessages = createAsyncThunk(
  'messages/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/contact')
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch messages')
    }
  }
)

export const markMessageRead = createAsyncThunk(
  'messages/markRead',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/contact/${id}/read`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to mark as read')
    }
  }
)

export const deleteMessage = createAsyncThunk(
  'messages/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/contact/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete message')
    }
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending,   (state) => { state.loading = true;  state.error = null })
      .addCase(fetchMessages.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchMessages.rejected,  (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(markMessageRead.fulfilled, (state, action) => {
        const msg = state.items.find(m => m.id === action.payload)
        if (msg) msg.is_read = true
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.items = state.items.filter(m => m.id !== action.payload)
      })
  },
})

export default messagesSlice.reducer