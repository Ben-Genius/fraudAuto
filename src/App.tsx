import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import VinDecoder from './pages/vin-decoder/VinDecoder';
import LicensePlate from './pages/license-plate/LicensePlate';
import Pricing from './pages/pricing/Pricing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vin-decoder" element={<VinDecoder />} />
          <Route path="/license-plate" element={<LicensePlate />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
