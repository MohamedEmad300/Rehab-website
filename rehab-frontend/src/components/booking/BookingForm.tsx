import { useState } from 'react';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, FileText, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

export type BookingService = {
  type: 'doctor' | 'group-therapy' | 'daycare';
  label: string;
  options?: { id: string; name: string }[];
  preselectedId?: string;
};

interface BookingFormProps {
  service: BookingService;
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM',
];

const steps = ['Select Service', 'Pick Date & Time', 'Your Details', 'Confirm'];

export default function BookingForm({ service }: BookingFormProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    serviceId: service.preselectedId || (service.options?.[0]?.id ?? ''),
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const canProceed = () => {
    if (step === 0) return !service.options || form.serviceId !== '';
    if (step === 1) return form.date !== '' && form.time !== '';
    if (step === 2) return form.name && form.email && form.phone;
    return true;
  };

  const next = () => {
    if (step < 3) setStep((s) => s + 1);
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const submit = async () => {
    setLoading(true);
    // API call placeholder
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setDone(true);
  };

  const getServiceName = () => {
    if (!service.options) return service.label;
    return service.options.find((o) => o.id === form.serviceId)?.name ?? service.label;
  };

  if (done) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-sage-600" />
        </div>
        <h2 className="text-2xl font-bold text-sage-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Booking Confirmed!
        </h2>
        <p className="text-sage-600 mb-2">
          Thank you, <strong>{form.name}</strong>. Your appointment has been received.
        </p>
        <p className="text-sage-500 text-sm mb-8">
          A confirmation will be sent to <strong>{form.email}</strong>. We'll contact you to finalize details.
        </p>
        <div className="bg-sage-50 rounded-2xl p-6 max-w-sm mx-auto text-left mb-8 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-sage-500">Service</span>
            <span className="text-sage-800 font-medium">{getServiceName()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sage-500">Date</span>
            <span className="text-sage-800 font-medium">{new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sage-500">Time</span>
            <span className="text-sage-800 font-medium">{form.time}</span>
          </div>
        </div>
        <button onClick={() => { setDone(false); setStep(0); setForm({ serviceId: service.preselectedId || '', date: '', time: '', name: '', email: '', phone: '', notes: '' }); }} className="btn-secondary">
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center gap-2 ${i <= step ? 'text-sage-700' : 'text-sage-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < step ? 'bg-sage-600 text-white' : i === step ? 'bg-sage-600 text-white ring-4 ring-sage-100' : 'bg-sage-100 text-sage-400'
              }`}>
                {i < step ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className="hidden sm:block text-xs font-medium">{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px w-8 sm:w-16 mx-2 transition-colors ${i < step ? 'bg-sage-500' : 'bg-sage-100'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-card p-8">
        {/* Step 0: Select Service */}
        {step === 0 && (
          <div>
            <h3 className="text-xl font-bold text-sage-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Select {service.label}
            </h3>
            {service.options && service.options.length > 0 ? (
              <div className="space-y-3">
                {service.options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      form.serviceId === opt.id ? 'border-sage-500 bg-sage-50' : 'border-sage-100 hover:border-sage-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={opt.id}
                      checked={form.serviceId === opt.id}
                      onChange={() => update('serviceId', opt.id)}
                      className="accent-sage-600 w-4 h-4"
                    />
                    <span className="font-medium text-sage-800">{opt.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="bg-sage-50 rounded-xl p-5 text-sage-700">
                You are booking: <strong>{service.label}</strong>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-sage-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Choose Date & Time
            </h3>
            <div className="mb-6">
              <label className="label flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sage-500" /> Preferred Date
              </label>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => update('date', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="label flex items-center gap-2">
                <Clock className="w-4 h-4 text-sage-500" /> Preferred Time
              </label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => update('time', slot)}
                    className={`py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      form.time === slot
                        ? 'border-sage-500 bg-sage-50 text-sage-700'
                        : 'border-sage-100 text-sage-600 hover:border-sage-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-sage-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label flex items-center gap-2">
                  <User className="w-4 h-4 text-sage-500" /> Full Name
                </label>
                <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className="input-field" placeholder="Your full name" />
              </div>
              <div>
                <label className="label flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sage-500" /> Email Address
                </label>
                <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className="input-field" placeholder="your@email.com" />
              </div>
              <div>
                <label className="label flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sage-500" /> Phone Number
                </label>
                <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input-field" placeholder="+20 xxx xxx xxxx" />
              </div>
              <div>
                <label className="label flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sage-500" /> Additional Notes <span className="text-sage-400 font-normal">(optional)</span>
                </label>
                <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} className="input-field min-h-24 resize-none" placeholder="Any relevant information about your situation or specific needs..." />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-sage-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Confirm Booking
            </h3>
            <div className="bg-sage-50 rounded-2xl p-6 space-y-4 mb-6">
              {[
                { label: 'Service', value: getServiceName() },
                { label: 'Date', value: form.date ? new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : '' },
                { label: 'Time', value: form.time },
                { label: 'Name', value: form.name },
                { label: 'Email', value: form.email },
                { label: 'Phone', value: form.phone },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-4">
                  <span className="text-sage-500 text-sm shrink-0">{label}</span>
                  <span className="text-sage-800 text-sm font-medium text-right">{value}</span>
                </div>
              ))}
              {form.notes && (
                <div>
                  <span className="text-sage-500 text-sm block mb-1">Notes</span>
                  <span className="text-sage-800 text-sm">{form.notes}</span>
                </div>
              )}
            </div>
            <p className="text-sage-500 text-sm">
              By confirming, you agree to our cancellation policy. A team member will contact you to finalize details.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-sage-100">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              step === 0 ? 'text-sage-300 cursor-not-allowed' : 'text-sage-600 hover:bg-sage-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canProceed()}
              className={`btn-primary text-sm ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={loading}
              className="btn-primary text-sm min-w-36 justify-center"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
              ) : (
                <>Confirm Booking <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
