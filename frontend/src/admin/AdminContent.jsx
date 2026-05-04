import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../store/slices/toastSlice'
import axiosInstance from '../api/axiosInstance'

const pageIcons = {
  home:    '🏠',
  about:   '👥',
  contact: '✉️',
}

export default function AdminContent() {
  const dispatch = useDispatch()
  const [contents, setContents] = useState([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(null)
  const [edited, setEdited]     = useState({})
  const [success, setSuccess]   = useState(null)
  const [activeTab, setActiveTab] = useState(null)

  const fetchContent = async () => {
    try {
      const res = await axiosInstance.get('/content')
      setContents(res.data.data)
      if (res.data.data.length > 0 && !activeTab) {
        const firstPage = res.data.data[0].page
        setActiveTab(firstPage)
      }
    } catch (err) {
      dispatch(showToast({ message: 'Failed to load content.', type: 'error' }))
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchContent() }, [])

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
      dispatch(showToast({ message: 'Content saved!', type: 'success' }))
      setTimeout(() => setSuccess(null), 2000)
      await fetchContent()
    } catch (err) {
      dispatch(showToast({ message: 'Failed to save.', type: 'error' }))
    } finally { setSaving(null) }
  }

  const grouped = contents.reduce((acc, item) => {
    if (!acc[item.page]) acc[item.page] = []
    acc[item.page].push(item)
    return acc
  }, {})

  const pages = Object.keys(grouped)
  const activeItems = grouped[activeTab] || []

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-amalfi border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">CMS</p>
        <h2 className="text-2xl font-black text-amalfi">Content Editor</h2>
        <p className="text-gray-400 text-sm">Edit website text content by page and section.</p>
      </div>

      {pages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-amalfi/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">📝</div>
          <p className="text-amalfi font-bold mb-1">No content entries yet</p>
          <p className="text-gray-400 text-sm">Add content rows to your database to manage them here.</p>
        </div>
      ) : (
        <div className="flex gap-6">

          {/* Page tabs — left sidebar */}
          <div className="w-48 flex-shrink-0 flex flex-col gap-2">
            {pages.map(page => (
              <button
                key={page}
                onClick={() => setActiveTab(page)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${
                  activeTab === page
                    ? 'bg-amalfi text-white shadow-lg'
                    : 'bg-white border-2 border-gray-100 text-gray-600 hover:border-amalfi/30 hover:text-amalfi'
                }`}
              >
                <span className="text-xl">{pageIcons[page] || '📄'}</span>
                <div>
                  <p className={`text-sm font-black capitalize leading-none ${activeTab === page ? 'text-white' : 'text-amalfi'}`}>
                    {page}
                  </p>
                  <p className={`text-xs mt-0.5 ${activeTab === page ? 'text-white/60' : 'text-gray-400'}`}>
                    {grouped[page].length} sections
                  </p>
                </div>
              </button>
            ))}

            {/* Info card */}
            <div className="bg-citrus/10 border-2 border-citrus/20 rounded-2xl p-4 mt-2">
              <p className="text-citrus font-black text-xs uppercase tracking-widest mb-1">💡 Tip</p>
              <p className="text-amalfi text-xs leading-relaxed">
                Changes are saved individually per section.
              </p>
            </div>
          </div>

          {/* Content sections */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Active page header */}
            <div className="bg-amalfi rounded-2xl px-6 py-4 flex items-center gap-4">
              <span className="text-3xl">{pageIcons[activeTab] || '📄'}</span>
              <div>
                <p className="text-citrus font-black text-xs uppercase tracking-widest">Editing</p>
                <h3 className="text-white font-black text-lg capitalize leading-none">{activeTab} Page</h3>
              </div>
              <div className="ml-auto bg-white/10 border border-white/20 rounded-full px-3 py-1">
                <p className="text-white text-xs font-bold">{activeItems.length} sections</p>
              </div>
            </div>

            {/* Section items */}
            {activeItems.map((item, i) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-amalfi/20 transition-colors duration-200"
              >
                {/* Section header */}
                <div className="bg-gray-50 border-b-2 border-gray-100 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-amalfi rounded-lg flex items-center justify-center text-white text-xs font-black">
                      {i + 1}
                    </div>
                    <p className="text-xs font-black text-amalfi uppercase tracking-widest">
                      {item.section.replace(/_/g, ' ')}
                    </p>
                  </div>
                  {success === item.id && (
                    <span className="text-xs font-black text-green-500 uppercase tracking-widest">✓ Saved!</span>
                  )}
                </div>

                {/* Section content */}
                <div className="p-5 flex items-start gap-4">
                  <textarea
                    defaultValue={item.value}
                    onChange={e => handleChange(item.id, e.target.value)}
                    rows={item.value?.length > 100 ? 4 : 2}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-100 text-sm text-gray-700 focus:outline-none focus:border-amalfi transition-colors resize-none"
                  />
                  <button
                    onClick={() => handleSave(item)}
                    disabled={saving === item.id}
                    className={`flex-shrink-0 text-sm font-black px-5 py-3 rounded-2xl transition-all duration-300 uppercase tracking-widest disabled:opacity-60 ${
                      success === item.id
                        ? 'bg-green-500 text-white'
                        : 'bg-amalfi text-white hover:bg-citrus'
                    }`}
                  >
                    {saving === item.id
                      ? <span className="flex items-center gap-2">
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving
                        </span>
                      : success === item.id
                      ? '✓ Saved'
                      : 'Save →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}