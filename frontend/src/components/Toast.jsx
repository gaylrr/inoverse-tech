import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [onClose])

  const styles = {
    success: {
      bg:     'bg-green-500',
      icon:   '✅',
      border: 'border-green-400',
    },
    error: {
      bg:     'bg-red-500',
      icon:   '❌',
      border: 'border-red-400',
    },
    info: {
      bg:     'bg-amalfi',
      icon:   'ℹ️',
      border: 'border-blue-400',
    },
  }

  const s = styles[type] || styles.success

  return (
    <div
      className={`
        fixed top-6 right-6 z-[9999]
        flex items-center gap-3
        ${s.bg} border ${s.border}
        text-white text-sm font-medium
        px-5 py-4 rounded-2xl shadow-2xl
        min-w-[260px] max-w-sm
        animate-slide-in
      `}
      style={{
        animation: 'slideInFromRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      {/* Icon */}
      <span className="text-lg flex-shrink-0">{s.icon}</span>

      {/* Message */}
      <span className="flex-1 leading-snug">{message}</span>

      {/* Close button */}
      <button
        onClick={onClose}
        className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition text-xs"
      >
        ✕
      </button>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-1 rounded-b-2xl bg-white/40"
        style={{ animation: 'shrink 3.5s linear forwards' }}
      />
    </div>
  )
}