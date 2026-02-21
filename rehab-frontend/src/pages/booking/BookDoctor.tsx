import { useSearchParams } from 'react-router-dom';
import BookingForm from '../../components/booking/BookingForm';
import { Heart, Shield, Clock } from 'lucide-react';

const doctors = [
  { id: '1', name: 'Dr. Amina Khalil – Addiction Medicine & Psychiatry' },
  { id: '2', name: 'Dr. Youssef Nasser – Trauma & PTSD' },
  { id: '3', name: 'Dr. Layla Hassan – Detoxification' },
  { id: '4', name: 'Dr. Omar Farouk – CBT & Behavioral Therapy' },
  { id: '5', name: 'Dr. Rania Ibrahim – Family Therapy' },
  { id: '6', name: 'Dr. Khaled Mansour – Neuropsychology' },
];

export default function BookDoctor() {
  const [params] = useSearchParams();
  const preselected = params.get('doctor') ?? '';

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">Booking</span>
          <h1 className="text-4xl font-bold text-sage-900 mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Book a Doctor Session
          </h1>
          <p className="text-sage-600 max-w-xl mx-auto">
            One-on-one care with a certified specialist. Choose your doctor, pick a time, and take the next step in your recovery.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start">
            <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-sage-600" />
            </div>
            <div>
              <div className="font-semibold text-sage-900 text-sm">Personalized Care</div>
              <div className="text-sage-500 text-xs mt-1">Tailored treatment plans designed for your unique journey.</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start">
            <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-sage-600" />
            </div>
            <div>
              <div className="font-semibold text-sage-900 text-sm">100% Confidential</div>
              <div className="text-sage-500 text-xs mt-1">Your privacy and information are fully protected.</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start">
            <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-sage-600" />
            </div>
            <div>
              <div className="font-semibold text-sage-900 text-sm">60-Minute Sessions</div>
              <div className="text-sage-500 text-xs mt-1">Uninterrupted time to discuss your needs and goals.</div>
            </div>
          </div>
        </div>

        <BookingForm
          service={{
            type: 'doctor',
            label: 'Doctor Session',
            options: doctors,
            preselectedId: preselected,
          }}
        />
      </div>
    </div>
  );
}
