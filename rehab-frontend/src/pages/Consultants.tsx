import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Play, Star, Globe, Calendar,
  ChevronRight, X, Shield, Award, Clock, Phone, Video
} from 'lucide-react';
import type { Consultant } from '../types';
import { useLang } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

const mockConsultants: Consultant[] = [
  {
    id: '1',
    name: 'Dr. Amina Khalil',
    title: 'MD, Psychiatry',
    specialization: 'Addiction Medicine & Psychiatry',
    bio: 'Dr. Khalil brings 18 years of experience in addiction recovery and mental health. She combines evidence-based practices with a holistic perspective, helping patients rebuild their lives through compassionate, structured treatment plans. Her work spans inpatient detox, outpatient therapy, and family counselling.',
    credentials: ['American Board of Psychiatry', 'WHO Mental Health Certification', 'Addiction Medicine Board'],
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    languages: ['Arabic', 'English', 'French'],
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
  },
  {
    id: '2',
    name: 'Dr. Youssef Nasser',
    title: 'PhD, Clinical Psychology',
    specialization: 'Trauma & PTSD Specialist',
    bio: 'Specializing in trauma-informed care, Dr. Nasser helps patients rebuild resilience through proven therapeutic frameworks including EMDR and CBT. With over 14 years of practice, he has supported hundreds of individuals in processing complex trauma and reclaiming their sense of safety and agency.',
    credentials: ['Licensed Clinical Psychologist', 'EMDR Certified Practitioner', 'Trauma-Informed Care Specialist'],
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    languages: ['Arabic', 'English'],
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
  },
  {
    id: '3',
    name: 'Dr. Layla Hassan',
    title: 'MD, Internal Medicine',
    specialization: 'Detoxification & Physical Recovery',
    bio: 'Dr. Hassan oversees the medical detox program, ensuring safe, comfortable physical recovery. Her calm demeanor and precision make her a patient favorite. She specialises in medically supervised withdrawal management, nutritional rehabilitation, and long-term physical health planning.',
    credentials: ['Egyptian Medical Syndicate', 'Addiction Medicine Board', 'Internal Medicine Board'],
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
    languages: ['Arabic', 'English'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
  },
  {
    id: '4',
    name: 'Dr. Omar Farouk',
    title: 'MSc, Behavioral Therapy',
    specialization: 'CBT & Behavioral Interventions',
    bio: 'With a focus on long-term behavioral change, Dr. Farouk works with patients to identify triggers, build new habits, and sustain lasting recovery. His sessions integrate mindfulness-based cognitive therapy with practical life skills coaching for a grounded, sustainable approach.',
    credentials: ['Certified CBT Therapist', 'Mindfulness-Based Therapy Practitioner', 'Relapse Prevention Certified'],
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80',
    languages: ['Arabic', 'English', 'German'],
    availableDays: ['Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: '5',
    name: 'Dr. Rania Ibrahim',
    title: 'MD, Family Medicine',
    specialization: 'Family Therapy & Recovery Support',
    bio: 'Dr. Ibrahim believes recovery extends beyond the patient. She facilitates family healing sessions that restore relationships and build lasting support networks. Her systemic approach helps entire family units understand, adapt to, and actively participate in the recovery journey.',
    credentials: ['Family Medicine Board', 'Systemic Family Therapy Certificate', 'Couples Therapy Certified'],
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80',
    languages: ['Arabic', 'English'],
    availableDays: ['Sunday', 'Monday', 'Wednesday'],
  },
  {
    id: '6',
    name: 'Dr. Khaled Mansour',
    title: 'PhD, Neuropsychology',
    specialization: 'Neurological Rehabilitation',
    bio: "Dr. Mansour specializes in the neurological aspects of addiction, using cutting-edge brain-based therapies to support cognitive recovery and resilience. His research-led practice incorporates neurofeedback, cognitive rehabilitation exercises, and psychoeducation about the brain's capacity for healing.",
    credentials: ['Neuropsychology Board Certification', 'Cognitive Rehabilitation Specialist', 'Neurofeedback Practitioner'],
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80',
    languages: ['Arabic', 'English', 'Italian'],
    availableDays: ['Tuesday', 'Friday', 'Saturday'],
  },
];

// Day-name → translation key map
const dayKeyMap: Record<string, string> = {
  Sunday: 'day.sun', Monday: 'day.mon', Tuesday: 'day.tue',
  Wednesday: 'day.wed', Thursday: 'day.thu', Friday: 'day.fri', Saturday: 'day.sat',
};

// ── Consultant Detail Modal ────────────────────────────────────────────────
function ConsultantModal({
  consultant,
  onClose,
}: {
  consultant: Consultant;
  onClose: () => void;
}) {
  const { t } = useLang();
  const [videoOpen, setVideoOpen] = useState(false);

  const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image strip */}
        <div className="relative h-52 rounded-t-3xl overflow-hidden">
          <img
            src={consultant.imageUrl}
            alt={consultant.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Name overlay */}
          <div className="absolute bottom-5 left-6 right-16">
            <span className="badge bg-sage-600 text-white text-xs mb-2">{consultant.title}</span>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {consultant.name}
            </h2>
            <p className="text-sage-200 text-sm">{consultant.specialization}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-7 space-y-6">
          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-cream rounded-xl p-3 text-center">
              <Globe className="w-5 h-5 text-sage-500 mx-auto mb-1" />
              <div className="text-xs text-gray-400 mb-0.5">{t('modal.languages')}</div>
              <div className="text-xs font-semibold text-charcoal">{consultant.languages.join(', ')}</div>
            </div>
            <div className="bg-cream rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-sage-500 mx-auto mb-1" />
              <div className="text-xs text-gray-400 mb-0.5">{t('modal.session')}</div>
              <div className="text-xs font-semibold text-charcoal">{t('modal.60min')}</div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-2">{t('modal.about')}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{consultant.bio}</p>
          </div>

          {/* Credentials */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">{t('modal.credentials')}</h3>
            <div className="flex flex-wrap gap-2">
              {consultant.credentials.map((c) => (
                <span key={c} className="flex items-center gap-1.5 bg-sage-50 border border-sage-100 text-sage-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  <Award className="w-3 h-3 text-sage-500" /> {c}
                </span>
              ))}
            </div>
          </div>

          {/* Trust row */}
          <div className="flex items-center gap-5 py-4 border-t border-b border-gray-100 text-xs text-gray-400 flex-wrap">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-sage-500" /> {t('modal.confidential')}</span>
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-warm-400" fill="currentColor" /> {t('modal.verified')}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-sage-500" /> {t('modal.inperson')}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setVideoOpen(true)}
              className="btn-secondary flex-1 justify-center text-sm"
            >
              <Video className="w-4 h-4" /> {t('modal.watchIntro')}
            </button>
            <Link
              to={`/booking/consultant?consultant=${consultant.id}`}
              className="btn-primary flex-1 justify-center text-sm"
              onClick={onClose}
            >
              {t('modal.bookSession')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Video sub-modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-sage-600" />
            </div>
            <h3 className="text-lg font-bold text-charcoal mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {consultant.name}
            </h3>
            <p className="text-gray-400 text-sm mb-6">{t('modal.videoPlaceholder')}</p>
            <button onClick={() => setVideoOpen(false)} className="btn-secondary w-full justify-center">
              {t('modal.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function Consultants() {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('all');
  const [activeConsultant, setActiveConsultant] = useState<Consultant | null>(null);
  useScrollReveal();

  const specFilters = [
    { key: 'all',         label: t('consultants.spec.all') },
    { key: 'psychiatry',  label: t('consultants.spec.psychiatry') },
    { key: 'trauma',      label: t('consultants.spec.trauma') },
    { key: 'detox',       label: t('consultants.spec.detox') },
    { key: 'behavioral',  label: t('consultants.spec.behavioral') },
    { key: 'family',      label: t('consultants.spec.family') },
    { key: 'neurological',label: t('consultants.spec.neurological') },
  ];

  const filtered = mockConsultants.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.specialization.toLowerCase().includes(search.toLowerCase());
    const matchSpec =
      selectedSpec === 'all' || c.specialization.toLowerCase().includes(selectedSpec.toLowerCase());
    return matchSearch && matchSpec;
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-sage-800 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sage-300 text-sm font-semibold uppercase tracking-widest">{t('consultants.label')}</span>
          <h1 className="text-4xl md:text-5xl text-white mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('consultants.title')}
          </h1>
          <p className="text-sage-300 text-lg max-w-2xl mx-auto">
            {t('consultants.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
            <input
              type="text"
              placeholder={t('consultants.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-sage-500 shrink-0" />
            {specFilters.map((spec) => (
              <button
                key={spec.key}
                onClick={() => setSelectedSpec(spec.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedSpec === spec.key
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'bg-white text-sage-600 border border-sage-200 hover:border-sage-400'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          {filtered.length} {filtered.length !== 1 ? t('consultants.found.plural') : t('consultants.found.singular')}
        </p>

        {/* Consultant Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((consultant, i) => (
            <div
              key={consultant.id}
              className={`card group flex flex-col cursor-pointer reveal stagger-${Math.min(i + 1, 5)}`}
              onClick={() => setActiveConsultant(consultant)}
            >
              {/* Image with hover overlay */}
              <div className="relative h-60 overflow-hidden bg-sage-100">
                <img
                  src={consultant.imageUrl}
                  alt={consultant.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Title badge — always visible */}
                <div className="absolute top-4 left-4">
                  <span className="badge bg-sage-600 text-white text-xs">{consultant.title}</span>
                </div>

                {/* Hover overlay — slides up */}
                <div className="absolute inset-0 bg-gradient-to-t from-sage-900 via-sage-800/80 to-sage-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out flex flex-col justify-end p-5">
                  <p className="text-white/90 text-sm leading-relaxed line-clamp-4 mb-4">
                    {consultant.bio}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="flex-1 bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-2 rounded-lg text-center backdrop-blur-sm">
                      {t('consultants.viewFull')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex-1 flex flex-col">
                <h3
                  className="text-xl font-bold text-charcoal mb-0.5 group-hover:text-sage-700 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {consultant.name}
                </h3>
                <p className="text-sage-500 text-sm font-medium mb-4">{consultant.specialization}</p>

                {/* Credentials preview */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {consultant.credentials.slice(0, 2).map((c) => (
                    <span key={c} className="flex items-center gap-1 badge bg-sage-50 border border-sage-100 text-sage-700 text-xs">
                      <Star className="w-3 h-3 text-sage-400" fill="currentColor" /> {c}
                    </span>
                  ))}
                  {consultant.credentials.length > 2 && (
                    <span className="badge bg-gray-50 border border-gray-100 text-gray-400 text-xs">
                      +{consultant.credentials.length - 2} more
                    </span>
                  )}
                </div>

                {/* Languages */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-sage-400" />
                    {consultant.languages.join(', ')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    className="btn-secondary flex-1 justify-center text-sm py-2.5"
                    onClick={(e) => { e.stopPropagation(); setActiveConsultant(consultant); }}
                  >
                    {t('consultants.viewProfile')}
                  </button>
                  <Link
                    to={`/booking/consultant?consultant=${consultant.id}`}
                    className="btn-primary flex-1 justify-center text-sm py-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t('consultants.book')} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-sage-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-charcoal mb-2">{t('consultants.noFound.title')}</h3>
            <p className="text-gray-400">{t('consultants.noFound.subtitle')}</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {activeConsultant && (
        <ConsultantModal
          consultant={activeConsultant}
          onClose={() => setActiveConsultant(null)}
        />
      )}
    </div>
  );
}
