import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientPortal from './pages/ClientPortal';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import VetDashboard from './pages/VetDashboard';

import { ClinicProvider } from './context/ClinicContext';

function App() {
  return (
    <ClinicProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/client" element={<ClientPortal />} />
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/vet" element={<VetDashboard />} />
        </Routes>
      </Router>
    </ClinicProvider>
  );
}

export default App;
