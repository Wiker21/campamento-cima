import { useState } from 'react';
import { Search, Plus, Trash2, Edit3, Filter, AlertTriangle, Phone, UserCheck, Home, CheckCircle, HelpCircle } from 'lucide-react';
import { Modal } from '../components/Modal';

export function KidsDatabaseView({ kids, groups, rooms, addKid, updateKid, deleteKid }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('ALL');
  const [filterRoom, setFilterRoom] = useState('ALL');
  const [onlyAllergies, setOnlyAllergies] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKidId, setEditingKidId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', age: 10, gender: 'M', group: '', room: '', allergies: 'Ninguna', tutor: '', phone: '', notes: ''
  });

  const openAddModal = () => {
    setEditingKidId(null);
    setFormData({ name: '', age: 10, gender: 'M', group: '', room: '', allergies: 'Ninguna', tutor: '', phone: '', notes: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (kid) => {
    setEditingKidId(kid.id);
    setFormData({
      name: kid.name || '',
      age: kid.age || 10,
      gender: kid.gender || 'M',
      group: kid.group || '',
      room: kid.room || '',
      allergies: kid.allergies || 'Ninguna',
      tutor: kid.tutor || '',
      phone: kid.phone || '',
      notes: kid.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const payload = {
      ...formData,
      age: parseInt(formData.age),
      group: formData.group || null,
      room: formData.room || null
    };

    if (editingKidId) {
      updateKid(editingKidId, payload);
    } else {
      addKid(payload);
    }
    setIsModalOpen(false);
  };

  // Filtering
  const filteredKids = kids.filter(k => {
    const matchesSearch = k.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (k.allergies && k.allergies.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (k.tutor && k.tutor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesGroup = true;
    if (filterGroup === 'NONE') matchesGroup = !k.group;
    else if (filterGroup !== 'ALL') matchesGroup = k.group === filterGroup;

    let matchesRoom = true;
    if (filterRoom === 'NONE') matchesRoom = !k.room;
    else if (filterRoom !== 'ALL') matchesRoom = k.room === filterRoom;

    let matchesAllergy = true;
    if (onlyAllergies) matchesAllergy = k.allergies && k.allergies !== 'Ninguna';

    return matchesSearch && matchesGroup && matchesRoom && matchesAllergy;
  });

  const getRoomName = (roomId) => {
    if (!roomId) return null;
    const r = rooms.find(room => room.id === roomId);
    return r ? r.name : roomId;
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-primary">Organización e Inscripciones</span>
          <h1 style={{ fontSize: '2.2rem', marginTop: '6px' }}>Base de Datos de Niños</h1>
          <p style={{ color: 'var(--text-muted)' }}>{kids.length} inscritos en total ({filteredKids.length} mostrados según filtros)</p>
        </div>
        <button onClick={openAddModal} className="btn-primary">
          <Plus size={18} /> Inscribir Nuevo Niño
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '20px', marginBottom: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', background: 'var(--bg-subtle)' }}>
        
        <div style={{ flex: '1 1 250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Buscar por nombre, tutor o alergia..." 
            style={{ paddingLeft: '40px' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="var(--text-muted)" />
          <select className="form-select" style={{ width: 'auto' }} value={filterGroup} onChange={e => setFilterGroup(e.target.value)}>
            <option value="ALL">Todos los grupos</option>
            <option value="NONE">⚠️ Sin grupo asignado</option>
            {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select className="form-select" style={{ width: 'auto' }} value={filterRoom} onChange={e => setFilterRoom(e.target.value)}>
            <option value="ALL">Todas las cabañas</option>
            <option value="NONE">🚨 Sin cabaña asignada</option>
            {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: onlyAllergies ? 'hsl(0, 84%, 60%)' : 'var(--text-main)', background: onlyAllergies ? 'hsla(0,84%,60%,0.1)' : 'var(--bg-card)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <input type="checkbox" checked={onlyAllergies} onChange={e => setOnlyAllergies(e.target.checked)} />
          <AlertTriangle size={16} /> Fichas Médicas Especiales
        </label>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Participante</th>
              <th>Edad / Sexo</th>
              <th>Salud y Alergias</th>
              <th>Grupo Asignado</th>
              <th>Cabaña</th>
              <th>Tutor y Teléfono</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredKids.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No se han encontrado niños que coincidan con los criterios de búsqueda.
                </td>
              </tr>
            ) : (
              filteredKids.map(kid => {
                const hasAllergy = kid.allergies && kid.allergies !== 'Ninguna';
                const roomName = getRoomName(kid.room);

                return (
                  <tr key={kid.id}>
                    <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                      {kid.name}
                      {kid.notes && <div style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>📝 {kid.notes}</div>}
                    </td>
                    <td>
                      <span className="badge badge-secondary">{kid.age} años ({kid.gender})</span>
                    </td>
                    <td>
                      {hasAllergy ? (
                        <span className="badge badge-danger" style={{ display: 'inline-flex', gap: '4px' }}>
                          <AlertTriangle size={14} /> {kid.allergies}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>✓ OK</span>
                      )}
                    </td>
                    <td>
                      {kid.group ? (
                        <span className="badge badge-primary">{kid.group}</span>
                      ) : (
                        <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem' }}>⚠️ Pendiente</span>
                      )}
                    </td>
                    <td>
                      {roomName ? (
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>🏠 {roomName}</span>
                      ) : (
                        <span style={{ color: 'hsl(0, 84%, 60%)', fontWeight: 600, fontSize: '0.85rem' }}>🚨 Sin asignar</span>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{kid.tutor}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={12} /> {kid.phone}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button onClick={() => openEditModal(kid)} style={{ padding: '6px', color: 'var(--secondary)', marginRight: '8px' }} title="Editar ficha">
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`¿Eliminar definitivamente la inscripción de ${kid.name}?`)) {
                            deleteKid(kid.id);
                          }
                        }} 
                        style={{ padding: '6px', color: 'hsl(0, 84%, 60%)' }} 
                        title="Eliminar niño"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingKidId ? 'Editar Ficha de Inscripción' : 'Inscribir Nuevo Participante'}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Nombre y Apellidos *</label>
            <input type="text" required className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Edad</label>
              <input type="number" min="5" max="18" required className="form-input" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Sexo</label>
              <select className="form-select" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Grupo</label>
              <select className="form-select" value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})}>
                <option value="">(Sin asignar)</option>
                {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Habitación</label>
              <select className="form-select" value={formData.room} onChange={e => setFormData({...formData, room: e.target.value})}>
                <option value="">(Sin asignar)</option>
                {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Alergias o Ficha Médica</label>
            <input type="text" className="form-input" placeholder="ej. Celíaco, Asma, Ninguna" value={formData.allergies} onChange={e => setFormData({...formData, allergies: e.target.value})} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Nombre Tutor/a</label>
              <input type="text" required className="form-input" value={formData.tutor} onChange={e => setFormData({...formData, tutor: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Teléfono Urgencia</label>
              <input type="tel" required className="form-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Notas u Observaciones</label>
            <textarea className="form-textarea" rows={2} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary">Guardar Participante</button>
          </div>

        </form>
      </Modal>

    </div>
  );
}
