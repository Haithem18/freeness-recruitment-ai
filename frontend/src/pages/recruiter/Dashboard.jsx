import { useEffect, useState } from "react";
import RecruteurLayout from "../../layouts/RecruteurLayout";
import GenererOffreModal from "../../components/GenererOffreModal";
import PublierOffreModal from "../../components/PublierOffreModal";
import API from "../../services/api";
import {
  FaFileLines,
  FaPlus,
  FaBuilding,
  FaComments,
  FaUserGroup,
  FaCrown,
} from "react-icons/fa6";

// TODO: replace with your real auth user (context/localStorage), like in Navbar.jsx
const currentUserId = null;

function RecruteurDashboard() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [aiPrefill, setAiPrefill] = useState(null);

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      const res = await API.get("/offres");
      const mine = currentUserId
        ? res.data.filter((o) => o.recruteur?._id === currentUserId)
        : res.data;
      setOffres(mine);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreated = (newOffre) => {
    setOffres((prev) => [newOffre, ...prev]);
  };

  const handleAIGenerated = (data) => {
    setAiPrefill(data);
    setShowAIModal(false);
    setShowManualModal(true);
  };

  const handleGoManual = () => {
    setAiPrefill(null);
    setShowManualModal(true);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <RecruteurLayout>
      <div className="mt-14 px-6 py-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[26px] font-bold text-[#3b1ee8]">
              Tableau de bord recruteur
            </h1>

            <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#f0c674] bg-[#fdf6e7] text-[#b8860b] text-[13px] font-medium">
              <FaCrown size={12} />
              Passer à Pro
            </button>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaFileLines className="text-[#4F46E5]" />
                <h2 className="font-semibold text-[15px]">Offres publiées</h2>
              </div>
              <button
                onClick={() => setShowAIModal(true)}
                className="bg-[#4F46E5] text-white text-[13px] font-medium px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaPlus size={11} /> Publier une offre
              </button>
            </div>

            <input
              type="text"
              placeholder="Rechercher une offre..."
              className="w-full mt-4 h-10 px-4 border border-[#e5e7eb] rounded-lg text-[14px] outline-none"
            />

            <div className="flex gap-3 mt-3">
              <button className="h-9 px-4 border border-[#e5e7eb] rounded-lg text-[13px]">
                Statut
              </button>
              <button className="h-9 px-4 border border-[#e5e7eb] rounded-lg text-[13px]">
                Entreprise
              </button>
              <button className="h-9 px-4 border border-[#e5e7eb] rounded-lg text-[13px]">
                Catégorie
              </button>
              <button className="h-9 px-4 border border-[#e5e7eb] rounded-lg text-[13px]">
                Plus récentes
              </button>
            </div>

            <div className="mt-4 border border-[#e5e7eb] rounded-xl overflow-hidden">
              <div className="grid grid-cols-5 px-4 py-2.5 text-[11px] font-medium text-gray-400 uppercase border-b border-[#e5e7eb]">
                <span>Titre du poste</span>
                <span>Candidats</span>
                <span>Date de publication</span>
                <span>Statut</span>
                <span>Actif</span>
              </div>

              {loading ? (
                <div className="py-20 text-center text-gray-400 text-[14px]">
                  Chargement...
                </div>
              ) : offres.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <FaFileLines size={22} className="mb-3" />
                  <p className="text-[14px]">Aucune offre.</p>
                  <button
                    onClick={() => setShowAIModal(true)}
                    className="mt-3 border border-[#e5e7eb] rounded-lg px-4 py-1.5 text-[13px] text-gray-700"
                  >
                    Publier une offre
                  </button>
                </div>
              ) : (
                offres.map((offre) => (
                  <div
                    key={offre._id}
                    className="grid grid-cols-5 px-4 py-3 text-[13px] items-center border-b border-[#f0f0f2] last:border-b-0"
                  >
                    <span className="font-medium text-gray-900 truncate pr-2">
                      {offre.titre}
                    </span>
                    <span className="text-gray-500">0</span>
                    <span className="text-gray-500">
                      {formatDate(offre.datePublication)}
                    </span>
                    <span>
                      <span className="inline-flex items-center gap-1 text-[12px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Publiée
                      </span>
                    </span>
                    <span className="text-gray-500">Oui</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-5">
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <FaBuilding className="text-[#4F46E5]" />
                <h3 className="font-semibold text-[14px]">Entreprises</h3>
              </div>
              <div className="border border-dashed border-[#e5e7eb] rounded-xl flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#eeecfd] flex items-center justify-center mb-2">
                  <FaPlus className="text-[#4F46E5]" />
                </div>
                <p className="text-[13px] font-medium">
                  Créer un compte entreprise
                </p>
                <p className="text-[12px] text-gray-400">
                  Rejoindre ou créer une entreprise
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <FaComments className="text-[#4F46E5]" />
                <h3 className="font-semibold text-[14px]">Messages récents</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <FaComments size={20} className="mb-2" />
                <p className="text-[13px]">Aucun message</p>
                <button className="mt-2 border border-[#e5e7eb] rounded-lg px-4 py-1.5 text-[13px] text-gray-700">
                  Aller aux messages
                </button>
              </div>
              <p className="text-center text-[12px] text-[#4F46E5] mt-2">
                Voir tous les messages →
              </p>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <FaUserGroup className="text-[#4F46E5]" />
                <h3 className="font-semibold text-[14px]">
                  Meilleurs candidats
                </h3>
              </div>
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <FaUserGroup size={20} className="mb-2" />
                <p className="text-[13px]">Aucun candidat</p>
              </div>
              <p className="text-center text-[12px] text-[#4F46E5] mt-2">
                Voir tous les candidats →
              </p>
            </div>
          </div>
        </div>
      </div>

      <GenererOffreModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onGenerated={handleAIGenerated}
        onManual={handleGoManual}
      />

      <PublierOffreModal
        isOpen={showManualModal}
        onClose={() => {
          setShowManualModal(false);
          setAiPrefill(null);
        }}
        onCreated={handleCreated}
        initialData={aiPrefill}
      />
    </RecruteurLayout>
  );
}

export default RecruteurDashboard;
