import { useState } from 'react';
import { Home, Users, UserMinus, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export function RoomsManagerView({ kids, rooms, assignKidRoom }) {
  const unassignedKids = kids.filter(k => !k.room);

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <span className="badge badge-primary">Logística y Descanso</span>
        <h1 style={{ fontSize: '2.2rem', marginTop: '6px' }}>Mapa de Distribución de Cabañas</h1>
        <p style={{ color: 'var(--text-muted)' }}>Supervisión de plazas ocupadas, control por sexo y asignación de literas.</p>
      </div>

      {/* Unassigned Banner */}
      {unassignedKids.length > 0 && (
        <div className="glass-card" style={{ padding: '24px', marginBottom: '36px', background: 'hsla(0, 84%, 60%, 0.08)', border: '2px dashed hsl(0, 84%, 60%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'hsl(0, 84%, 60%)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '14px' }}>
            <AlertTriangle size={24} /> <span>¡Alerta Logística! Hay {unassignedKids.length} participante/s sin cabaña asignada</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Asigna litera/cabaña de inmediato para asegurar su plaza en el campamento:
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {unassignedKids.map(kid => (
              <div key={kid.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-card)', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{kid.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{kid.age} años ({kid.gender})</div>
                </div>
                <select 
                  className="form-select" 
                  style={{ width: 'auto', padding: '6px 10px', fontSize: '0.8rem', borderColor: 'hsl(0,84%,60%)' }}
                  defaultValue=""
                  onChange={e => {
                    if (e.target.value) assignKidRoom(kid.id, e.target.value);
                  }}
                >
                  <option value="" disabled>Alojarse en...</option>
                  {rooms.map(r => {
                    const occ = kids.filter(k => k.room === r.id).length;
                    const isFull = occ >= r.capacity;
                    return (
                      <option key={r.id} value={r.id} disabled={isFull}>
                        {r.name} ({occ}/{r.capacity}) {isFull ? '- LLENA' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rooms Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
        {rooms.map(room => {
          const occupants = kids.filter(k => k.room === room.id);
          const isFull = occupants.length >= room.capacity;
          const percentage = Math.min(100, Math.round((occupants.length / room.capacity) * 100));

          let progressColor = 'var(--primary)';
          if (percentage >= 100) progressColor = 'hsl(0, 84%, 60%)';
          else if (percentage >= 75) progressColor = 'var(--accent)';

          return (
            <div key={room.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              
              {/* Card Header */}
              <div style={{ padding: '24px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>{room.sector}</span>
                  <span className="badge" style={{ background: room.gender === 'M' ? '#3b82f622' : '#ec489922', color: room.gender === 'M' ? '#3b82f6' : '#ec4899', fontWeight: 700 }}>
                    {room.gender === 'M' ? '♂ Chicos' : '♀ Chicas'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>{room.name}</h3>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: isFull ? 'hsl(0,84%,60%)' : 'var(--text-main)' }}>
                    {occupants.length} / {room.capacity}
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', background: progressColor, transition: 'width 0.3s ease' }} />
                </div>
              </div>

              {/* Occupants List */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '4px' }}>Literas Ocupadas</h4>
                
                {occupants.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Cabaña vacía. Plazas disponibles.
                  </div>
                ) : (
                  occupants.map((occ, i) => (
                    <div key={occ.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-subtle)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', width: '22px' }}>#{i+1}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{occ.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{occ.group || 'Sin grupo'}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => assignKidRoom(occ.id, null)}
                        style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', color: 'hsl(0, 84%, 60%)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                        title="Desalojar litera"
                      >
                        Desalojar
                      </button>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
