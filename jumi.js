// Gestor del versículo diario
const gestorVersiculo = {
    versiculos: [
      {
        texto: "A toda perfección le he visto límite, pero tus mandamientos son ilimitados.",
        referencia: "Salmos 119:96"
      },
      // Agregar más versículos aquí...
    ],
  
    iniciar() {
      this.configurarEventos();
      this.cargarVersiculo();
      setInterval(() => this.cargarVersiculo(), 86400000);
    },
  
    configurarEventos() {
      // Menú móvil
      document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('active');
      });
  
      // Scroll suave
      document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        });
      });
    },
  
    async cargarVersiculo() {
      try {
        const respuesta = await fetch('https://beta.ourmanna.com/api/v1/get/?format=json&version=RVR1960');
        const data = await respuesta.json();
        this.mostrarVersiculo(data.verse.details.text, data.verse.details.reference);
      } catch (error) {
        this.usarVersiculoLocal();
      }
    },
  
    usarVersiculoLocal() {
      const hoy = new Date();
      const indice = hoy.getDate() % this.versiculos.length;
      this.mostrarVersiculo(
        this.versiculos[indice].texto,
        this.versiculos[indice].referencia
      );
    },
  
    mostrarVersiculo(texto, referencia) {
      const contenedor = document.getElementById('versiculo-del-dia');
      contenedor.innerHTML = `
        <div class="contenido-verso">
          <p class="texto-verso">"${texto}"</p>
          <p class="referencia-verso">${referencia}</p>
          <div class="botones-compartir">
            <button class="btn-compartir" onclick="compartirVersiculo()">
              <i class="fas fa-share"></i> Compartir
            </button>
            <a href="https://wa.me/?text=${encodeURIComponent(`"${texto}" - ${referencia}`)}" 
               class="btn-compartir" 
               target="_blank">
              <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>
      `;
    }
  };
  
  // Función para compartir
  function compartirVersiculo() {
    if (navigator.share) {
      const texto = document.querySelector('.texto-verso').textContent;
      const referencia = document.querySelector('.referencia-verso').textContent;
      navigator.share({
        title: 'Versículo del Día - JUMI',
        text: `${texto} - ${referencia}`
      });
    }
  }
  
  // Inicialización
  document.addEventListener('DOMContentLoaded', () => {
    gestorVersiculo.iniciar();
    
    // Animación de secciones
    window.addEventListener('scroll', () => {
      document.querySelectorAll('.section').forEach(seccion => {
        const rect = seccion.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          seccion.classList.add('visible');
        }
      });
    });
  });
  
  // Función del álbum
  function mostrarAlbum() {
    const album = document.getElementById('album');
    album.style.display = album.style.display === 'none' ? 'block' : 'none';
  }