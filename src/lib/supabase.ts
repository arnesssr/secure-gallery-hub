import { createClient } from '@supabase/supabase-js';

// Using Vite's environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is not defined. Please ensure you are connected to Supabase in the Lovable interface.');
}

if (!supabaseKey) {
  throw new Error('VITE_SUPABASE_KEY is not defined. Please ensure you are connected to Supabase in the Lovable interface.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type BookingType = 'photography' | 'video' | 'sound' | 'school';

export interface Booking {
  id: string;
  created_at: string;
  user_id: string;
  service_type: BookingType;
  preferred_date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string;
  contact_email: string;
  contact_phone: string;
}