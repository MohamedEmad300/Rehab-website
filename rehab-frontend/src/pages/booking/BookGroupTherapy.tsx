import { useSearchParams } from 'react-router-dom';
import BookingForm from '../../components/booking/BookingForm';
import { Users, Heart, Star } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const programs = [
  { id: '1', name: 'Foundations of Recovery (Mon & Thu, 10 AM)' },
  { id: '2', name: 'Healing Connections (Tue & Sat, 2 PM)' },
  { id: '3', name: 'Mindfulness & Resilience (Wed & Fri, 9 AM)' },
  { id: '4', name: 'Family Reconnect (Sunday, 11 AM)' },
  { id: '5', name: 'Trauma Release & Recovery (Mon & Wed, 3 PM)' },
  { id: '6', name: 'Life Skills Workshop (Thu & Sat, 4 PM)' },
];

export default function BookGroupTherapy() {
  const [params] = useSearchParams();
  const preselected = params.get('program') ?? '';
  const { t } = useLang();

  const features = [
    { icon: <Users className="w-5 h-5 text-sand-600" />, titleKey: 'bookGroup.feat1.title', descKey: 'bookGroup.feat1.desc' },
    { icon: <Heart className="w-5 h-5 text-sand-600" />, titleKey: 'bookGroup.feat2.title', descKey: 'bookGroup.feat2.desc' },
    { icon: <Star className="w-5 h-5 text-sand-600" />,  titleKey: 'bookGroup.feat3.title', descKey: 'bookGroup.feat3.desc' },
  ];

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">{t('bookGroup.label')}</span>
          <h1 className="text-4xl font-bold text-sage-900 mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('bookGroup.title')}
          </h1>
          <p className="text-sage-600 max-w-xl mx-auto">
            {t('bookGroup.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {features.map((f) => (
            <div key={f.titleKey} className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start">
              <div className="w-10 h-10 bg-sand-100 rounded-xl flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <div className="font-semibold text-sage-900 text-sm">{t(f.titleKey)}</div>
                <div className="text-sage-500 text-xs mt-1">{t(f.descKey)}</div>
              </div>
            </div>
          ))}
        </div>

        <BookingForm
          service={{
            type: 'group-therapy',
            label: t('bookGroup.title'),
            options: programs,
            preselectedId: preselected,
          }}
        />
      </div>
    </div>
  );
}
