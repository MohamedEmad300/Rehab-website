import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2, Facebook, Instagram, Youtube } from 'lucide-react';

const contactInfo = [
  { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+20 123 456 7890', href: 'tel:+201234567890' },
  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'info@serenityrehab.com', href: 'mailto:info@serenityrehab.com' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: '123 Healing Way, Serenity Valley, Cairo', href: '#' },
  { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Sat – Thu: 8 AM – 8 PM', href: undefined },
];

const callbackTimes = [
  { value: 'morning', label: 'Morning (9 AM – 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM – 4 PM)' },
  { value: 'evening', label: 'Evening (4 PM – 7 PM)' },
];

const subjects = [
  'General Inquiry',
  'Book an Appointment',
  'Event & Retreat Info',
  'Insurance & Billing',
  'Career Opportunities',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    requestCallback: false,
    callbackTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API call placeholder
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-sage-800 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sage-300 text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl text-white mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            We're Here For You
          </h1>
          <p className="text-sage-300 text-lg max-w-2xl mx-auto">
            Have questions? Need guidance? Our compassionate team is ready to help — reach out and take the first step.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-sage-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center text-sage-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-sage-500 font-medium mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sage-800 text-sm font-medium hover:text-sage-600 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sage-800 text-sm font-medium">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-52 bg-sage-100 relative">
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-sage-400">
                <MapPin className="w-8 h-8 text-sage-400" />
                <span className="text-sm">Interactive map will be embedded here</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-sage-900 mb-4">Follow Us</h3>
              <div className="flex items-center gap-3">
                <a href="#" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
                <a href="#" className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="#" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-card p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-sage-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-sage-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Message Sent!
                  </h3>
                  <p className="text-sage-600 mb-2">Thank you, <strong>{form.name}</strong>.</p>
                  <p className="text-sage-500 text-sm mb-8">
                    We'll get back to you at <strong>{form.email}</strong> within 24 hours.
                    {form.requestCallback && ' A team member will also call you at your preferred time.'}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', subject: '', message: '', requestCallback: false, callbackTime: '' });
                    }}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-sage-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Send Us a Message
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Full Name *</label>
                      <input required type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className="input-field" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="label">Phone Number *</label>
                      <input required type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input-field" placeholder="+20 xxx xxx xxxx" />
                    </div>
                  </div>

                  <div>
                    <label className="label">Email Address *</label>
                    <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input-field" placeholder="your@email.com" />
                  </div>

                  <div>
                    <label className="label">Subject *</label>
                    <select required value={form.subject} onChange={(e) => update('subject', e.target.value)} className="input-field">
                      <option value="">Select a subject...</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">Message *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input-field min-h-32 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Callback Request */}
                  <div className={`rounded-2xl border-2 p-5 transition-all ${form.requestCallback ? 'border-sage-400 bg-sage-50' : 'border-sage-100'}`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.requestCallback}
                        onChange={(e) => update('requestCallback', e.target.checked)}
                        className="mt-1 accent-sage-600 w-4 h-4"
                      />
                      <div>
                        <div className="font-medium text-sage-900 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-sage-600" /> Request a Callback
                        </div>
                        <div className="text-sage-500 text-sm mt-0.5">A team member will call you within 2 business hours.</div>
                      </div>
                    </label>

                    {form.requestCallback && (
                      <div className="mt-4 pl-7">
                        <label className="label">Preferred Call Time</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {callbackTimes.map((t) => (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() => update('callbackTime', t.value)}
                              className={`px-4 py-2 rounded-xl text-sm border-2 transition-all ${
                                form.callbackTime === t.value
                                  ? 'border-sage-500 bg-white text-sage-700 font-medium'
                                  : 'border-sage-200 text-sage-600 hover:border-sage-300'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-4">
                    {loading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
