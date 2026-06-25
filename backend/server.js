const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@db:5432/campacima'
});

// Helper to retry db connection on startup
async function waitForDb(retries = 15, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('✓ Conectado exitosamente a PostgreSQL');
      return;
    } catch (err) {
      console.log(`Esperando a PostgreSQL (${i + 1}/${retries})...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error('✗ No se pudo conectar a PostgreSQL');
}

// ==========================================
// ENDPOINTS DE AUTENTICACIÓN Y USUARIOS
// ==========================================
app.post('/api/login', async (req, res) => {
  const { role } = req.body;
  try {
    const username = role === 'coordinador' ? 'coordinador' : 'monitor';
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINTS DE NIÑOS (KIDS)
// ==========================================
app.get('/api/kids', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, age, gender, allergies, tutor, phone, notes, group_name as group, room_id as room FROM kids ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/kids', async (req, res) => {
  const { name, age, gender, allergies, tutor, phone, notes, group, room } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO kids (name, age, gender, allergies, tutor, phone, notes, group_name, room_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, name, age, gender, allergies, tutor, phone, notes, group_name as group, room_id as room`,
      [name, age, gender, allergies || 'Ninguna', tutor, phone, notes || '', group || null, room || null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/kids/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, allergies, tutor, phone, notes, group, room } = req.body;
  try {
    const result = await pool.query(
      `UPDATE kids 
       SET name=$1, age=$2, gender=$3, allergies=$4, tutor=$5, phone=$6, notes=$7, group_name=$8, room_id=$9
       WHERE id=$10
       RETURNING id, name, age, gender, allergies, tutor, phone, notes, group_name as group, room_id as room`,
      [name, age, gender, allergies || 'Ninguna', tutor, phone, notes || '', group || null, room || null, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/kids/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM kids WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINTS DE GRUPOS (GROUPS)
// ==========================================
app.get('/api/groups', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM groups ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/groups', async (req, res) => {
  const { name, age_range, color } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO groups (name, age_range, color) VALUES ($1, $2, $3) RETURNING *',
      [name, age_range, color]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINTS DE HABITACIONES (ROOMS)
// ==========================================
app.get('/api/rooms', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rooms ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINTS DE BITÁCORA (LOGS)
// ==========================================
app.get('/api/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activity_logs ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/logs', async (req, res) => {
  const { title, category, content, author } = req.body;
  const timestamp = 'Hoy, ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  try {
    const result = await pool.query(
      'INSERT INTO activity_logs (title, category, content, author, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, category, content, author || 'Coordinación', timestamp]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Servidor Backend corriendo en puerto ${PORT}`);
  await waitForDb();
});
