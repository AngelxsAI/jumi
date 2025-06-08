// galeria.js
import { supabase } from './supabaseClient.js';

document.getElementById('subirBtn').addEventListener('click', async () => {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;

  if (!user) return alert("Debes iniciar sesión");

  const file = document.getElementById('fotoInput').files[0];
  if (!file) return alert("Selecciona una imagen");

  const path = `${user.id}/${Date.now()}_${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from('galeria')
    .upload(path, file);

  if (uploadError) return alert("Error al subir: " + uploadError.message);

  const publicUrl = `https://ybavfkpyrvxjvayxsczl.supabase.co/storage/v1/object/public/galeria/${path}`;

  const { error: dbError } = await supabase
    .from('fotos')
    .insert({ user_id: user.id, url_foto: publicUrl });

  if (dbError) return alert("Error al guardar en la base de datos: " + dbError.message);

  alert("Foto subida correctamente");
  cargarGaleria();
});

async function cargarGaleria() {
  const { data: fotos, error } = await supabase
    .from('fotos')
    .select('url_foto, user_id, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error al cargar galería:", error.message);
    return;
  }

  const contenedor = document.getElementById('galeria');
  contenedor.innerHTML = '';

  for (const foto of fotos) {
    const { data: usuario } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', foto.user_id)
      .single();

    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${foto.url_foto}" width="200"><br>
      <small>Subido por: ${usuario?.email || 'Desconocido'}</small><br><br>
    `;
    contenedor.appendChild(div);
  }
}

cargarGaleria();

