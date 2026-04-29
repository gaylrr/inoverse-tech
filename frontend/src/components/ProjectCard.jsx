export default function ProjectCard({ project }) {
  return (
    <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* Image */}
      {project.image_url ? (
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-amalfi/20 flex items-center justify-center text-4xl">
          🖥️
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">

        {/* Title */}
        <h3 className="text-amalfi font-bold text-lg mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.split(',').map((tech, i) => (
              <span
                key={i}
                className="bg-breeze/20 text-amalfi text-xs font-medium px-3 py-1 rounded-full border border-breeze/30"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Outcome */}
        {project.outcome && (
          <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-3 mt-auto">
            {project.outcome}
          </p>
        )}

        {/* Project link or status */}
        <div className="mt-4">
          {project.project_url ? (
            
            <a href={project.project_url}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-citrus text-sm font-semibold hover:underline"
            >
              View Project →
            </a>
          ) : (
            <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
              Internal System
            </span>
          )}
        </div>

      </div>
    </div>
  )
}