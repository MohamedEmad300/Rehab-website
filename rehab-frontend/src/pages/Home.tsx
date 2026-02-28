import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Sun, Star, ArrowRight, Phone,
  Award, ChevronRight, ShieldCheck, CheckCircle2,
  Stethoscope, MapPin, Calendar, Tag, Sparkles
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ── Animated Counter ─────────────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const numericTarget = typeof target === 'string' ? parseInt(target) : target;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numericTarget);
            setDisplayed(current.toLocaleString());
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const isString = typeof target === 'string' && isNaN(parseInt(target));
  return (
    <div ref={ref} className="tabular-nums">
      {isString ? target : displayed}{suffix}
    </div>
  );
}

/* ── Featured Events Data ─────────────────────────────────────────────────── */
const featuredEvents = [
  {
    id: '1',
    title:    'Desert Renewal Retreat',
    titleAr:  'رحلة التجديد الصحراوية',
    type: 'retreat' as const,
    date:     'Mar 15 – 18, 2026',
    dateAr:   '١٥ – ١٨ مارس ٢٠٢٦',
    location: 'Sinai Wilderness, Egypt',
    locationAr: 'صحراء سيناء، مصر',
    descEn: 'A transformative 4-day immersive retreat in the serene Sinai Desert — guided meditation, therapeutic sessions, stargazing, and deep reconnection with nature.',
    descAr: 'رحلة مكثفة لمدة ٤ أيام في صحراء سيناء الهادئة. تأمل موجّه، جلسات علاجية، ومراقبة النجوم.',
    price: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80',
    tags: { en: ['Nature', 'Meditation', 'Intensive'], ar: ['الطبيعة', 'التأمل', 'مكثف'] },
    featured: true,
  },
  {
    id: '2',
    title:    'Spring Wellness Weekend',
    titleAr:  'عطلة الرفاهية الربيعية',
    type: 'retreat' as const,
    date:     'Apr 5 – 7, 2026',
    dateAr:   '٥ – ٧ أبريل ٢٠٢٦',
    location: 'Serenity Recovery, Cairo',
    locationAr: 'سيرينيتي ريكفري، القاهرة',
    descEn: 'A refreshing 2-night retreat with yoga, sound healing, nutrition workshops, and intimate group therapy in a sanctuary setting.',
    descAr: 'رحلة منعشة لليلتين تتضمن اليوغا والشفاء بالصوت وورش التغذية والعلاج الجماعي.',
    price: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
    tags: { en: ['Yoga', 'Nutrition', 'Community'], ar: ['يوغا', 'تغذية', 'مجتمع'] },
    featured: false,
  },
  {
    id: '3',
    title:    'Understanding Addiction: Family Workshop',
    titleAr:  'فهم الإدمان: ورشة عائلية',
    type: 'workshop' as const,
    date:     'Mar 8, 2026',
    dateAr:   '٨ مارس ٢٠٢٦',
    location: 'Serenity Recovery, Cairo',
    locationAr: 'سيرينيتي ريكفري، القاهرة',
    descEn: 'A full-day educational workshop for families — addiction science, communication strategies, and building a lasting support system.',
    descAr: 'ورشة تعليمية ليوم كامل للعائلات حول علم الإدمان وبناء نظام دعم صحي.',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=700&q=80',
    tags: { en: ['Family', 'Education'], ar: ['العائلة', 'التعليم'] },
    featured: false,
  },
];

/* ── Main Component ───────────────────────────────────────────────────────── */
export default function Home() {
  const { t, lang, isAr } = useLang();
  const [activeTab, setActiveTab] = useState(0);
  useScrollReveal();

  const [featured, ...side] = featuredEvents;

  /* Services */
  const services = [
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: t('home.svc.consultant.title'),
      description: t('home.svc.consultant.desc'),
      path: '/consultants',
      bookPath: '/booking/consultant',
      iconBg: 'bg-sage-100 text-sage-600',
      tag: t('home.svc.consultant.tag'),
      tagColor: 'bg-sage-600 text-white',
      accent: 'from-sage-600/5 to-sage-600/0',
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: t('home.svc.group.title'),
      description: t('home.svc.group.desc'),
      path: '/group-therapy',
      bookPath: '/booking/group-therapy',
      iconBg: 'bg-sand-100 text-sand-600',
      tag: t('home.svc.group.tag'),
      tagColor: 'bg-sand-500 text-white',
      accent: 'from-sand-500/5 to-sand-500/0',
    },
    {
      icon: <Sun className="w-7 h-7" />,
      title: t('home.svc.daycare.title'),
      description: t('home.svc.daycare.desc'),
      path: '/daycare',
      bookPath: '/booking/daycare',
      iconBg: 'bg-warm-100 text-warm-600',
      tag: t('home.svc.daycare.tag'),
      tagColor: 'bg-warm-500 text-white',
      accent: 'from-warm-500/5 to-warm-500/0',
    },
    {
      icon: <Star className="w-7 h-7" />,
      title: t('home.svc.events.title'),
      description: t('home.svc.events.desc'),
      path: '/events',
      bookPath: '/events',
      iconBg: 'bg-sage-50 text-sage-500',
      tag: t('home.svc.events.tag'),
      tagColor: 'bg-sage-500 text-white',
      accent: 'from-sage-500/5 to-sage-500/0',
    },
  ];

  const stats = [
    { value: 15,    suffix: '+', label: t('home.stats.years'),       display: '15+' },
    { value: 2400,  suffix: '+', label: t('home.stats.lives'),        display: '2,400+' },
    { value: 40,    suffix: '+', label: t('home.stats.specialists'),  display: '40+' },
    { value: 98,    suffix: '%', label: t('home.stats.satisfaction'), display: '98%' },
  ];

  const testimonials = [
    {
      name: 'Sara M.',
      roleKey: 'home.testimonials.role.patient',
      quoteKey: 'home.testimonials.q1',
      avatar: 'SM',
      gradient: 'from-sage-500 to-sage-700',
    },
    {
      name: 'Karim A.',
      roleKey: 'home.testimonials.role.group',
      quoteKey: 'home.testimonials.q2',
      avatar: 'KA',
      gradient: 'from-sand-400 to-sand-600',
    },
    {
      name: 'Nadia H.',
      roleKey: 'home.testimonials.role.retreat',
      quoteKey: 'home.testimonials.q3',
      avatar: 'NH',
      gradient: 'from-warm-400 to-warm-600',
    },
  ];

  const bookingTabs = [
    { label: t('home.tab.consultant'),  path: '/booking/consultant' },
    { label: t('home.tab.group'),       path: '/booking/group-therapy' },
    { label: t('home.tab.daycare'),     path: '/booking/daycare' },
  ];

  const trustIndicators = [
    { icon: <ShieldCheck className="w-4 h-4" />,   label: t('home.trust.confidential') },
    { icon: <CheckCircle2 className="w-4 h-4" />,  label: t('home.trust.verified') },
    { icon: <Award className="w-4 h-4" />,         label: t('home.trust.accredited') },
    { icon: <Sparkles className="w-4 h-4" />,      label: t('home.trust.satisfaction') },
  ];

  const typeConfig = {
    retreat:  { label: t('event.type.retreat'),  color: 'bg-sage-600/90 text-white' },
    workshop: { label: t('event.type.workshop'), color: 'bg-sand-500/90 text-white' },
    event:    { label: t('event.type.event'),    color: 'bg-warm-500/90 text-white' },
  };

  return (
    <div className="w-full">

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Dark plum with animated botanical orbs
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">

        {/* Animated orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />

        {/* Background photo — very low opacity */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: `url('/background.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="video-overlay absolute inset-0" />

        {/* Decorative rings */}
        <div className="deco-ring" style={{ width: '700px', height: '700px', opacity: 0.04 }} />
        <div className="deco-ring" style={{ width: '1000px', height: '1000px', opacity: 0.025, animationDuration: '35s', animationDirection: 'reverse' }} />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-2 text-white/75 text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-10 border"
            style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-warm-300" />
            {t('home.heroBadge')}
          </div>

          {/* Main heading */}
          <h1
            className="text-5xl md:text-7xl text-white mb-6 leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {isAr ? (
              <>
                طريقك نحو{' '}
                <em className="not-italic shimmer-text">التعافي</em>
                {' '}يبدأ من هنا
              </>
            ) : (
              <>
                Your Path to{' '}
                <em className="not-italic shimmer-text">Recovery</em>
                {' '}Starts Here
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed font-light">
            {t('home.heroSubtitle')}
          </p>

          {/* Booking tab switcher */}
          <div
            className="inline-flex rounded-2xl p-1 gap-1 mb-10"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}
          >
            {bookingTabs.map((tab, i) => (
              <button
                key={tab.path}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-gradient-to-r from-sage-600 to-sand-500 text-white shadow-glow'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* CTA for active tab */}
          <div className="mb-12">
            <Link
              to={bookingTabs[activeTab].path}
              className="btn-coral text-base px-8 py-4 mx-auto"
            >
              {t('nav.bookAppointment')} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {trustIndicators.map((trust) => (
              <span
                key={trust.label}
                className="trust-badge animate-pulse-soft"
                style={{ animationDelay: `${Math.random() * 2}s` }}
              >
                {trust.icon} {trust.label}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS BAR — Animated gradient background
      ══════════════════════════════════════════════════════════════════ */}
      <section className="animated-gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(218,200,248,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(90,175,175,0.3) 0%, transparent 50%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`reveal stagger-${i + 1}`}>
                <div
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/55 text-sm font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SERVICES — Cards with gradient accent tops
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-4 bg-cream relative">
        {/* Subtle decorative blob */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, #614090 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-sage-500 text-xs font-bold uppercase tracking-[0.25em] mb-3">{t('home.services.label')}</p>
            <h2 className="section-title">{t('home.services.title')}</h2>
            <p className="section-subtitle">{t('home.services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`card flex flex-col reveal stagger-${i + 1} group`}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                {/* Gradient accent top bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${service.accent.replace('/5', '').replace('/0', '/0')} via-sage-600/30`}
                  style={{
                    background: i === 0 ? 'linear-gradient(90deg, #614090, #DAC8F8)' :
                                i === 1 ? 'linear-gradient(90deg, #7BBFBF, #614090)' :
                                i === 2 ? 'linear-gradient(90deg, #DAC8F8, #7BBFBF)' :
                                          'linear-gradient(90deg, #4A8080, #614090)',
                  }}
                />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      {service.icon}
                    </div>
                    <span className={`badge ${service.tagColor} text-xs`}>{service.tag}</span>
                  </div>
                  <h3
                    className="text-lg font-bold text-charcoal mb-2 group-hover:text-sage-700 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sage-600/80 text-sm leading-relaxed mb-5 flex-1">{service.description}</p>
                  <Link to={service.path} className="text-sage-600 text-sm font-semibold flex items-center gap-1.5 hover:gap-3 transition-all duration-200 group/link">
                    {t('home.services.learnMore')}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
                <div className="px-6 pb-6">
                  <Link to={service.bookPath} className="btn-primary w-full justify-center text-sm">
                    {t('home.services.bookNow')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          EVENTS — Full-bleed image cards with glass overlays
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-4 bg-white relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #7BBFBF 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div className="reveal-left">
              <p className="text-sage-500 text-xs font-bold uppercase tracking-[0.25em] mb-3">{t('home.events.label')}</p>
              <h2 className="section-title mb-0 italic">{t('home.events.title')}</h2>
            </div>
            <Link to="/events" className="btn-secondary shrink-0 reveal-right">
              {t('home.events.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Large featured card */}
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer min-h-[440px] reveal-left shadow-card">
              <img
                src={featured.imageUrl}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/45 to-transparent" />

              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className={`badge ${typeConfig[featured.type].color} shadow-sm backdrop-blur-sm`}>
                  {typeConfig[featured.type].label}
                </span>
                <span className="badge shadow-sm backdrop-blur-sm" style={{ background: 'rgba(90,152,152,0.85)', color: 'white' }}>
                  <Sparkles className="w-3 h-3 mr-1" /> {t('home.events.featured')}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(isAr ? featured.tags.ar : featured.tags.en).map((tag) => (
                    <span key={tag} className="badge text-white/80 border border-white/20 backdrop-blur-sm text-xs" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <Tag className="w-2.5 h-2.5 mr-1" />{tag}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-2.5 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {isAr ? featured.titleAr : featured.title}
                </h3>
                <div className="flex flex-wrap items-center gap-5 text-white/55 text-sm mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{isAr ? featured.dateAr : featured.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{isAr ? featured.locationAr : featured.location}</span>
                </div>
                <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-lg">
                  {isAr ? featured.descAr : featured.descEn}
                </p>
                <div className="flex items-center gap-4">
                  <Link to="/events" className="btn-coral text-sm">
                    {t('home.events.register')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Stacked smaller cards */}
            <div className="flex flex-col gap-5">
              {side.map((event, i) => (
                <div
                  key={event.id}
                  className={`relative rounded-3xl overflow-hidden group cursor-pointer flex-1 min-h-[200px] reveal-right stagger-${i + 1} shadow-card`}
                >
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`badge ${typeConfig[event.type].color} text-xs backdrop-blur-sm`}>
                      {typeConfig[event.type].label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3
                      className="text-base font-bold text-white mb-1.5 leading-snug"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {isAr ? event.titleAr : event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-white/55 text-xs mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{isAr ? event.dateAr : event.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{isAr ? event.locationAr : event.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Link to="/events" className="text-warm-200 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors">
                        {t('home.events.learnMore')} <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TESTIMONIALS — Glass cards on plum background
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-4 relative overflow-hidden" style={{ background: '#5C4880' }}>
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #614090 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #7BBFBF 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14 reveal">
            <p className="text-warm-300 text-xs font-bold uppercase tracking-[0.25em] mb-3">{t('home.testimonials.label')}</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t('home.testimonials.title')}
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">{t('home.testimonials.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <div
                key={item.name}
                className={`glass-card p-7 reveal stagger-${i + 1}`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-warm-300" fill="currentColor" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed mb-6 text-sm italic">
                  "{t(item.quoteKey)}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {item.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.name}</div>
                    <div className="text-white/45 text-xs">{t(item.roleKey)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA BANNER — Gradient with animated background
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden">
        {/* Animated gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(-45deg, #4A3870, #614090, #5A9898, #7BBFBF)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 10s ease infinite',
          }}
        />
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full border border-white/5" style={{ transform: 'translate(-50%, -50%)' }} />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03]" style={{ transform: 'translate(-50%, -50%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
          <p className="text-sand-200 text-xs font-bold uppercase tracking-[0.25em] mb-4">Begin Your Journey</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('home.cta.title')}
          </h2>
          <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto">{t('home.cta.subtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/booking/consultant"
              className="group relative overflow-hidden bg-white text-sage-700 font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-2.5 transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sage-50 to-warm-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">{t('home.cta.book')}</span>
              <ArrowRight className="w-5 h-5 relative transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2.5 text-white/80 hover:text-white border border-white/25 hover:border-white/50 font-medium px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/5 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" /> {t('home.cta.callback')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
