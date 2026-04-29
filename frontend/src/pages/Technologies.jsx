const techStack = [
  {
    category: 'Frontend',
    icon: '🖥️',
    color: 'bg-blue-50 border-blue-200',
    titleColor: 'text-blue-700',
    techs: [
      { name: 'React JS',    icon: '⚛️', desc: 'Component-based UI library for building dynamic interfaces.' },
      { name: 'Redux Toolkit', icon: '🔄', desc: 'Predictable state management for complex applications.' },
      { name: 'Tailwind CSS', icon: '🎨', desc: 'Utility-first CSS framework for rapid UI development.' },
      { name: 'React Router', icon: '🧭', desc: 'Client-side routing for single-page applications.' },
    ]
  },
  {
    category: 'Backend',
    icon: '⚙️',
    color: 'bg-green-50 border-green-200',
    titleColor: 'text-green-700',
    techs: [
      { name: 'Node.js',     icon: '🟢', desc: 'JavaScript runtime for building scalable server-side applications.' },
      { name: 'Express.js',  icon: '🚂', desc: 'Fast and minimalist web framework for Node.js.' },
      { name: 'REST API',    icon: '🔌', desc: 'Structured API design for seamless client-server communication.' },
      { name: 'JWT Auth',    icon: '🔐', desc: 'Secure token-based authentication for protected routes.' },
    ]
  },
  {
    category: 'Database',
    icon: '🗄️',
    color: 'bg-orange-50 border-orange-200',
    titleColor: 'text-orange-700',
    techs: [
      { name: 'MySQL',       icon: '🗄️', desc: 'Reliable relational database for structured data storage.' },
      { name: 'mysql2',      icon: '📦', desc: 'Fast MySQL driver for Node.js with promise support.' },
    ]
  },
  {
    category: 'Tools & Others',
    icon: '🛠️',
    color: 'bg-purple-50 border-purple-200',
    titleColor: 'text-purple-700',
    techs: [
      { name: 'Axios',       icon: '📡', desc: 'Promise-based HTTP client for API requests.' },
      { name: 'Multer',      icon: '📁', desc: 'Middleware for handling file uploads.' },
      { name: 'bcryptjs',    icon: '🔒', desc: 'Password hashing for secure credential storage.' },
      { name: 'Nodemailer',  icon: '📧', desc: 'Email sending capability from the Node.js backend.' },
      { name: 'Vite',        icon: '⚡', desc: 'Fast build tool and development server for React.' },
      { name: 'Git',         icon: '🌿', desc: 'Version control for collaborative development.' },
    ]
  },
]

export default function Technologies() {
  return (
    <div>

      {/* ── HERO ── */}
      <section className="bg-amalfi py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-citrus/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-breeze/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-citrus">Tech Stack</span>
          </h1>
          <p className="text-breeze text-lg max-w-2xl mx-auto">
            Built using modern and reliable technologies.
          </p>

          {/* Quick badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['React JS', 'Node.js', 'Express.js', 'MySQL'].map((tech) => (
              <span
                key={tech}
                className="bg-white/10 border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH CATEGORIES ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-4">
              Full Technology Stack
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every tool in our stack is chosen for reliability, performance,
              and long-term maintainability.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {techStack.map((category) => (
              <div key={category.category}>

                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amalfi rounded-xl flex items-center justify-center text-xl">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-amalfi">
                    {category.category}
                  </h3>
                </div>

                {/* Tech cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.techs.map((tech) => (
                    <div
                      key={tech.name}
                      className={`bg-white/40 backdrop-blur-md border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${category.color}`}
                    >
                      <div className="text-3xl mb-3">{tech.icon}</div>
                      <h4 className={`font-bold text-base mb-2 ${category.titleColor}`}>
                        {tech.name}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {tech.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS STACK ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amalfi mb-6">
            Why This Stack?
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            Our technology choices are deliberate. Each tool is selected for
            its proven track record, active community, and ability to scale
            with growing business needs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Performance',    desc: 'Fast load times and efficient server response through optimized architecture.' },
              { icon: '🔒', title: 'Security',       desc: 'JWT authentication, bcrypt hashing, and structured middleware protection.' },
              { icon: '📈', title: 'Scalability',    desc: 'Built to handle growth — from small teams to enterprise-level operations.' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-cream rounded-2xl p-8 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-amalfi font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}