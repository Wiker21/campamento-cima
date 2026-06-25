import { useState } from 'react';
import { BookOpen, Plus, Clock, User, Tag, Filter, Sparkles, MessageSquare } from 'lucide-react';
import { Modal } from '../components/Modal';

export function ActivityLogView({ logs, addLog, currentUser }) {
  const [filterCat, setFilterCat] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Actividad',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    addLog(formData);
    setModalOpen(false);
    setFormData({ title: '', category: 'Actividad', content: '' });
  };

  const filteredLogs = filterCat === 'ALL' ? logs : logs.filter(l => l.category === filterCat);

  const getCatColor = (cat) => {
    switch(cat) {
      case 'Rutina': return '#64748b';
      case 'Actividad': return '#10b981';
      case 'Alimentación': return '#f59e0b';
      case 'Taller': return '#0ea5e9';
      case 'Incidencia': return '#ef4444';
      default: return 'var(--primary)';
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <span className="badge badge-accent">Diario Cronológico</span>
          <h1 style={{ fontSize: '2.2rem', marginTop: '6px' }}>Bitácora: "Lo que vamos haciendo"</h1>
          <p style={{ color: 'var(--text-muted)' }}>Muro de avances, rutinas completadas e incidencias en tiempo real.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-accent">
          <Plus size={18} /> Publicar Actualización
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', marginBottom: '36px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', background: 'var(--bg-subtle)' }}>
        <Filter size={18} color="var(--text-muted)" />
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Filtrar categoría:</span>
        
        {['ALL', 'Rutina', 'Actividad', 'Alimentación', 'Taller', 'Incidencia'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: filterCat === cat ? 'var(--text-main)' : 'var(--bg-card)',
              color: filterCat === cat ? 'var(--bg-card)' : 'var(--text-main)',
              border: '1px solid var(--border-color)',
              transition: 'all 0.2s'
            }}
          >
            {cat === 'ALL' ? 'Todas las entradas' : cat}
          </button>
        ))}
      </div>

      {/* Timeline Feed */}
      <div style={{ position: 'relative', paddingLeft: '32px' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border-color)' }} />

        {filteredLogs.length === 0 ? (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hay entradas registradas en esta categoría.
          </div>
        ) : (
          filteredLogs.map(log => {
            const color = getCatColor(log.category);

            return (
              <div key={log.id} style={{ position: 'relative', marginBottom: '32px' }}>
                
                {/* Timeline dot */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-32px', 
                  top: '16px', 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: color, 
                  border: '4px solid var(--bg-main)',
                  boxShadow: `0 0 0 2px ${color}55`
                }} />

                {/* Log Card */}
                <div className="glass-card" style={{ padding: '24px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="badge" style={{ background: `${color}22`, color: color, fontWeight: 700 }}>
                        {log.category}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} /> {log.timestamp}
                      </span>
                    </div>
                    
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={13} color="var(--primary)" /> {log.author}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-main)' }}>{log.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {log.content}
                  </p>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* New Log Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Registrar Suceso en la Bitácora Diaria">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Titular del Suceso / Actividad *</label>
            <input type="text" required className="form-input" placeholder="ej. Excursión nocturna finalizada" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Categoría *</label>
            <select className="form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Rutina">Rutina (Aseo, Comidas, Sueño)</option>
              <option value="Actividad">Actividad Deportiva / Juego</option>
              <option value="Alimentación">Alimentación / Cocina / Alergias</option>
              <option value="Taller">Taller / Manualidades</option>
              <option value="Incidencia">⚠️ Incidencia Médica o Logística</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Descripción de lo realizado *</label>
            <textarea required className="form-textarea" rows={4} placeholder="Escribe aquí notas detalladas, nombres de los grupos participantes, estado de los niños..." value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-accent">Publicar en Bitácora</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
