import { useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import Toast from '../components/Toast'
import useToast from '../hooks/useToast'

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm]           = useState(initialForm)
  const [errors, setErrors]       = useState({})
  const [status, setStatus]       = useState('idle')
  const [showModal, setShowModal] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  const validate = () => {
    const errs = {}
    if (!form.name.trim())    errs.name    = 'Name is required.'
    if (!form.email.trim())   errs.email   = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address.'
    if (!form.message.trim()) errs.message = 'Message is required.'
    else if (form.message.trim().length < 10)  errs.message = 'Message must be at least 10 characters.'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) return setErrors(errs)

    setStatus('loading')
    try {
      await axiosInstance.post('/contact', form)
      setStatus('idle')
      setForm(initialForm)
      setShowModal(true)
      showToast('Message sent successfully!', 'success')
    } catch (err) {
      if (err.response?.status === 422) {
        const serverErrs = {}
        err.response.data.errors?.forEach(e => {
          serverErrs[e.path] = e.msg
        })
        setErrors(serverErrs)
        setStatus('idle')
        showToast('Please fix the errors above.', 'error')
      } else {
        setStatus('error')
        showToast('Something went wrong. Please try again.', 'error')
      }
    }
  }

  return (
    <div>

      {/* ── HERO ── */}
      <section className="bg-amalfi py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-citrus/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in <span className="text-citrus">Touch</span>
          </h1>
          <p className="text-breeze text-lg max-w-2xl mx-auto">
            Have a project idea or system requirement? We're ready to help
            you turn it into a working solution.
          </p>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact info */}
            <div>
              <h2 className="text-3xl font-bold text-amalfi mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Reach out to us directly or fill out the form and we'll
                get back to you as soon as possible.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amalfi rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    📧
                  </div>
                  <div>
                    <p className="text-amalfi font-semibold mb-1">Email</p>
                    
                    <a href="mailto:inovers.dev@gmail.com"
                      className="text-gray-600 hover:text-citrus transition-colors"
                    >
                      inovers.dev@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amalfi rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <p className="text-amalfi font-semibold mb-1">Contact Number</p>
                    
                    <a href="tel:09995707957"
                      className="text-gray-600 hover:text-citrus transition-colors"
                    >
                      0999 570 7957
                    </a>
                  </div>
                </div>
              </div>

              {/* Response time */}
              <div className="mt-10 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-6">
                <p className="text-amalfi font-semibold mb-1">⏱ Response Time</p>
                <p className="text-gray-600 text-sm">
                  We typically respond within 24 hours on business days.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-md">
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="text-2xl font-bold text-amalfi mb-6">
                  Send a Message
                </h3>

                {/* Name */}
                <div className="mb-5">
                  <label className="block text-amalfi font-medium text-sm mb-2">
                    Full Name <span className="text-citrus">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Juan dela Cruz"
                    className={`w-full px-4 py-3 rounded-xl border bg-white/60 focus:outline-none focus:ring-2 focus:ring-amalfi transition ${
                      errors.name ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label className="block text-amalfi font-medium text-sm mb-2">
                    Email Address <span className="text-citrus">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="juan@example.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-white/60 focus:outline-none focus:ring-2 focus:ring-amalfi transition ${
                      errors.email ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-amalfi font-medium text-sm mb-2">
                    Message <span className="text-citrus">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project or system requirement..."
                    className={`w-full px-4 py-3 rounded-xl border bg-white/60 focus:outline-none focus:ring-2 focus:ring-amalfi transition resize-none ${
                      errors.message ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Server error */}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
                    <p className="text-red-600 text-sm">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-amalfi text-white font-semibold py-4 rounded-xl hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
      {/* ── TOAST ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

    </div>
  )
}