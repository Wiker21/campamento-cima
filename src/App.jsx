import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useCampStore } from './hooks/useCampStore';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Views
import { LandingPage } from './views/LandingPage';
import { LoginPage } from './views/LoginPage';
import { DashboardView } from './views/DashboardView';
import { KidsDatabaseView } from './views/KidsDatabaseView';
import { GroupsManagerView } from './views/GroupsManagerView';
import { RoomsManagerView } from './views/RoomsManagerView';
import { ActivityLogView } from './views/ActivityLogView';

function MainContent() {
  const {
    kids,
    groups,
    rooms,
    logs,
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
  } = useCampStore();

  const location = useLocation();
  const showFooter = ['/', '/inicio', '/acceso'].includes(location.pathname);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        currentUser={currentUser}
        logout={logout}
      />
      
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Rutas Públicas e Inicio */}
          <Route path="/inicio" element={<LandingPage addKid={addKid} />} />
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          
          {/* Portal de Acceso Independiente */}
          <Route path="/acceso" element={<LoginPage login={login} />} />

          {/* Páginas Independientes de Gestión */}
          <Route 
            path="/panel" 
            element={
              <DashboardView
                kids={kids}
                groups={groups}
                rooms={rooms}
                logs={logs}
                resetToDefaults={resetToDefaults}
              />
            } 
          />

          <Route 
            path="/ninos" 
            element={
              <KidsDatabaseView
                kids={kids}
                groups={groups}
                rooms={rooms}
                addKid={addKid}
                updateKid={updateKid}
                deleteKid={deleteKid}
              />
            } 
          />

          <Route 
            path="/grupos" 
            element={
              <GroupsManagerView
                kids={kids}
                groups={groups}
                assignKidGroup={assignKidGroup}
                addGroup={addGroup}
              />
            } 
          />

          <Route 
            path="/habitaciones" 
            element={
              <RoomsManagerView
                kids={kids}
                rooms={rooms}
                assignKidRoom={assignKidRoom}
              />
            } 
          />

          <Route 
            path="/bitacora" 
            element={
              <ActivityLogView
                logs={logs}
                addLog={addLog}
                currentUser={currentUser}
              />
            } 
          />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}
