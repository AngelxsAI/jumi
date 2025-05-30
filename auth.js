import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://ybavfkpyrvxjvayxsczl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYXZma3B5cnZ4anZheXhzY3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MTg4MzMsImV4cCI6MjA2NDE5NDgzM30.KRypbVOEtLVLcahQOc37XL-ddLpgMjQQhNSKdvFL7c8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const redirectUrl = 'web.html';

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('Error al iniciar sesión: ' + error.message);
  } else {
    window.location.href = redirectUrl;
  }
});

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert('Error al registrarse: ' + error.message);
  } else {
    alert('Registro exitoso. Revisa tu correo para confirmar.');
    window.location.href = redirectUrl;
  }
});
