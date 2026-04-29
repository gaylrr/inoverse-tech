import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../store/slices/projectsSlice'
import ProjectCard from '../components/ProjectCard'
import Spinner from '../components/Spinner'

export default function Portfolio() {
  const dispatch = useDispatch()
  const { items: projects = [], loading, error } = useSelector((state) => state.projects)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  // Get unique technologies for filter buttons
  const allTechs = ['All', ...new Set(
    projects.flatMap(p =>
      p.technologies ? p.technologies.split(',').map(t => t.trim()) : []
    )
  )]

  // Filter projects based on selected tech
  const filtered = filter === 'All'
    ? projects
    : projects.filter(p =>
        p.technologies?.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>

      {/* ── HERO ── */}
      <section className="bg-amalfi py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-citrus/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-citrus">Portfolio</span>
          </h1>
          <p className="text-breeze text-lg max-w-2xl mx-auto">
            A collection of systems and platforms developed under Inoverse
            Technologies. Each project represents our focus on structured
            architecture, scalable design, and real-world functionality.
          </p>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">

          {/* Filter buttons — bonus search/filter feature */}
          {!loading && projects.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === tech
                      ? 'bg-amalfi text-white shadow-md'
                      : 'bg-white/60 text-amalfi border border-amalfi/20 hover:bg-amalfi/10'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <Spinner />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── PORTFOLIO SUMMARY ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Inoverse Technologies builds interconnected systems designed for
            real-world operations — from logistics and delivery ecosystems to
            booking platforms and communication services.
          </p>
          <p className="text-amalfi font-semibold text-lg">
            Each project reflects our commitment to structure, scalability,
            and functional design.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-amalfi relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-citrus/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have an idea?
          </h2>
          <p className="text-citrus text-xl font-semibold mb-8">
            Let's turn it into a working system.
          </p>
          
            <a href="/contact"
            className="bg-citrus text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition text-lg inline-block"
          >
            Start a Project
          </a>
        </div>
      </section>

    </div>
  )
}