import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ppndqeqmvrsyjceygejg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbmRxZXFtdnJzeWpjZXlnamVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTgyNTcsImV4cCI6MjA5Mjc5NDI1N30.mlHV75k4YD4BTyhn2wz6sclZVhWy1m2GrKKpZ8GS6hk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
