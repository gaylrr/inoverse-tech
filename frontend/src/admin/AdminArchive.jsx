import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../store/slices/toastSlice'
import axiosInstance from '../api/axiosInstance'

export default function AdminArchive() {
  const dispatch = useDispatch()
  const [tab, setTab]                   = useState('services')
  const [services, setServices]         = useState([])
  const [projects, setProjects]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null, type: null })
  const [restoreModal, setRestoreModal] = useState({ show: false, id: null, type: null, title: '' })

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [sRes, pRes] = await Promise.all([
        axiosInstance.get('/services/archived'),
        axiosInstance.get('/projects/archived'),
      ])
      setServices(sRes.data.data)
      setProjects(pRes.data.data)
    } catch (err) {
      dispatch(showToast({ message: 'Failed to load archive.', type: 'error' }))
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchAll() }, [])

  const confirmRestore = (type, id, title) => {
    setRestoreModal({ show: true, id, type, title })
  }

  const handleRestore = async () => {
    try {
      await axiosInstance.patch(`/${restoreModal.type}/${restoreModal.id}/restore`)
      dispatch(showToast({ message: 'Item restored successfully!', type: 'success' }))
      setRestoreModal({ show: false, id: null, type: null, title: '' })
      fetchAll()
    } catch (err) {
      dispatch(showToast({ message: 'Failed to restore.', type: 'error' }))
    }
  }

  const confirmPermanentDelete = (type, id) => {
    setConfirmModal({ show: true, id, type })
  }

  const handlePermanentDelete = async () => {
    try {
      await axiosInstance.delete(`/${confirmModal.type}/${confirmModal.id}/permanent`)
      dispatch(showToast({ message: 'Permanently deleted.', type: 'info' }))
      setConfirmModal({ show: false, id: null, type: null })
      fetchAll()
    } catch (err) {
      dispatch(showToast({ message: 'Failed to delete.', type: 'error' }))
    }
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

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Storage</p>
        <h2 className="text-2xl font-black text-amalfi">Archive</h2>
        <p className="text-gray-400 text-sm">Restore or permanently delete archived items.</p>
      </div>

      {/* Warning banner */}
      <div className="bg-orange-50 border-2 border-orange-100 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <span className="text-2xl">⚠️</span>
        <p className="text-orange-700 text-sm font-semibold">
          Permanently deleted items <span className="font-black">cannot be recovered</span>. Restore items first if you need them back.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {[
          { key: 'services', label: 'Services', icon: '⚙️', count: services.length },
          { key: 'projects', label: 'Projects', icon: '🖥️', count: projects.length },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-black text-sm transition-all duration-200 ${
              tab === t.key
                ? 'bg-amalfi text-white shadow-lg'
                : 'bg-white border-2 border-gray-100 text-gray-500 hover:border-amalfi/30 hover:text-amalfi'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-black ${
              tab === t.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🗄️</div>
          <p className="text-amalfi font-black mb-1">Archive is empty</p>
          <p className="text-gray-400 text-sm">No archived {tab} yet. Items you archive will appear here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border-2 border-gray-100 p-5 flex items-center gap-4 hover:border-amalfi/20 transition-colors duration-200"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                {tab === 'services' ? '⚙️' : '🖥️'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-amalfi font-black text-base leading-none mb-1 truncate">{item.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-1">{item.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-orange-50 text-orange-500 font-bold px-2 py-0.5 rounded-full border border-orange-100">
                    📦 Archived
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.deleted_at).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => confirmRestore(type, item.id, item.title)}
                  className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 font-black text-xs px-4 py-2.5 rounded-xl transition uppercase tracking-widest"
                >
                  ♻️ Restore
                </button>
                <button
                  onClick={() => confirmPermanentDelete(type, item.id)}
                  className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 font-black text-xs px-4 py-2.5 rounded-xl transition uppercase tracking-widest"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Restore Confirm Modal */}
      {restoreModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setRestoreModal({ show: false, id: null, type: null, title: '' })}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden z-10">
            <div className="bg-green-50 px-6 py-5 text-center border-b border-green-100">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
                ♻️
              </div>
              <h3 className="text-lg font-black text-amalfi">Restore this item?</h3>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                <span className="font-bold text-amalfi">"{restoreModal.title}"</span> will be restored and visible again.
              </p>
            </div>
            <div className="p-4 flex gap-3">
              <button
                onClick={() => setRestoreModal({ show: false, id: null, type: null, title: '' })}
                className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleRestore}
                className="flex-1 bg-green-500 text-white font-black py-3 rounded-xl hover:opacity-90 transition text-sm uppercase tracking-widest"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Delete Confirm Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setConfirmModal({ show: false, id: null, type: null })}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden z-10">
            <div className="bg-red-50 px-6 py-5 text-center border-b border-red-100">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
                💀
              </div>
              <h3 className="text-lg font-black text-amalfi">Delete Forever?</h3>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                This action <span className="font-black text-red-500">cannot be undone</span>. This item will be permanently removed from the database.
              </p>
            </div>
            <div className="p-4 flex gap-3">
              <button
                onClick={() => setConfirmModal({ show: false, id: null, type: null })}
                className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handlePermanentDelete}
                className="flex-1 bg-red-500 text-white font-black py-3 rounded-xl hover:opacity-90 transition text-sm uppercase tracking-widest"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}