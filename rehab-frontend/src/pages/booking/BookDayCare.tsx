import BookingForm from '../../components/booking/BookingForm';
import { Sun, Coffee, Truck } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';

const programs = [
  { id: 'full',    name: 'Full Day Program (8:00 AM – 6:00 PM)' },
  { id: 'half-am', name: 'Morning Program (8:00 AM – 12:00 PM)' },
  { id: 'half-pm', name: 'Afternoon Program (2:00 PM – 6:00 PM)' },
];

export default function BookDayCare() {
  const { t } = useLang();

  const features = [
    { icon: <Sun className="w-5 h-5 text-warm-600" />,   titleKey: 'bookDaycare.feat1.title', descKey: 'bookDaycare.feat1.desc' },
    { icon: <Coffee className="w-5 h-5 text-warm-600" />, titleKey: 'bookDaycare.feat2.title', descKey: 'bookDaycare.feat2.desc' },
    { icon: <Truck className="w-5 h-5 text-warm-600" />,  titleKey: 'bookDaycare.feat3.title', descKey: 'bookDaycare.feat3.desc' },
  ];

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">{t('bookDaycare.label')}</span>
          <h1 className="text-4xl font-bold text-sage-900 mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('bookDaycare.title')}
          </h1>
          <p className="text-sage-600 max-w-xl mx-auto">
            {t('bookDaycare.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {features.map((f) => (
            <div key={f.titleKey} className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start">
              <div className="w-10 h-10 bg-warm-100 rounded-xl flex items-center justify-center shrink-0">
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
            type: 'daycare',
            label: t('bookDaycare.title'),
            options: programs,
          }}
        />
      </div>
    </div>
  );
}
