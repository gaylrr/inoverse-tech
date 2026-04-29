import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

export default function AdminArchive() {
  const [tab, setTab]           = useState('services')
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [sRes, pRes] = await Promise.all([
        axiosInstance.get('/services/archived'),
        axiosInstance.get('/projects/archived'),
      ])
      setServices(sRes.data.data)
      setProjects(pRes.data.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchAll() }, [])

  const restore = async (type, id) => {
    try {
      await axiosInstance.patch(`/${type}/${id}/restore`)
      fetchAll()
    } catch (err) { console.error(err) }
  }

  const permanentDelete = async (type, id) => {
    if (!confirm('Permanently delete? This cannot be undone.')) return
    try {
      await axiosInstance.delete(`/${type}/${id}/permanent`)
      fetchAll()
    } catch (err) { console.error(err) }
  }

  const items = tab === 'services' ? services : projects
  const type  = tab === 'services' ? 'services' : 'projects'

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-amalfi border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amalfi">Archive</h2>
        <p className="text-gray-500 text-sm mt-1">Restore or permanently delete archived items.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['services', 'projects'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
              tab === t
                ? 'bg-amalfi text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)} ({(t === 'services' ? services : projects).length})
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">🗄️</p>
          <p className="text-gray-500">No archived {tab} yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Title</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Archived On</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-amalfi">{item.title}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(item.deleted_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => restore(type, item.id)}
                        className="text-green-500 hover:text-green-700 font-medium transition"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => permanentDelete(type, item.id)}
                        className="text-red-400 hover:text-red-600 font-medium transition"
                      >
                        Delete Forever
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}