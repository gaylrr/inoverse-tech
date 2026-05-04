import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showToast } from '../store/slices/toastSlice'
import axiosInstance from '../api/axiosInstance'

export default function AdminMessages() {
  const dispatch = useDispatch()
  const [messages, setMessages]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [selected, setSelected]         = useState(null)
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

  const handleDelete = (id) => setConfirmModal({ show: true, id })

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/contact/${confirmModal.id}`)
      setMessages(messages.filter(m => m.id !== confirmModal.id))
      if (selected?.id === confirmModal.id) setSelected(null)
      dispatch(showToast({ message: 'Message deleted.', type: 'info' }))
      setConfirmModal({ show: false, id: null })
    } catch (err) {
      dispatch(showToast({ message: 'Failed to delete.', type: 'error' }))
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
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Inbox</p>
          <h2 className="text-2xl font-black text-amalfi">Messages</h2>
          <p className="text-gray-400 text-sm">
            {unread} unread · {messages.length} total
          </p>
        </div>
        {unread > 0 && (
          <div className="flex items-center gap-2 bg-citrus/10 border-2 border-citrus/20 px-4 py-2 rounded-2xl">
            <span className="w-2 h-2 bg-citrus rounded-full animate-pulse" />
            <p className="text-citrus text-xs font-black uppercase tracking-widest">
              {unread} unread
            </p>
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-amalfi/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">✉️</div>
          <p className="text-amalfi font-bold mb-1">No messages yet</p>
          <p className="text-gray-400 text-sm">Contact form submissions will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Message list */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            {messages.map((m) => (
              <div
                key={m.id}
                onClick={() => { setSelected(m); if (!m.is_read) markRead(m.id) }}
                className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selected?.id === m.id
                    ? 'border-amalfi shadow-md'
                    : !m.is_read
                    ? 'border-citrus/30 bg-citrus/5'
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-xl bg-amalfi flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {m.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className={`text-sm font-bold truncate ${!m.is_read ? 'text-amalfi' : 'text-gray-700'}`}>
                        {!m.is_read && <span className="inline-block w-2 h-2 bg-citrus rounded-full mr-1.5 mb-0.5" />}
                        {m.name}
                      </p>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                        {new Date(m.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate mb-1">{m.email}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{m.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Detail header */}
                <div className="bg-amalfi px-6 py-5 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                      {selected.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-white font-black text-lg leading-none">{selected.name}</h3>
                      
                      <a href={`mailto:${selected.email}`}
                        className="text-citrus text-sm hover:underline"
                      >
                        {selected.email}
                      </a>
                      <p className="text-breeze text-xs mt-0.5">
                        {new Date(selected.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-red-500/80 flex items-center justify-center text-white/60 hover:text-white transition text-sm"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>

                {/* Message body */}
                <div className="p-6">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Message</p>
                  <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-5 mb-6">
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {selected.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    
                    <a href={getGmailLink(selected)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-amalfi text-white text-sm font-black px-6 py-3 rounded-2xl hover:bg-citrus transition-colors duration-300 uppercase tracking-widest"
                    >
                      📧 Reply in Gmail
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selected.email)
                        dispatch(showToast({ message: 'Email copied!', type: 'success' }))
                      }}
                      className="flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-bold px-5 py-3 rounded-2xl hover:bg-gray-200 transition"
                    >
                      📋 Copy Email
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center h-full flex items-center justify-center min-h-[300px]">
                <div>
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">👆</div>
                  <p className="text-amalfi font-bold mb-1">Select a message</p>
                  <p className="text-gray-400 text-sm">Click any message on the left to view it here.</p>
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
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden z-10">
            <div className="bg-red-50 px-6 py-5 text-center border-b border-red-100">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
                🗑️
              </div>
              <h3 className="text-lg font-black text-amalfi">Delete this message?</h3>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                This action cannot be undone. The message will be permanently removed.
              </p>
            </div>
            <div className="p-4 flex gap-3">
              <button
                onClick={() => setConfirmModal({ show: false, id: null })}
                className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white font-black py-3 rounded-xl hover:opacity-90 transition text-sm uppercase tracking-widest"
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