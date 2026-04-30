import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServices } from '../store/slices/servicesSlice'
import { fetchProjects } from '../store/slices/projectsSlice'
import ProjectCard from '../components/ProjectCard'
import Spinner from '../components/Spinner'
import { FadeUp, SlideLeft, SlideRight, ScaleUp } from '../components/Animate'

// ── Count-up hook ──
function useCountUp(target, duration = 2000, isVisible) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, isVisible])
  return count
}

// ── Stat card with count-up ──
function StatCard({ value, label, suffix = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const num = parseInt(value)
  const count = useCountUp(num, 1800, visible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
    >
      <div className="text-4xl font-bold text-citrus mb-1">
        {count}{suffix}
      </div>
      <div className="text-breeze text-sm">{label}</div>
    </div>
  )
}

const technologies = [
  {
    name: 'React JS',
    icon: '⚛️',
    color: 'bg-blue-100 text-blue-700',
    desc: 'Component-based UI library for building fast, dynamic interfaces.'
  },
  {
    name: 'Node.js',
    icon: '🟢',
    color: 'bg-green-100 text-green-700',
    desc: 'JavaScript runtime for scalable, high-performance server-side apps.'
  },
  {
    name: 'Express.js',
    icon: '🚂',
    color: 'bg-gray-100 text-gray-700',
    desc: 'Fast, minimalist web framework powering our REST APIs.'
  },
  {
    name: 'MySQL',
    icon: '🗄️',
    color: 'bg-orange-100 text-orange-700',
    desc: 'Reliable relational database for structured, scalable data storage.'
  },
]

export default function Home() {
  const dispatch = useDispatch()
  const { items: services = [], loading: servicesLoading } = useSelector((state) => state.services)
  const { items: projects = [], loading: projectsLoading } = useSelector((state) => state.projects)

  useEffect(() => {
    dispatch(fetchServices())
    dispatch(fetchProjects())
  }, [dispatch])

  return (
    <div>

      {/* ── HERO ── */}
      <section className="bg-amalfi min-h-screen flex items-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="hero-badge inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-citrus rounded-full animate-pulse" />
                <span className="text-breeze text-sm font-medium">Software Engineering Company</span>
              </div>
              <h1 className="hero-title text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                Engineering Systems{' '}
                <span className="text-citrus">That Work</span>
              </h1>
              <p className="hero-subtitle text-breeze text-lg leading-relaxed mb-10 max-w-xl">
                Inoverse Technologies builds scalable web and software solutions
                designed to streamline operations, improve efficiency, and support
                long-term growth.
              </p>
              <div className="hero-cta flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-citrus text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition text-center text-lg"
                >
                  Start a Project
                </Link>
                <Link
                  to="/portfolio"
                  className="bg-white/10 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition text-center text-lg"
                >
                  View Our Works
                </Link>
              </div>
            </div>

            {/* Right — GIF glassmorphism */}
            <div className="hidden md:flex items-center justify-center">
              <div
                className="relative rounded-2xl overflow-hidden w-full"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  maxWidth: '520px',
                  aspectRatio: '16/10',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <div className="flex-1 mx-4 h-4 bg-white/10 rounded-full" />
                </div>
                <img
                  src="/hero-3d.gif"
                  alt="3D animation"
                  className="w-full h-full object-cover pt-8"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-amalfi border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value={10} suffix="+" label="Projects Completed" />
            <StatCard value={5} suffix="+" label="Happy Clients" />
            <StatCard value={3} suffix="+" label="Years Experience" />
            <StatCard value={100} suffix="%" label="Client Satisfaction" />
          </div>
        </div>
      </section>

      {/* ── COMPANY INTRO ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <SlideLeft>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-6">
                  Who We Are
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Inoverse Technologies is a software engineering company focused on
                  developing custom systems tailored to real business needs. We
                  specialize in building structured, scalable applications that
                  prioritize functionality, usability, and performance.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-amalfi font-semibold hover:text-citrus transition"
                >
                  Learn more about us →
                </Link>
              </div>
            </SlideLeft>

            <SlideRight>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎯', title: 'Functionality First', desc: 'Systems must work before anything else.' },
                  { icon: '🔍', title: 'Clarity in Design', desc: 'Clean, understandable structures.' },
                  { icon: '📈', title: 'Scalability', desc: 'Built to grow with your business.' },
                  { icon: '🛡️', title: 'Reliability', desc: 'Stable and dependable solutions.' },
                ].map((item, i) => (
                  <ScaleUp key={item.title} delay={i * 100}>
                    <div className="bg-cream rounded-2xl p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="text-amalfi font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </ScaleUp>
                ))}
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-4">
                What We Offer
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We design and develop systems that help businesses operate smarter.
              </p>
            </div>
          </FadeUp>

          {servicesLoading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.slice(0, 4).map((service, i) => (
                <ScaleUp key={service.id} delay={i * 120}>
                  <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group text-center h-full flex flex-col">
                    {/* Large animated icon */}
                    <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {service.icon || '⚙️'}
                    </div>
                    <h3 className="text-amalfi font-bold text-lg mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>
                    {service.use_cases && (
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <p className="text-xs font-semibold text-citrus uppercase tracking-wider mb-1">
                          Business Value
                        </p>
                        <p className="text-gray-500 text-xs">{service.use_cases}</p>
                      </div>
                    )}
                  </div>
                </ScaleUp>
              ))}
            </div>
          )}

          <FadeUp delay={300}>
            <div className="text-center mt-10">
              <Link
                to="/services"
                className="bg-amalfi text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition"
              >
                View All Services
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TECHNOLOGIES PREVIEW ── */}
      <section className="py-20 bg-amalfi relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Technologies We Use
              </h2>
              <p className="text-breeze max-w-2xl mx-auto">
                Built using modern and reliable technologies.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {technologies.map((tech, i) => (
              <ScaleUp key={tech.name} delay={i * 100}>
                <div
                  className="group bg-white/10 border border-white/20 rounded-2xl"
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="relative w-full transition-transform duration-700"
                    style={{ transformStyle: 'preserve-3d', aspectRatio: '1/1' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'rotateY(180deg)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'rotateY(0deg)'}
                  >
                    {/* FRONT */}
                    <div
                      className="absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="text-5xl mb-3">{tech.icon}</div>
                      <p className="font-bold text-sm text-white text-center">{tech.name}</p>
                    </div>
                    {/* BACK */}
                    <div
                      className="absolute inset-0 bg-citrus rounded-2xl p-5 flex flex-col items-center justify-center"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="text-3xl mb-2">{tech.icon}</div>
                      <p className="font-bold text-white text-sm text-center mb-2">{tech.name}</p>
                      <p className="text-white/80 text-xs text-center leading-relaxed">{tech.desc}</p>
                    </div>
                  </div>
                </div>
              </ScaleUp>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="text-center">
              <Link
                to="/technologies"
                className="bg-white text-amalfi font-semibold px-8 py-3 rounded-full hover:bg-citrus hover:text-white transition"
              >
                See Full Tech Stack
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section className="py-20 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-4">
                Our Recent Work
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A collection of systems and platforms developed under Inoverse Technologies.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Marquee track — no padding on sides so it bleeds edge to edge */}
        {projectsLoading ? (
          <div className="flex justify-center"><Spinner /></div>
        ) : (
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

            {/* Scrolling track */}
            <div
              className="flex gap-6"
              style={{
                animation: 'marquee 25s linear infinite',
                width: 'max-content',
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...projects, ...projects].map((project, i) => (
                <div
                  key={i}
                  className="w-80 flex-shrink-0 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-44 object-cover"
                    />
                  ) : (
                    <div className="w-full h-44 bg-amalfi/10 flex items-center justify-center text-5xl">
                      🖥️
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-amalfi font-bold text-base mb-2">{project.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {project.technologies.split(',').slice(0, 3).map((tech, j) => (
                          <span
                            key={j}
                            className="bg-amalfi/5 text-amalfi text-xs font-medium px-2 py-0.5 rounded-full border border-amalfi/10"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <FadeUp delay={300}>
          <div className="text-center mt-10">
            <Link
              to="/portfolio"
              className="bg-amalfi text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition"
            >
              View All Projects
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ── CONTACT PROMPT ── */}
      <section className="py-20 bg-amalfi relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have an idea?
            </h2>
            <p className="text-citrus text-xl font-semibold mb-8">
              Let's turn it into a working system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-citrus text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition text-lg"
              >
                Start a Project
              </Link>
              <Link
                to="/about"
                className="bg-white/10 border border-white/30 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/20 transition text-lg"
              >
                Learn About Us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  )
}