import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

export default function AdminContent() {
  const [contents, setContents] = useState([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(null)
  const [edited, setEdited]     = useState({})
  const [success, setSuccess]   = useState(null)

  const fetch = async () => {
    try {
      const res = await axiosInstance.get('/content')
      setContents(res.data.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const handleChange = (id, value) => {
    setEdited(prev => ({ ...prev, [id]: value }))
  }

  const handleSave = async (item) => {
    setSaving(item.id)
    try {
      await axiosInstance.put('/content', {
        page:    item.page,
        section: item.section,
        value:   edited[item.id] ?? item.value,
      })
      setSuccess(item.id)
      setTimeout(() => setSuccess(null), 2000)
      await fetch()
    } catch (err) { console.error(err) }
    finally { setSaving(null) }
  }

  // Group content by page
  const grouped = contents.reduce((acc, item) => {
    if (!acc[item.page]) acc[item.page] = []
    acc[item.page].push(item)
    return acc
  }, {})

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-amalfi border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amalfi">Content</h2>
        <p className="text-gray-500 text-sm mt-1">Edit website content by page and section.</p>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-gray-500">No content entries yet.</p>
          <p className="text-gray-400 text-sm mt-1">Add content rows to your database to manage them here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {Object.entries(grouped).map(([page, items]) => (
            <div key={page} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              {/* Page header */}
              <div className="bg-amalfi/5 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-citrus rounded-full" />
                <h3 className="text-sm font-bold text-amalfi capitalize">{page} Page</h3>
                <span className="text-xs text-gray-400 ml-auto">{items.length} sections</span>
              </div>

              {/* Sections */}
              <div className="divide-y divide-gray-50">
                {items.map((item) => (
                  <div key={item.id} className="px-6 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          {item.section}
                        </p>
                        <textarea
                          defaultValue={item.value}
                          onChange={e => handleChange(item.id, e.target.value)}
                          rows={2}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amalfi resize-none transition"
                        />
                      </div>
                      <div className="pt-6">
                        <button
                          onClick={() => handleSave(item)}
                          disabled={saving === item.id}
                          className={`text-sm font-semibold px-4 py-2 rounded-xl transition ${
                            success === item.id
                              ? 'bg-green-100 text-green-600'
                              : 'bg-amalfi text-white hover:opacity-90'
                          } disabled:opacity-60`}
                        >
                          {saving === item.id
                            ? 'Saving...'
                            : success === item.id
                            ? '✓ Saved'
                            : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}