import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBell,
  FaGlobe,
  FaUser,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isRecruteur = location.pathname.startsWith("/recruteur");

  const user = {
    nom: "ben fraj haythem",
    email: "benfrajhaithem864@gmail.com",
  };

  const initials = user.nom
    ? user.nom
        .trim()
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    : "";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: clear auth token / session then redirect
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
      {/* Left */}
      <div className="flex items-center">
        <div className="flex bg-[#f5f5f7] border border-gray-200 rounded-full p-1">
          <button
            onClick={() => navigate("/candidate/dashboard")}
            className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition ${
              !isRecruteur ? "bg-white shadow-sm text-black" : "text-gray-600"
            }`}
          >
            Candidat
          </button>

          <button
            onClick={() => navigate("/recruteur/dashboard")}
            className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition ${
              isRecruteur ? "bg-white shadow-sm text-black" : "text-gray-600"
            }`}
          >
            Recruteur
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button>
          <FaBell size={14} className="text-gray-600" />
        </button>

        <button className="relative">
          <FaGlobe size={14} className="text-gray-600" />
          <span className="absolute -top-2 -right-2 text-[8px] font-bold bg-indigo-600 text-white rounded px-1 leading-4">
            FR
          </span>
        </button>

        {/* Account menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-[12px] font-semibold text-white"
          >
            {initials || "BF"}
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-[13px] font-semibold text-white shrink-0">
                  {initials || "BF"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.nom}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              <div className="py-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/candidate/profil");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaUser size={13} className="text-gray-500" />
                  Profil
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/candidate/notifications");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaBell size={13} className="text-gray-500" />
                  Notifications
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/candidate/transactions");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaCreditCard size={13} className="text-gray-500" />
                  Transactions
                </button>
              </div>

              <div className="border-t border-gray-100 p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  <FaSignOutAlt size={13} />
                  Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
