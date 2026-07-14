import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/candidate/Dashboard";
import Offres from "../pages/candidate/Offres";
import Recommandations from "../pages/candidate/Recommandations";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Profil from "../pages/candidate/Profil";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
path="/verify-email"
element={<VerifyEmail />}
/>

        <Route
          path="/candidate/dashboard"
          element={<Dashboard />}
        />

        <Route
  path="/candidate/offres"
  element={<Offres />}
/>

<Route
  path="/candidate/recommandations"
  element={<Recommandations />}
/>
<Route
  path="/candidate/profil"
  element={<Profil />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;