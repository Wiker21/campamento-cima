import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Home, BookOpen, AlertCircle, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';

export function DashboardView({ kids, groups, rooms, logs, resetToDefaults }) {
  const navigate = useNavigate();
  const unassignedGroups = kids.filter(k => !k.group).length;
  const unassignedRooms = kids.filter(k => !k.room).length;
  const kidsWithAllergies = kids.filter(k => k.allergies && k.allergies !== 'Ninguna').length;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      
      {/* Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <span className="badge badge-primary">Centro de Organización</span>
          <h1 style={{ fontSize: '2.2rem', marginTop: '6px' }}>Panel General Cima 2026</h1>
          <p style={{ color: 'var(--text-muted)' }}>Bienvenido al sistema de control de participantes, cabañas y bitácora del campamento.</p>
        </div>
        <button 
          onClick={() => {
            if (confirm('¿Deseas reiniciar toda la base de datos local (niños, cabañas y notas) a los valores iniciales de demostración?')) {
              resetToDefaults();
            }
          }}
          className="btn-secondary"
          style={{ fontSize: '0.85rem', padding: '10px 18px', color: 'var(--text-muted)' }}
          title="Restaurar datos iniciales"
        >
          <RefreshCw size={16} /> Reiniciar Datos Demo
        </button>
      </div>

      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        <div 
          onClick={() => navigate('/ninos')}
          className="glass-card" 
          style={{ padding: '24px', cursor: 'pointer', borderLeft: '4px solid var(--primary)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Base de Datos Niños</span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>{kids.length}</div>
            </div>
            <div style={{ padding: '10px', background: 'hsla(152, 68%, 28%, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              <Users size={24} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent)' }}>
            <AlertCircle size={15} /> <span>{kidsWithAllergies} con alergias/dieta médica</span>
          </div>
        </div>

        <div 
          onClick={() => navigate('/grupos')}
          className="glass-card" 
          style={{ padding: '24px', cursor: 'pointer', borderLeft: unassignedGroups > 0 ? '4px solid var(--accent)' : '4px solid var(--secondary)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reparto de Grupos</span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>{groups.length} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>grupos</span></div>
            </div>
            <div style={{ padding: '10px', background: 'hsla(198, 88%, 42%, 0.1)', borderRadius: '12px', color: 'var(--secondary)' }}>
              <UserPlus size={24} />
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: unassignedGroups > 0 ? 'var(--accent)' : 'var(--primary)', fontWeight: 600 }}>
            {unassignedGroups > 0 ? `⚠️ ${unassignedGroups} niños pendientes de grupo` : '✓ Todos los niños asignados a grupo'}
          </div>
        </div>

        <div 
          onClick={() => navigate('/habitaciones')}
          className="glass-card" 
          style={{ padding: '24px', cursor: 'pointer', borderLeft: unassignedRooms > 0 ? '4px solid hsl(0, 84%, 60%)' : '4px solid var(--primary)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Habitaciones / Cabañas</span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>{rooms.length} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>cabañas</span></div>
            </div>
            <div style={{ padding: '10px', background: 'hsla(35, 96%, 52%, 0.15)', borderRadius: '12px', color: 'var(--accent)' }}>
              <Home size={24} />
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: unassignedRooms > 0 ? 'hsl(0, 84%, 60%)' : 'var(--primary)', fontWeight: 600 }}>
            {unassignedRooms > 0 ? `🚨 ${unassignedRooms} niños sin cabaña asignada` : '✓ 100% alojados en cabañas'}
          </div>
        </div>

        <div 
          onClick={() => navigate('/bitacora')}
          className="glass-card" 
          style={{ padding: '24px', cursor: 'pointer', borderLeft: '4px solid var(--secondary)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Diario de Campamento</span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1 }}>{logs.length} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>entradas</span></div>
            </div>
            <div style={{ padding: '10px', background: 'hsla(152, 60%, 42%, 0.12)', borderRadius: '12px', color: 'var(--primary-light)' }}>
              <BookOpen size={24} />
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Registro de "lo que vamos haciendo"
          </div>
        </div>

      </div>

      {/* Grid Bottom: Quick Actions & Recent Log */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
        
        {/* Quick actions box */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--accent)" /> Accesos Rápidos de Gestión
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Navega directamente a las herramientas clave para organizar a los participantes y reportar avances:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => navigate('/ninos')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'var(--bg-subtle)', borderRadius: '14px', fontWeight: 600, color: 'var(--text-main)', width: '100%' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={20} color="var(--primary)" />
                <span>Gestionar Fichas y Alergias de Niños</span>
              </div>
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => navigate('/grupos')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'var(--bg-subtle)', borderRadius: '14px', fontWeight: 600, color: 'var(--text-main)', width: '100%' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserPlus size={20} color="var(--secondary)" />
                <span>Asignar Niños Pendientes a Grupos</span>
              </div>
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => navigate('/habitaciones')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'var(--bg-subtle)', borderRadius: '14px', fontWeight: 600, color: 'var(--text-main)', width: '100%' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Home size={20} color="var(--accent)" />
                <span>Reparto de Plazas en Cabañas</span>
              </div>
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => navigate('/bitacora')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'var(--bg-subtle)', borderRadius: '14px', fontWeight: 600, color: 'var(--text-main)', width: '100%' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={20} color="var(--primary-light)" />
                <span>Escribir en la Bitácora Diaria</span>
              </div>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Recent logs */}
        <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={20} color="var(--primary)" /> Últimas Entradas en Bitácora
            </h3>
            <button onClick={() => navigate('/bitacora')} style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
              Ver todas →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {logs.slice(0, 3).map(log => (
              <div key={log.id} style={{ padding: '14px', background: 'var(--bg-subtle)', borderRadius: '12px', borderLeft: '3px solid var(--secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>{log.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.timestamp}</span>
                </div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '4px', color: 'var(--text-main)' }}>{log.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {log.content}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
