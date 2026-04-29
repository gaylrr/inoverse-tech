import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { hideToast } from '../store/slices/toastSlice'
import Toast from '../components/Toast'

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: '▦' },
  { name: 'Services', path: '/admin/services', icon: '⚙' },
  { name: 'Projects', path: '/admin/projects', icon: '📁' },
  { name: 'Messages', path: '/admin/messages', icon: '✉' },
  { name: 'Content', path: '/admin/content', icon: '📝' },
  { name: 'Archive', path: '/admin/archive', icon: '🗄' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useSelector((state) => state.toast)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-100 shadow-sm flex flex-col transition-all duration-300 sticky top-0 h-screen`}>

        {/* Logo */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amalfi flex items-center justify-center text-white text-xs font-bold">IT</div>
              <span className="text-amalfi font-bold text-sm">Inoverse <span className="text-citrus">CMS</span></span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active
                  ? 'bg-amalfi text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-amalfi'
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
          >
            <span>🚪</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-amalfi font-bold text-lg">
            {navItems.find(n => location.pathname.startsWith(n.path))?.name ?? 'Admin'}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-citrus flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-sm text-gray-600 font-medium">Admin</span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => dispatch(hideToast())}
        />
      )}
    </div>
  )
}