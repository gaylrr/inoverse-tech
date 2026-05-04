import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'

export default function Dashboard() {
  const { user }    = useSelector((state) => state.auth)
  const [counts, setCounts]     = useState({ services: 0, projects: 0, messages: 0, unread: 0 })
  const [recent, setRecent]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [time, setTime]         = useState(new Date())

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [services, projects, messages] = await Promise.all([
          axiosInstance.get('/services/admin'),
          axiosInstance.get('/projects/admin'),
          axiosInstance.get('/contact'),
        ])
        const allMessages = messages.data.data || []
        setCounts({
          services: services.data.data?.length || 0,
          projects: projects.data.data?.length || 0,
          messages: allMessages.length,
          unread:   allMessages.filter(m => !m.is_read).length,
        })
        setRecent(allMessages.slice(0, 3))
      } catch (err) {
        console.error(err)
      } finally { setLoading(false) }
    }
    fetchData()
  }, [])

  const stats = [
    { label: 'Total Services',  value: counts.services, icon: '⚙️', path: '/admin/services', bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-100' },
    { label: 'Total Projects',  value: counts.projects, icon: '🖥️', path: '/admin/projects', bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-100' },
    { label: 'Total Messages',  value: counts.messages, icon: '✉️', path: '/admin/messages', bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
    { label: 'Unread Messages', value: counts.unread,   icon: '🔔', path: '/admin/messages', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
  ]

  const actions = [
    {
      label: 'Add Service',
      desc:  'Create a new service offering',
      icon:  '⚙️',
      path:  '/admin/services',
      bg:    'bg-blue-50 hover:bg-blue-100 border-blue-100',
      text:  'text-blue-700',
    },
    {
      label: 'Add Project',
      desc:  'Showcase a new project',
      icon:  '🖥️',
      path:  '/admin/projects',
      bg:    'bg-green-50 hover:bg-green-100 border-green-100',
      text:  'text-green-700',
    },
    {
      label: 'View Messages',
      desc:  `${counts.unread} unread message${counts.unread !== 1 ? 's' : ''}`,
      icon:  '✉️',
      path:  '/admin/messages',
      bg:    'bg-orange-50 hover:bg-orange-100 border-orange-100',
      text:  'text-orange-700',
      badge: counts.unread > 0 ? counts.unread : null,
    },
    {
      label: 'Edit Content',
      desc:  'Update page text and info',
      icon:  '📝',
      path:  '/admin/content',
      bg:    'bg-purple-50 hover:bg-purple-100 border-purple-100',
      text:  'text-purple-700',
    },
    {
      label: 'Manage Archive',
      desc:  'View archived items',
      icon:  '📦',
      path:  '/admin/archive',
      bg:    'bg-gray-50 hover:bg-gray-100 border-gray-100',
      text:  'text-gray-700',
    },
    {
      label: 'View Public Site',
      desc:  'Open website in new tab',
      icon:  '🌐',
      path:  '/',
      bg:    'bg-amalfi/5 hover:bg-amalfi/10 border-amalfi/10',
      text:  'text-amalfi',
      external: true,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">

      {/* ── HEADER CARD ── */}
      
      <div className="bg-amalfi rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋
            </h2>
            <p className="text-breeze text-sm">
              Here's what's happening with Inoverse Technologies.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-white font-bold text-2xl font-mono">
              {time.toLocaleTimeString()}
            </p>
            <p className="text-breeze text-xs">
              {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.path}
            className={`${s.bg} border ${s.border} rounded-2xl p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              {loading ? (
                <div className="w-10 h-8 bg-white/60 rounded-lg animate-pulse" />
              ) : (
                <span className={`text-3xl font-bold ${s.text}`}>{s.value}</span>
              )}
            </div>
            <p className={`text-xs font-semibold ${s.text} opacity-80`}>{s.label}</p>
          </Link>
        ))}
      </div>

      {/* ── UNREAD ALERT ── */}
      {!loading && counts.unread > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
            🔔
          </div>
          <div className="flex-1">
            <p className="text-orange-700 font-semibold text-sm">
              You have {counts.unread} unread {counts.unread === 1 ? 'message' : 'messages'}
            </p>
            <p className="text-orange-500 text-xs">Check your inbox to stay on top of inquiries.</p>
          </div>
          <Link
            to="/admin/messages"
            className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition flex-shrink-0"
          >
            View Now
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── QUICK ACTIONS ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-amalfi font-bold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {actions.map((a) => (
              a.external ? (
                <a
                  key={a.label}
                  href={a.path}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${a.bg}`}
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${a.text}`}>{a.label}</p>
                    <p className="text-xs text-gray-400 truncate">{a.desc}</p>
                  </div>
                </a>
              ) : (
                <Link
                  key={a.label}
                  to={a.path}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${a.bg} relative`}
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${a.text}`}>{a.label}</p>
                    <p className="text-xs text-gray-400 truncate">{a.desc}</p>
                  </div>
                  {a.badge && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {a.badge}
                    </span>
                  )}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* ── RECENT MESSAGES ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-amalfi font-bold text-lg">Recent Messages</h3>
            <Link
              to="/admin/messages"
              className="text-xs text-citrus hover:underline font-medium"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-3xl mb-2">✉️</p>
              <p className="text-gray-400 text-sm">No messages yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recent.map((m) => (
                <Link
                  key={m.id}
                  to="/admin/messages"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-amalfi flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {m.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-amalfi truncate">{m.name}</p>
                      {!m.is_read && (
                        <span className="w-2 h-2 bg-citrus rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{m.message}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  )
}