
import { createClient } from '@supabase/supabase-js';

// Helper to safely access process.env in browser without throwing ReferenceError
const getEnv = (key: string): string | undefined => {
  try {
    return (typeof process !== 'undefined' && process.env) ? process.env[key] : undefined;
  } catch (e) {
    return undefined;
  }
};

const supabaseUrl = getEnv('SUPABASE_URL') || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY') || 'placeholder-key';

// Check if URL is valid before creating client to prevent initialization crash
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return !url.includes('placeholder-project');
  } catch (e) {
    return false;
  }
};

export const supabase = isValidUrl(supabaseUrl) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://xyz.supabase.co', 'dummy', { // Minimal dummy to prevent import errors
      auth: { persistSession: false }
    });

if (!isValidUrl(supabaseUrl)) {
  console.warn("ShopncarT: Supabase is running in mock mode. Real DB operations will fail.");
}
