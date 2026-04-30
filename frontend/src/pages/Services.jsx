import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'
import { fetchServices } from '../store/slices/servicesSlice'
import ServiceCard from '../components/ServiceCard'
import Spinner from '../components/Spinner'
import { FadeUp, SlideLeft, SlideRight } from '../components/Animate'

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We analyze your business needs and define clear system requirements.',
    lottie: 'https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'We architect the system structure, database schema, and UI flow.',
    lottie: 'https://assets3.lottiefiles.com/packages/lf20_qp1q7mct.json',
  },
  {
    step: '03',
    title: 'Development',
    desc: 'We build the system using clean, scalable, and maintainable code.',
    lottie: 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json',
  },
  {
    step: '04',
    title: 'Delivery',
    desc: 'We deploy, test, and hand over a fully working system.',
    lottie: 'https://assets10.lottiefiles.com/packages/lf20_xyadoh9h.json',
  },
]

export default function Services() {
  const dispatch = useDispatch()
  const { items: services = [], loading, error } = useSelector((state) => state.services)

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch])

  return (
    <div>

      {/* HERO */}
      <section className="bg-amalfi py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-citrus rounded-full animate-pulse" />
              <span className="text-breeze text-sm font-medium">What We Offer</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Services Built for <span className="text-citrus">Real Results</span>
            </h1>
            <p className="text-breeze text-lg max-w-2xl mx-auto">
              Our services are designed to deliver complete, working solutions —
              not partial implementations.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-citrus font-bold text-sm uppercase tracking-widest mb-3">Our Expertise</p>
              <h2 className="text-3xl md:text-4xl font-bold text-amalfi">What We Build</h2>
            </div>
          </FadeUp>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-citrus font-bold text-sm uppercase tracking-widest mb-3">Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-4">How We Work</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A structured process that ensures every project is delivered on time and built to last.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative bg-cream rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amalfi text-citrus text-xs font-black px-3 py-1 rounded-full">
                  {step.step}
                </div>

                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-citrus/40 z-10" />
                )}

                <Player
                  autoplay
                  loop
                  src={step.lottie}
                  style={{ height: '80px', width: '80px', margin: '12px auto' }}
                />
                <h4 className="text-amalfi font-bold text-base mb-2">{step.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amalfi relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <Player
              autoplay
              loop
              src="https://assets9.lottiefiles.com/packages/lf20_0yfsb3a1.json"
              style={{ height: '120px', width: '120px', margin: '0 auto 24px' }}
            />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-breeze text-lg mb-8">
              Let's discuss your project requirements and build something that works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-citrus text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition text-lg"
              >
                Start a Project
              </Link>
              <Link
                to="/portfolio"
                className="bg-white/10 border border-white/30 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/20 transition text-lg"
              >
                See Our Work
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}