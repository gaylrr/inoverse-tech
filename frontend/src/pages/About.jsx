import { motion } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'
import useContent from '../hooks/useContent'
import { FadeUp, SlideLeft, SlideRight, ScaleUp } from '../components/Animate'

const values = [
  {
    lottie: 'https://assets2.lottiefiles.com/packages/lf20_touohxv0.json',
    title: 'Functionality First',
    desc: 'Systems must work before anything else.',
  },
  {
    lottie: 'https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json',
    title: 'Clarity in Design',
    desc: 'Clean, understandable structures that anyone can follow.',
  },
  {
    lottie: 'https://assets3.lottiefiles.com/packages/lf20_qp1q7mct.json',
    title: 'Scalability',
    desc: 'Built to grow with your users and business.',
  },
  {
    lottie: 'https://assets4.lottiefiles.com/packages/lf20_rkfczodp.json',
    title: 'Reliability',
    desc: 'Stable and dependable solutions you can count on.',
  },
]

const whyUs = [
  {
    lottie: 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json',
    title: 'Practical and Usable',
    desc: 'We build systems that are intuitive and easy to use in real operations.',
  },
  {
    lottie: 'https://assets10.lottiefiles.com/packages/lf20_xyadoh9h.json',
    title: 'Easy to Maintain',
    desc: 'Clean code and structured architecture make updates straightforward.',
  },
  {
    lottie: 'https://assets9.lottiefiles.com/packages/lf20_0yfsb3a1.json',
    title: 'Structured for Long-term Growth',
    desc: 'Every system is designed with future scalability in mind.',
  },
]

const stats = [
  { value: '10+',  label: 'Projects Completed' },
  { value: '5+',   label: 'Happy Clients' },
  { value: '2+',   label: 'Years Experience' },
  { value: '100%', label: 'Satisfaction Rate' },
]

export default function About() {
  const { content, loading } = useContent('about')
  const c = (key, fallback = '') => content[key] || fallback

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-amalfi border-t-transparent rounded-full animate-spin" />
    </div>
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
              <span className="text-breeze text-sm font-medium">About Inoverse</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built on <span className="text-citrus">Structure.</span> Driven by <span className="text-citrus">Purpose.</span>
            </h1>
            <p className="text-breeze text-lg max-w-2xl mx-auto">
              Focused on delivering efficient and reliable software solutions
              centered on real-world problems.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <SlideLeft>
              <div>
                <p className="text-citrus font-bold text-sm uppercase tracking-widest mb-3">Who We Are</p>
                <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-6">
                  Engineering Solutions That Actually Work
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {c('company_description', 'Inoverse Technologies focuses on delivering efficient and reliable software solutions. Our approach is centered on understanding real-world problems and translating them into structured digital systems.')}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-1 bg-citrus rounded-full" />
                  <p className="text-amalfi font-semibold text-sm">Software that works the way your business actually works.</p>
                </div>
              </div>
            </SlideLeft>

            <SlideRight>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-citrus mb-1">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-citrus font-bold text-sm uppercase tracking-widest mb-3">Our Direction</p>
              <h2 className="text-3xl md:text-4xl font-bold text-amalfi">Mission & Vision</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-amalfi rounded-3xl p-8 flex flex-col items-start gap-6 shadow-lg"
            >
              <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json"
                style={{ height: '120px', width: '120px' }}
              />
              <div>
                <div className="inline-block bg-citrus text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                  Mission
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-breeze leading-relaxed">
                  {c('mission', 'To develop scalable and functional software solutions that help organizations adapt to evolving technologies and improve workflows in a rapidly changing digital landscape.')}
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-cream border-2 border-amalfi/10 rounded-3xl p-8 flex flex-col items-start gap-6 shadow-sm"
            >
              <Player
                autoplay
                loop
                src="https://assets9.lottiefiles.com/packages/lf20_touohxv0.json"
                style={{ height: '120px', width: '120px' }}
              />
              <div>
                <div className="inline-block bg-amalfi text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                  Vision
                </div>
                <h3 className="text-2xl font-bold text-amalfi mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  {c('vision', 'To power organizations with solutions that drive growth, innovation, and long-term relevance in an ever-evolving digital world.')}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-citrus font-bold text-sm uppercase tracking-widest mb-3">What Drives Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide every system we build.</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center"
              >
                <Player
                  autoplay
                  loop
                  src={value.lottie}
                  style={{ height: '90px', width: '90px' }}
                />
                <h4 className="text-amalfi font-bold text-base mb-2">{value.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
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
              <p className="text-citrus font-bold text-sm uppercase tracking-widest mb-3">Our Edge</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
              <p className="text-breeze max-w-2xl mx-auto">We focus on building systems that are:</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
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
                  style={{ height: '100px', width: '100px' }}
                />
                <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-breeze text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}