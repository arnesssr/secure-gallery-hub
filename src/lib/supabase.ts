import { createClient } from '@supabase/supabase-js';

// Using the values from the connected Supabase project
const supabaseUrl = "https://blcgyyhkdwwtcojnldmi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsY2d5eWhrZHd3dGNvam5sZG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3MzI4OTcsImV4cCI6MjA1MTMwODg5N30.jdSwpeVLq6qM39PJTCyO-ZqIt-m59G_xOj2cYJTF5kU";

if (!supabaseUrl) {
  throw new Error('Supabase URL is not defined');
}

if (!supabaseKey) {
  throw new Error('Supabase Key is not defined');
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