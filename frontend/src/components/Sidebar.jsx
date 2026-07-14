import {
  FaHouseChimney,
  FaBriefcase,
  FaCompass,
  FaInbox,
  FaMessage,
  FaUser,
  FaBrain,
} from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import freenessLogo from "../assets/logos/freeness.png";
function MenuItem({ icon, label, to, active }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all
      ${
        active
          ? "bg-[#eeebff] text-[#3b1ee8] font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span className="text-sm">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#f9f9fb] border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-5 border-b border-gray-200">

        <div className="flex items-center gap-2">

          <div className="flex justify-center">
                        <img
                          src={freenessLogo}
                          alt="Freeness"
                          className="w-9 h-auto"
                        />
                      </div>

          <div>
            <h1 className="font-semibold text-[#3b1ee8] text-sm">
              Freeness
            </h1>

            <p className="text-[10px] text-gray-400">
              AI Recruit
            </p>
          </div>

        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-1">

  <MenuItem
    to="/candidate/dashboard"
    icon={<FaHouseChimney />}
    label="Dashboard"
    active={location.pathname === "/candidate/dashboard"}
  />

  <MenuItem
    to="/candidate/offres"
    icon={<FaBriefcase />}
    label="Offres"
    active={location.pathname.startsWith("/candidate/offres")}
  />

  <MenuItem
    to="/candidate/messages"
    icon={<FaMessage />}
    label="Messages"
    active={location.pathname === "/candidate/messages"}
  />

  <MenuItem
    to="/candidate/profil"
    icon={<FaUser />}
    label="Profil"
    active={location.pathname === "/candidate/profil"}
  />

  <MenuItem
    to="/candidate/recommandations"
    icon={<FaBrain />}
    label="IA"
    active={location.pathname === "/candidate/recommandations"}
  />

</nav>

      {/* Bottom Card */}
      <div className="p-3">

        <div className="bg-white border rounded-xl p-3 shadow-sm">

          <h3 className="text-xs font-semibold">
            Révélez l'humain
          </h3>

          <p className="text-[10px] text-gray-500">
            Plus qu'un CV
          </p>

        </div>

      </div>

      {/* User */}
      <div className="border-t border-gray-200 p-3 flex items-center gap-2">

        <div className="w-7 h-7 rounded-full bg-[#3b1ee8] text-white flex items-center justify-center text-xs">
          H
        </div>

        <div>
          <p className="text-xs font-medium">
            Haithem
          </p>

          <p className="text-[10px] text-gray-500">
            Candidate
          </p>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;