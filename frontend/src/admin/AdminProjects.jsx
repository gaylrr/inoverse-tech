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
    setForm(empty); setEditing(null); setImagePreview(null); setModal(true)
  }
  const openEdit = (p) => {
    setForm(p); setEditing(p.id); setImagePreview(p.image_url || null); setModal(true)
  }
  const closeModal = () => {
    setModal(false); setForm(empty); setEditing(null); setImagePreview(null)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
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
        dispatch(showToast({ message: 'Project updated!', type: 'success' }))
      } else {
        await axiosInstance.post('/projects', form)
        dispatch(showToast({ message: 'Project created!', type: 'success' }))
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
      dispatch(showToast({ message: 'Failed to archive.', type: 'error' }))
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
      <div className="w-10 h-10 border-4 border-amalfi border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-amalfi">Projects</h2>
          <p className="text-gray-400 text-sm mt-0.5">
            {projects.filter(p => p.is_active).length} active · {projects.length} total
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-amalfi text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-sm"
        >
          <span className="text-lg">+</span>
          Add Project
        </button>
      </div>

      {/* ── PROJECT CARDS ── */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-amalfi/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🖥️
          </div>
          <p className="text-amalfi font-semibold mb-1">No projects yet</p>
          <p className="text-gray-400 text-sm mb-6">Add your first project to showcase your work.</p>
          <button
            onClick={openAdd}
            className="bg-amalfi text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition"
          >
            + Add Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group ${
                p.is_active ? 'border-gray-100' : 'border-gray-100 opacity-60'
              }`}
            >
              {/* Project image */}
              <div className="relative h-36 overflow-hidden bg-amalfi/5">
                {p.image_url ? (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center blur-lg scale-110 opacity-30"
                      style={{ backgroundImage: `url(${p.image_url})` }}
                    />
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="relative z-10 w-full h-full object-contain"
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl opacity-20">🖥️</span>
                  </div>
                )}
                {/* Status badge */}
                <div className="absolute top-2 right-2 z-20">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    p.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {p.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="text-amalfi font-bold text-base mb-1 leading-tight line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
                  {p.description}
                </p>

                {/* Technologies */}
                {p.technologies && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.technologies.split(',').slice(0, 3).map(t => (
                      <span key={t} className="bg-amalfi/5 text-amalfi text-xs px-2 py-0.5 rounded-full border border-amalfi/10">
                        {t.trim()}
                      </span>
                    ))}
                    {p.technologies.split(',').length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{p.technologies.split(',').length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Outcome */}
                {p.outcome && (
                  <p className="text-citrus text-xs font-semibold line-clamp-1 mb-2">
                    ✦ {p.outcome}
                  </p>
                )}
              </div>

              {/* Card actions */}
              <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-amalfi/5 hover:bg-amalfi text-amalfi hover:text-white text-xs font-semibold py-2 rounded-xl transition-all duration-200"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => toggleActive(p)}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-all duration-200 ${
                    p.is_active
                      ? 'bg-gray-50 hover:bg-gray-100 text-gray-500'
                      : 'bg-green-50 hover:bg-green-100 text-green-600'
                  }`}
                >
                  {p.is_active ? '⏸ Deactivate' : '▶ Activate'}
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">

            {/* Modal header */}
            <div className="bg-amalfi px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-white font-bold text-lg">
                  {editing ? 'Edit Project' : 'Add New Project'}
                </h3>
                <p className="text-breeze text-xs mt-0.5">
                  {editing ? 'Update project details' : 'Fill in the project information'}
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
            <div className="p-6 flex flex-col gap-4 overflow-y-auto">

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors"
                  placeholder="e.g. Inventory Management System"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors resize-none"
                  placeholder="Describe this project..."
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                  Technologies
                </label>
                <input
                  value={form.technologies}
                  onChange={e => setForm({ ...form, technologies: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors"
                  placeholder="e.g. React, Node.js, MySQL"
                />
                <p className="text-xs text-gray-400 mt-1">Separate with commas</p>
              </div>

              {/* Outcome */}
              <div>
                <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                  Outcome / Result
                </label>
                <textarea
                  value={form.outcome}
                  onChange={e => setForm({ ...form, outcome: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors resize-none"
                  placeholder="What was the result or impact?"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                  Project Image
                </label>
                {imagePreview ? (
                  <div className="relative mb-2">
                    <div className="relative h-40 rounded-xl overflow-hidden border-2 border-gray-100">
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-lg scale-110 opacity-30"
                        style={{ backgroundImage: `url(${imagePreview})` }}
                      />
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="relative z-10 w-full h-full object-contain"
                      />
                      {uploading && (
                        <div className="absolute inset-0 bg-white/70 z-20 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-amalfi border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-amalfi hover:underline font-semibold"
                      >
                        Change image
                      </button>
                      <span className="text-gray-300">·</span>
                      <button
                        onClick={removeImage}
                        className="text-xs text-red-400 hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>
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
                        <span className="text-3xl">📸</span>
                        <p className="text-sm text-gray-500 font-medium">Click to upload image</p>
                        <p className="text-xs text-gray-400">JPG, PNG, WEBP — max 5MB</p>
                      </>
                    )}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Project URL */}
              <div>
                <label className="block text-xs font-bold text-amalfi uppercase tracking-wider mb-1.5">
                  Project URL
                </label>
                <input
                  value={form.project_url}
                  onChange={e => setForm({ ...form, project_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm focus:outline-none focus:border-amalfi transition-colors"
                  placeholder="https://... (leave empty if internal)"
                />
              </div>

              {/* Order + Active */}
              <div className="grid grid-cols-2 gap-4">
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
                <div className="flex items-end">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition w-full">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={e => setForm({ ...form, is_active: e.target.checked })}
                      className="w-4 h-4 accent-amalfi"
                    />
                    <div>
                      <p className="text-xs font-semibold text-amalfi">Active</p>
                      <p className="text-xs text-gray-400">Visible on site</p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
              <button
                onClick={closeModal}
                className="flex-1 border-2 border-gray-200 text-gray-600 text-sm font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex-1 bg-amalfi text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : editing ? 'Save Changes' : 'Create Project'}
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
              <h3 className="text-lg font-bold text-amalfi">Archive this project?</h3>
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