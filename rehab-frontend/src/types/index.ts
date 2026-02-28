export interface Consultant {
  id: string;
  name: string;
  title: string;
  specialization: string;
  bio: string;
  credentials: string[];
  videoUrl?: string;
  imageUrl: string;
  languages: string[];
  availableDays: string[];
}

export interface TherapyProgram {
  id: string;
  name: string;
  therapist: string;
  type: string;
  description: string;
  duration: string;
  schedule: string;
  capacity: number;
  imageUrl: string;
  tags: string[];
}

export interface DayCareProgram {
  id: string;
  name: string;
  ageGroup: string;
  description: string;
  schedule: string;
  activities: string[];
  imageUrl: string;
  videoUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'retreat' | 'event' | 'workshop';
  date: string;
  endDate?: string;
  location: string;
  description: string;
  capacity: number;
  price?: number;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
}

export interface BookingFormData {
  serviceType: 'consultant' | 'group-therapy' | 'daycare';
  serviceId?: string;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  callbackTime?: string;
  requestCallback: boolean;
}
