import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'
import { FadeUp, ScaleUp } from '../components/Animate'
import axiosInstance from '../api/axiosInstance'

const categoryConfig = {
  Frontend: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'text-blue-700',
    dot: 'bg-blue-400',
    lottie: 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json',
  },
  Backend: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    title: 'text-green-700',
    dot: 'bg-green-400',
    lottie: 'https://assets3.lottiefiles.com/packages/lf20_qp1q7mct.json',
  },
  Database: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    title: 'text-orange-700',
    dot: 'bg-orange-400',
    lottie: 'https://assets4.lottiefiles.com/packages/lf20_rkfczodp.json',
  },
  Tools: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    title: 'text-purple-700',
    dot: 'bg-purple-400',
    lottie: 'https://assets9.lottiefiles.com/packages/lf20_0yfsb3a1.json',
  },
}

const whyStack = [
  {
    title: 'Performance',
    desc: 'Fast load times and efficient server response through optimized architecture.',
    lottie: 'https://assets10.lottiefiles.com/packages/lf20_xyadoh9h.json',
  },
  {
    title: 'Security',
    desc: 'JWT authentication, bcrypt hashing, and structured middleware protection.',
    lottie: 'https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json',
  },
  {
    title: 'Scalability',
    desc: 'Built to handle growth — from small teams to enterprise-level operations.',
    lottie: 'https://assets3.lottiefiles.com/packages/lf20_qp1q7mct.json',
  },
]

export default function Technologies() {
  const [techs, setTechs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const res = await axiosInstance.get('/technologies')
        setTechs(res.data.data)
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    fetchTechs()
  }, [])

  const grouped = techs.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = []
    acc[t.category].push(t)
    return acc
  }, {})

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
              <span className="text-breeze text-sm font-medium">Our Tech Stack</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technologies We <span className="text-citrus">Master</span>
            </h1>
            <p className="text-breeze text-lg max-w-2xl mx-auto mb-8">
              Every tool in our stack is chosen for reliability, performance,
              and long-term maintainability.
            </p>
            {/* Quick badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {['React JS', 'Node.js', 'Express.js', 'MySQL', 'Sequelize'].map((tech) => (
                <span key={tech} className="bg-white/10 border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TECH CATEGORIES */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-citrus font-bold text-sm uppercase tracking-widest mb-3">Full Stack</p>
              <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-4">
                Complete Technology Stack
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hover over any card to learn more about how we use each technology.
              </p>
            </div>
          </FadeUp>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-amalfi border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              {Object.entries(grouped).map(([category, items], catIndex) => {
                const config = categoryConfig[category] || categoryConfig.Tools
                return (
                  <div key={category}>
                    <FadeUp delay={catIndex * 100}>
                      {/* Category header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`w-3 h-3 rounded-full ${config.dot}`} />
                        <h3 className={`text-2xl font-bold ${config.title}`}>{category}</h3>
                        <div className="flex-1 h-px bg-gray-200 ml-2" />
                        {/* Category lottie */}
                        {/* <Player
                          autoplay
                          loop
                          src={config.lottie}
                          style={{ height: '48px', width: '48px' }}
                        /> */}
                      </div>
                    </FadeUp>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                      {items.map((tech, i) => (
                        <motion.div
                          key={tech.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08, duration: 0.5 }}
                          className="group"
                          style={{ perspective: '1200px' }}
                        >
                          <motion.div
                            className="relative w-full cursor-pointer"
                            style={{
                              transformStyle: 'preserve-3d',
                              aspectRatio: '1/1',
                            }}
                            whileHover={{ rotateY: 180 }}
                            transition={{
                              duration: 0.7,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                          >
                            {/* FRONT */}
                            <div
                              className={`absolute inset-0 ${config.bg} border-2 ${config.border} rounded-3xl flex flex-col items-center justify-center shadow-sm group-hover:shadow-lg transition-shadow duration-300`}
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              {tech.image_url ? (
                                <motion.img
                                  src={tech.image_url}
                                  alt={tech.name}
                                  className="w-20 h-20 object-contain mb-4 drop-shadow-lg"
                                  onError={e => { e.target.style.display = 'none' }}
                                />
                              ) : (
                                <div className="w-20 h-20 bg-amalfi/10 rounded-2xl flex items-center justify-center text-4xl mb-4">💻</div>
                              )}
                              <p className={`font-bold text-sm text-center px-2 ${config.title}`}>{tech.name}</p>
                              <div className="flex items-center gap-1 mt-2">
                                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                <p className="text-xs text-gray-400">hover to flip</p>
                                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                              </div>
                            </div>

                            {/* BACK */}
                            <div
                              className="absolute inset-0 bg-amalfi rounded-3xl flex flex-col items-center justify-center shadow-xl px-4"
                              style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                              }}
                            >
                              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-citrus/10 rounded-full blur-2xl" />
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-breeze/10 rounded-full blur-2xl" />
                              </div>
                              {tech.image_url && (
                                <img
                                  src={tech.image_url}
                                  alt={tech.name}
                                  className="w-12 h-12 object-contain mb-3 opacity-60 relative z-10"
                                  onError={e => { e.target.style.display = 'none' }}
                                />
                              )}
                              <p className="font-bold text-citrus text-sm text-center mb-2 relative z-10">{tech.name}</p>
                              <p className="text-breeze text-xs text-center leading-relaxed relative z-10">{tech.description}</p>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* WHY THIS STACK */}
      <section className="py-20 bg-amalfi relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%2386C5FF'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-citrus font-bold text-sm uppercase tracking-widest mb-3">Our Reasoning</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why This Stack?</h2>
              <p className="text-breeze max-w-2xl mx-auto">
                Our technology choices are deliberate — each tool selected for proven
                track record, active community, and ability to scale.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whyStack.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 flex flex-col items-center"
              >
                <Player
                  autoplay
                  loop
                  src={item.lottie}
                  style={{ height: '90px', width: '90px' }}
                />
                <h4 className="text-white font-bold text-lg mb-2 mt-2">{item.title}</h4>
                <p className="text-breeze text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}