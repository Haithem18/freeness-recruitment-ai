// components/OfferCard.jsx
import {
  FaLocationDot,
  FaBriefcase,
  FaChartLine,
  FaClock,
  FaWandMagicSparkles,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function timeAgo(date) {
  const diffMs = new Date() - new Date(date);
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) return `il y a ${days} jour${days > 1 ? "s" : ""}`;
  if (hours >= 1) return `il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  return `il y a ${Math.max(mins, 1)} min`;
}

function OfferCard({
  offre,
  isSelected,
  isFavori,
  onToggleFavori,
  onSelect,
  onApply,
}) {
  const companyName =
    offre.recruteur?.entreprise || offre.recruteur?.nom || "Entreprise";
  const initiale = companyName.charAt(0).toUpperCase();
  const niveau = offre.competencesRequises?.[0]?.niveau || "—";
  const skillsCount = offre.competencesRequises?.length || 0;

  return (
    <div
      onClick={() => onSelect(offre)}
      className={`bg-white border rounded-2xl p-4 mb-3 cursor-pointer transition ${
        isSelected
          ? "border-[#2d0fd5] ring-1 ring-[#2d0fd5]"
          : "border-[#e5e7eb]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {offre.recruteur?.logo ? (
            <img
              src={offre.recruteur.logo}
              alt={companyName}
              className="w-9 h-9 rounded-lg object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-[#f0eefc] text-[#2d0fd5] flex items-center justify-center font-semibold text-sm">
              {initiale}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-[15px] text-[#111827] leading-tight">
              {offre.titre}
            </h3>
            <p className="text-[12px] text-gray-400">{companyName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavori();
            }}
          >
            {isFavori ? <FaHeart className="text-[#2d0fd5]" /> : <FaRegHeart />}
          </button>
          <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="flex items-center gap-6 mt-3 text-[12px] text-gray-500">
        <span className="flex items-center gap-1">
          <FaLocationDot className="w-3 h-3" /> {offre.lieu}
        </span>
        <span className="flex items-center gap-1">Salaire compétitif</span>
      </div>

      <div className="flex items-center gap-6 mt-1.5 text-[12px] text-gray-500">
        <span className="flex items-center gap-1">
          <FaBriefcase className="w-3 h-3" /> {offre.typeContrat}
        </span>
        <span className="flex items-center gap-1">
          <FaChartLine className="w-3 h-3" /> {niveau}
        </span>
      </div>

      <p className="text-[13px] text-gray-500 mt-3 line-clamp-2 leading-5">
        {offre.description}
        {skillsCount > 0 && (
          <span className="inline-flex items-center justify-center w-4 h-4 ml-1 text-[10px] rounded bg-[#2d0fd5] text-white align-middle">
            {skillsCount}
          </span>
        )}
      </p>

      <div className="flex items-center gap-1 mt-3 text-[11px] text-gray-400">
        <FaClock className="w-3 h-3" /> {timeAgo(offre.datePublication)}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex-1 bg-[#2d0fd5] text-white text-[13px] font-medium rounded-lg py-2 flex items-center justify-center gap-1"
        >
          <FaWandMagicSparkles className="w-3 h-3" /> Adapter CV
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply();
          }}
          className="flex-1 border border-[#2d0fd5] text-[#2d0fd5] text-[13px] font-medium rounded-lg py-2 flex items-center justify-center gap-1"
        >
          Postuler <FaArrowUpRightFromSquare className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default OfferCard;
