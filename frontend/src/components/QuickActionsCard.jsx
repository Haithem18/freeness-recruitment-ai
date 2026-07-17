import { useNavigate } from "react-router-dom";
import {
  FaBolt,
  FaWandMagicSparkles,
  FaBriefcase,
  FaUser,
  FaBookmark,
} from "react-icons/fa6";

const actions = [
  {
    label: "CV Builder",
    icon: FaWandMagicSparkles,
    to: "/candidate/cv-builder",
  },
  { label: "Parcourir les offres", icon: FaBriefcase, to: "/candidate/offres" },
  { label: "Compléter le profil", icon: FaUser, to: "/candidate/profil" },
  {
    label: "Voir les candidatures",
    icon: FaBookmark,
    to: "/candidate/candidatures",
  },
];

function QuickActionsCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 h-70">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center">
          <FaBolt size={12} className="text-[#3b1ee8]" />
        </div>
        <h3 className="font-semibold text-[15px]">Actions rapides</h3>
      </div>

      <div className="mt-2">
        {actions.map(({ label, icon: Icon, to }) => (
          <button
            key={label}
            onClick={() => navigate(to)}
            className="w-full flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 text-left"
          >
            <span className="flex items-center gap-3 text-[14px] text-gray-700">
              <Icon size={13} className="text-[#3b1ee8]" />
              {label}
            </span>
            <span className="text-gray-300">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActionsCard;
