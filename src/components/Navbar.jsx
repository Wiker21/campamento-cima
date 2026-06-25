import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mountain, Sun, Moon, LogIn, LogOut, LayoutDashboard, Users, UserCheck, Home, BookOpen } from 'lucide-react';

export function Navbar({ currentUser, logout }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogout = () => {
    logout();
    navigate('/inicio');
  };

  const currentPath = location.pathname;
  const isPrivateView = ['/panel', '/ninos', '/grupos', '/habitaciones', '/bitacora'].includes(currentPath);

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      left: 0,
      zIndex: 1000, 
      width: '100%',
      background: 'var(--bg-main)',
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 32px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Brand */}
        <Link 
          to={currentUser ? "/panel" : "/inicio"}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <img 
            src="/Logo Campa.png" 
            alt="Logo Campamento Cima" 
            style={{ height: '46px', width: 'auto', objectFit: 'contain' }} 
          />
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, var(--text-main), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CAMPAMENTO CIMA
            </span>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: 600 }}>
              {isPrivateView ? 'Portal de Organización' : 'Página Oficial'}
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="desktop-nav">
          {!currentUser ? (
            <Link 
              to="/inicio" 
              style={{ padding: '8px 20px', borderRadius: '99px', fontWeight: 700, textDecoration: 'none', color: ['/', '/inicio'].includes(currentPath) ? 'var(--primary)' : 'var(--text-muted)', background: ['/', '/inicio'].includes(currentPath) ? 'hsla(152, 68%, 28%, 0.1)' : 'transparent' }}
            >
              Inicio
            </Link>
          ) : (
            <>
              <Link 
                to="/panel" 
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', color: currentPath === '/panel' ? 'white' : 'var(--text-main)', background: currentPath === '/panel' ? 'var(--primary)' : 'transparent' }}
              >
                <LayoutDashboard size={18} /> Panel
              </Link>
              <Link 
                to="/ninos" 
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', color: currentPath === '/ninos' ? 'white' : 'var(--text-main)', background: currentPath === '/ninos' ? 'var(--primary)' : 'transparent' }}
              >
                <Users size={18} /> Niños (BD)
              </Link>
              <Link 
                to="/grupos" 
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', color: currentPath === '/grupos' ? 'white' : 'var(--text-main)', background: currentPath === '/grupos' ? 'var(--primary)' : 'transparent' }}
              >
                <UserCheck size={18} /> Grupos
              </Link>
              <Link 
                to="/habitaciones" 
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', color: currentPath === '/habitaciones' ? 'white' : 'var(--text-main)', background: currentPath === '/habitaciones' ? 'var(--primary)' : 'transparent' }}
              >
                <Home size={18} /> Habitaciones
              </Link>
              <Link 
                to="/bitacora" 
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', color: currentPath === '/bitacora' ? 'white' : 'var(--text-main)', background: currentPath === '/bitacora' ? 'var(--primary)' : 'transparent' }}
              >
                <BookOpen size={18} /> Bitácora
              </Link>
            </>
          )}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{ padding: '8px', borderRadius: '10px', background: 'var(--bg-subtle)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Cambiar Modo Oscuro/Claro"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#fbbf24" />}
          </button>

          {!currentUser ? (
            <Link 
              to="/acceso"
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.9rem', textDecoration: 'none' }}
            >
              <LogIn size={18} /> Acceso Organización
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.1 }}>{currentUser.name}</span>
                <span className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '1px 6px', alignSelf: 'flex-end' }}>{currentUser.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="btn-secondary"
                style={{ padding: '8px 12px', borderRadius: '10px', color: 'hsl(0, 84%, 60%)' }}
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
