import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
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
                Serenity <span className="text-sage-400">Rehab</span>
              </span>
            </Link>
            <p className="text-sage-300 text-sm leading-relaxed mb-5">
              A haven for healing, growth, and renewal. We provide compassionate care in a serene environment.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-sage-700 hover:bg-sage-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-sage-700 hover:bg-sage-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 bg-sage-700 hover:bg-sage-600 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 bg-sage-700 hover:bg-sage-600 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Doctor Sessions', path: '/doctors' },
                { label: 'Group Therapy', path: '/group-therapy' },
                { label: 'Day Care Programs', path: '/daycare' },
                { label: 'Events & Retreats', path: '/events' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sage-300 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking */}
          <div>
            <h4 className="text-white font-semibold mb-4">Book Now</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Book a Doctor', path: '/booking/doctor' },
                { label: 'Book Group Therapy', path: '/booking/group-therapy' },
                { label: 'Book Day Care', path: '/booking/daycare' },
                { label: 'Contact Us', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sage-300 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sage-300 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-sage-400 shrink-0" />
                <span>123 Healing Way, Serenity Valley, Cairo, Egypt</span>
              </li>
              <li className="flex items-center gap-3 text-sage-300 text-sm">
                <Phone className="w-4 h-4 text-sage-400 shrink-0" />
                <a href="tel:+201234567890" className="hover:text-white transition-colors">+20 123 456 7890</a>
              </li>
              <li className="flex items-center gap-3 text-sage-300 text-sm">
                <Mail className="w-4 h-4 text-sage-400 shrink-0" />
                <a href="mailto:info@serenityrehab.com" className="hover:text-white transition-colors">info@serenityrehab.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sage-400 text-sm">© 2026 Serenity Rehab. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-sage-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-sage-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
