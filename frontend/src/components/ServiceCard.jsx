export default function ServiceCard({ service }) {
  return (
    <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-citrus/20 flex items-center justify-center text-2xl mb-4">
        {service.icon || '⚙️'}
      </div>

      {/* Title */}
      <h3 className="text-amalfi font-bold text-lg mb-2">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Use cases */}
      {service.use_cases && (
        <div className="mt-auto">
          <p className="text-xs font-semibold text-citrus uppercase tracking-wider mb-1">
            Use Cases
          </p>
          <p className="text-xs text-gray-500">
            {service.use_cases}
          </p>
        </div>
      )}

    </div>
  )
}