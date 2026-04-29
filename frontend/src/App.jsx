import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout  from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import AdminArchive from './admin/AdminArchive'


// Public pages
import Home         from './pages/Home'
import About        from './pages/About'
import Services     from './pages/Services'
import Technologies from './pages/Technologies'
import Portfolio    from './pages/Portfolio'
import Contact      from './pages/Contact'
import NotFound     from './pages/NotFound'

// Admin pages
import Login         from './admin/Login'
import Dashboard     from './admin/Dashboard'
import AdminServices from './admin/AdminServices'
import AdminProjects from './admin/AdminProjects'
import AdminMessages from './admin/AdminMessages'
import AdminContent  from './admin/AdminContent'

// Route guard
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public website */}
        <Route element={<MainLayout />}>
          <Route path="/"             element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/services"     element={<Services />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/portfolio"    element={<Portfolio />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="*"             element={<NotFound />} />
        </Route>

        {/* Admin login — no layout */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected admin panel */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services"  element={<AdminServices />} />
          <Route path="projects"  element={<AdminProjects />} />
          <Route path="messages"  element={<AdminMessages />} />
          <Route path="content"   element={<AdminContent />} />
          <Route path="archive" element={<AdminArchive />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}