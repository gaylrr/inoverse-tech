import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../store/slices/toastSlice'
import axiosInstance from '../api/axiosInstance'

const empty = { title: '', description: '', use_cases: '', icon: '', order_index: 0, is_active: true }

export default function AdminServices() {
  const dispatch = useDispatch()
  const [services, setServices]       = useState([])
  const [loading, setLoading]         = useState(true)
  const [modal, setModal]             = useState(false)
  const [form, setForm]               = useState(empty)
  const [editing, setEditing]         = useState(null)
  const [saving, setSaving]           = useState(false)
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

  const openAdd   = () => { setForm(empty); setEditing(null); setModal(true) }
  const openEdit  = (s) => { setForm(s); setEditing(s.id); setModal(true) }
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
        dispatch(showToast({ message: 'Service updated successfully!', type: 'success' }))
      } else {
        await axiosInstance.post('/services', form)
        dispatch(showToast({ message: 'Service created successfully!', type: 'success' }))
      }
      await fetchServices()
      closeModal()
    } catch (err) {
      dispatch(showToast({ message: 'Something went wrong.', type: 'error' }))
    } finally { setSaving(false) }
  }

  const handleDelete = (id) => {
    setConfirmModal({ show: true, id })
  }

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/services/${confirmModal.id}`)
      dispatch(showToast({ message: 'Service archived.', type: 'info' }))
      setConfirmModal({ show: false, id: null })
      await fetchServices()
    } catch (err) {
      dispatch(showToast({ message: 'Failed to archive service.', type: 'error' }))
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
      <div className="w-8 h-8 border-4 border-amalfi border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amalfi">Services</h2>
          <p className="text-gray-500 text-sm mt-1">{services.length} total services</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-amalfi text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition"
        >
          + Add Service
        </button>
      </div>

      {/* Table */}
      {services.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">⚙️</p>
          <p className="text-gray-500">No services yet. Add your first one!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Service</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Description</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Status</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {s.icon && <span className="text-xl">{s.icon}</span>}
                      <span className="font-semibold text-amalfi">{s.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{s.description}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(s)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition ${
                        s.is_active
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {s.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEdit(s)}
                        className="text-amalfi hover:text-citrus font-medium transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-orange-400 hover:text-orange-600 font-medium transition"
                      >
                        Archive
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-amalfi">
                {editing ? 'Edit Service' : 'Add Service'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                  placeholder="e.g. Custom Systems"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Description *</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi resize-none"
                  placeholder="Describe this service..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Use Cases</label>
                <textarea
                  value={form.use_cases}
                  onChange={e => setForm({ ...form, use_cases: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi resize-none"
                  placeholder="e.g. Inventory systems, HR portals..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-amalfi mb-1">Icon (emoji)</label>
                  <input
                    value={form.icon}
                    onChange={e => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                    placeholder="e.g. ⚙️"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-amalfi mb-1">Order</label>
                  <input
                    type="number"
                    value={form.order_index}
                    onChange={e => setForm({ ...form, order_index: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={form.is_active}
                  onChange={e => setForm({ ...form, is_active: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-600">Active</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-amalfi text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-60"
              >
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Archive Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setConfirmModal({ show: false, id: null })}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center z-10">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              📦
            </div>
            <h3 className="text-xl font-bold text-amalfi mb-2">
              Archive this service?
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              The service will be moved to the archived list. You can restore it anytime.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal({ show: false, id: null })}
                className="flex-1 bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-orange-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
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