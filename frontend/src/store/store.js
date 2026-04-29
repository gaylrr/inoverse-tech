import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import servicesReducer from './slices/servicesSlice'
import projectsReducer from './slices/projectsSlice'
import messagesReducer from './slices/messagesSlice'
import toastReducer from './slices/toastSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    projects: projectsReducer,
    messages: messagesReducer,
    toast: toastReducer,
  },
})

export default store