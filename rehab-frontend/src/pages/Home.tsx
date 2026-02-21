import { Link } from 'react-router-dom';
import {
  Heart, Users, Sun, Star, ArrowRight, Play, Phone,
  Shield, Award, Clock, ChevronRight, Instagram, Facebook, Youtube
} from 'lucide-react';

const services = [
  {
    icon: <Heart className="w-7 h-7" />,
    title: 'Doctor Sessions',
    description: 'One-on-one consultations with our certified medical professionals. Personalized care plans tailored to your recovery journey.',
    path: '/doctors',
    bookPath: '/booking/doctor',
    color: 'bg-sage-50 text-sage-600',
    accent: 'border-sage-200',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Group Therapy',
    description: 'Heal together in a supportive community setting led by licensed psychologists and therapists.',
    path: '/group-therapy',
    bookPath: '/booking/group-therapy',
    color: 'bg-sand-50 text-sand-600',
    accent: 'border-sand-200',
  },
  {
    icon: <Sun className="w-7 h-7" />,
    title: 'Day Care Programs',
    description: 'Structured daily programs that offer therapeutic activities, meals, and continuous professional support.',
    path: '/daycare',
    bookPath: '/booking/daycare',
    color: 'bg-warm-50 text-warm-600',
    accent: 'border-warm-200',
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: 'Events & Retreats',
    description: 'Rejuvenating retreats and curated wellness events in breathtaking natural settings.',
    path: '/events',
    bookPath: '/events',
    color: 'bg-sage-50 text-sage-600',
    accent: 'border-sage-200',
  },
];

const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '2,400+', label: 'Lives Transformed' },
  { value: '40+', label: 'Specialist Doctors' },
  { value: '98%', label: 'Patient Satisfaction' },
];

const testimonials = [
  {
    name: 'Sara M.',
    role: 'Recovery Patient',
    quote: "Serenity Rehab gave me my life back. The team's compassion and professionalism made all the difference during my recovery journey.",
    avatar: 'SM',
    stars: 5,
  },
  {
    name: 'Karim A.',
    role: 'Group Therapy Participant',
    quote: 'The group therapy sessions were transformative. I found a community of people who truly understood my struggles.',
    avatar: 'KA',
    stars: 5,
  },
  {
    name: 'Nadia H.',
    role: 'Retreat Attendee',
    quote: 'The annual retreat was a life-changing experience. I left feeling renewed, hopeful, and equipped with real coping tools.',
    avatar: 'NH',
    stars: 5,
  },
];

const whyUs = [
  { icon: <Shield className="w-6 h-6" />, title: 'Accredited Facility', desc: 'Fully licensed and internationally accredited rehab center.' },
  { icon: <Award className="w-6 h-6" />, title: 'Expert Team', desc: '40+ certified specialists across all therapeutic disciplines.' },
  { icon: <Heart className="w-6 h-6" />, title: 'Holistic Approach', desc: 'Mind, body, and spirit — we treat the whole person.' },
  { icon: <Clock className="w-6 h-6" />, title: '24/7 Support', desc: 'Round-the-clock care and support whenever you need it.' },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-sage-900">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="video-overlay absolute inset-0" />
          {/* Decorative circles */}
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-sage-500/10 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-sand-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Heart className="w-4 h-4 text-sage-300" fill="currentColor" />
            <span>A Sanctuary for Healing & Renewal</span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Journey to{' '}
            <span className="text-sage-300">Healing</span>{' '}
            Starts Here
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Compassionate, evidence-based care in a serene environment. We walk beside you every step of your recovery.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/booking/doctor" className="btn-primary text-base px-8 py-4">
              Book an Appointment <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="btn-outline text-base px-8 py-4 gap-2">
              <Play className="w-5 h-5" fill="currentColor" /> Watch Our Story
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-sage-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-sage-200 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.value}
                </div>
                <div className="text-sage-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">What We Offer</span>
            <h2 className="section-title mt-2">Comprehensive Care Programs</h2>
            <p className="section-subtitle">
              From individual doctor sessions to immersive retreats — every path leads to healing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className={`card border ${service.accent} flex flex-col`}>
                <div className="p-6 flex-1">
                  <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-sage-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {service.title}
                  </h3>
                  <p className="text-sage-600 text-sm leading-relaxed mb-4">{service.description}</p>
                  <Link to={service.path} className="text-sage-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="px-6 pb-6">
                  <Link to={service.bookPath} className="btn-primary w-full justify-center text-sm">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Us */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">About Us</span>
              <h2 className="section-title mt-2 mb-4">A Place of Genuine Healing</h2>
              <p className="text-sage-600 leading-relaxed mb-6">
                Nestled in a tranquil setting, Serenity Rehab has been a beacon of hope for thousands of individuals and families. Our multidisciplinary team blends cutting-edge therapeutic methods with timeless compassion.
              </p>
              <p className="text-sage-600 leading-relaxed mb-8">
                We believe recovery is not a destination — it's a journey. Our programs are designed to be flexible, evidence-based, and deeply human.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {whyUs.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-sage-100 text-sage-600 rounded-xl flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-sage-900 text-sm">{item.title}</div>
                      <div className="text-sage-500 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary">
                Talk to Us <Phone className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80"
                  alt="Serenity Rehab Facility"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-cozy p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-sage-600" />
                </div>
                <div>
                  <div className="font-bold text-sage-900">ISO Accredited</div>
                  <div className="text-sage-500 text-sm">International Standard of Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-sage-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">Patient Stories</span>
            <h2 className="section-title mt-2">Lives Transformed</h2>
            <p className="section-subtitle">Hear from those who found their path to healing with us.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-sand-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-sage-700 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center text-sage-700 font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sage-900 text-sm">{t.name}</div>
                    <div className="text-sage-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Strip */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">Follow Our Journey</span>
          <h2 className="section-title mt-2">Connect With Us</h2>
          <p className="section-subtitle">Stay inspired. Follow us on social media for daily wellness tips, event updates, and community stories.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group">
                <img
                  src={`https://images.unsplash.com/photo-${1544161515 + i * 10000}-${i}?w=400&q=75`}
                  alt={`Social post ${i}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75`;
                  }}
                />
                <div className="absolute inset-0 bg-sage-900/0 group-hover:bg-sage-900/40 transition-colors flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
              <Facebook className="w-4 h-4" /> Follow on Facebook
            </a>
            <a href="#" className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
              <Instagram className="w-4 h-4" /> Follow on Instagram
            </a>
            <a href="#" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
              <Youtube className="w-4 h-4" /> Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 bg-sage-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-sage-200 text-lg mb-8">
            Take the first step today. Our team is ready to guide you with care and compassion.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/booking/doctor" className="btn-outline text-base px-8 py-4">
              Book Appointment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium px-8 py-4 rounded-xl transition-all duration-200 inline-flex items-center gap-2">
              <Phone className="w-5 h-5" /> Request a Callback
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
