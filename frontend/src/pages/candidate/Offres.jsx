// pages/candidate/Offres.jsx
import { useEffect, useState } from "react";
import CandidateLayout from "../../layouts/CandidateLayout";
import OfferCard from "../../components/OfferCard";
import API from "../../services/api";
import {
  FaBriefcase,
  FaLocationDot,
  FaChartLine,
  FaBell,
  FaChevronDown,
} from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ApplyModal from "../../components/ApplyModal";

function FilterDropdown({ icon, label, value, options, onChange }) {
  return (
    <details className="relative group">
      <summary className="h-[36px] px-4 border border-[#e5e7eb] rounded-full text-[13px] text-gray-700 bg-white flex items-center gap-2 cursor-pointer list-none select-none">
        {icon}
        {value || label}
        <FaChevronDown className="w-2.5 h-2.5 text-gray-400" />
      </summary>

      <div className="absolute z-20 mt-2 min-w-[180px] bg-white border border-[#e5e7eb] rounded-xl shadow-lg py-1">
        <button
          onClick={(e) => {
            onChange("");
            e.target.closest("details").removeAttribute("open");
          }}
          className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50"
        >
          Tous
        </button>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={(e) => {
              onChange(opt);
              e.target.closest("details").removeAttribute("open");
            }}
            className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50"
          >
            {opt}
          </button>
        ))}
      </div>
    </details>
  );
}

function Offres() {
  const [offres, setOffres] = useState([]);
  const [selectedOffre, setSelectedOffre] = useState(null);

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      const res = await API.get("/offres");
      setOffres(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [search, setSearch] = useState("");
  const [lieu, setLieu] = useState("");
  const [typeContrat, setTypeContrat] = useState("");
  const [periode, setPeriode] = useState("Tout");
  const [sortMode, setSortMode] = useState("recent"); // "recent" | "compat"
  const [favoris, setFavoris] = useState(new Set());
  const [showApplyModal, setShowApplyModal] = useState(false);

  const filteredOffres = offres.filter((offre) => {
    const matchSearch =
      offre.titre?.toLowerCase().includes(search.toLowerCase()) ||
      offre.description?.toLowerCase().includes(search.toLowerCase()) ||
      offre.lieu?.toLowerCase().includes(search.toLowerCase());

    const matchLieu = lieu === "" || offre.lieu === lieu;
    const matchContrat =
      typeContrat === "" || offre.typeContrat === typeContrat;

    let matchDate = true;
    const diffDays =
      (new Date() - new Date(offre.datePublication)) / (1000 * 60 * 60 * 24);

    if (periode === "24h") matchDate = diffDays <= 1;
    if (periode === "7d") matchDate = diffDays <= 7;
    if (periode === "30d") matchDate = diffDays <= 30;

    return matchSearch && matchLieu && matchContrat && matchDate;
  });

  const sortedOffres = [...filteredOffres].sort((a, b) => {
    if (sortMode === "recent") {
      return new Date(b.datePublication) - new Date(a.datePublication);
    }
    // "compat" placeholder — plug in a real matching score when you have one
    return (
      (b.competencesRequises?.length || 0) -
      (a.competencesRequises?.length || 0)
    );
  });

  const toggleFavori = (id) => {
    setFavoris((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const lieux = [...new Set(offres.map((o) => o.lieu))].filter(Boolean);
  const contrats = ["CDI", "CDD", "STAGE", "FREELANCE"];

  return (
    <CandidateLayout>
      <div className="mt-17 h-full bg-white">
        {/* TOP SEARCH AREA */}
        <div className="bg-white border-b border-[#e5e7eb]">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-[320px] h-10 border border-[#e5e7eb] bg-[#fafafa] rounded-full flex items-center px-4">
                <svg
                  className="w-4 h-4 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un poste, rôle, lieu..."
                  className="ml-3 w-full bg-transparent outline-none text-[14px]"
                />
              </div>

              <button
                onClick={() => setSortMode("recent")}
                className={`h-[40px] px-4 rounded-full text-[13px] font-medium ${
                  sortMode === "recent"
                    ? "bg-black text-white"
                    : "border border-[#e5e7eb] bg-white text-gray-700"
                }`}
              >
                Récent
              </button>

              <button
                onClick={() => setSortMode("compat")}
                className={`h-[40px] px-4 rounded-full text-[13px] flex items-center gap-2 ${
                  sortMode === "compat"
                    ? "bg-black text-white"
                    : "border border-[#e5e7eb] bg-white text-gray-700"
                }`}
              >
                ✦ Compatibilité
              </button>

              <div className="flex border border-[#e5e7eb] rounded-full overflow-hidden">
                {["24h", "7d", "30d", "Tout"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriode(p)}
                    className={`px-4 py-2 text-[13px] ${
                      periode === p ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button className="h-[40px] px-4 rounded-full border border-[#e5e7eb] text-[13px] flex items-center gap-2 text-gray-700">
                <FaRegHeart /> Favoris
              </button>

              <button className="relative h-[36px] px-4 border border-[#e5e7eb] rounded-full text-[13px] text-gray-700 bg-white flex items-center gap-2">
                <FaBell />
                Alertes
                <span className="absolute top-1.5 right-2.5 w-1.5 h-1.5 rounded-full bg-green-500" />
              </button>
            </div>

            <p className="text-[13px] text-gray-400">
              {filteredOffres.length} offres trouvées
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex gap-3 px-4 pb-3">
            <button className="h-[36px] px-4 border border-[#e5e7eb] rounded-full text-[13px] text-gray-700 bg-white flex items-center gap-2">
              <FaBriefcase />
              Rôle
            </button>

            <FilterDropdown
              icon={<FaLocationDot />}
              label="Lieu"
              value={lieu}
              options={lieux}
              onChange={setLieu}
            />

            <FilterDropdown
              icon={<FaBriefcase />}
              label="Type de contrat"
              value={typeContrat}
              options={contrats}
              onChange={setTypeContrat}
            />

            <button className="h-[36px] px-4 border border-[#e5e7eb] rounded-full text-[13px] text-gray-700 bg-white flex items-center gap-2">
              <FaChartLine /> Niveau d'expérience
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-12 h-[calc(100vh-56px)]">
          <div className="col-span-4 border-r border-[#e5e7eb] bg-[#fafafa] p-3 overflow-y-auto pretty-scrollbar h-full">
            {sortedOffres.map((offre) => (
              <OfferCard
                key={offre._id}
                offre={offre}
                isSelected={selectedOffre?._id === offre._id}
                isFavori={favoris.has(offre._id)}
                onToggleFavori={() => toggleFavori(offre._id)}
                onSelect={setSelectedOffre}
                onApply={() => setShowApplyModal(true)}
              />
            ))}
          </div>

          <div className="col-span-8 bg-white h-full overflow-y-auto">
            {!selectedOffre ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-[28px] font-semibold text-[#111827]">
                    Sélectionnez une offre pour voir les détails
                  </h2>
                  <p className="mt-3 text-[14px] text-gray-400">
                    Cliquez sur une offre dans la liste pour voir la description
                    complète.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto p-10">
                <h1 className="text-3xl font-bold">{selectedOffre.titre}</h1>

                <div className="flex gap-6 mt-4 text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaLocationDot /> {selectedOffre.lieu}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaBriefcase /> {selectedOffre.typeContrat}
                  </span>
                </div>

                <div className="mt-10">
                  <h3 className="font-semibold text-lg mb-4">Description</h3>
                  <p className="leading-8 text-gray-700 whitespace-pre-line">
                    {selectedOffre.description}
                  </p>
                </div>

                <div className="flex gap-4 mt-10">
                  <button className="bg-[#2d0fd5] text-white px-8 py-3 rounded-xl font-medium">
                    Adapter CV
                  </button>
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="border border-[#2d0fd5] text-[#2d0fd5] px-8 py-3 rounded-xl font-medium"
                  >
                    Postuler
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <ApplyModal
          isOpen={showApplyModal}
          onClose={() => setShowApplyModal(false)}
        />
      </div>
    </CandidateLayout>
  );
}

export default Offres;
