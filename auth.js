// auth.js
import { supabase } from './supabaseClient.js';

const redirectUrl = 'web.html';

document.getElementById('login-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert('Error al iniciar sesión: ' + error.message);
  } else {
    window.location.href = redirectUrl;
  }
});

document.getElementById('register-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert('Error al registrarse: ' + error.message);
  } else {
    alert('Registro exitoso. Revisa tu correo.');
    window.location.href = redirectUrl;
  }
});
