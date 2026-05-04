import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'
import axiosInstance from '../api/axiosInstance'
import useToast from '../hooks/useToast'
import Toast from '../components/Toast'

const initialForm = { name: '', email: '', message: '' }

const contactDetails = [
  {
    label: 'Email us',
    value: 'inovers.dev@gmail.com',
    href: 'mailto:inovers.dev@gmail.com',
    tag: 'FASTEST RESPONSE',
  },
  {
    label: 'Call us',
    value: '0999 570 7957',
    href: 'tel:09995707957',
    tag: 'MON – SAT',
  },
  {
    label: 'Find us',
    value: 'Roxas, Isabela, PH',
    href: null,
    tag: 'HEADQUARTERS',
  },
]

export default function Contact() {
  const [form, setForm]     = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [sent, setSent]     = useState(false)
  const { toast, showToast, hideToast } = useToast()

  const validate = () => {
    const errs = {}
    if (!form.name.trim())    errs.name    = 'Name is required.'
    if (!form.email.trim())   errs.email   = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email.'
    if (!form.message.trim()) errs.message = 'Message is required.'
    else if (form.message.trim().length < 10)  errs.message = 'Min 10 characters.'
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
      setSent(true)
      showToast('Message sent!', 'success')
    } catch (err) {
      if (err.response?.status === 422) {
        const serverErrs = {}
        err.response.data.errors?.forEach(e => { serverErrs[e.path] = e.msg })
        setErrors(serverErrs)
        setStatus('idle')
        showToast('Please fix the errors.', 'error')
      } else {
        setStatus('error')
        showToast('Something went wrong.', 'error')
      }
    }
  }

  return (
    <div>

      {/* HERO — full dark, bold typography */}
      <section className="bg-amalfi min-h-[60vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Big background text */}
        <span className="absolute right-0 bottom-0 text-[12rem] md:text-[18rem] font-black text-white/5 leading-none select-none pointer-events-none">
          LET'S
        </span>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-citrus/20 border border-citrus/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-citrus rounded-full animate-pulse" />
              <span className="text-citrus text-sm font-bold uppercase tracking-widest">Start a Conversation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white leading-none mb-6"
            >
              Got an<br />
              <span className="text-citrus">idea?</span><br />
              <span className="text-3xl md:text-4xl font-bold text-white">Let's build it.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 6, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-breeze text-lg max-w-xl leading-relaxed"
            >
              We don't just take briefs — we partner with you to turn your
              idea into a system that actually works.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS — horizontal strip */}
      <section className="bg-citrus">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {contactDetails.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="px-8 py-8"
              >
                <p className="text-l text-amalfi font-white font-black uppercase tracking-widest mb-1">{item.tag}</p>
                <p className="text-white font-bold text-sm mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-white font-black text-lg hover:opacity-80 transition">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white font-black text-lg">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

            {/* Left — dark panel */}
            <div className="bg-amalfi px-10 py-16 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                }}
              />
              <div className="relative z-10">
                <Player
                  autoplay
                  loop
                  src="https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json"
                  style={{ height: '160px', width: '160px', marginBottom: '32px' }}
                />
                <p className="text-citrus font-black text-xs uppercase tracking-widest mb-3">Why Work With Us</p>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  We respond.<br />We deliver.<br />We care.
                </h2>
                <p className="text-breeze leading-relaxed mb-10">
                  Every project starts with a conversation. Tell us what you need,
                  and we'll tell you exactly how we can make it happen.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    '✦ Response within 24 hours',
                    '✦ Free initial consultation',
                    '✦ Transparent pricing',
                    '✦ Dedicated project support',
                  ].map((item, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="text-breeze text-sm font-semibold"
                    >
                      {item}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="relative z-10 mt-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                  <span className="w-2 h-2 bg-citrus rounded-full animate-pulse" />
                  <span className="text-white text-xs font-bold">Available for new projects</span>
                </div>
              </div>
            </div>

            {/* Right — form panel */}
            <div className="px-10 py-16 bg-cream flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <Player
                      autoplay
                      loop={false}
                      src="https://assets10.lottiefiles.com/packages/lf20_xyadoh9h.json"
                      style={{ height: '160px', width: '160px', margin: '0 auto 24px' }}
                    />
                    <h3 className="text-3xl font-black text-amalfi mb-3">Message Sent!</h3>
                    <p className="text-gray-500 mb-8">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="bg-amalfi text-white font-bold px-8 py-3 rounded-full hover:bg-citrus transition-colors duration-300"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-amalfi font-black text-l uppercase tracking-widest mb-2">Get In Touch</p>
                    <h3 className="text-3xl font-black text-citrus mb-8 leading-tight">
                      Send us a<br />message.
                    </h3>

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                      {/* Name */}
                      <div>
                        <label className="block text-xs font-black text-amalfi uppercase tracking-widest mb-2">
                          Full Name <span className="text-citrus">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Juan dela Cruz"
                          className={`w-full px-5 py-4 bg-white border-2 rounded-2xl text-sm font-medium focus:outline-none focus:border-amalfi transition-colors ${
                            errors.name ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-black text-amalfi uppercase tracking-widest mb-2">
                          Email Address <span className="text-citrus">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="juan@example.com"
                          className={`w-full px-5 py-4 bg-white border-2 rounded-2xl text-sm font-medium focus:outline-none focus:border-amalfi transition-colors ${
                            errors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-black text-amalfi uppercase tracking-widest mb-2">
                          Your Message <span className="text-citrus">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell us about your project or system requirement..."
                          className={`w-full px-5 py-4 bg-white border-2 rounded-2xl text-sm font-medium focus:outline-none focus:border-amalfi transition-colors resize-none ${
                            errors.message ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.message}</p>}
                      </div>

                      {status === 'error' && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                          <p className="text-red-600 text-sm font-semibold">Something went wrong. Please try again.</p>
                        </div>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-amalfi text-white font-black py-4 rounded-2xl hover:bg-citrus transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base uppercase tracking-widest"
                      >
                        {status === 'loading' ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          'Send Message →'
                        )}
                      </motion.button>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  )
}