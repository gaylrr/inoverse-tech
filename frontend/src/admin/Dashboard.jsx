import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth)
  const [counts, setCounts]   = useState({ services: 0, projects: 0, messages: 0, unread: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [services, projects, messages] = await Promise.all([
          axiosInstance.get('/services/admin'),
          axiosInstance.get('/projects/admin'),
          axiosInstance.get('/contact'),
        ])

        const allMessages  = messages.data.data  || []
        const unread       = allMessages.filter(m => !m.is_read).length

        setCounts({
          services: services.data.data?.length || 0,
          projects: projects.data.data?.length || 0,
          messages: allMessages.length,
          unread,
        })
      } catch (err) {
        console.error('Failed to fetch dashboard counts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  const stats = [
    {
      label: 'Total Services',
      value:  counts.services,
      icon:  '⚙️',
      color: 'bg-orange-50 text-orange-600 border-orange-100',
      path:  '/admin/services',
    },
    {
      label: 'Total Projects',
      value:  counts.projects,
      icon:  '📁',
      color: 'bg-green-50 text-green-600 border-green-100',
      path:  '/admin/projects',
    },
    {
      label: 'Total Messages',
      value:  counts.messages,
      icon:  '✉️',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      path:  '/admin/messages',
    },
    {
      label: 'Unread Messages',
      value:  counts.unread,
      icon:  '🔔',
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      path:  '/admin/messages',
    },
  ]

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-amalfi">
          Welcome back, {user?.name || 'Admin'} 👋
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening with Inoverse Technologies.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.path}
            className={`bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all duration-200 flex items-center gap-4 ${s.color}`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${s.color}`}>
              {s.icon}
            </div>
            <div>
              {loading ? (
                <div className="w-10 h-7 bg-gray-100 rounded animate-pulse mb-1" />
              ) : (
                <p className="text-3xl font-bold text-amalfi">{s.value}</p>
              )}
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Unread alert */}
      {!loading && counts.unread > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">🔔</span>
          <div className="flex-1">
            <p className="text-purple-700 font-semibold text-sm">
              You have {counts.unread} unread {counts.unread === 1 ? 'message' : 'messages'}
            </p>
            <p className="text-purple-500 text-xs">Check your messages to stay on top of inquiries.</p>
          </div>
          <Link
            to="/admin/messages"
            className="bg-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition"
          >
            View Now
          </Link>
        </div>
      )}

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-amalfi font-bold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ Add Service',   path: '/admin/services' },
            { label: '+ Add Project',   path: '/admin/projects' },
            { label: '📬 View Messages', path: '/admin/messages' },
            { label: '✏️ Edit Content',  path: '/admin/content'  },
          ].map((a) => (
            <Link
              key={a.label}
              to={a.path}
              className="bg-amalfi/5 hover:bg-amalfi text-amalfi hover:text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all border border-amalfi/20"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}