import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: localStorage.getItem('theme') === 'dark',
  },
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer