// src/app/servicios/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import './servicios.css' // importa tu CSS aquí

export const metadata: Metadata = {
  title: 'Servicios | Clínica Dermatológica'
}

export default function ServiciosPage() {
  return (
    <main className="main-content">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <Image
            src="/assets/images/initation/logo listo.jpg"
            alt="Logo Clínica"
            width={120}
            height={120}
          />
        </div>
        <nav className="menu">
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/ubicacion">Ubicación</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/citas">Agenda tu Cita</Link>
        </nav>
      </div>

      {/* Sección de servicios */}
      <section className="servicios">
        <h1>Nuestros Servicios</h1>
        <p>
          EN Clínica puedes acceder a diferentes servicios para agilizar los procesos
          de diagnóstico y tratamiento. Estos servicios están abiertos al público para
          pacientes particulares y algunos con pólizas de salud.
        </p>

        <div className="servicios-lista">
          {/* Aquí van las tarjetas/listado de servicios */}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-info">
            <h3>Clínica Dermosalud</h3>
            <p>
              Estamos comprometidos con tu bienestar dermatológico. Visítanos o
              contáctanos para más información.
            </p>
            <p>
              📍 Medellín, Colombia<br />📞 +57 301 456 7890<br />
              ✉️ contacto@dermosalud.com
            </p>
          </div>

          <div className="footer-links">
            <h4>Enlaces útiles</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/servicios">Servicios</Link></li>
              <li><Link href="/equipo">Equipo Médico</Link></li>
              <li><Link href="/citas">Agendar Cita</Link></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <a href="#"><Image src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg" alt="Facebook" width={24} height={24} /></a>
              <a href="#"><Image src="https://images.icon-icons.com/2992/PNG/512/instagram_logo_icon_187313.png" alt="Instagram" width={24} height={24} /></a>
              <a href="#"><Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width={24} height={24} /></a>
              <a href="#"><Image src="https://www.ceim.edu.co/wp-content/uploads/2024/07/png-transparent-tiktok-tiktok-logo-tiktok-icon.png" alt="TikTok" width={24} height={24} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Clínica Dermosalud. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
