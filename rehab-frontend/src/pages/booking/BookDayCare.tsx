import BookingForm from '../../components/booking/BookingForm';
import { Sun, Coffee, Truck } from 'lucide-react';

const programs = [
  { id: 'full', name: 'Full Day Program (8:00 AM – 6:00 PM)' },
  { id: 'half-am', name: 'Morning Program (8:00 AM – 12:00 PM)' },
  { id: 'half-pm', name: 'Afternoon Program (2:00 PM – 6:00 PM)' },
];

export default function BookDayCare() {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sage-500 text-sm font-semibold uppercase tracking-widest">Booking</span>
          <h1 className="text-4xl font-bold text-sage-900 mt-2 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Book Day Care
          </h1>
          <p className="text-sage-600 max-w-xl mx-auto">
            Choose your preferred program schedule. Our day care provides a structured, supportive environment throughout the day.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start">
            <div className="w-10 h-10 bg-warm-100 rounded-xl flex items-center justify-center shrink-0">
              <Sun className="w-5 h-5 text-warm-600" />
            </div>
            <div>
              <div className="font-semibold text-sage-900 text-sm">Flexible Schedules</div>
              <div className="text-sage-500 text-xs mt-1">Full day, morning, or afternoon programs available.</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start">
            <div className="w-10 h-10 bg-warm-100 rounded-xl flex items-center justify-center shrink-0">
              <Coffee className="w-5 h-5 text-warm-600" />
            </div>
            <div>
              <div className="font-semibold text-sage-900 text-sm">Meals Included</div>
              <div className="text-sage-500 text-xs mt-1">Chef-prepared nutritious meals throughout the day.</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start">
            <div className="w-10 h-10 bg-warm-100 rounded-xl flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-warm-600" />
            </div>
            <div>
              <div className="font-semibold text-sage-900 text-sm">Transport Available</div>
              <div className="text-sage-500 text-xs mt-1">Comfortable pickup and drop-off service.</div>
            </div>
          </div>
        </div>

        <BookingForm
          service={{
            type: 'daycare',
            label: 'Day Care Program',
            options: programs,
          }}
        />
      </div>
    </div>
  );
}
