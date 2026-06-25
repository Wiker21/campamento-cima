import { useNavigate, Link } from 'react-router-dom';
import { Mountain, ArrowRight, Sparkles } from 'lucide-react';

export function LoginPage({ login }) {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate('/panel');
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} className="animate-fade-in">
      <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '40px', textAlign: 'center', background: 'var(--bg-card)' }}>
        
        <img 
          src="/Logo Campa.png" 
          alt="Logo Campamento Cima" 
          style={{ height: '84px', width: 'auto', margin: '0 auto 20px', display: 'block' }} 
        />

        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Acceso Organización</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '32px' }}>
          Portal privado para gestión de niños, reparto de cabañas, grupos y bitácora diaria del Campamento Cima.
        </p>

        <div style={{ background: 'var(--bg-subtle)', padding: '20px', borderRadius: '16px', marginBottom: '28px', border: '1px dashed var(--border-color)', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '12px' }}>
            <Sparkles size={16} /> ACCESO RÁPIDO DEMOSTRACIÓN
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Selecciona un perfil para entrar directamente a la base de datos SQL sin necesidad de contraseña:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => handleLogin('coordinador')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', fontWeight: 600, color: 'var(--text-main)', transition: 'all 0.2s', width: '100%' }}
              className="glass-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.4rem' }}>🏕️</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.95rem' }}>Coordinador General</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Control Total (Niños, Cabañas, Grupos)</div>
                </div>
              </div>
              <ArrowRight size={18} color="var(--text-muted)" />
            </button>

            <button 
              onClick={() => handleLogin('monitor')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', fontWeight: 600, color: 'var(--text-main)', transition: 'all 0.2s', width: '100%' }}
              className="glass-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.4rem' }}>🧗</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.95rem' }}>Monitor de Grupo</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>Acceso Bitácora y Consulta Niños</div>
                </div>
              </div>
              <ArrowRight size={18} color="var(--text-muted)" />
            </button>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <Link 
            to="/inicio"
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
          >
            ← Volver a Inicio (/inicio)
          </Link>
        </div>

      </div>
    </div>
  );
}
