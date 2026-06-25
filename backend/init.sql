CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age_range VARCHAR(50) NOT NULL,
  color VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  capacity INT NOT NULL,
  gender VARCHAR(10) NOT NULL,
  sector VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS kids (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(10) NOT NULL,
  allergies VARCHAR(255) DEFAULT 'Ninguna',
  tutor VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  notes TEXT,
  group_name VARCHAR(100),
  room_id INT
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  timestamp VARCHAR(50) NOT NULL
);

-- Semilla inicial de datos de demostración
INSERT INTO users (name, role, username) VALUES 
('Coordinación Cima', 'Coordinador General', 'coordinador'),
('Monitor/a Roble', 'Monitor de Grupo', 'monitor')
ON CONFLICT DO NOTHING;

INSERT INTO groups (name, age_range, color) VALUES 
('Exploradores (8-10 años)', '8-10', '#10b981'),
('Aventureros (11-13 años)', '11-13', '#3b82f6'),
('Alpinistas (14-16 años)', '14-16', '#f59e0b')
ON CONFLICT DO NOTHING;

INSERT INTO rooms (id, name, capacity, gender, sector) VALUES 
(1, 'Cabaña A1 - Roble', 6, 'M', 'Sector Bosque'),
(2, 'Cabaña A2 - Encina', 6, 'F', 'Sector Bosque'),
(3, 'Cabaña B1 - Pino', 8, 'M', 'Sector Río'),
(4, 'Cabaña B2 - Abeto', 8, 'F', 'Sector Río')
ON CONFLICT DO NOTHING;

INSERT INTO kids (name, age, gender, allergies, tutor, phone, notes, group_name, room_id) VALUES 
('Lucas Pérez', 9, 'M', 'Ninguna', 'Ana Pérez', '611223344', 'Le encanta el tiro con arco', 'Exploradores (8-10 años)', 1),
('Valeria Gómez', 12, 'F', 'Lactosa', 'Carlos Gómez', '622334455', 'Lleva pastillas lactasa', 'Aventureros (11-13 años)', 2),
('Hugo Martínez', 14, 'M', 'Cacahuetes', 'Elena Martínez', '633445566', 'Epipen en la mochila', 'Alpinistas (14-16 años)', 3),
('Sofía López', 8, 'F', 'Ninguna', 'David López', '644556677', 'Primera vez en campamento', 'Exploradores (8-10 años)', 2)
ON CONFLICT DO NOTHING;

INSERT INTO activity_logs (title, category, content, author, timestamp) VALUES 
('Llegada del primer turno', 'Rutina', 'Todos los participantes han llegado en el autobús de las 10:00 sin incidencias.', 'Coordinación', 'Hoy, 10:30'),
('Revisión médica inicial', 'Incidencia', 'Comprobadas medicaciones de alergias y entregadas a enfermería.', 'Dr. Vance', 'Hoy, 11:15'),
('Taller de Nudos y Cabullería', 'Taller', 'Los exploradores han practicado nudo llano y as de guía.', 'Monitor Roble', 'Hoy, 12:00')
ON CONFLICT DO NOTHING;
