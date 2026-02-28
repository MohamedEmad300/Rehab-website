import { useSearchParams } from 'react-router-dom';
import BookingForm from '../../components/booking/BookingForm';
import { Heart, Shield, Clock } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const consultants = [
  { id: '1', name: 'Dr. Amina Khalil – Addiction Medicine & Psychiatry' },
  { id: '2', name: 'Dr. Youssef Nasser – Trauma & PTSD' },
  { id: '3', name: 'Dr. Layla Hassan – Detoxification' },
  { id: '4', name: 'Dr. Omar Farouk – CBT & Behavioral Therapy' },
  { id: '5', name: 'Dr. Rania Ibrahim – Family Therapy' },
  { id: '6', name: 'Dr. Khaled Mansour – Neuropsychology' },
];

export default function BookConsultant() {
  const [params] = useSearchParams();
  const preselected = params.get('consultant') ?? '';
  const { t } = useLang();

  const features = [
    { icon: <Heart className="w-5 h-5 text-sage-600" />,  titleKey: 'bookConsultant.feat1.title', descKey: 'bookConsultant.feat1.desc' },
    { icon: <Shield className="w-5 h-5 text-sage-600" />, titleKey: 'bookConsultant.feat2.title', descKey: 'bookConsultant.feat2.desc' },
    { icon: <Clock className="w-5 h-5 text-sage-600" />,  titleKey: 'bookConsultant.feat3.title', descKey: 'bookConsultant.feat3.desc' },
  ];

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">{t('bookConsultant.label')}</span>
          <h1 className="text-4xl font-bold text-charcoal mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('bookConsultant.title')}
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('bookConsultant.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {features.map((f) => (
            <div key={f.titleKey} className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start">
              <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <div className="font-semibold text-charcoal text-sm">{t(f.titleKey)}</div>
                <div className="text-gray-400 text-xs mt-1">{t(f.descKey)}</div>
              </div>
            </div>
          ))}
        </div>

        <BookingForm
          service={{
            type: 'consultant',
            label: t('bookConsultant.title'),
            options: consultants,
            preselectedId: preselected,
          }}
        />
      </div>
    </div>
  );
}
