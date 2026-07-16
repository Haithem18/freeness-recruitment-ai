import { NavLink } from "react-router-dom";
import {
  FaHouseChimney,
  FaBriefcase,
  FaMessage,
  FaUser,
  FaBrain,
} from "react-icons/fa6";
import freenessLogo from "../assets/logos/freeness.png";

const links = [
  {
    to: "/candidate/dashboard",
    label: "Dashboard",
    icon: FaHouseChimney,
  },
  {
    to: "/candidate/offres",
    label: "Offres",
    icon: FaBriefcase,
  },
  {
    to: "/candidate/messages",
    label: "Messages",
    icon: FaMessage,
  },
  {
    to: "/candidate/profil",
    label: "Profil",
    icon: FaUser,
  },
  {
    to: "/candidate/recommandations",
    label: "IA",
    icon: FaBrain,
  },
];

function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#f9f9fb] border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex justify-center">
            <img src={freenessLogo} alt="Freeness" className="w-9 h-auto" />
          </div>

          <div>
            <h1 className="font-semibold text-[#3b1ee8] text-sm">Freeness</h1>
            <p className="text-[10px] text-gray-400">AI Recruit</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition ${
                isActive
                  ? "bg-[#eeecfd] text-[#4F46E5] font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <Icon size={15} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Promo Card */}
      <div className="mx-3 mb-3 rounded-2xl border border-gray-200 p-4">
        <p className="text-[13px] font-semibold text-gray-900">
          Révélez l'humain <span className="text-indigo-500">✨</span>
        </p>

        <p className="text-[12px] text-gray-500">Plus qu'un CV</p>
      </div>

      {/* Espace */}
      <div className="mx-3 mb-4 pt-3 border-t border-gray-100">
        <p className="text-[10px] font-semibold text-gray-400 px-1 mb-1 tracking-wide">
          ESPACE
        </p>

        <div className="flex items-center gap-2 px-1 py-1">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <FaUser size={13} className="text-gray-500" />
          </div>

          <div className="leading-tight">
            <p className="text-[13px] font-medium text-gray-900">Candidate</p>

            <p className="text-[11px] text-gray-400">
              Trouver des opportunités...
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
