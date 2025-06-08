// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://ybavfkpyrvxjvayxsczl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYXZma3B5cnZ4anZheXhzY3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MTg4MzMsImV4cCI6MjA2NDE5NDgzM30.KRypbVOEtLVLcahQOc37XL-ddLpgMjQQhNSKdvFL7c8';


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
