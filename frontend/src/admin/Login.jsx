import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axiosInstance from '../api/axiosInstance'

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axiosInstance.post('/auth/login', form)
      localStorage.setItem('token', res.data.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* LEFT — dark branding panel */}
      <div className="hidden lg:flex w-1/2 bg-amalfi flex-col justify-between p-12 relative overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Big background text */}
        <span className="absolute -bottom-8 -right-4 text-[10rem] font-black text-white/5 leading-none select-none">
          CMS
        </span>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-citrus flex items-center justify-center font-black text-white text-sm">IT</div>
            <span className="text-white font-bold text-lg">Inoverse <span className="text-citrus">Technologies</span></span>
          </div>
          <p className="text-breeze text-xs uppercase tracking-widest font-bold mt-1">Content Management System</p>
        </motion.div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-black text-white leading-tight mb-6">
            Manage your<br />
            website<br />
            <span className="text-citrus">effortlessly.</span>
          </h2>
          <p className="text-breeze leading-relaxed max-w-sm">
            Full control over your services, projects, messages, and content — all in one place.
          </p>

          <div className="flex flex-col gap-3 mt-8">
            {[
              '✦ Manage services and projects',
              '✦ View and reply to messages',
              '✦ Edit website content live',
              '✦ Upload images and media',
            ].map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="text-breeze text-sm font-semibold"
              >
                {item}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-citrus rounded-full animate-pulse" />
            <span className="text-white text-xs font-bold">Secured with JWT Authentication</span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — form panel */}
      <div className="w-full lg:w-1/2 bg-cream flex items-center justify-center px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-amalfi flex items-center justify-center font-black text-white text-xs">IT</div>
            <span className="text-amalfi font-bold">Inoverse <span className="text-citrus">CMS</span></span>
          </div>

          <p className="text-citrus font-black text-xs uppercase tracking-widest mb-2">Admin Access</p>
          <h1 className="text-3xl font-black text-amalfi mb-2">Welcome back.</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to manage your website.</p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-200 rounded-2xl px-4 py-3 mb-6 flex items-center gap-3"
            >
              <span className="text-red-500 text-lg">⚠️</span>
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-black text-amalfi uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                placeholder="admin@inoverse.com"
                className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-amalfi transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-amalfi uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-amalfi transition-colors pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amalfi transition text-sm"
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-amalfi text-white font-black py-4 rounded-2xl hover:bg-citrus transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-sm uppercase tracking-widest mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In →'}
            </motion.button>

          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            Inoverse Technologies © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </div>
  )
}