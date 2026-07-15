import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";

import Dashboard from "../pages/candidate/Dashboard";
import Offres from "../pages/candidate/Offres";
import Recommandations from "../pages/candidate/Recommandations";
import Profil from "../pages/candidate/Profil";

import RecruteurDashboard from "../pages/recruiter/Dashboard";
import Campagne from "../pages/recruiter/Campagne";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/candidate/dashboard" element={<Dashboard />} />
        <Route path="/candidate/offres" element={<Offres />} />
        <Route
          path="/candidate/recommandations"
          element={<Recommandations />}
        />
        <Route path="/candidate/profil" element={<Profil />} />

        <Route path="/recruteur/dashboard" element={<RecruteurDashboard />} />
        <Route path="/recruteur/campagne" element={<Campagne />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
