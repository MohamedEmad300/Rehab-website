import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Play, Phone, ArrowRight, Tag, ChevronRight, X } from 'lucide-react';
import type { Event } from '../types';
import { useLang } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Desert Renewal Retreat',
    type: 'retreat',
    date: '2026-03-15',
    endDate: '2026-03-18',
    location: 'Sinai Wilderness, Egypt',
    description: 'A transformative 4-day immersive retreat in the serene Sinai Desert. Guided meditation, therapeutic sessions, stargazing, and reconnecting with nature. Limited to 20 participants for a deeply personal experience.',
    capacity: 20,
    price: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    tags: ['Nature', 'Meditation', 'Intensive', 'Limited Spots'],
  },
  {
    id: '2',
    title: 'Spring Wellness Weekend',
    type: 'retreat',
    date: '2026-04-05',
    endDate: '2026-04-07',
    location: 'Serenity Recovery, Cairo',
    description: 'A refreshing 2-night retreat at our main facility. Features yoga, sound healing, nutrition workshops, and one-on-one therapy sessions in a supportive community setting.',
    capacity: 30,
    price: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    tags: ['Weekend', 'Yoga', 'Nutrition', 'Community'],
  },
  {
    id: '3',
    title: 'Understanding Addiction: A Family Workshop',
    type: 'workshop',
    date: '2026-03-08',
    location: 'Serenity Recovery, Cairo',
    description: 'A full-day educational workshop for families of individuals in recovery. Learn about addiction science, communication strategies, and how to build a healthy support system at home.',
    capacity: 40,
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    tags: ['Family', 'Education', 'Free Lunch Included'],
  },
  {
    id: '4',
    title: 'Annual Recovery Gala & Awards',
    type: 'event',
    date: '2026-05-20',
    location: 'Grand Ballroom, Cairo Marriott',
    description: 'Our annual celebration of courage and recovery. Honoring community champions, featuring keynote speakers, and raising funds for subsidized treatment programs.',
    capacity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    tags: ['Celebration', 'Community', 'Gala', 'Fundraiser'],
  },
  {
    id: '5',
    title: 'Mindfulness in Nature: Day Walk',
    type: 'event',
    date: '2026-03-22',
    location: 'Wadi Degla Protectorate, Cairo',
    description: 'A guided therapeutic walk through Wadi Degla with mindfulness exercises, breathwork, and peer bonding. Open to current and former patients and their families.',
    capacity: 25,
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    tags: ['Outdoors', 'Mindfulness', 'Community', 'Beginner-Friendly'],
  },
  {
    id: '6',
    title: 'Creative Healing: Art Therapy Exhibition',
    type: 'event',
    date: '2026-04-15',
    location: 'Serenity Recovery Gallery, Cairo',
    description: 'An exhibition showcasing artwork created by patients as part of our art therapy program. A moving celebration of healing, expression, and transformation. Open to the public.',
    capacity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    tags: ['Art', 'Community', 'Open to Public', 'Free Entry'],
  },
];

const arData: Record<string, { title: string; location: string; tags: string[] }> = {
  '1': { title: 'رحلة التجديد الصحراوية',            location: 'صحراء سيناء، مصر',                  tags: ['الطبيعة', 'التأمل', 'مكثف', 'أماكن محدودة'] },
  '2': { title: 'عطلة الرفاهية الربيعية',            location: 'سيرينيتي ريكفري، القاهرة',          tags: ['عطلة نهاية الأسبوع', 'يوغا', 'تغذية', 'مجتمع'] },
  '3': { title: 'فهم الإدمان: ورشة عائلية',          location: 'سيرينيتي ريكفري، القاهرة',          tags: ['العائلة', 'تعليم', 'غداء مجاني'] },
  '4': { title: 'حفل التعافي السنوي والجوائز',        location: 'القاعة الكبرى، ماريوت القاهرة',     tags: ['احتفال', 'مجتمع', 'حفل', 'جمع تبرعات'] },
  '5': { title: 'اليقظة الذهنية في الطبيعة: رحلة يومية', location: 'محمية وادي دجلة، القاهرة',     tags: ['في الهواء الطلق', 'يقظة ذهنية', 'مجتمع', 'للمبتدئين'] },
  '6': { title: 'الشفاء الإبداعي: معرض العلاج بالفن', location: 'معرض سيرينيتي ريكفري، القاهرة',   tags: ['فن', 'مجتمع', 'مفتوح للعموم', 'دخول مجاني'] },
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr);
  return { day: d.getDate(), month: d.toLocaleString('en-US', { month: 'short' }) };
}

export default function Events() {
  const { t, lang, isAr } = useLang();
  const [filter, setFilter] = useState('All');
  useScrollReveal();
  const [callbackModal, setCallbackModal] = useState<Event | null>(null);
  const [videoModal, setVideoModal] = useState<Event | null>(null);
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', email: '', time: '' });
  const [submitted, setSubmitted] = useState(false);

  const dateLocale = lang === 'ar' ? 'ar-EG' : 'en-US';

  const typeConfig = {
    retreat: { label: t('events.filter.retreat'), color: 'bg-sage-600 text-white' },
    workshop:{ label: t('events.filter.workshop'),color: 'bg-sand-500 text-white' },
    event:   { label: t('events.filter.event'),   color: 'bg-warm-500 text-white' },
  };

  const filterTypes = [
    { key: 'All',      label: t('events.filter.all') },
    { key: 'Retreat',  label: t('events.filter.retreat') },
    { key: 'Workshop', label: t('events.filter.workshop') },
    { key: 'Event',    label: t('events.filter.event') },
  ];

  const filtered = mockEvents.filter(
    (e) => filter === 'All' || e.type === filter.toLowerCase()
  );

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCallbackModal(null);
    }, 2500);
  };

  const callbackTimes = [
    { value: 'morning',   label: t('events.cb.time.morning') },
    { value: 'afternoon', label: t('events.cb.time.afternoon') },
    { value: 'evening',   label: t('events.cb.time.evening') },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden bg-sage-900">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=70')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="video-overlay absolute inset-0" />
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="text-sage-300 text-sm font-semibold uppercase tracking-widest">{t('events.label')}</span>
          <h1 className="text-5xl md:text-6xl text-white mt-2 mb-4 italic tracking-wide" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>
            {t('events.title')}
          </h1>
          <p className="text-sage-200 text-lg max-w-2xl mx-auto">
            {t('events.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter tabs */}
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          {filterTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setFilter(type.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filter === type.key
                  ? 'bg-sage-600 text-white shadow'
                  : 'bg-white text-sage-600 border border-sage-200 hover:border-sage-400'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Event Cards */}
        <div className="space-y-6">
          {filtered.map((event, i) => {
            const dateInfo = formatDateShort(event.date);
            const cfg = typeConfig[event.type];
            return (
              <div key={event.id} className={`card flex flex-col md:flex-row overflow-hidden reveal stagger-${Math.min(i + 1, 5)}`}>
                {/* Date badge */}
                <div className="hidden md:flex flex-col items-center justify-center w-24 bg-sage-50 border-r border-sage-100 shrink-0 py-6">
                  <span className="text-3xl font-bold text-sage-700" style={{ fontFamily: "'Playfair Display', serif" }}>{dateInfo.day}</span>
                  <span className="text-sage-500 text-sm uppercase tracking-wide">{dateInfo.month}</span>
                </div>

                {/* Image */}
                <div className="relative w-full md:w-64 h-52 md:h-auto shrink-0">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className={`badge ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  {event.videoUrl && (
                    <button
                      onClick={() => setVideoModal(event)}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-sage-50"
                    >
                      <Play className="w-4 h-4 text-sage-700 ml-0.5" fill="currentColor" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-sage-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {isAr ? (arData[event.id]?.title ?? event.title) : event.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-sage-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(event.date, dateLocale)}{event.endDate && ` – ${formatDate(event.endDate, dateLocale)}`}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {isAr ? (arData[event.id]?.location ?? event.location) : event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {event.capacity} {t('events.spots')}
                    </span>
                  </div>

                  <p className="text-sage-600 text-sm leading-relaxed mb-4 flex-1">{event.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(isAr ? (arData[event.id]?.tags ?? event.tags) : event.tags).map((tag) => (
                      <span key={tag} className="badge bg-sage-50 text-sage-600 border border-sage-200 text-xs">
                        <Tag className="w-3 h-3 mr-1" />{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link to={`/contact?event=${event.id}`} className="btn-primary text-sm">
                      {t('events.register')} <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setCallbackModal(event)}
                      className="btn-secondary text-sm"
                    >
                      <Phone className="w-4 h-4" /> {t('events.callback')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-sage-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sage-700 mb-2">{t('events.noFound.title')}</h3>
            <p className="text-sage-400">{t('events.noFound.subtitle')}</p>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-sage-700">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('events.newsletter.title')}
          </h2>
          <p className="text-sage-200 mb-6">{t('events.newsletter.subtitle')}</p>
          <div className="flex gap-3">
            <input type="email" placeholder={t('events.newsletter.email')} className="input-field flex-1" />
            <button className="btn-outline shrink-0">
              {t('events.newsletter.subscribe')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Callback Modal */}
      {callbackModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => { setCallbackModal(null); setSubmitted(false); }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-sage-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('events.cb.title')}
                </h3>
                <p className="text-sage-500 text-sm mt-1">{t('events.cb.for')} {callbackModal.title}</p>
              </div>
              <button onClick={() => { setCallbackModal(null); setSubmitted(false); }} className="text-sage-400 hover:text-sage-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold text-sage-900 mb-2">{t('events.cb.success.title')}</h4>
                <p className="text-sage-500 text-sm">{t('events.cb.success.subtitle')}</p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div>
                  <label className="label">{t('events.cb.name.label')}</label>
                  <input
                    type="text"
                    required
                    value={callbackForm.name}
                    onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                    className="input-field"
                    placeholder={t('events.cb.name.ph')}
                  />
                </div>
                <div>
                  <label className="label">{t('events.cb.phone.label')}</label>
                  <input
                    type="tel"
                    required
                    value={callbackForm.phone}
                    onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                    className="input-field"
                    placeholder={t('events.cb.phone.ph')}
                  />
                </div>
                <div>
                  <label className="label">{t('events.cb.email.label')}</label>
                  <input
                    type="email"
                    value={callbackForm.email}
                    onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                    className="input-field"
                    placeholder={t('events.cb.email.ph')}
                  />
                </div>
                <div>
                  <label className="label">{t('events.cb.time.label')}</label>
                  <select
                    value={callbackForm.time}
                    onChange={(e) => setCallbackForm({ ...callbackForm, time: e.target.value })}
                    className="input-field"
                  >
                    <option value="">{t('events.cb.time.any')}</option>
                    {callbackTimes.map((ct) => (
                      <option key={ct.value} value={ct.value}>{ct.label}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  <Phone className="w-4 h-4" /> {t('events.cb.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video modal */}
      {videoModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setVideoModal(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-center" onClick={(e) => e.stopPropagation()}>
            <Play className="w-12 h-12 text-sage-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-sage-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {videoModal.title}
            </h3>
            <p className="text-sage-500 mb-6">{t('events.video.placeholder')}</p>
            <button onClick={() => setVideoModal(null)} className="btn-secondary">{t('events.video.close')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
