import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Play, Phone, ArrowRight, Tag, ChevronRight, X } from 'lucide-react';
import type { Event } from '../types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Desert Renewal Retreat',
    type: 'retreat',
    date: '2026-03-15',
    endDate: '2026-03-18',
    location: 'Sinai Wilderness, Egypt',
    description: 'A transformative 4-day immersive retreat in the serene Sinai Desert. Guided meditation, therapeutic sessions, stargazing, and reconnecting with nature. Limited to 20 participants for a deeply personal experience.',
    capacity: 20,
    price: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    tags: ['Nature', 'Meditation', 'Intensive', 'Limited Spots'],
  },
  {
    id: '2',
    title: 'Spring Wellness Weekend',
    type: 'retreat',
    date: '2026-04-05',
    endDate: '2026-04-07',
    location: 'Serenity Rehab, Cairo',
    description: 'A refreshing 2-night retreat at our main facility. Features yoga, sound healing, nutrition workshops, and one-on-one therapy sessions in a supportive community setting.',
    capacity: 30,
    price: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    tags: ['Weekend', 'Yoga', 'Nutrition', 'Community'],
  },
  {
    id: '3',
    title: 'Understanding Addiction: A Family Workshop',
    type: 'workshop',
    date: '2026-03-08',
    location: 'Serenity Rehab, Cairo',
    description: 'A full-day educational workshop for families of individuals in recovery. Learn about addiction science, communication strategies, and how to build a healthy support system at home.',
    capacity: 40,
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&q=80',
    tags: ['Family', 'Education', 'Free Lunch Included'],
  },
  {
    id: '4',
    title: 'Annual Recovery Gala & Awards',
    type: 'event',
    date: '2026-05-20',
    location: 'Grand Ballroom, Cairo Marriott',
    description: 'Our annual celebration of courage and recovery. Honoring community champions, featuring keynote speakers, and raising funds for subsidized treatment programs.',
    capacity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    tags: ['Celebration', 'Community', 'Gala', 'Fundraiser'],
  },
  {
    id: '5',
    title: 'Mindfulness in Nature: Day Walk',
    type: 'event',
    date: '2026-03-22',
    location: 'Wadi Degla Protectorate, Cairo',
    description: 'A guided therapeutic walk through Wadi Degla with mindfulness exercises, breathwork, and peer bonding. Open to current and former patients and their families.',
    capacity: 25,
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    tags: ['Outdoors', 'Mindfulness', 'Community', 'Beginner-Friendly'],
  },
  {
    id: '6',
    title: 'Creative Healing: Art Therapy Exhibition',
    type: 'event',
    date: '2026-04-15',
    location: 'Serenity Rehab Gallery, Cairo',
    description: 'An exhibition showcasing artwork created by patients as part of our art therapy program. A moving celebration of healing, expression, and transformation. Open to the public.',
    capacity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    tags: ['Art', 'Community', 'Open to Public', 'Free Entry'],
  },
];

const typeConfig = {
  retreat: { label: 'Retreat', color: 'bg-sage-600 text-white' },
  workshop: { label: 'Workshop', color: 'bg-sand-500 text-white' },
  event: { label: 'Event', color: 'bg-warm-500 text-white' },
};

const filterTypes = ['All', 'Retreat', 'Workshop', 'Event'];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr);
  return { day: d.getDate(), month: d.toLocaleString('en-US', { month: 'short' }) };
}

export default function Events() {
  const [filter, setFilter] = useState('All');
  const [callbackModal, setCallbackModal] = useState<Event | null>(null);
  const [videoModal, setVideoModal] = useState<Event | null>(null);
  const [callbackForm, setCallbackForm] = useState({ name: '', phone: '', email: '', time: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = mockEvents.filter(
    (e) => filter === 'All' || e.type === filter.toLowerCase()
  );

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCallbackModal(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden bg-sage-900">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=70')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="video-overlay absolute inset-0" />
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="text-sage-300 text-sm font-semibold uppercase tracking-widest">Upcoming</span>
          <h1 className="text-4xl md:text-5xl text-white mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Events & Retreats
          </h1>
          <p className="text-sage-200 text-lg max-w-2xl mx-auto">
            Curated experiences that inspire, heal, and connect. From intimate retreats to community celebrations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter tabs */}
        <div className="flex items-center gap-3 mb-10 flex-wrap">
          {filterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filter === type
                  ? 'bg-sage-600 text-white shadow'
                  : 'bg-white text-sage-600 border border-sage-200 hover:border-sage-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Event Cards */}
        <div className="space-y-6">
          {filtered.map((event) => {
            const dateInfo = formatDateShort(event.date);
            const cfg = typeConfig[event.type];
            return (
              <div key={event.id} className="card flex flex-col md:flex-row overflow-hidden">
                {/* Date badge */}
                <div className="hidden md:flex flex-col items-center justify-center w-24 bg-sage-50 border-r border-sage-100 shrink-0 py-6">
                  <span className="text-3xl font-bold text-sage-700" style={{ fontFamily: "'Playfair Display', serif" }}>{dateInfo.day}</span>
                  <span className="text-sage-500 text-sm uppercase tracking-wide">{dateInfo.month}</span>
                </div>

                {/* Image */}
                <div className="relative w-full md:w-64 h-52 md:h-auto shrink-0">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className={`badge ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  {event.videoUrl && (
                    <button
                      onClick={() => setVideoModal(event)}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-sage-50"
                    >
                      <Play className="w-4 h-4 text-sage-700 ml-0.5" fill="currentColor" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-sage-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {event.title}
                    </h3>
                    {event.price ? (
                      <span className="text-sage-600 font-bold text-lg shrink-0">EGP {event.price.toLocaleString()}</span>
                    ) : (
                      <span className="badge bg-sage-100 text-sage-700 shrink-0">Free</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-sage-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(event.date)}{event.endDate && ` – ${formatDate(event.endDate)}`}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {event.capacity} spots
                    </span>
                  </div>

                  <p className="text-sage-600 text-sm leading-relaxed mb-4 flex-1">{event.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {event.tags.map((tag) => (
                      <span key={tag} className="badge bg-sage-50 text-sage-600 border border-sage-200 text-xs">
                        <Tag className="w-3 h-3 mr-1" />{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link to={`/contact?event=${event.id}`} className="btn-primary text-sm">
                      Register Now <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setCallbackModal(event)}
                      className="btn-secondary text-sm"
                    >
                      <Phone className="w-4 h-4" /> Request Callback
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-sage-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sage-700 mb-2">No events found</h3>
            <p className="text-sage-400">Check back soon for new events and retreats.</p>
          </div>
        )}
      </div>

      {/* Newsletter / Stay Updated */}
      <section className="py-16 px-4 bg-sage-700">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Don't Miss an Event
          </h2>
          <p className="text-sage-200 mb-6">Subscribe to receive updates about upcoming retreats, workshops, and wellness events.</p>
          <div className="flex gap-3">
            <input type="email" placeholder="Your email address" className="input-field flex-1" />
            <button className="btn-outline shrink-0">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Callback Modal */}
      {callbackModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => { setCallbackModal(null); setSubmitted(false); }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-sage-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Request a Callback
                </h3>
                <p className="text-sage-500 text-sm mt-1">For: {callbackModal.title}</p>
              </div>
              <button onClick={() => { setCallbackModal(null); setSubmitted(false); }} className="text-sage-400 hover:text-sage-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold text-sage-900 mb-2">Callback Requested!</h4>
                <p className="text-sage-500 text-sm">We'll call you within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div>
                  <label className="label">Your Name</label>
                  <input
                    type="text"
                    required
                    value={callbackForm.name}
                    onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                    className="input-field"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="label">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={callbackForm.phone}
                    onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                    className="input-field"
                    placeholder="+20 xxx xxx xxxx"
                  />
                </div>
                <div>
                  <label className="label">Email (optional)</label>
                  <input
                    type="email"
                    value={callbackForm.email}
                    onChange={(e) => setCallbackForm({ ...callbackForm, email: e.target.value })}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="label">Preferred Call Time</label>
                  <select
                    value={callbackForm.time}
                    onChange={(e) => setCallbackForm({ ...callbackForm, time: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Any time</option>
                    <option value="morning">Morning (9 AM – 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM – 4 PM)</option>
                    <option value="evening">Evening (4 PM – 7 PM)</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  <Phone className="w-4 h-4" /> Request Callback
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video modal */}
      {videoModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setVideoModal(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-center" onClick={(e) => e.stopPropagation()}>
            <Play className="w-12 h-12 text-sage-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-sage-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {videoModal.title}
            </h3>
            <p className="text-sage-500 mb-6">Event video will be loaded from the API.</p>
            <button onClick={() => setVideoModal(null)} className="btn-secondary">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
