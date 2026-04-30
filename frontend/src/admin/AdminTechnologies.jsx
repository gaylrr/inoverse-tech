import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../store/slices/toastSlice'
import axiosInstance from '../api/axiosInstance'

const empty = { name: '', category: 'Frontend', description: '', image_url: '', order_index: 0, is_active: true }
const categories = ['Frontend', 'Backend', 'Database', 'Tools']

export default function AdminTechnologies() {
  const dispatch = useDispatch()
  const [techs, setTechs]     = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]     = useState(false)
  const [form, setForm]       = useState(empty)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving]   = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const fetchTechs = async () => {
    try {
      const res = await axiosInstance.get('/technologies/admin')
      setTechs(res.data.data)
    } catch (err) {
      dispatch(showToast({ message: 'Failed to load technologies.', type: 'error' }))
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchTechs() }, [])

  const openAdd  = () => { setForm(empty); setEditing(null); setPreview(null); setModal(true) }
  const openEdit = (t) => { setForm(t); setEditing(t.id); setPreview(t.image_url); setModal(true) }
  const closeModal = () => { setModal(false); setForm(empty); setEditing(null); setPreview(null) }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const data = new FormData()
      data.append('image', file)
      const res = await axiosInstance.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setForm(f => ({ ...f, image_url: res.data.data.url }))
      setPreview(res.data.data.url)
      dispatch(showToast({ message: 'Image uploaded!', type: 'success' }))
    } catch (err) {
      dispatch(showToast({ message: 'Image upload failed.', type: 'error' }))
    } finally { setUploading(false) }
  }

  const handleSave = async () => {
    if (!form.name || !form.category) {
      dispatch(showToast({ message: 'Name and category are required.', type: 'error' }))
      return
    }
    setSaving(true)
    try {
      if (editing) {
        await axiosInstance.put(`/technologies/${editing}`, form)
        dispatch(showToast({ message: 'Technology updated!', type: 'success' }))
      } else {
        await axiosInstance.post('/technologies', form)
        dispatch(showToast({ message: 'Technology created!', type: 'success' }))
      }
      await fetchTechs()
      closeModal()
    } catch (err) {
      dispatch(showToast({ message: 'Something went wrong.', type: 'error' }))
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this technology?')) return
    try {
      await axiosInstance.delete(`/technologies/${id}`)
      dispatch(showToast({ message: 'Technology deleted.', type: 'info' }))
      await fetchTechs()
    } catch (err) {
      dispatch(showToast({ message: 'Failed to delete.', type: 'error' }))
    }
  }

  // Group by category
  const grouped = techs.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = []
    acc[t.category].push(t)
    return acc
  }, {})

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-amalfi border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amalfi">Technologies</h2>
          <p className="text-gray-500 text-sm mt-1">{techs.length} total technologies</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-amalfi text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition"
        >
          + Add Technology
        </button>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">💻</p>
          <p className="text-gray-500">No technologies yet. Add your first one!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-amalfi/5 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-citrus rounded-full" />
                <h3 className="text-sm font-bold text-amalfi">{category}</h3>
                <span className="text-xs text-gray-400 ml-auto">{items.length} items</span>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-gray-500 font-semibold">Technology</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-semibold">Description</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-semibold">Image</th>
                    <th className="text-left px-6 py-3 text-gray-500 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-amalfi">{t.name}</td>
                      <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{t.description}</td>
                      <td className="px-6 py-4">
                        {t.image_url ? (
                          <img src={t.image_url} alt={t.name} className="w-10 h-10 object-contain rounded-lg" />
                        ) : (
                          <span className="text-gray-300 text-xs">No image</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button onClick={() => openEdit(t)} className="text-amalfi hover:text-citrus font-medium transition">Edit</button>
                          <button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-600 font-medium transition">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-amalfi">{editing ? 'Edit Technology' : 'Add Technology'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                  placeholder="e.g. React JS"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi resize-none"
                  placeholder="Brief description of this technology..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">3D Image</label>
                {preview && (
                  <div className="mb-3 flex items-center gap-3">
                    <img src={preview} alt="preview" className="w-16 h-16 object-contain rounded-xl border border-gray-100" />
                    <button
                      onClick={() => { setPreview(null); setForm(f => ({...f, image_url: ''})) }}
                      className="text-red-400 text-xs hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <label className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition ${uploading ? 'border-citrus bg-citrus/5' : 'border-gray-200 hover:border-amalfi'}`}>
                  {uploading ? (
                    <span className="flex items-center gap-2 text-sm text-citrus">
                      <span className="w-4 h-4 border-2 border-citrus border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">📁 Click to upload 3D image (PNG recommended)</span>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-amalfi mb-1">Order</label>
                  <input
                    type="number"
                    value={form.order_index}
                    onChange={e => setForm({...form, order_index: parseInt(e.target.value)})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={form.is_active}
                      onChange={e => setForm({...form, is_active: e.target.checked})}
                      className="rounded"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium text-gray-600">Active</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex-1 bg-amalfi text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-60"
              >
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Technology'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}