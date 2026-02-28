import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Users, Sun, Heart, ChevronRight, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

const gallery = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80', captionKey: 'Our peaceful garden courtyard', captionAr: 'الفناء الحديقة الهادئ لدينا' },
  { id: 2, type: 'video', src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80', captionKey: 'Morning yoga & mindfulness', captionAr: 'اليوغا الصباحية واليقظة الذهنية' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80', captionKey: 'Individual therapy rooms', captionAr: 'غرف العلاج الفردي' },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', captionKey: 'Serene natural surroundings', captionAr: 'المحيط الطبيعي الهادئ' },
  { id: 5, type: 'video', src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', captionKey: 'Group activities & workshops', captionAr: 'الأنشطة الجماعية والورش' },
  { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80', captionKey: 'Fitness & wellness center', captionAr: 'مركز اللياقة البدنية والعافية' },
];

export default function DayCare() {
  const { t, isAr } = useLang();
  useScrollReveal();
  const [lightbox, setLightbox] = useState<typeof gallery[0] | null>(null);
  const [selectedProgram, setSelectedProgram] = useState('full');

  const programs = [
    {
      id: 'full',
      name: t('daycare.full.name'),
      hours: '8:00 AM – 6:00 PM',
      icon: <Sun className="w-6 h-6" />,
      color: 'bg-sand-50 border-sand-200 text-sand-700',
      iconBg: 'bg-sand-100',
      description: t('daycare.full.desc'),
      activities: {
        en: ['Morning mindfulness', 'Group therapy', 'Individual session', 'Nutritious lunch', 'Arts therapy', 'Evening reflection'],
        ar: ['يقظة ذهنية صباحية', 'جلسة جماعية', 'جلسة فردية', 'غداء صحي', 'علاج بالفنون', 'تأمل مسائي'],
      },
      capacity: 15,
    },
    {
      id: 'half-am',
      name: t('daycare.morning.name'),
      hours: '8:00 AM – 12:00 PM',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-sage-50 border-sage-200 text-sage-700',
      iconBg: 'bg-sage-100',
      description: t('daycare.morning.desc'),
      activities: {
        en: ['Yoga / stretching', 'CBT group session', 'Individual therapy', 'Nutritious breakfast', 'Life skills workshop'],
        ar: ['يوغا / تمدد', 'جلسة مجموعة العلاج المعرفي', 'علاج فردي', 'فطور صحي', 'ورشة مهارات الحياة'],
      },
      capacity: 10,
    },
    {
      id: 'half-pm',
      name: t('daycare.afternoon.name'),
      hours: '2:00 PM – 6:00 PM',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-warm-50 border-warm-200 text-warm-700',
      iconBg: 'bg-warm-100',
      description: t('daycare.afternoon.desc'),
      activities: {
        en: ['Nutritious lunch', 'Arts & crafts therapy', 'Peer support group', 'Mindfulness session', 'Evening reflection'],
        ar: ['غداء صحي', 'علاج بالفنون والحرف', 'مجموعة دعم الأقران', 'جلسة يقظة ذهنية', 'تأمل مسائي'],
      },
      capacity: 10,
    },
  ];

  const features = [
    { titleKey: 'daycare.features.meals.title',       descKey: 'daycare.features.meals.desc' },
    { titleKey: 'daycare.features.transport.title',   descKey: 'daycare.features.transport.desc' },
    { titleKey: 'daycare.features.updates.title',     descKey: 'daycare.features.updates.desc' },
    { titleKey: 'daycare.features.recreation.title',  descKey: 'daycare.features.recreation.desc' },
  ];

  const selected = programs.find((p) => p.id === selectedProgram)!;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div
        className="relative pt-32 pb-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3E2B5A 0%, #5A9898 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=70')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="text-sage-300 text-sm font-semibold uppercase tracking-widest">{t('daycare.label')}</span>
          <h1 className="text-4xl md:text-5xl text-white mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('daycare.title')}
          </h1>
          <p className="text-sage-200 text-lg max-w-2xl mx-auto mb-8">
            {t('daycare.subtitle')}
          </p>
          <Link to="/booking/daycare" className="btn-outline text-base px-8 py-4">
            {t('daycare.book')} <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Programs */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">{t('daycare.programs.label')}</span>
            <h2 className="section-title mt-2">{t('daycare.programs.title')}</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {programs.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProgram(p.id)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all border ${
                  selectedProgram === p.id ? 'bg-sage-600 text-white border-sage-600 shadow' : 'bg-white text-sage-700 border-sage-200 hover:border-sage-400'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className={`border rounded-3xl p-8 md:p-12 ${selected.color} transition-all duration-300`}>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <div className={`w-14 h-14 ${selected.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                  {selected.icon}
                </div>
                <h3 className="text-2xl font-bold text-sage-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {selected.name}
                </h3>
                <div className="flex items-center gap-2 text-sage-600 text-sm mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{selected.hours}</span>
                  <span className="text-sage-300">·</span>
                  <Users className="w-4 h-4" />
                  <span>{t('daycare.maxPart', { n: String(selected.capacity) })}</span>
                </div>
                <p className="text-sage-700 leading-relaxed mb-6">{selected.description}</p>
                <Link to="/booking/daycare" className="btn-primary">
                  {t('daycare.bookProgram')} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div>
                <h4 className="font-semibold text-sage-800 mb-4">{t('daycare.dailyActivities')}</h4>
                <ul className="space-y-3">
                  {(isAr ? selected.activities.ar : selected.activities.en).map((activity) => (
                    <li key={activity} className="flex items-center gap-3 text-sage-700">
                      <div className="w-6 h-6 bg-sage-600 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">{t('daycare.gallery.label')}</span>
            <h2 className="section-title mt-2">{t('daycare.gallery.title')}</h2>
            <p className="section-subtitle">{t('daycare.gallery.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((item) => (
              <button
                key={item.id}
                onClick={() => setLightbox(item)}
                className="relative group rounded-2xl overflow-hidden aspect-[4/3] bg-sage-100 focus:outline-none"
              >
                <img src={item.src} alt={isAr ? item.captionAr : item.captionKey} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-sage-900/0 group-hover:bg-sage-900/40 transition-colors flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Play className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                  ) : null}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs">{isAr ? item.captionAr : item.captionKey}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-sage-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('daycare.features.title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.titleKey} className="bg-white rounded-2xl p-6 shadow-card">
                <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-sage-600" />
                </div>
                <h4 className="font-bold text-sage-900 mb-2">{t(f.titleKey)}</h4>
                <p className="text-sage-500 text-sm">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white hover:text-sage-300 transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="rounded-2xl overflow-hidden">
              {lightbox.type === 'video' ? (
                <div className="aspect-video bg-sage-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 text-sage-300" />
                    <p className="text-sage-300">{t('daycare.video.placeholder')}</p>
                  </div>
                </div>
              ) : (
                <img src={lightbox.src} alt={isAr ? lightbox.captionAr : lightbox.captionKey} className="w-full object-cover" />
              )}
            </div>
            <p className="text-white/70 text-sm text-center mt-3">{isAr ? lightbox.captionAr : lightbox.captionKey}</p>
          </div>
        </div>
      )}
    </div>
  );
}
