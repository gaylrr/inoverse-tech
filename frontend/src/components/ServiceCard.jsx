import { motion } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'

const getLottieUrl = (title = '') => {
  const t = title.toLowerCase()
  if (t.includes('web'))                      return 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json'
  if (t.includes('api'))                      return 'https://assets9.lottiefiles.com/packages/lf20_0yfsb3a1.json'
  if (t.includes('database'))                 return 'https://assets4.lottiefiles.com/packages/lf20_rkfczodp.json'
  if (t.includes('system') || t.includes('custom')) return 'https://assets3.lottiefiles.com/packages/lf20_qp1q7mct.json'
  return 'https://assets10.lottiefiles.com/packages/lf20_xyadoh9h.json'
}

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl transition-shadow duration-500 overflow-hidden flex flex-col relative"
    >
      {/* Top accent line */}
      <div className="h-1 w-full bg-amalfi group-hover:bg-citrus transition-colors duration-500" />

      {/* Lottie header */}
      <div className="bg-amalfi/5 flex items-center justify-center py-8 px-6 relative overflow-hidden">
        {/* Background number */}
        <span className="absolute right-4 bottom-2 text-8xl font-black text-amalfi/5 select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* <Player
          autoplay
          loop
          src={getLottieUrl(service.title)}
          style={{ height: '130px', width: '130px', position: 'relative', zIndex: 1 }}
        /> */}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-amalfi font-bold text-xl mb-3 leading-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
          {service.description}
        </p>

        {/* Use cases */}
        {service.use_cases && (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <p className="text-xs font-bold text-citrus uppercase tracking-widest mb-2">
              Business Value
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {service.use_cases}
            </p>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="h-1 w-0 group-hover:w-full bg-citrus transition-all duration-700" />
    </motion.div>
  )
}