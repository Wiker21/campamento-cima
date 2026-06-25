import { useState } from 'react';
import { Users, UserPlus, UserMinus, Plus, Shield, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { Modal } from '../components/Modal';

export function GroupsManagerView({ kids, groups, assignKidGroup, addGroup }) {
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: '', ageRange: '8 - 10 años', monitor: '', color: '#10b981', desc: ''
  });

  const unassignedKids = kids.filter(k => !k.group);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupData.name || !newGroupData.monitor) return;
    addGroup(newGroupData);
    setNewModalOpen(false);
    setNewGroupData({ name: '', ageRange: '8 - 10 años', monitor: '', color: '#10b981', desc: '' });
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <span className="badge badge-secondary">Organización Pedagógica</span>
          <h1 style={{ fontSize: '2.2rem', marginTop: '6px' }}>Reparto de Grupos y Monitores</h1>
          <p style={{ color: 'var(--text-muted)' }}>Organiza a los inscritos en patrullas homogéneas según su rango de edad.</p>
        </div>
        <button onClick={() => setNewModalOpen(true)} className="btn-primary">
          <Plus size={18} /> Crear Nuevo Grupo
        </button>
      </div>

      {/* Unassigned Banner */}
      {unassignedKids.length > 0 && (
        <div className="glass-card" style={{ padding: '24px', marginBottom: '36px', background: 'hsla(35, 96%, 52%, 0.1)', border: '2px dashed var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '14px' }}>
            <AlertCircle size={24} /> <span>¡Atención! Hay {unassignedKids.length} niño/s sin grupo asignado</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Selecciona el grupo de destino directamente para cada participante pendiente:
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
                  style={{ width: 'auto', padding: '6px 10px', fontSize: '0.8rem', borderColor: 'var(--accent)' }}
                  defaultValue=""
                  onChange={e => {
                    if (e.target.value) assignKidGroup(kid.id, e.target.value);
                  }}
                >
                  <option value="" disabled>Asignar a...</option>
                  {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Groups Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '28px' }}>
        {groups.map(group => {
          const members = kids.filter(k => k.group === group.name);

          return (
            <div key={group.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderTop: `6px solid ${group.color || 'var(--primary)'}`, overflow: 'hidden' }}>
              
              {/* Card Header */}
              <div style={{ padding: '24px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge" style={{ background: `${group.color}22`, color: group.color, fontWeight: 700 }}>
                    {group.ageRange}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    👥 {members.length} participantes
                  </span>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '6px' }}>{group.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <Shield size={15} color={group.color} /> Monitor/a: <span style={{ color: 'var(--text-main)' }}>{group.monitor}</span>
                </div>
                {group.desc && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '10px', fontStyle: 'italic' }}>"{group.desc}"</p>}
              </div>

              {/* Members List */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '4px' }}>Integrantes del Grupo</h4>
                
                {members.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No hay niños asignados a este grupo todavía.
                  </div>
                ) : (
                  members.map(member => (
                    <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-subtle)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{member.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>({member.age} años)</span>
                      </div>
                      <button 
                        onClick={() => assignKidGroup(member.id, null)}
                        style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', color: 'hsl(0, 84%, 60%)', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                        title="Quitar del grupo"
                      >
                        Quitar
                      </button>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal New Group */}
      <Modal isOpen={newModalOpen} onClose={() => setNewModalOpen(false)} title="Crear Nuevo Grupo de Participantes">
        <form onSubmit={handleCreateGroup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Nombre del Grupo *</label>
            <input type="text" required className="form-input" placeholder="ej. Los Halcones" value={newGroupData.name} onChange={e => setNewGroupData({...newGroupData, name: e.target.value})} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Rango de Edades</label>
              <input type="text" className="form-input" placeholder="ej. 10 - 12 años" value={newGroupData.ageRange} onChange={e => setNewGroupData({...newGroupData, ageRange: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Color Identificativo</label>
              <input type="color" className="form-input" style={{ height: '45px', padding: '4px' }} value={newGroupData.color} onChange={e => setNewGroupData({...newGroupData, color: e.target.value})} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Monitor Responsable *</label>
            <input type="text" required className="form-input" placeholder="ej. Carlos (Mon. Halcones)" value={newGroupData.monitor} onChange={e => setNewGroupData({...newGroupData, monitor: e.target.value})} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Descripción pedagógica (Opcional)</label>
            <textarea className="form-textarea" rows={2} placeholder="Enfoque en juegos de ingenio y excursiones nocturnas..." value={newGroupData.desc} onChange={e => setNewGroupData({...newGroupData, desc: e.target.value})} />
          </div>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
            Guardar Grupo
          </button>
        </form>
      </Modal>

    </div>
  );
}
