import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-amalfi text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
              <Link to="/" className="flex items-center gap-2">
          
            <div
              className="px-4 py-2 rounded-2xl bg-white"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3), 0 8px 24px rgba(255,166,43,0.25), 0 -1px 0 rgba(255,255,255,0.8) inset',
                border: '1px solid rgba(255,255,255,0.9)',
              }}
            >
              <img
                src="/logo.png"
                alt="Inoverse Technologies"
                className="h-9 w-auto object-contain drop-shadow-sm"
              />
            </div>
            <span className="text-white font-bold text-lg">
            Inoverse <span className="text-citrus">Technologies</span>
          </span>
          </Link>
          </div>
            {/* <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Inoverse Technologies"
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold text-lg">
                Inoverse <span className="text-citrus">Technologies</span>
              </span>
            </div>
            <p className="text-breeze text-sm leading-relaxed">
              Building smart software for modern businesses. We specialize in custom systems development and scalable web applications.
            </p>
          </div> */}

          {/* Quick links */}
          <div>
            <h4 className="text-citrus font-semibold mb-4 uppercase text-sm tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Technologies', path: '/technologies' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-breeze hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-citrus font-semibold mb-4 uppercase text-sm tracking-wider">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-breeze">
              <li className="flex items-center gap-2">
                <span>📧Email:</span>
                <span>inovers.dev@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞Phone:</span>
                <span>+63 9995707957</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-breeze text-sm">
            © {new Date().getFullYear()} Inoverse Technologies. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}