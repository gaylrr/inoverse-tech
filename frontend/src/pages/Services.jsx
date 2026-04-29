import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServices } from '../store/slices/servicesSlice'
import ServiceCard from '../components/ServiceCard'
import Spinner from '../components/Spinner'

export default function Services() {
  const dispatch = useDispatch()
  const { items: services = [], loading, error } = useSelector((state) => state.services)

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  return (
    <div>

      {/* ── HERO ── */}
      <section className="bg-amalfi py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-citrus/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-citrus">Services</span>
          </h1>
          <p className="text-breeze text-lg max-w-2xl mx-auto">
            Our services are designed to deliver complete, working solutions —
            not partial implementations.
          </p>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No services available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-amalfi flex items-center justify-center text-2xl flex-shrink-0">
                      {service.icon || '⚙️'}
                    </div>
                    <h3 className="text-amalfi font-bold text-xl">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Use cases / Value */}
                  {service.use_cases && (
                    <div className="bg-cream rounded-xl p-4">
                      <p className="text-xs font-semibold text-citrus uppercase tracking-wider mb-2">
                        Business Value
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.use_cases}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-amalfi relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-citrus/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-breeze text-lg mb-8">
            Let's discuss your project requirements and build something that works.
          </p>
          
            <a href="/contact"
            className="bg-citrus text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition text-lg inline-block">
            Start a Project
          </a>
        </div>
      </section>

    </div>
  )
}