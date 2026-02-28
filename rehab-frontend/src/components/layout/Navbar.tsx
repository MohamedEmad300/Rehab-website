import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown, Languages } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t, lang, toggleLang } = useLang();

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

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    {
      label: t('nav.services'),
      path: '#',
      children: [
        { label: t('nav.consultants'),  path: '/consultants' },
        { label: t('nav.groupTherapy'), path: '/group-therapy' },
        { label: t('nav.dayCare'),      path: '/daycare' },
      ],
    },
    { label: t('nav.events'),  path: '/events' },
    { label: t('nav.contact'), path: '/contact' },
  ];

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
              Serenity <span className="text-sage-500">Recovery</span>
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
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-sage-100 overflow-hidden">
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
                  style={undefined}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Language Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle pill */}
            <button
              onClick={toggleLang}
              title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                isHome && !scrolled
                  ? 'border-white/30 text-white hover:bg-white/15'
                  : 'border-sage-200 text-sage-700 hover:bg-sage-50'
              }`}
            >
              <Languages className="w-4 h-4" />
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>

            <Link to="/booking/consultant" className="btn-primary text-sm py-2.5">
              {t('nav.bookAppointment')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLang}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                isHome && !scrolled
                  ? 'border-white/30 text-white'
                  : 'border-sage-200 text-sage-700'
              }`}
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${textColor}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
                  style={undefined}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-sage-100">
              <Link to="/booking/consultant" className="btn-primary w-full justify-center text-sm">
                {t('nav.bookAppointment')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
