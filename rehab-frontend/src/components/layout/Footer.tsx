import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-sage-900 text-sage-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <div className="w-9 h-9 bg-sage-700 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-sage-300" fill="currentColor" />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif" }}>
                Serenity <span className="text-sage-400">Recovery</span>
              </span>
            </Link>
            <p className="text-sage-300 text-sm leading-relaxed mb-5">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://wa.me/" aria-label="WhatsApp" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2.5">
              {[
                { key: 'footer.svc.consultant', path: '/consultants' },
                { key: 'footer.svc.group',      path: '/group-therapy' },
                { key: 'footer.svc.daycare',    path: '/daycare' },
                { key: 'footer.svc.events',     path: '/events' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sage-300 hover:text-white text-sm transition-colors">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.book.title')}</h4>
            <ul className="space-y-2.5">
              {[
                { key: 'footer.book.consultant', path: '/booking/consultant' },
                { key: 'footer.book.group',      path: '/booking/group-therapy' },
                { key: 'footer.book.daycare',    path: '/booking/daycare' },
                { key: 'footer.book.contact',    path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sage-300 hover:text-white text-sm transition-colors">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sage-300 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-sage-400 shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3 text-sage-300 text-sm">
                <Phone className="w-4 h-4 text-sage-400 shrink-0" />
                <a href="tel:+201234567890" className="hover:text-white transition-colors">+20 123 456 7890</a>
              </li>
              <li className="flex items-center gap-3 text-sage-300 text-sm">
                <Mail className="w-4 h-4 text-sage-400 shrink-0" />
                <a href="mailto:info@serenityrecovery.com" className="hover:text-white transition-colors">info@serenityrecovery.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sage-400 text-sm">{t('footer.copyright')}</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-sage-400 hover:text-white text-sm transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-sage-400 hover:text-white text-sm transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
