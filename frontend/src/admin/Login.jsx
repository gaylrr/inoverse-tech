import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

export default function Login() {
  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" style={{fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amalfi flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">IT</div>
          <h1 className="text-2xl font-bold text-amalfi">Inoverse <span className="text-citrus">CMS</span></h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to manage your website</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit}>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                {error}
              </div>
            )}

            <div className="mb-5">
              <label className="block text-sm font-semibold text-amalfi mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                placeholder="admin@inoverse.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi transition"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-amalfi mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amalfi text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">Inoverse Technologies © 2025</p>
      </div>
    </div>
  )
}