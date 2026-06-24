import {
  FaLocationDot,
  FaBriefcase,
  FaHeart,
  FaXmark,
  FaFileLines,
  FaPaperPlane,
  FaRegClock,
  FaBuilding,
} from "react-icons/fa6";


function getTimeAgo(dateString) {
  const now = new Date();
  const posted = new Date(dateString);
  const diff = Math.floor((now - posted) / 1000);

  if (diff < 60) return "à l’instant";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `il y a ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `il y a ${days} jour(s)`;

  const weeks = Math.floor(days / 7);
  return `il y a ${weeks} semaine(s)`;
}


function OfferCard({ offre, onSelect, onApply }) {
  return (
    <div
      onClick={() => onSelect(offre)}
      className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between">

        <div>
          <h3 className="text-[20px] font-semibold text-gray-900">
            {offre.titre}
          </h3>

          

          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
  <FaBuilding className="text-xs" />
  Entreprise
</p>
        </div>

        <div className="flex gap-3 text-gray-400">
          <FaHeart />
          <FaXmark />
        </div>

      </div>

      <div className="flex gap-8 mt-4 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <FaLocationDot />
          {offre.lieu}
        </div>

        <div className="flex items-center gap-2">
          <FaBriefcase />
          {offre.typeContrat}
        </div>

      </div>

      <p className="text-sm text-gray-500 mt-4 line-clamp-2">
        {offre.description}
      </p>
<p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
  <FaRegClock className="text-[10px]" />
  {offre.createdAt && getTimeAgo(offre.createdAt)}
</p>
      <div className="flex gap-3 mt-5">
        

        <button
  className="flex-1 bg-[#2d0fd5] text-white py-2.5 rounded-xl font-medium text-[13px] flex items-center justify-center gap-2 hover:opacity-90 transition"
>
  <FaFileLines className="text-sm" />
  Adapter CV
</button>

        <button
  onClick={(e) => {
    e.stopPropagation();
    onApply();
  }}
  className="flex-1 border border-[#2d0fd5] text-[#2d0fd5] py-2.5 rounded-xl font-medium text-[13px] flex items-center justify-center gap-2 hover:bg-[#f5f3ff] transition"
>
  <FaPaperPlane className="text-sm" />
  Postuler
</button>

      </div>
    </div>
  );
}

export default OfferCard;