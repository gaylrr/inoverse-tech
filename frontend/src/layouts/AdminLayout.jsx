import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { hideToast } from '../store/slices/toastSlice'
import Toast from '../components/Toast'
import axiosInstance from '../api/axiosInstance'

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: '▦', sub: 'Overview' },
  { name: 'Services', path: '/admin/services', icon: '⚙', sub: 'Manage services' },
  { name: 'Projects', path: '/admin/projects', icon: '🖥️', sub: 'Manage portfolio' },
  { name: 'Technologies', path: '/admin/technologies', icon: '💻', sub: 'Tech stack' },
  { name: 'Messages', path: '/admin/messages', icon: '✉', sub: 'Contact inbox' },
  { name: 'Content', path: '/admin/content', icon: '📝', sub: 'Edit page text' },
  { name: 'Archive', path: '/admin/archive', icon: '🗄', sub: 'Archived items' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [passModal, setPassModal] = useState(false)
  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' })
  const [passError, setPassError] = useState('')
  const [passLoading, setPassLoading] = useState(false)
  const [passSuccess, setPassSuccess] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useSelector((state) => state.toast)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  const handleChangePassword = async () => {
    setPassError('')
    if (!passForm.current || !passForm.newPass || !passForm.confirm) {
      setPassError('All fields are required.'); return
    }
    if (passForm.newPass.length < 8) {
      setPassError('New password must be at least 8 characters.'); return
    }
    if (passForm.newPass !== passForm.confirm) {
      setPassError('Passwords do not match.'); return
    }
    setPassLoading(true)
    try {
      await axiosInstance.put('/auth/change-password', {
        currentPassword: passForm.current,
        newPassword: passForm.newPass,
      })
      setPassSuccess(true)
      setTimeout(() => {
        setPassModal(false)
        setPassSuccess(false)
        setPassForm({ current: '', newPass: '', confirm: '' })
        dispatch({ type: 'toast/showToast', payload: { message: 'Password changed!', type: 'success' } })
      }, 1500)
    } catch (err) {
      setPassError(err.response?.data?.message || 'Failed to change password.')
    } finally { setPassLoading(false) }
  }

  const currentPage = navItems.find(n => location.pathname.startsWith(n.path))

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* SIDEBAR */}
      <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-amalfi flex flex-col transition-all duration-300 fixed top-0 left-0 h-screen z-40`}>

        {/* Logo */}
        <div className="p-5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-citrus flex items-center justify-center font-black text-white text-xs flex-shrink-0">IT</div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-white font-bold text-sm leading-none">Inoverse</p>
                <p className="text-citrus text-xs font-bold">CMS</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white/40 hover:text-white transition p-1 flex-shrink-0 ml-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              {collapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M6 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav label */}
        {!collapsed && (
          <p className="text-white/30 text-xs font-black uppercase tracking-widest px-5 pt-5 pb-2 flex-shrink-0">
            Navigation
          </p>
        )}

        {/* Nav items */}
        <nav className="flex-1 px-3 flex flex-col gap-1 py-2">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${active ? 'bg-citrus text-white shadow-lg' : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold leading-none ${active ? 'text-white' : ''}`}>{item.name}</p>
                    <p className={`text-xs mt-0.5 ${active ? 'text-white/70' : 'text-white/40'}`}>{item.sub}</p>
                  </div>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 bg-amalfi text-white text-xs font-bold px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* MAIN */}
      <main className={`${collapsed ? 'ml-20' : 'ml-64'} flex-1 overflow-auto transition-all duration-300`}>

        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-amalfi font-black text-lg leading-none">{currentPage?.name ?? 'Admin'}</h1>
            <p className="text-gray-400 text-xs mt-0.5">{currentPage?.sub ?? ''}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* View site */}
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-amalfi transition bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full"
            >
              🌐 View Site
            </Link>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition"
              >
                <div className="w-6 h-6 rounded-full bg-amalfi flex items-center justify-center text-white text-xs font-black">A</div>
                <span className="text-xs font-bold text-amalfi hidden sm:block">Inoverse Admin</span>
                <span className="text-gray-400 text-xs">{userMenu ? '▲' : '▼'}</span>
              </button>

              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-xs font-black text-amalfi">Inoverse Admin</p>
                      <p className="text-xs text-gray-400">admin@inoverse.com</p>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                      <button
                        onClick={() => { setUserMenu(false); setPassModal(true) }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-amalfi transition text-left"
                      >
                        🔑 Change Password
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition text-left"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>

      {/* CHANGE PASSWORD MODAL */}
      <AnimatePresence>
        {passModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setPassModal(false) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
            >
              {passSuccess ? (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-black text-amalfi">Password Changed!</h3>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-citrus font-black text-xs uppercase tracking-widest mb-1">Security</p>
                      <h3 className="text-xl font-black text-amalfi">Change Password</h3>
                    </div>
                    <button onClick={() => setPassModal(false)} className="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">✕</button>
                  </div>

                  {passError && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3 mb-4">
                      <p className="text-red-600 text-sm font-semibold">{passError}</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-black text-amalfi uppercase tracking-widest mb-2">Current Password</label>
                      <input
                        type="password"
                        value={passForm.current}
                        onChange={e => setPassForm({ ...passForm, current: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-amalfi transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-amalfi uppercase tracking-widest mb-2">New Password</label>
                      <input
                        type="password"
                        value={passForm.newPass}
                        onChange={e => setPassForm({ ...passForm, newPass: e.target.value })}
                        placeholder="Min 8 characters"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-amalfi transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-amalfi uppercase tracking-widest mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passForm.confirm}
                        onChange={e => setPassForm({ ...passForm, confirm: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-amalfi transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setPassModal(false)}
                      className="flex-1 border-2 border-gray-200 text-gray-600 text-sm font-bold py-3 rounded-2xl hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleChangePassword}
                      disabled={passLoading}
                      className="flex-1 bg-amalfi text-white text-sm font-black py-3 rounded-2xl hover:bg-citrus transition-colors duration-300 disabled:opacity-60 uppercase tracking-widest"
                    >
                      {passLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </span>
                      ) : 'Update →'}
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={() => dispatch(hideToast())} />
      )}
    </div>
  )
}