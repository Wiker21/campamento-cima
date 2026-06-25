export const initialKids = [
  { id: 'k1', name: 'Hugo Martín López', age: 9, gender: 'M', group: 'Pequeños Exploradores', room: 'r1', allergies: 'Ninguna', tutor: 'Elena López', phone: '611223344', notes: 'Le encanta el tiro con arco.' },
  { id: 'k2', name: 'Lucía García Pérez', age: 8, gender: 'F', group: 'Pequeños Exploradores', room: 'r2', allergies: 'Celíaca (Gluten)', tutor: 'Carlos García', phone: '622334455', notes: 'Dieta estricta sin gluten.' },
  { id: 'k3', name: 'Mateo Fernández Ruiz', age: 10, gender: 'M', group: 'Pequeños Exploradores', room: 'r1', allergies: 'Lactosa', tutor: 'Laura Ruiz', phone: '633445566', notes: 'Lleva pastillas de lactasa en mochila.' },
  { id: 'k4', name: 'Sofía Rodríguez Sánchez', age: 9, gender: 'F', group: 'Pequeños Exploradores', room: 'r2', allergies: 'Ninguna', tutor: 'Pedro Rodríguez', phone: '644556677', notes: 'Primera vez de campamento.' },
  { id: 'k5', name: 'Lucas Gómez Navarro', age: 10, gender: 'M', group: 'Pequeños Exploradores', room: 'r1', allergies: 'Picadura de abeja', tutor: 'Marta Navarro', phone: '655667788', notes: 'Adrenalina en botiquín central.' },
  { id: 'k6', name: 'Martina Romero Díaz', age: 8, gender: 'F', group: 'Pequeños Exploradores', room: 'r2', allergies: 'Ninguna', tutor: 'Antonio Romero', phone: '666778899', notes: 'Muy participativa.' },
  
  { id: 'k7', name: 'Leo Torres Vázquez', age: 12, gender: 'M', group: 'Aventureros Cima', room: 'r3', allergies: 'Ninguna', tutor: 'Ana Vázquez', phone: '677889900', notes: 'Sabe tocar la guitarra.' },
  { id: 'k8', name: 'Valeria Gil Ramos', age: 11, gender: 'F', group: 'Aventureros Cima', room: 'r4', allergies: 'Frutos secos', tutor: 'David Gil', phone: '688990011', notes: 'Alergia severa a cacahuetes.' },
  { id: 'k9', name: 'Daniel Serrano Marín', age: 13, gender: 'M', group: 'Aventureros Cima', room: 'r3', allergies: 'Ninguna', tutor: 'Isabel Marín', phone: '699001122', notes: 'Capitán en juegos de equipo.' },
  { id: 'k10', name: 'Emma Molina Blanco', age: 12, gender: 'F', group: 'Aventureros Cima', room: 'r4', allergies: 'Ninguna', tutor: 'Javier Molina', phone: '610112233', notes: 'Buena orientadora.' },
  { id: 'k11', name: 'Álvaro Delgado Castro', age: 11, gender: 'M', group: 'Aventureros Cima', room: 'r3', allergies: 'Melocotón', tutor: 'Carmen Castro', phone: '620223344', notes: 'Avisar a cocina en postres.' },
  { id: 'k12', name: 'Alba Ortiz Ortiz', age: 13, gender: 'F', group: 'Aventureros Cima', room: 'r4', allergies: 'Ninguna', tutor: 'Fernando Ortiz', phone: '630334455', notes: 'Le gusta el teatro.' },

  { id: 'k13', name: 'Pablo Rubio Cruz', age: 14, gender: 'M', group: 'Alpinistas', room: 'r5', allergies: 'Ninguna', tutor: 'Raquel Cruz', phone: '640445566', notes: 'Excelente resistencia física.' },
  { id: 'k14', name: 'Sara Núñez Reyes', age: 15, gender: 'F', group: 'Alpinistas', room: 'r6', allergies: 'Ácaros y Polvo', tutor: 'Manuel Núñez', phone: '650556677', notes: 'Ventilar su cabaña a diario.' },
  { id: 'k15', name: 'Diego Medina Santos', age: 14, gender: 'M', group: 'Alpinistas', room: 'r5', allergies: 'Ninguna', tutor: 'Beatriz Santos', phone: '660667788', notes: 'Ayuda mucho a los pequeños.' },
  { id: 'k16', name: 'Julia Castillo Cano', age: 15, gender: 'F', group: 'Alpinistas', room: 'r6', allergies: 'Ninguna', tutor: 'Gonzalo Castillo', phone: '670778899', notes: 'Encargada de bitácora juvenil.' },
  { id: 'k17', name: 'Enrique Soto Mora', age: 14, gender: 'M', group: 'Alpinistas', room: 'r5', allergies: 'Penicilina', tutor: 'Silvia Mora', phone: '680889900', notes: 'Brazalete rojo médico.' },
  { id: 'k18', name: 'Nora Peña Lozano', age: 10, gender: 'F', group: null, room: null, allergies: 'Ninguna', tutor: 'Alberto Peña', phone: '690990011', notes: 'Inscripción de última hora.' }
];

export const initialGroups = [
  { id: 'g1', name: 'Pequeños Exploradores', ageRange: '8 - 10 años', monitor: 'Marcos (Mon. Exploradores)', color: '#10b981', desc: 'Introducción a la naturaleza, rastreo básico y juegos cooperativos.' },
  { id: 'g2', name: 'Aventureros Cima', ageRange: '11 - 13 años', monitor: 'Clara (Mon. Aventureros)', color: '#0ea5e9', desc: 'Rutas de media montaña, cabuyería, orientación y supervivencia.' },
  { id: 'g3', name: 'Alpinistas', ageRange: '14 - 15 años', monitor: 'Javi (Mon. Alpinistas)', color: '#f59e0b', desc: 'Técnicas de vivac, escalada, liderazgo y grandes travesías.' }
];

export const initialRooms = [
  { id: 'r1', name: 'Cabaña A1 - Roble', capacity: 6, gender: 'M', sector: 'Sector Norte' },
  { id: 'r2', name: 'Cabaña A2 - Pino', capacity: 6, gender: 'F', sector: 'Sector Norte' },
  { id: 'r3', name: 'Cabaña B1 - Abeto', capacity: 6, gender: 'M', sector: 'Sector Central' },
  { id: 'r4', name: 'Cabaña B2 - Encina', capacity: 6, gender: 'F', sector: 'Sector Central' },
  { id: 'r5', name: 'Cabaña C1 - Haya', capacity: 4, gender: 'M', sector: 'Sector Lago' },
  { id: 'r6', name: 'Cabaña C2 - Cedro', capacity: 4, gender: 'F', sector: 'Sector Lago' }
];

export const initialLogs = [
  {
    id: 'l1',
    timestamp: '2026-07-01 08:30',
    author: 'Coordinador General',
    category: 'Rutina',
    title: 'Toque de diana e inicio del día 1',
    content: 'Todos los participantes despiertos puntualmente. Aseo matutino y revisión de cabañas efectuada con éxito.'
  },
  {
    id: 'l2',
    timestamp: '2026-07-01 10:15',
    author: 'Clara (Mon. Aventureros)',
    category: 'Actividad',
    title: 'Excursión al pinar y búsqueda del tesoro',
    content: 'Los grupos de Pequeños Exploradores y Aventureros Cima han completado la ruta de 4km. El clima es excelente.'
  },
  {
    id: 'l3',
    timestamp: '2026-07-01 13:45',
    author: 'Equipo de Cocina',
    category: 'Alimentación',
    title: 'Reparto de almuerzo (Menú 1)',
    content: 'Macarrones con tomate y pollo al horno. Protocolo de alérgenos (celíacos y lactosa) supervisado personalmente.'
  },
  {
    id: 'l4',
    timestamp: '2026-07-01 16:30',
    author: 'Javi (Mon. Alpinistas)',
    category: 'Taller',
    title: 'Taller de nudos y amarres de montaña',
    content: 'Los mayores han construido un puente mono entre dos robles. Máxima seguridad y gran compañerismo.'
  }
];
