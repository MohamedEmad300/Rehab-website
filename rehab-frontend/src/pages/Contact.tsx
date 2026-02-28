import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2, Facebook, Instagram, Youtube, Twitter, Shield, Award, Heart } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const { t } = useLang();
  useScrollReveal();
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
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSubmitted(true);
  };

  const whyUs = [
    { icon: <Shield className="w-5 h-5" />, titleKey: 'contact.why.accredited.title', descKey: 'contact.why.accredited.desc' },
    { icon: <Award className="w-5 h-5" />,  titleKey: 'contact.why.expert.title',     descKey: 'contact.why.expert.desc' },
    { icon: <Heart className="w-5 h-5" />,  titleKey: 'contact.why.holistic.title',   descKey: 'contact.why.holistic.desc' },
    { icon: <Clock className="w-5 h-5" />,  titleKey: 'contact.why.support.title',    descKey: 'contact.why.support.desc' },
  ];

  const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, labelKey: 'contact.info.phone',   value: '+20 123 456 7890', href: 'tel:+201234567890' },
    { icon: <Mail className="w-5 h-5" />,  labelKey: 'contact.info.email',   value: 'info@serenityrecovery.com', href: 'mailto:info@serenityrecovery.com' },
    { icon: <MapPin className="w-5 h-5" />,labelKey: 'contact.info.address', valueKey: 'contact.info.address.val', href: '#' },
    { icon: <Clock className="w-5 h-5" />, labelKey: 'contact.info.hours',   valueKey: 'contact.info.hours.val', href: undefined },
  ];

  const callbackTimes = [
    { value: 'morning',   labelKey: 'contact.form.cb.morning' },
    { value: 'afternoon', labelKey: 'contact.form.cb.afternoon' },
    { value: 'evening',   labelKey: 'contact.form.cb.evening' },
  ];

  const subjects = [
    { value: 'General Inquiry',      labelKey: 'contact.form.subject.general' },
    { value: 'Book an Appointment',  labelKey: 'contact.form.subject.book' },
    { value: 'Event & Retreat Info', labelKey: 'contact.form.subject.event' },
    { value: 'Insurance & Billing',  labelKey: 'contact.form.subject.insurance' },
    { value: 'Career Opportunities', labelKey: 'contact.form.subject.career' },
    { value: 'Other',                labelKey: 'contact.form.subject.other' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-sage-800 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sage-300 text-sm font-semibold uppercase tracking-widest">{t('contact.label')}</span>
          <h1 className="text-4xl md:text-5xl text-white mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('contact.title')}
          </h1>
          <p className="text-sage-300 text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      {/* Why Us strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.titleKey} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sage-100 text-sage-600 rounded-xl flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-charcoal text-sm">{t(item.titleKey)}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{t(item.descKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-sage-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('contact.info.title')}
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.labelKey} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center text-sage-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-sage-500 font-medium mb-0.5">{t(item.labelKey)}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sage-800 text-sm font-medium hover:text-sage-600 transition-colors">
                          {'valueKey' in item ? t(item.valueKey as string) : item.value}
                        </a>
                      ) : (
                        <span className="text-sage-800 text-sm font-medium">
                          {'valueKey' in item ? t(item.valueKey as string) : item.value}
                        </span>
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
                <span className="text-sm">{t('contact.map.placeholder')}</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-sage-900 mb-4">{t('contact.social.title')}</h3>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Facebook" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" aria-label="YouTube" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Twitter" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://wa.me/" aria-label="WhatsApp" className="w-9 h-9 bg-sage-700 hover:bg-warm-500 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:shadow-[0_0_14px_rgba(97,64,144,0.45)]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
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
                    {t('contact.form.success.title')}
                  </h3>
                  <p className="text-sage-600 mb-2">
                    {t('contact.form.success.thank')} <strong>{form.name}</strong>.
                  </p>
                  <p className="text-sage-500 text-sm mb-8">
                    {t('contact.form.success.reply')} <strong>{form.email}</strong> {t('contact.form.success.hours')}
                    {form.requestCallback && ` ${t('contact.form.success.callback')}`}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', subject: '', message: '', requestCallback: false, callbackTime: '' });
                    }}
                    className="btn-secondary"
                  >
                    {t('contact.form.success.again')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-sage-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('contact.form.title')}
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">{t('contact.form.name.label')}</label>
                      <input required type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className="input-field" placeholder={t('contact.form.name.ph')} />
                    </div>
                    <div>
                      <label className="label">{t('contact.form.phone.label')}</label>
                      <input required type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input-field" placeholder={t('contact.form.phone.ph')} />
                    </div>
                  </div>

                  <div>
                    <label className="label">{t('contact.form.email.label')}</label>
                    <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input-field" placeholder={t('contact.form.email.ph')} />
                  </div>

                  <div>
                    <label className="label">{t('contact.form.subject.label')}</label>
                    <select required value={form.subject} onChange={(e) => update('subject', e.target.value)} className="input-field">
                      <option value="">{t('contact.form.subject.ph')}</option>
                      {subjects.map((s) => (
                        <option key={s.value} value={s.value}>{t(s.labelKey)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">{t('contact.form.message.label')}</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input-field min-h-32 resize-none"
                      placeholder={t('contact.form.message.ph')}
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
                          <Phone className="w-4 h-4 text-sage-600" /> {t('contact.form.callback.title')}
                        </div>
                        <div className="text-sage-500 text-sm mt-0.5">{t('contact.form.callback.desc')}</div>
                      </div>
                    </label>

                    {form.requestCallback && (
                      <div className="mt-4 pl-7">
                        <label className="label">{t('events.cb.time.label')}</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {callbackTimes.map((ct) => (
                            <button
                              key={ct.value}
                              type="button"
                              onClick={() => update('callbackTime', ct.value)}
                              className={`px-4 py-2 rounded-xl text-sm border-2 transition-all ${
                                form.callbackTime === ct.value
                                  ? 'border-sage-500 bg-white text-sage-700 font-medium'
                                  : 'border-sage-200 text-sage-600 hover:border-sage-300'
                              }`}
                            >
                              {t(ct.labelKey)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-4">
                    {loading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> {t('contact.form.sending')}</>
                    ) : (
                      <><Send className="w-5 h-5" /> {t('contact.form.send')}</>
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
