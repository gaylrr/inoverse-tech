import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../store/slices/toastSlice'
import axiosInstance from '../api/axiosInstance'

const empty = {
  title: '', description: '', technologies: '',
  outcome: '', image_url: '', project_url: '', order_index: 0, is_active: true
}

export default function AdminProjects() {
  const dispatch = useDispatch()
  const [projects, setProjects]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [modal, setModal]               = useState(false)
  const [form, setForm]                 = useState(empty)
  const [editing, setEditing]           = useState(null)
  const [saving, setSaving]             = useState(false)
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null })
  const [imagePreview, setImagePreview] = useState(null)
  const [uploading, setUploading]       = useState(false)
  const fileInputRef                    = useRef(null)

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get('/projects/admin')
      setProjects(res.data.data)
    } catch (err) {
      dispatch(showToast({ message: 'Failed to load projects.', type: 'error' }))
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchProjects() }, [])

  const openAdd = () => {
    setForm(empty)
    setEditing(null)
    setImagePreview(null)
    setModal(true)
  }

  const openEdit = (p) => {
    setForm(p)
    setEditing(p.id)
    setImagePreview(p.image_url || null)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
    setForm(empty)
    setEditing(null)
    setImagePreview(null)
  }

  // Handle image file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file)
    setImagePreview(localPreview)

    // Upload to backend
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await axiosInstance.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      const uploadedUrl = res.data.data.url
      setForm(prev => ({ ...prev, image_url: uploadedUrl }))
      setImagePreview(uploadedUrl)
      dispatch(showToast({ message: 'Image uploaded!', type: 'success' }))
    } catch (err) {
      dispatch(showToast({ message: 'Image upload failed.', type: 'error' }))
      setImagePreview(null)
    } finally { setUploading(false) }
  }

  const removeImage = () => {
    setImagePreview(null)
    setForm(prev => ({ ...prev, image_url: '' }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSave = async () => {
    if (!form.title || !form.description) {
      dispatch(showToast({ message: 'Title and description are required.', type: 'error' }))
      return
    }
    setSaving(true)
    try {
      if (editing) {
        await axiosInstance.put(`/projects/${editing}`, form)
        dispatch(showToast({ message: 'Project updated successfully!', type: 'success' }))
      } else {
        await axiosInstance.post('/projects', form)
        dispatch(showToast({ message: 'Project created successfully!', type: 'success' }))
      }
      await fetchProjects()
      closeModal()
    } catch (err) {
      dispatch(showToast({ message: 'Something went wrong.', type: 'error' }))
    } finally { setSaving(false) }
  }

  const handleDelete = (id) => setConfirmModal({ show: true, id })

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/projects/${confirmModal.id}`)
      dispatch(showToast({ message: 'Project archived.', type: 'info' }))
      setConfirmModal({ show: false, id: null })
      await fetchProjects()
    } catch (err) {
      dispatch(showToast({ message: 'Failed to archive project.', type: 'error' }))
      setConfirmModal({ show: false, id: null })
    }
  }

  const toggleActive = async (p) => {
    try {
      await axiosInstance.put(`/projects/${p.id}`, { ...p, is_active: !p.is_active })
      dispatch(showToast({
        message: p.is_active ? 'Project deactivated.' : 'Project activated!',
        type: p.is_active ? 'info' : 'success'
      }))
      await fetchProjects()
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
          <h2 className="text-2xl font-bold text-amalfi">Projects</h2>
          <p className="text-gray-500 text-sm mt-1">{projects.length} total projects</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-amalfi text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition"
        >
          + Add Project
        </button>
      </div>

      {/* Table */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">📁</p>
          <p className="text-gray-500">No projects yet. Add your first one!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Project</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold hidden md:table-cell">Technologies</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Status</th>
                <th className="text-left px-6 py-4 text-gray-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-amalfi/10 flex items-center justify-center text-lg flex-shrink-0">
                          🖥️
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-amalfi">{p.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.technologies?.split(',').map(t => (
                        <span key={t} className="bg-amalfi/5 text-amalfi text-xs px-2 py-0.5 rounded-full border border-amalfi/10">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition ${
                        p.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {p.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-amalfi hover:text-citrus font-medium transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-orange-400 hover:text-orange-600 font-medium transition text-sm"
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-amalfi">
                {editing ? 'Edit Project' : 'Add Project'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="flex flex-col gap-4">

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                  placeholder="e.g. Inventory Management System"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Description *</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi resize-none"
                  placeholder="Describe this project..."
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Technologies</label>
                <input
                  value={form.technologies}
                  onChange={e => setForm({ ...form, technologies: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                  placeholder="e.g. React, Node.js, MySQL"
                />
              </div>

              {/* Outcome */}
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Outcome</label>
                <textarea
                  value={form.outcome}
                  onChange={e => setForm({ ...form, outcome: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi resize-none"
                  placeholder="What was the result or impact?"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">
                  Project Image
                </label>

                {/* Preview */}
                {imagePreview ? (
                  <div className="relative mb-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition flex items-center justify-center"
                    >
                      ✕
                    </button>
                    {uploading && (
                      <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center">
                        <div className="w-6 h-6 border-3 border-amalfi border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-amalfi hover:bg-amalfi/5 transition"
                  >
                    {uploading ? (
                      <div className="w-6 h-6 border-2 border-amalfi border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="text-2xl">📸</span>
                        <p className="text-sm text-gray-500 font-medium">Click to upload image</p>
                        <p className="text-xs text-gray-400">JPG, PNG, WEBP — max 5MB</p>
                      </>
                    )}
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Change image button when preview exists */}
                {imagePreview && !uploading && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 text-xs text-amalfi hover:underline font-medium"
                  >
                    Change image
                  </button>
                )}
              </div>

              {/* Project URL */}
              <div>
                <label className="block text-sm font-semibold text-amalfi mb-1">Project URL</label>
                <input
                  value={form.project_url}
                  onChange={e => setForm({ ...form, project_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                  placeholder="https://... (leave empty if internal)"
                />
              </div>

              {/* Order + Active */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-amalfi mb-1">Order</label>
                  <input
                    type="number"
                    value={form.order_index}
                    onChange={e => setForm({ ...form, order_index: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amalfi"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_active_proj"
                      checked={form.is_active}
                      onChange={e => setForm({ ...form, is_active: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="is_active_proj" className="text-sm font-medium text-gray-600">Active</label>
                  </div>
                </div>
              </div>

            </div>

            {/* Form actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex-1 bg-amalfi text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-60"
              >
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Project'}
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
              Archive this project?
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              The project will be moved to the archived list. You can restore it anytime.
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