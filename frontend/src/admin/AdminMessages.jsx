import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../store/slices/toastSlice'
import axiosInstance from '../api/axiosInstance'

export default function AdminMessages() {
  const dispatch = useDispatch()
  const [messages, setMessages]       = useState([])
  const [loading, setLoading]         = useState(true)
  const [selected, setSelected]       = useState(null)
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null })

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get('/contact')
      setMessages(res.data.data)
    } catch (err) {
      dispatch(showToast({ message: 'Failed to load messages.', type: 'error' }))
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchMessages() }, [])

  const markRead = async (id) => {
    try {
      await axiosInstance.patch(`/contact/${id}/read`)
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m))
    } catch (err) {
      dispatch(showToast({ message: 'Failed to mark as read.', type: 'error' }))
    }
  }

  const handleDelete = (id) => {
    setConfirmModal({ show: true, id })
  }

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/contact/${confirmModal.id}`)
      setMessages(messages.filter(m => m.id !== confirmModal.id))
      if (selected?.id === confirmModal.id) setSelected(null)
      dispatch(showToast({ message: 'Message deleted.', type: 'info' }))
      setConfirmModal({ show: false, id: null })
    } catch (err) {
      dispatch(showToast({ message: 'Failed to delete message.', type: 'error' }))
      setConfirmModal({ show: false, id: null })
    }
  }

  const getGmailLink = (msg) => {
    const to      = encodeURIComponent(msg.email)
    const subject = encodeURIComponent(`Re: Your inquiry — Inoverse Technologies`)
    const body    = encodeURIComponent(
      `Hi ${msg.name},\n\nThank you for reaching out to Inoverse Technologies.\n\n` +
      `Regarding your message:\n"${msg.message}"\n\n` +
      `We'd like to follow up with you.\n\nBest regards,\nInoverse Technologies Team`
    )
    return `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`
  }

  const unread = messages.filter(m => !m.is_read).length

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
          <h2 className="text-2xl font-bold text-amalfi">Messages</h2>
          <p className="text-gray-500 text-sm mt-1">
            {unread} unread · {messages.length} total
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-4xl mb-3">✉️</p>
          <p className="text-gray-500">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Message list */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            {messages.map((m) => (
              <div
                key={m.id}
                onClick={() => { setSelected(m); if (!m.is_read) markRead(m.id) }}
                className={`bg-white rounded-2xl border shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                  selected?.id === m.id ? 'border-amalfi' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-sm font-semibold ${!m.is_read ? 'text-amalfi' : 'text-gray-600'}`}>
                    {!m.is_read && (
                      <span className="inline-block w-2 h-2 bg-citrus rounded-full mr-2" />
                    )}
                    {m.name}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{m.email}</p>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{m.message}</p>
              </div>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-amalfi">{selected.name}</h3>
                    <p className="text-sm text-gray-500">{selected.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(selected.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="text-sm text-red-400 hover:text-red-600 font-medium transition"
                  >
                    Delete
                  </button>
                </div>

                {/* Message body */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">

                  {/* Reply in Gmail button */}
                  
                  <a href={getGmailLink(selected)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-amalfi text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition"
                  >
                    <span>📧</span>
                    Reply in Gmail
                  </a>

                  {/* Copy email button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selected.email)
                      dispatch(showToast({ message: 'Email copied!', type: 'success' }))
                    }}
                    className="flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition"
                  >
                    <span>📋</span>
                    Copy Email
                  </button>

                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center h-full flex items-center justify-center">
                <div>
                  <p className="text-4xl mb-3">👆</p>
                  <p className="text-gray-400 text-sm">Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setConfirmModal({ show: false, id: null })}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center z-10">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🗑️
            </div>
            <h3 className="text-xl font-bold text-amalfi mb-2">
              Delete this message?
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              This action cannot be undone. The message will be permanently removed.
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
                className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}