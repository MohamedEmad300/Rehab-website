import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Clock, Calendar, ChevronRight, Tag } from 'lucide-react';
import type { TherapyProgram } from '../types';
import { useLang } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

const mockPrograms: TherapyProgram[] = [
  {
    id: '1',
    name: 'Foundations of Recovery',
    therapist: 'Dr. Youssef Nasser',
    type: 'Cognitive Behavioral Therapy',
    description: 'A structured 12-week program using CBT techniques to identify negative thought patterns and replace them with healthy coping strategies.',
    duration: '90 min / session',
    schedule: 'Mon & Thu, 10:00 AM',
    capacity: 8,
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
    tags: ['CBT', 'Addiction', 'Beginner-Friendly'],
  },
  {
    id: '2',
    name: 'Healing Connections',
    therapist: 'Dr. Amina Khalil',
    type: 'Interpersonal Therapy',
    description: 'Focuses on improving relationships and communication skills. Ideal for those whose recovery is tied to interpersonal challenges.',
    duration: '2 hours / session',
    schedule: 'Tue & Sat, 2:00 PM',
    capacity: 6,
    imageUrl: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80',
    tags: ['Relationships', 'Communication', 'Intermediate'],
  },
  {
    id: '3',
    name: 'Mindfulness & Resilience',
    therapist: 'Dr. Omar Farouk',
    type: 'Mindfulness-Based Stress Reduction',
    description: 'An 8-week mindfulness program that teaches meditation, body-scan techniques, and mindful movement to manage stress and cravings.',
    duration: '75 min / session',
    schedule: 'Wed & Fri, 9:00 AM',
    capacity: 10,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    tags: ['Mindfulness', 'Stress', 'All Levels'],
  },
  {
    id: '4',
    name: 'Family Reconnect',
    therapist: 'Dr. Rania Ibrahim',
    type: 'Family Systems Therapy',
    description: 'Bringing families together to heal relationships, rebuild trust, and create a strong support system for long-term recovery.',
    duration: '2 hours / session',
    schedule: 'Sunday, 11:00 AM',
    capacity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80',
    tags: ['Family', 'Relationships', 'Support'],
  },
  {
    id: '5',
    name: 'Trauma Release & Recovery',
    therapist: 'Dr. Youssef Nasser',
    type: 'EMDR & Somatic Therapy',
    description: 'Specialized group sessions for trauma survivors using EMDR and somatic techniques to safely process and release traumatic memories.',
    duration: '2 hours / session',
    schedule: 'Mon & Wed, 3:00 PM',
    capacity: 6,
    imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80',
    tags: ['Trauma', 'PTSD', 'EMDR', 'Advanced'],
  },
  {
    id: '6',
    name: 'Life Skills Workshop',
    therapist: 'Dr. Omar Farouk',
    type: 'Psychoeducation & Skill Building',
    description: 'Practical sessions covering essential life skills: financial planning, communication, conflict resolution, and relapse prevention strategies.',
    duration: '60 min / session',
    schedule: 'Thu & Sat, 4:00 PM',
    capacity: 12,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    tags: ['Life Skills', 'Prevention', 'Practical'],
  },
];

const arPrograms: Record<string, { name: string; type: string; description: string; schedule: string; tags: string[] }> = {
  '1': {
    name: 'أسس التعافي',
    type: 'العلاج السلوكي المعرفي',
    description: 'برنامج منظم لمدة 12 أسبوعاً يستخدم تقنيات العلاج المعرفي السلوكي لتحديد أنماط التفكير السلبية واستبدالها باستراتيجيات تكيّف صحية.',
    schedule: 'الاثنين والخميس، 10:00 صباحاً',
    tags: ['العلاج المعرفي', 'الإدمان', 'مناسب للمبتدئين'],
  },
  '2': {
    name: 'روابط الشفاء',
    type: 'العلاج الشخصي',
    description: 'يركز على تحسين العلاقات ومهارات التواصل. مثالي لمن يرتبط تعافيهم بتحديات شخصية.',
    schedule: 'الثلاثاء والسبت، 2:00 مساءً',
    tags: ['العلاقات', 'التواصل', 'متوسط'],
  },
  '3': {
    name: 'اليقظة الذهنية والمرونة',
    type: 'الحد من التوتر بالتأمل',
    description: 'برنامج تأمل لمدة 8 أسابيع يعلّم تقنيات التأمل وفحص الجسم والحركة الواعية لإدارة التوتر والرغبات.',
    schedule: 'الأربعاء والجمعة، 9:00 صباحاً',
    tags: ['التأمل', 'التوتر', 'جميع المستويات'],
  },
  '4': {
    name: 'إعادة التواصل الأسري',
    type: 'علاج الأنظمة الأسرية',
    description: 'إعادة توحيد الأسر لشفاء العلاقات وإعادة بناء الثقة وخلق نظام دعم قوي للتعافي طويل الأمد.',
    schedule: 'الأحد، 11:00 صباحاً',
    tags: ['العائلة', 'العلاقات', 'الدعم'],
  },
  '5': {
    name: 'تحرير الصدمات والتعافي',
    type: 'علاج EMDR والجسد',
    description: 'جلسات جماعية متخصصة لناجين من الصدمات تستخدم تقنيات EMDR والجسدية لمعالجة الذكريات الصادمة وتحريرها بأمان.',
    schedule: 'الاثنين والأربعاء، 3:00 مساءً',
    tags: ['الصدمة', 'اضطراب ما بعد الصدمة', 'EMDR', 'متقدم'],
  },
  '6': {
    name: 'ورشة مهارات الحياة',
    type: 'التثقيف النفسي وبناء المهارات',
    description: 'جلسات عملية تغطي مهارات الحياة الأساسية: التخطيط المالي والتواصل وحل النزاعات واستراتيجيات الوقاية من الانتكاسة.',
    schedule: 'الخميس والسبت، 4:00 مساءً',
    tags: ['مهارات الحياة', 'الوقاية', 'عملي'],
  },
};

const typeColors: Record<string, string> = {
  CBT: 'bg-sage-50 text-sage-700 border-sage-200',
  Addiction: 'bg-sand-50 text-sand-700 border-sand-200',
  Mindfulness: 'bg-warm-50 text-warm-700 border-warm-200',
  Trauma: 'bg-rose-50 text-rose-700 border-rose-200',
  Family: 'bg-blue-50 text-blue-700 border-blue-200',
  default: 'bg-gray-50 text-gray-600 border-gray-200',
};

function getTagColor(tag: string) {
  for (const key of Object.keys(typeColors)) {
    if (tag.includes(key)) return typeColors[key];
  }
  return typeColors.default;
}

export default function GroupTherapy() {
  const { t, isAr } = useLang();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  useScrollReveal();

  const typeFilters = [
    { key: 'all',       label: t('group.filter.all') },
    { key: 'cbt',       label: t('group.filter.cbt') },
    { key: 'mindfulness',label: t('group.filter.mindfulness') },
    { key: 'trauma',    label: t('group.filter.trauma') },
    { key: 'family',    label: t('group.filter.family') },
    { key: 'lifeSkills',label: t('group.filter.lifeSkills') },
  ];

  // Map filter keys to English tag fragments for matching
  const filterTagMap: Record<string, string> = {
    cbt: 'cbt', mindfulness: 'mindfulness', trauma: 'trauma', family: 'family', lifeSkills: 'life skills',
  };

  const filtered = mockPrograms.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.therapist.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase());
    const matchType =
      selectedType === 'all' ||
      p.tags.some((tag) => tag.toLowerCase().includes(filterTagMap[selectedType] ?? selectedType));
    return matchSearch && matchType;
  });

  const groupStats = [
    { value: '12+',  label: t('group.stat.programs') },
    { value: '6–12', label: t('group.stat.participants') },
    { value: '8–12', label: t('group.stat.weeks') },
    { value: '100%', label: t('group.stat.confidential') },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sage-800 to-sage-700 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sage-300 text-sm font-semibold uppercase tracking-widest">{t('group.label')}</span>
              <h1 className="text-4xl md:text-5xl text-white mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('group.title')}
              </h1>
              <p className="text-sage-200 text-lg leading-relaxed">
                {t('group.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {groupStats.map((s) => (
                <div key={s.label} className="bg-white/10 rounded-2xl p-5 text-center">
                  <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                  <div className="text-sage-300 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
            <input
              type="text"
              placeholder={t('group.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {typeFilters.map((type) => (
              <button
                key={type.key}
                onClick={() => setSelectedType(type.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedType === type.key
                    ? 'bg-sage-600 text-white'
                    : 'bg-white text-sage-600 border border-sage-200 hover:border-sage-400'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((program, i) => (
            <div key={program.id} className={`card flex flex-col reveal stagger-${Math.min(i + 1, 5)}`}>
              <div className="relative h-48 bg-sage-100">
                <img src={program.imageUrl} alt={program.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="badge bg-white text-sage-700 text-xs">
                    {isAr ? (arPrograms[program.id]?.type ?? program.type) : program.type}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-sage-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {isAr ? (arPrograms[program.id]?.name ?? program.name) : program.name}
                </h3>
                <p className="text-sage-500 text-sm mb-3">{t('group.ledBy')} {program.therapist}</p>
                <p className="text-sage-600 text-sm leading-relaxed mb-4 flex-1">
                  {isAr ? (arPrograms[program.id]?.description ?? program.description) : program.description}
                </p>

                {/* Info row */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-sage-600">
                  <div className="bg-sage-50 rounded-lg p-2 flex flex-col items-center gap-1">
                    <Clock className="w-4 h-4 text-sage-500" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="bg-sage-50 rounded-lg p-2 flex flex-col items-center gap-1 col-span-2">
                    <Calendar className="w-4 h-4 text-sage-500" />
                    <span>{isAr ? (arPrograms[program.id]?.schedule ?? program.schedule) : program.schedule}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-sage-500 mb-4">
                  <Users className="w-3.5 h-3.5" />
                  <span>{t('group.maxPart', { n: String(program.capacity) })}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(isAr ? (arPrograms[program.id]?.tags ?? program.tags) : program.tags).map((tag) => (
                    <span key={tag} className={`badge border text-xs ${getTagColor(tag)}`}>
                      <Tag className="w-3 h-3 mr-1" />{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/booking/group-therapy?program=${program.id}`}
                  className="btn-primary w-full justify-center text-sm"
                >
                  {t('group.bookSpot')} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-sage-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sage-700 mb-2">{t('group.noFound.title')}</h3>
            <p className="text-sage-400">{t('group.noFound.subtitle')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
