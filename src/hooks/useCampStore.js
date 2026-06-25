import { useState, useEffect, useCallback } from 'react';

export function useCampStore() {
  const [kids, setKids] = useState([]);
  const [groups, setGroups] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sesión de usuario local
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('campa_user_session');
    return saved ? JSON.parse(saved) : null;
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [kidsRes, groupsRes, roomsRes, logsRes] = await Promise.all([
        fetch('/api/kids').then(r => r.json()),
        fetch('/api/groups').then(r => r.json()),
        fetch('/api/rooms').then(r => r.json()),
        fetch('/api/logs').then(r => r.json())
      ]);

      if (Array.isArray(kidsRes)) setKids(kidsRes);
      if (Array.isArray(groupsRes)) setGroups(groupsRes);
      if (Array.isArray(roomsRes)) setRooms(roomsRes);
      if (Array.isArray(logsRes)) setLogs(logsRes);
    } catch (err) {
      console.error("Error cargando datos del Backend SQL:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const login = async (role) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        localStorage.setItem('campa_user_session', JSON.stringify(user));
      }
    } catch (err) {
      console.error("Error en login:", err);
      // Fallback demo local en caso de error de red
      const fallbackUser = {
        name: role === 'coordinador' ? 'Coordinación Cima' : 'Monitor/a Roble',
        role: role === 'coordinador' ? 'Coordinador General' : 'Monitor de Grupo'
      };
      setCurrentUser(fallbackUser);
      localStorage.setItem('campa_user_session', JSON.stringify(fallbackUser));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('campa_user_session');
  };

  const addKid = async (newKid) => {
    try {
      const res = await fetch('/api/kids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKid)
      });
      if (res.ok) {
        const created = await res.json();
        setKids(prev => [created, ...prev]);
      }
    } catch (err) {
      console.error("Error añadiendo niño:", err);
    }
  };

  const updateKid = async (id, updatedFields) => {
    try {
      const target = kids.find(k => k.id === id);
      const merged = { ...target, ...updatedFields };
      const res = await fetch(`/api/kids/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged)
      });
      if (res.ok) {
        const saved = await res.json();
        setKids(prev => prev.map(k => k.id === id ? saved : k));
      }
    } catch (err) {
      console.error("Error actualizando niño:", err);
    }
  };

  const deleteKid = async (id) => {
    try {
      const res = await fetch(`/api/kids/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setKids(prev => prev.filter(k => k.id !== id));
      }
    } catch (err) {
      console.error("Error eliminando niño:", err);
    }
  };

  const assignKidGroup = (kidId, groupName) => {
    updateKid(kidId, { group: groupName });
  };

  const assignKidRoom = (kidId, roomId) => {
    updateKid(kidId, { room: roomId ? parseInt(roomId) : null });
  };

  const addGroup = async (newGroup) => {
    try {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGroup)
      });
      if (res.ok) {
        const created = await res.json();
        setGroups(prev => [...prev, created]);
      }
    } catch (err) {
      console.error("Error creando grupo:", err);
    }
  };

  const addLog = async (newLog) => {
    try {
      const payload = {
        ...newLog,
        author: currentUser ? currentUser.name : 'Sistema Web'
      };
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const created = await res.json();
        setLogs(prev => [created, ...prev]);
      }
    } catch (err) {
      console.error("Error añadiendo log:", err);
    }
  };

  const resetToDefaults = async () => {
    await fetchData();
  };

  return {
    kids,
    groups,
    rooms,
    logs,
    loading,
    currentUser,
    login,
    logout,
    addKid,
    updateKid,
    deleteKid,
    assignKidGroup,
    assignKidRoom,
    addGroup,
    addLog,
    resetToDefaults
  };
}
