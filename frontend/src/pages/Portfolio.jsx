import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchProjects } from '../store/slices/projectsSlice'
import Spinner from '../components/Spinner'
import { FadeUp } from '../components/Animate'

export default function Portfolio() {
  const dispatch = useDispatch()
  const { items: projects = [], loading, error } = useSelector((state) => state.projects)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const allTechs = ['All', ...new Set(
    projects.flatMap(p =>
      p.technologies ? p.technologies.split(',').map(t => t.trim()) : []
    )
  )]

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p =>
        p.technologies?.toLowerCase().includes(filter.toLowerCase())
      )

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
              <span className="text-breeze text-sm font-medium">Our Work</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Systems We've <span className="text-citrus">Built</span>
            </h1>
            <p className="text-breeze text-lg max-w-2xl mx-auto">
              A collection of systems and platforms developed under Inoverse
              Technologies. Each project represents our focus on structured
              architecture, scalable design, and real-world functionality.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FILTER */}
      {!loading && projects.length > 0 && (
        <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-3 justify-center">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filter === tech
                    ? 'bg-amalfi text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-amalfi/10 hover:text-amalfi'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS — alternating layout */}
      <section className="bg-white">
        {loading ? (
          <div className="py-20"><Spinner /></div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects found.</p>
            <button
              onClick={() => setFilter('All')}
              className="mt-4 text-amalfi font-semibold hover:underline"
            >
              Clear filter
            </button>
          </div>
        ) : (
          <div>
            {filtered.map((project, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} min-h-[480px] border-b border-gray-100`}
                >
                  {/* Image side */}
                  <div className="w-full md:w-1/2 relative overflow-hidden bg-amalfi/5 group">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-72 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-72 md:h-full bg-amalfi/10 flex flex-col items-center justify-center gap-4">
                        <span className="text-8xl opacity-20">🖥️</span>
                        <span className="text-amalfi/30 font-bold text-sm uppercase tracking-widest">No Preview</span>
                      </div>
                    )}

                    {/* Project number overlay */}
                    <div className="absolute bottom-4 left-4 bg-amalfi/80 backdrop-blur-sm text-white text-xs font-black px-3 py-1 rounded-full">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={`w-full md:w-1/2 flex flex-col justify-center px-10 py-12 ${isEven ? 'bg-white' : 'bg-cream'}`}>

                    {/* Category tag */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-px bg-citrus" />
                      <span className="text-citrus text-xs font-bold uppercase tracking-widest">
                        Project {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-amalfi mb-4 leading-tight">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Outcome */}
                    {project.outcome && (
                      <div className="flex items-start gap-3 mb-6 bg-amalfi/5 rounded-2xl p-4">
                        <span className="text-citrus font-black text-lg mt-0.5">→</span>
                        <p className="text-amalfi text-sm font-semibold leading-relaxed">
                          {project.outcome}
                        </p>
                      </div>
                    )}

                    {/* Technologies */}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.split(',').map((tech, j) => (
                          <span
                            key={j}
                            className="bg-white border border-amalfi/20 text-amalfi text-xs font-semibold px-3 py-1.5 rounded-full"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    {project.project_url ? (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-amalfi text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-citrus transition-colors duration-300 w-fit"
                      >
                        View Project
                        <span>→</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 text-xs font-semibold px-4 py-2 rounded-full w-fit">
                        🔒 Internal System
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </section>

      {/* SUMMARY */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="text-citrus font-bold text-sm uppercase tracking-widest mb-4">Our Commitment</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Inoverse Technologies builds interconnected systems designed for
              real-world operations — from logistics and delivery ecosystems to
              booking platforms and communication services.
            </p>
            <p className="text-amalfi font-bold text-xl">
              Each project reflects our commitment to structure, scalability,
              and functional design.
            </p>
          </FadeUp>
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