import { useEffect, useState } from "react";
import CandidateLayout from "../../layouts/CandidateLayout";
import OfferCard from "../../components/OfferCard";
import API from "../../services/api";
import { FaBriefcase,
  FaLocationDot,
  FaClipboardList,
  FaChartLine,
  FaBell
 } from "react-icons/fa6";
 import ApplyModal from "../../components/ApplyModal";

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

const filteredOffres = offres.filter((offre) => {
  const matchSearch =
    offre.titre?.toLowerCase().includes(search.toLowerCase()) ||
    offre.description?.toLowerCase().includes(search.toLowerCase()) ||
    offre.lieu?.toLowerCase().includes(search.toLowerCase());

  const matchLieu =
    lieu === "" || offre.lieu === lieu;

  const matchContrat =
    typeContrat === "" || offre.typeContrat === typeContrat;

  let matchDate = true;

  const diffDays =
    (new Date() - new Date(offre.datePublication)) /
    (1000 * 60 * 60 * 24);

  if (periode === "24h") matchDate = diffDays <= 1;
  if (periode === "7d") matchDate = diffDays <= 7;
  if (periode === "30d") matchDate = diffDays <= 30;

  return (
    matchSearch &&
    matchLieu &&
    matchContrat &&
    matchDate
  );
});
const [showApplyModal, setShowApplyModal] = useState(false);

useEffect(() => {
  console.log(showApplyModal);
}, [showApplyModal]);


return ( <CandidateLayout> <div className="mt-17 h-full bg-white">

    {/* TOP SEARCH AREA */}

    <div className="bg-white border-b border-[#e5e7eb]">

      <div className="flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-3 flex-wrap">

          {/* SEARCH */}

          <div className="w-full h-10 border border-[#e5e7eb] bg-[#fafafa] rounded-full flex items-center px-4">

            <svg
              className="w-4 h-4 text-gray-400"
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

          <button className="h-[40px] px-4 rounded-full border border-[#e5e7eb] bg-white text-[13px] font-medium">
            Récent
          </button>

          <button className="h-[40px] px-4 rounded-full border border-[#e5e7eb] bg-white text-[13px]">
             Compatibilité
          </button>

          <div className="flex border border-[#e5e7eb] rounded-full overflow-hidden">

            <button
  onClick={() => setPeriode("24h")}
  className={`px-4 py-2 text-[13px] ${
    periode === "24h" ? "bg-gray-100 font-medium" : ""
  }`}
>
  24h
</button>

<button
  onClick={() => setPeriode("7d")}
  className={`px-4 py-2 text-[13px] ${
    periode === "7d" ? "bg-gray-100 font-medium" : ""
  }`}
>
  7d
</button>

<button
  onClick={() => setPeriode("30d")}
  className={`px-4 py-2 text-[13px] ${
    periode === "30d" ? "bg-gray-100 font-medium" : ""
  }`}
>
  30d
</button>

<button
  onClick={() => setPeriode("Tout")}
  className={`px-4 py-2 text-[13px] ${
    periode === "Tout" ? "bg-gray-100 font-medium" : ""
  }`}
>
  Tout
</button>

          </div>

          <button className="h-[40px] px-4 rounded-full border border-[#e5e7eb] text-[13px]">
            ♡ Favoris
          </button>

          <button className="h-[36px] px-4 border border-[#e5e7eb] rounded-full text-[13px] text-gray-700 bg-white flex items-center gap-2">

            <FaBell/>
             Alertes
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

        <select
  value={lieu}
  onChange={(e) => setLieu(e.target.value)}
  className="h-[36px] px-4 border border-[#e5e7eb] rounded-full text-[13px]"
>
  <option value="">Tous les lieux</option>

  {[...new Set(offres.map((o) => o.lieu))].map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>

        <select
  value={typeContrat}
  onChange={(e) => setTypeContrat(e.target.value)}
  className="h-[36px] px-4 border border-[#e5e7eb] rounded-full text-[13px]"
>
  <option value="">Tous les contrats</option>
  <option value="CDI">CDI</option>
  <option value="CDD">CDD</option>
  <option value="STAGE">STAGE</option>
  <option value="FREELANCE">FREELANCE</option>
</select>

        <button className="h-[36px] px-4 border border-[#e5e7eb] rounded-full text-[13px] text-gray-700 bg-white flex items-center gap-2">
          <FaChartLine /> Niveau d'expérience
        </button>

      </div>

    </div>

    {/* BODY */}

<div className="grid grid-cols-12 h-[calc(100vh-56px)]">
      {/* LEFT SIDE */}

<div className="col-span-4 border-r border-[#e5e7eb] bg-[#fafafa] p-3 overflow-y-auto pretty-scrollbar h-full">
            {[...filteredOffres]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map((offre) => (
    <OfferCard
  key={offre._id}
  offre={offre}
  onSelect={setSelectedOffre}
  onApply={() => setShowApplyModal(true)}
/>
  ))}
      </div>

      {/* RIGHT SIDE */}

<div className="col-span-8 bg-white h-full overflow-y-auto">
        {!selectedOffre ? (

          <div className="h-full flex items-center justify-center">

            <div className="text-center">

              <h2 className="text-[28px] font-semibold text-[#111827]">
                Sélectionnez une offre pour voir les détails
              </h2>

              <p className="mt-3 text-[14px] text-gray-400">
                Cliquez sur une offre dans la liste pour voir la description complète.
              </p>

            </div>

          </div>

        ) : (

          <div className="h-full overflow-y-auto p-10">

            <h1 className="text-3xl font-bold">
              {selectedOffre.titre}
            </h1>

            <div className="flex gap-6 mt-4 text-gray-500">

              <span>
                <FaLocationDot /> {selectedOffre.lieu}
              </span>

              <span>
                <FaBriefcase /> {selectedOffre.typeContrat}
              </span>

            </div>

            <div className="mt-10">

              <h3 className="font-semibold text-lg mb-4">
                Description
              </h3>

              <p className="leading-8 text-gray-700 whitespace-pre-line">
                {selectedOffre.description}
              </p>

            </div>

            <div className="flex gap-4 mt-10">

              <button className="bg-[#2d0fd5] text-white px-8 py-3 rounded-xl font-medium">
                Adapter CV
              </button>

              <button
  onClick={() => {
    console.log("CLICKED");
    setShowApplyModal(true);
  }}
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
