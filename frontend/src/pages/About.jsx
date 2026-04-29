import useContent from '../hooks/useContent'
import { FadeUp, SlideLeft, SlideRight, ScaleUp } from '../components/Animate'

const values = [
  { icon: '⚙️', title: 'Functionality First', desc: 'Systems must work before anything else.' },
  { icon: '🔍', title: 'Clarity in Design',   desc: 'Clean, understandable structures that anyone can follow.' },
  { icon: '📈', title: 'Scalability',          desc: 'Built to grow with your users and business.' },
  { icon: '🛡️', title: 'Reliability',          desc: 'Stable and dependable solutions you can count on.' },
]

const whyUs = [
  { icon: '🔧', title: 'Practical and Usable',            desc: 'We build systems that are intuitive and easy to use in real operations.' },
  { icon: '🧹', title: 'Easy to Maintain',                desc: 'Clean code and structured architecture make updates straightforward.' },
  { icon: '📐', title: 'Structured for Long-term Growth', desc: 'Every system is designed with future scalability in mind.' },
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-citrus/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-citrus">Inoverse</span>
          </h1>
          <p className="text-breeze text-lg max-w-2xl mx-auto">
            Focused on delivering efficient and reliable software solutions
            centered on real-world problems.
          </p>
        </div>
      </section>

      {/* COMPANY DESCRIPTION */}
      <section className="py-20 bg-white">
        <SlideLeft>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-amalfi mb-6">Who We Are</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                {c('company_description', 'Inoverse Technologies focuses on delivering efficient and reliable software solutions. Our approach is centered on understanding real-world problems and translating them into structured digital systems.')}
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-md border border-amalfi/20 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '10+',  label: 'Projects Completed' },
                  { value: '5+',   label: 'Happy Clients' },
                  { value: '2+',   label: 'Years Experience' },
                  { value: '100%', label: 'Satisfaction Rate' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-cream rounded-xl">
                    <div className="text-3xl font-bold text-citrus mb-1">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </SlideLeft>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-cream">
        <ScaleUp delay={130}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-md">
              <div className="w-12 h-12 bg-citrus rounded-xl flex items-center justify-center text-2xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-amalfi mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                {c('mission', 'To deliver innovative, reliable, and scalable software solutions that solve real business problems.')}
              </p>
            </div> 
            <ScaleUp delay={150}>
              <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-md">
                <div className="w-12 h-12 bg-amalfi rounded-xl flex items-center justify-center text-2xl mb-4">🔭</div>
                <h3 className="text-2xl font-bold text-amalfi mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  {c('vision', 'To be the most trusted technology partner for businesses across the Philippines and beyond.')}
                </p>
              </div>
            </ScaleUp>
          </div>
        </div>
        </ScaleUp>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-white">
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide every system we build.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h4 className="text-amalfi font-bold text-lg mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-amalfi relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-citrus/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
            <p className="text-breeze max-w-2xl mx-auto">We focus on building systems that are:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-breeze text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}