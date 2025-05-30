import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const redirectUrl = 'web.html';


// LOGIN
document.getElementById('login-form').addEventListener('submit', async (e) => {
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

// REGISTER
document.getElementById('register-form').addEventListener('submit', async (e) => {
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
