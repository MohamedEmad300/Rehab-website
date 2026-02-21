import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Play, Star, Globe, Calendar, ChevronRight } from 'lucide-react';
import type { Doctor } from '../types';

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Amina Khalil',
    title: 'MD, Psychiatry',
    specialization: 'Addiction Medicine & Psychiatry',
    bio: 'Dr. Khalil brings 18 years of experience in addiction recovery and mental health. She combines evidence-based practices with a holistic perspective.',
    credentials: ['American Board of Psychiatry', 'WHO Mental Health Certification'],
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    languages: ['Arabic', 'English', 'French'],
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
  },
  {
    id: '2',
    name: 'Dr. Youssef Nasser',
    title: 'PhD, Clinical Psychology',
    specialization: 'Trauma & PTSD Specialist',
    bio: 'Specializing in trauma-informed care, Dr. Nasser helps patients rebuild resilience through proven therapeutic frameworks including EMDR and CBT.',
    credentials: ['Licensed Clinical Psychologist', 'EMDR Certified Practitioner'],
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    languages: ['Arabic', 'English'],
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
  },
  {
    id: '3',
    name: 'Dr. Layla Hassan',
    title: 'MD, Internal Medicine',
    specialization: 'Detoxification & Physical Recovery',
    bio: 'Dr. Hassan oversees the medical detox program, ensuring safe, comfortable physical recovery. Her calm demeanor and precision make her a patient favorite.',
    credentials: ['Egyptian Medical Syndicate', 'Addiction Medicine Board'],
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    languages: ['Arabic', 'English'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
  },
  {
    id: '4',
    name: 'Dr. Omar Farouk',
    title: 'MSc, Behavioral Therapy',
    specialization: 'CBT & Behavioral Interventions',
    bio: 'With a focus on long-term behavioral change, Dr. Farouk works with patients to identify triggers, build new habits, and sustain lasting recovery.',
    credentials: ['Certified CBT Therapist', 'Mindfulness-Based Therapy Practitioner'],
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
    languages: ['Arabic', 'English', 'German'],
    availableDays: ['Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: '5',
    name: 'Dr. Rania Ibrahim',
    title: 'MD, Family Medicine',
    specialization: 'Family Therapy & Recovery Support',
    bio: 'Dr. Ibrahim believes recovery extends beyond the patient. She facilitates family healing sessions that restore relationships and build support networks.',
    credentials: ['Family Medicine Board', 'Systemic Family Therapy Certificate'],
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80',
    languages: ['Arabic', 'English'],
    availableDays: ['Sunday', 'Monday', 'Wednesday'],
  },
  {
    id: '6',
    name: 'Dr. Khaled Mansour',
    title: 'PhD, Neuropsychology',
    specialization: 'Neurological Rehabilitation',
    bio: 'Dr. Mansour specializes in the neurological aspects of addiction, using cutting-edge brain-based therapies to support cognitive recovery and resilience.',
    credentials: ['Neuropsychology Board Certification', 'Cognitive Rehabilitation Specialist'],
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    languages: ['Arabic', 'English', 'Italian'],
    availableDays: ['Tuesday', 'Friday', 'Saturday'],
  },
];

const specializations = ['All', 'Psychiatry', 'Trauma', 'Detox', 'Behavioral', 'Family', 'Neurological'];

export default function Doctors() {
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [videoModal, setVideoModal] = useState<string | null>(null);

  const filtered = mockDoctors.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchSpec =
      selectedSpec === 'All' || d.specialization.toLowerCase().includes(selectedSpec.toLowerCase());
    return matchSearch && matchSpec;
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-sage-800 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sage-300 text-sm font-semibold uppercase tracking-widest">Our Specialists</span>
          <h1 className="text-4xl md:text-5xl text-white mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Meet Our Doctors
          </h1>
          <p className="text-sage-300 text-lg max-w-2xl mx-auto">
            Board-certified specialists committed to your recovery. Each doctor brings expertise, empathy, and a genuine passion for healing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400" />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-sage-500" />
            {specializations.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpec(spec)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedSpec === spec
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'bg-white text-sage-600 border border-sage-200 hover:border-sage-400'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sage-500 text-sm mb-6">{filtered.length} specialist{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Doctor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doctor) => (
            <div key={doctor.id} className="card flex flex-col">
              {/* Image & Video */}
              <div className="relative h-56 bg-sage-100">
                <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => setVideoModal(doctor.id)}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-sage-50 transition-colors"
                  aria-label="Watch intro video"
                >
                  <Play className="w-4 h-4 text-sage-700 ml-0.5" fill="currentColor" />
                </button>
                <div className="absolute top-4 left-4">
                  <span className="badge bg-sage-600 text-white">{doctor.title}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-sage-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {doctor.name}
                </h3>
                <p className="text-sage-500 text-sm font-medium mb-3">{doctor.specialization}</p>
                <p className="text-sage-600 text-sm leading-relaxed mb-4 flex-1">{doctor.bio}</p>

                {/* Credentials */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {doctor.credentials.map((c) => (
                    <span key={c} className="badge bg-sage-50 text-sage-700 border border-sage-200">
                      <Star className="w-3 h-3 mr-1 text-sage-500" fill="currentColor" /> {c}
                    </span>
                  ))}
                </div>

                {/* Languages & Availability */}
                <div className="flex items-center gap-4 text-xs text-sage-500 mb-5">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    {doctor.languages.join(', ')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {doctor.availableDays.slice(0, 2).join(', ')}
                    {doctor.availableDays.length > 2 && ` +${doctor.availableDays.length - 2}`}
                  </span>
                </div>

                <Link
                  to={`/booking/doctor?doctor=${doctor.id}`}
                  className="btn-primary w-full justify-center text-sm"
                >
                  Book a Session <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-sage-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sage-700 mb-2">No doctors found</h3>
            <p className="text-sage-400">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>

      {/* Video Modal Placeholder */}
      {videoModal && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setVideoModal(null)}
        >
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-sage-600" />
            </div>
            <h3 className="text-xl font-bold text-sage-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Doctor Introduction Video
            </h3>
            <p className="text-sage-500 mb-6">Video content will be loaded from the API.</p>
            <button onClick={() => setVideoModal(null)} className="btn-secondary">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
