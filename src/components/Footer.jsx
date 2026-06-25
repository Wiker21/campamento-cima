import { Link } from 'react-router-dom';
import { Mountain, MapPin, Phone, Mail, Heart, Camera, Globe, Video } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-color)', padding: '60px 24px 30px', marginTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
        
        {/* Brand info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px', color: 'white' }}>
              <Mountain size={22} />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)' }}>
              CAMPAMENTO CIMA
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Un espacio educativo y de aventura en plena naturaleza donde niños y jóvenes alcanzan su máximo potencial a través de los valores del compañerismo, el respeto y la superación.
          </p>
          <div style={{ display: 'flex', gap: '12px', color: 'var(--primary)' }}>
            <a href="#" style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '50%', border: '1px solid var(--border-color)' }}><Camera size={18} /></a>
            <a href="#" style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '50%', border: '1px solid var(--border-color)' }}><Globe size={18} /></a>
            <a href="#" style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: '50%', border: '1px solid var(--border-color)' }}><Video size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>Páginas Disponibles</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
            <li><Link to="/inicio" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'var(--text-muted)' }}>Página Oficial (/inicio)</Link></li>
            <li><Link to="/acceso" style={{ transition: 'color 0.2s', textDecoration: 'none', color: 'var(--primary)', fontWeight: 600 }}>Acceso Portal (/acceso)</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>Contacto y Reserva</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} color="var(--primary)" />
              <span>Valle del Cima, Sierra Alta (Km 14)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={18} color="var(--primary)" />
              <span>+34 900 123 456 / 611 000 111</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={18} color="var(--primary)" />
              <span>info@campamentocima.es</span>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Link 
              to="/acceso" 
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '8px 16px', textDecoration: 'none' }}
            >
              Portal Privado Organización →
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto 0', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <p>© 2026 Organización Campamento Cima. Todos los derechos reservados.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Diseñado con <Heart size={14} color="#ef4444" fill="#ef4444" /> para la juventud
        </p>
      </div>
    </footer>
  );
}
