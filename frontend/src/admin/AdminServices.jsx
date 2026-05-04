import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../store/slices/toastSlice'
import axiosInstance from '../api/axiosInstance'

const empty = { title: '', description: '', use_cases: '', icon: '', order_index: 0, is_active: true }

export default function AdminServices() {
  const dispatch = useDispatch()
  const [services, setServices]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [modal, setModal]               = useState(false)
  const [form, setForm]                 = useState(empty)
  const [editing, setEditing]           = useState(null)
  const [saving, setSaving]             = useState(false)
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null })

  const fetchServices = async () => {
    try {
      const res = await axiosInstance.get('/services/admin')
      setServices(res.data.data)
    } catch (err) {
      dispatch(showToast({ message: 'Failed to load services.', type: 'error' }))
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchServices() }, [])

  const openAdd    = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit   = (s) => { setForm(s); setEditing(s.id); setModal(true) }
  const closeModal = () => { setModal(false); setForm(empty); setEditing(null) }

  const handleSave = async () => {
    if (!form.title || !form.description) {
      dispatch(showToast({ message: 'Title and description are required.', type: 'error' }))
      return
    }
    setSaving(true)
    try {
      if (editing) {
        await axiosInstance.put(`/services/${editing}`, form)
        dispatch(showToast({ message: 'Service updated!', type: 'success' }))
      } else {
        await axiosInstance.post('/services', form)
        dispatch(showToast({ message: 'Service created!', type: 'success' }))
      }
      await fetchServices()
      closeModal()
    } catch (err) {
      dispatch(showToast({ message: 'Something went wrong.', type: 'error' }))
    } finally { setSaving(false) }
  }

  const handleDelete = (id) => setConfirmModal({ show: true, id })

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/services/${confirmModal.id}`)
      dispatch(showToast({ message: 'Service archived.', type: 'info' }))
      setConfirmModal({ show: false, id: null })
      await fetchServices()
    } catch (err) {
      dispatch(showToast({ message: 'Failed to archive.', type: 'error' }))
      setConfirmModal({ show: false, id: null })
    }
  }

  const toggleActive = async (s) => {
    try {
      await axiosInstance.put(`/services/${s.id}`, { ...s, is_active: !s.is_active })
      dispatch(showToast({
        message: s.is_active ? 'Service deactivated.' : 'Service activated!',
        type: s.is_active ? 'info' : 'success'
      }))
      await fetchServices()
    } catch (err) {
      dispatch(showToast({ message: 'Failed to update status.', type: 'error' }))
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-amalfi border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-amalfi">Services</h2>
          <p className="text-gray-400 text-sm mt-0.5">
            {services.filter(s => s.is_active).length} active · {services.length} total
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-amalfi text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-sm"
        >
          <span className="text-lg">+</span>
          Add Service
        </button>
      </div>

      {/* ── CARDS GRID ── */}
      {services.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-amalfi/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            ⚙️
          </div>
          <p className="text-amalfi font-semibold mb-1">No services yet</p>
          <p className="text-gray-400 text-sm mb-6">Add your first service to get started.</p>
          <button
            onClick={openAdd}
            className="bg-amalfi text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition"
          >
            + Add Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group ${
                s.is_active ? 'border-gray-100' : 'border-gray-100 opacity-60'
              }`}
            >
              {/* Card top bar */}
              <div className="bg-amalfi/5 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amalfi/10 flex items-center justify-center text-lg">
                    {s.icon || '⚙️'}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    s.is_active
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {s.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <span className="text-xs text-gray-300 font-mono">#{s.id}</span>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="text-amalfi font-bold text-base mb-2 leading-tight">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                  {s.description}
                </p>
                {s.use_cases && (
                  <div className="bg-cream rounded-xl px-3 py-2 mb-3">
                    <p className="text-citrus text-xs font-semibold uppercase tracking-wider mb-1">
                      Business Value
                    </p>
                    <p className="text-gray-500 text-xs line-clamp-1">{s.use_cases}</p>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Order: {s.order_index}</span>
                </div>
              </div>

              {/* Card actions */}
              <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-2">
                <button
                  onClick={() => openEdit(s)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-amalfi/5 hover:bg-amalfi text-amalfi hover:text-white text-xs font-semibold py-2 rounded-xl transition-all duration-200"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => toggleActive(s)}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-all duration-200 ${
                    s.is_active
                      ? 'bg-gray-50 hover:bg-gray-100 text-gray-500'
                      : 'bg-green-50 hover:bg-green-100 text-green-600'
                  }`}
                >
                  {s.is_active ? '⏸ Deactivate' : '▶ Activate'}
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="flex items-center justify-center w-9 h-9 bg-orange-50 hover:bg-orange-100 text-orange-500 rounded-xl transition-all duration-200 flex-shrink-0"
                  title="Archive"
                >
                  📦
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ADD/EDIT MODAL ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

            {/* Modal header */}
            <div className="bg-amalfi px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">
                  {editing ? 'Edit Service' : 'Add New Service'}
                </h3>
                <p className="text-breeze text-xs mt-0.5">
                  {editing ? 'Update service details' : 'Fill in the service information'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors"
                  placeholder="e.g. Custom Web Development"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors resize-none"
                  placeholder="Describe what this service offers..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                  Business Value / Use Cases
                </label>
                <textarea
                  value={form.use_cases}
                  onChange={e => setForm({ ...form, use_cases: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors resize-none"
                  placeholder="e.g. Improves accessibility and operational efficiency"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                    Icon (emoji)
                  </label>
                  <input
                    value={form.icon}
                    onChange={e => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors"
                    placeholder="⚙️"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.order_index}
                    onChange={e => setForm({ ...form, order_index: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={e => setForm({ ...form, is_active: e.target.checked })}
                  className="w-4 h-4 accent-amalfi"
                />
                <div>
                  <p className="text-sm font-semibold text-amalfi">Set as Active</p>
                  <p className="text-xs text-gray-400">Active services are visible on the public site</p>
                </div>
              </label>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 border-2 border-gray-200 text-gray-600 text-sm font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-amalfi text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : editing ? 'Save Changes' : 'Create Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRM ARCHIVE MODAL ── */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setConfirmModal({ show: false, id: null })}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden z-10">
            <div className="bg-orange-50 px-6 py-5 text-center border-b border-orange-100">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
                📦
              </div>
              <h3 className="text-lg font-bold text-amalfi">Archive this service?</h3>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                It will be moved to the archive. You can restore it anytime.
              </p>
            </div>
            <div className="p-4 flex gap-3">
              <button
                onClick={() => setConfirmModal({ show: false, id: null })}
                className="flex-1 bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-200 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-orange-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition text-sm"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}