import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'Our Services',
    path: '#',
    children: [
      { label: 'Doctors', path: '/doctors' },
      { label: 'Group Therapy', path: '/group-therapy' },
      { label: 'Day Care', path: '/daycare' },
    ],
  },
  { label: 'Events & Retreats', path: '/events' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sage-100';

  const textColor = isHome && !scrolled ? 'text-white' : 'text-sage-800';
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-sage-700';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-2 font-bold text-xl ${logoColor}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isHome && !scrolled ? 'bg-white/20' : 'bg-sage-100'}`}>
              <Heart className="w-5 h-5 text-sage-600" fill="currentColor" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif" }}>
              Serenity <span className="text-sage-500">Rehab</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${textColor} hover:bg-white/10`}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-sage-100 overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-3 text-sm text-sage-700 hover:bg-sage-50 hover:text-sage-900 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${textColor} hover:bg-white/10 ${location.pathname === link.path ? 'font-semibold' : ''}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/booking/doctor" className="btn-primary text-sm py-2.5">
              Book Appointment
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${textColor}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-sage-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="px-3 py-2 text-xs font-semibold text-sage-500 uppercase tracking-wider">{link.label}</p>
                  {link.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className="block px-6 py-2.5 text-sage-700 hover:bg-sage-50 rounded-lg"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2.5 text-sage-700 hover:bg-sage-50 rounded-lg font-medium ${location.pathname === link.path ? 'bg-sage-50 text-sage-900' : ''}`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-sage-100">
              <Link to="/booking/doctor" className="btn-primary w-full justify-center text-sm">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
