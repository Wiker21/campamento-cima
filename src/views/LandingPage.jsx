import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mountain, Compass, Tent, ShieldCheck, Flame, Calendar, MapPin, Users, ArrowRight, CheckCircle, Star, Sparkles } from 'lucide-react';
import { Modal } from '../components/Modal';

export function LandingPage({ addKid }) {
  const navigate = useNavigate();
  const [inscrModalOpen, setInscrModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '10',
    gender: 'M',
    allergies: 'Ninguna',
    tutor: '',
    phone: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.tutor || !formData.phone) return;
    
    addKid({
      ...formData,
      age: parseInt(formData.age),
      group: null, // Pendiente de repartir
      room: null
    });
    
    setFormSubmitted(true);
    setTimeout(() => {
      setInscrModalOpen(false);
      setFormSubmitted(false);
      setFormData({ name: '', age: '10', gender: 'M', allergies: 'Ninguna', tutor: '', phone: '', notes: '' });
    }, 2500);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '88vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '60px 24px',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.35)), url("/portada.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', zIndex: 10 }}>
          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.04em', 
            lineHeight: 1.05,
            color: '#ffffff',
            textShadow: '0 4px 24px rgba(0,0,0,0.5)',
            marginBottom: '32px',
            fontFamily: 'var(--font-heading)'
          }}>
            Campamento Cima
          </h1>

          <button 
            onClick={() => setInscrModalOpen(true)}
            className="btn-accent"
            style={{ padding: '16px 40px', fontSize: '1.15rem', fontWeight: 700, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
          >
            Pre-inscripción Online <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section id="actividades" style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge badge-primary">Pilares Fundamentales</span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }}>¿Qué hace especial al Campamento Cima?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
          
          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ background: 'hsla(152, 68%, 28%, 0.1)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '20px' }}>
              <Compass size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Orientación y Rutas</h3>
            <p style={{ color: 'var(--text-muted)' }}>Excursiones por la sierra, aprendizaje de mapas, brújula y rastreo ecológico adaptado a cada grupo de edad.</p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ background: 'hsla(198, 88%, 42%, 0.1)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', marginBottom: '20px' }}>
              <Tent size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Vida en Cabañas</h3>
            <p style={{ color: 'var(--text-muted)' }}>Alojamiento en cabañas de madera por sectores organizados. Fomento del orden, la higiene y la convivencia.</p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ background: 'hsla(35, 96%, 52%, 0.15)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '20px' }}>
              <Flame size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Veladas y Fogatas</h3>
            <p style={{ color: 'var(--text-muted)' }}>Cada noche celebramos grandes juegos nocturnos, canciones de campamento y representaciones artísticas en grupo.</p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ background: 'hsla(152, 60%, 42%, 0.12)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)', marginBottom: '20px' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Control y Salud</h3>
            <p style={{ color: 'var(--text-muted)' }}>Base de datos interna continua para supervisión de alergias, menús especiales y bitácora diaria accesible por la coordinación.</p>
          </div>

        </div>
      </section>

      {/* Philosophy Banner */}
      <section id="filosofia" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', color: 'white', padding: '80px 24px', margin: '100px 0', borderRadius: '30px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Star size={40} color="#fbbf24" fill="#fbbf24" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '20px' }}>Nuestra Filosofía: "Ninguno se queda atrás"</h2>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: 1.7, marginBottom: '32px' }}>
            En el Campamento Cima estructuramos los grupos por edades (Exploradores, Aventureros y Alpinistas) para garantizar que los desafíos estén siempre alineados con su madurez. Nuestra bitácora digital interna nos permite registrar en tiempo real cada paso de la aventura.
          </p>
          <button onClick={() => navigate('/acceso')} style={{ background: 'white', color: 'var(--primary-dark)', padding: '14px 30px', borderRadius: '99px', fontWeight: 700, fontSize: '1rem', transition: 'transform 0.2s' }}>
            Entrar a la Base de Datos Interna →
          </button>
        </div>
      </section>

      {/* Pre-inscripcion Modal */}
      <Modal isOpen={inscrModalOpen} onClose={() => setInscrModalOpen(false)} title="Solicitud de Pre-inscripción (Verano 2026)">
        {!formSubmitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Rellena los datos del participante. Al enviar, la ficha entrará directamente en la base de datos de organización pendiente de asignación de cabaña y grupo.
            </p>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Nombre y Apellidos del Niño/a *</label>
              <input type="text" required className="form-input" placeholder="ej. Martín Gómez Serrano" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Edad *</label>
                <select className="form-select" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})}>
                  {[8,9,10,11,12,13,14,15].map(num => <option key={num} value={num}>{num} años</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Género *</label>
                <select className="form-select" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Alergias o Condiciones Médicas *</label>
              <input type="text" className="form-input" placeholder="ej. Celíaco, Lactosa, Ninguna" value={formData.allergies} onChange={e => setFormData({...formData, allergies: e.target.value})} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Nombre del Padre/Madre/Tutor *</label>
              <input type="text" required className="form-input" placeholder="ej. Lucía Serrano" value={formData.tutor} onChange={e => setFormData({...formData, tutor: e.target.value})} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Teléfono de Contacto Urgente *</label>
              <input type="tel" required className="form-input" placeholder="ej. 600 111 222" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Notas u Observaciones (Opcional)</label>
              <textarea className="form-textarea" rows={2} placeholder="Sabe nadar, prefiere estar con su hermano..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
            </div>

            <button type="submit" className="btn-accent" style={{ marginTop: '10px', justifyContent: 'center' }}>
              Enviar Pre-inscripción
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircle size={56} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>¡Inscripción Registrada!</h4>
            <p style={{ color: 'var(--text-muted)' }}>
              La ficha de **{formData.name}** se ha guardado en la base de datos de organización del campamento. Los coordinadores la revisarán en breve.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
