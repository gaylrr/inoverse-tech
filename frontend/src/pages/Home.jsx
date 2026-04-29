import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServices } from '../store/slices/servicesSlice'
import { fetchProjects } from '../store/slices/projectsSlice'
import ServiceCard from '../components/ServiceCard'
import ProjectCard from '../components/ProjectCard'
import Spinner from '../components/Spinner'
import { FadeUp, FadeIn, SlideLeft, SlideRight, ScaleUp, StaggerContainer } from '../components/Animate'

const technologies = [
  { name: 'React JS',   icon: '⚛️', color: 'bg-blue-100 text-blue-700' },
  { name: 'Node.js',    icon: '🟢', color: 'bg-green-100 text-green-700' },
  { name: 'Express.js', icon: '🚂', color: 'bg-gray-100 text-gray-700' },
  { name: 'MySQL',      icon: '🗄️', color: 'bg-orange-100 text-orange-700' },
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

      {/* ── HERO — entrance animation via CSS classes ── */}
      <section className="bg-amalfi min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-citrus/10 rounded-full blur-3xl float-anim" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl float-anim" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="hero-badge inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-citrus rounded-full animate-pulse" />
              <span className="text-breeze text-sm font-medium">Software Engineering Company</span>
            </div>

            <h1 className="hero-title text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Engineering Systems{' '}
              <span className="text-citrus">That Work</span>
            </h1>

            <p className="hero-subtitle text-breeze text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Inoverse Technologies builds scalable web and software solutions
              designed to streamline operations, improve efficiency, and support
              long-term growth.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-citrus text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition text-center text-lg pulse-glow"
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
        </div>
      </section>

      {/* ── COMPANY INTRO ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
              Inoverse Technologies is a software engineering company focused on
              developing custom systems tailored to real business needs. We
              specialize in building structured, scalable applications that
              prioritize functionality, usability, and performance.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10+',  label: 'Projects Completed' },
              { value: '5+',   label: 'Happy Clients' },
              { value: '3+',   label: 'Years Experience' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <ScaleUp key={stat.label} delay={i * 100}>
                <div className="bg-cream rounded-2xl p-6">
                  <div className="text-3xl font-bold text-citrus mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </ScaleUp>
            ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 3).map((service, i) => (
                <ScaleUp key={service.id} delay={i * 150}>
                  <ServiceCard service={service} />
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-4">
                Technologies We Use
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Built using modern and reliable technologies.
              </p>
            </div>
          </FadeUp>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {technologies.map((tech, i) => (
              <ScaleUp key={tech.name} delay={i * 100}>
                <div className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm ${tech.color} border border-white/50`}>
                  <span>{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              </ScaleUp>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="text-center">
              <Link
                to="/technologies"
                className="bg-amalfi text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition"
              >
                See Full Tech Stack
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section className="py-20 bg-cream">
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

          {projectsLoading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project, i) => (
                <ScaleUp key={project.id} delay={i * 150}>
                  <ProjectCard project={project} />
                </ScaleUp>
              ))}
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
        </div>
      </section>

      {/* ── CONTACT PROMPT ── */}
      <section className="py-20 bg-amalfi relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-citrus/10 rounded-full blur-3xl float-anim" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl float-anim" style={{ animationDelay: '1s' }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have an idea?
            </h2>
            <p className="text-citrus text-xl font-semibold mb-6">
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