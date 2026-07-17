import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaCheck, FaXmark } from "react-icons/fa6";
import API from "../services/api";
import ImportCVModal from "./ImportCVModal";

function ProfileCard() {
  const navigate = useNavigate();
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      const res = await API.get("/profil/me");
      setProfil(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImported = (updatedProfil) => {
    setProfil(updatedProfil);
  };

  const nom = profil?.candidat?.name || "—";
  const email = profil?.candidat?.email || "—";

  const initials =
    nom !== "—"
      ? nom
          .trim()
          .split(/\s+/)
          .map((w) => w.charAt(0).toUpperCase())
          .slice(0, 2)
          .join("")
      : "?";

  const sections = [
    { label: "Compétences", done: (profil?.competences?.length || 0) > 0 },
    { label: "Expériences", done: (profil?.experiences?.length || 0) > 0 },
    { label: "Formations", done: (profil?.formations?.length || 0) > 0 },
    { label: "Langues", done: (profil?.langues?.length || 0) > 0 },
  ];

  const scoreProfil = sections.filter((s) => s.done).length * 25;
  const manquants = sections.filter((s) => !s.done);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden p-6">
        <p className="text-gray-400 text-sm">Chargement du profil...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="h-16 bg-gradient-to-br from-[#3b1ee8] to-[#26215C]" />

        <div className="px-5 pb-5">
          <div className="-mt-8 w-16 h-16 rounded-full bg-white p-[3px]">
            <div className="w-full h-full rounded-full bg-[#eeecfd] flex items-center justify-center text-[#4F46E5] font-semibold text-[18px]">
              {initials}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-[16px] text-gray-900">{nom}</h3>
            <p className="text-[13px] text-gray-500 mt-0.5">{email}</p>
          </div>

          <div className="mt-5 bg-[#f9f9fb] rounded-lg px-4 py-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                Score de profil
              </p>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[20px] font-semibold text-[#7F77DD]">
                  {scoreProfil}
                </span>
                <span className="text-[12px] text-gray-400">/100</span>
              </div>
            </div>

            <div className="h-1.5 bg-gray-200 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-[#7F77DD] rounded-full transition-all duration-500"
                style={{ width: `${scoreProfil}%` }}
              />
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-2.5">
              Recommandation
            </p>

            {manquants.length > 0 && (
              <p className="text-[13px] text-gray-500 leading-relaxed mb-3">
                Complétez votre profil pour améliorer votre visibilité.
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              {sections.map((s) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-2 text-[13px] ${
                    s.done ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {s.done ? (
                    <FaCheck size={11} className="text-green-600" />
                  ) : (
                    <FaXmark size={11} className="text-gray-300" />
                  )}
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            <button
              onClick={() => setShowImportModal(true)}
              className="w-full h-10 bg-[#2d0fd5] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1.5"
            >
              Remplir avec mon CV
              <FaArrowRight size={12} />
            </button>

            <button
              onClick={() => navigate("/candidate/profil")}
              className="w-full h-10 border border-[#e5e7eb] text-gray-700 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5"
            >
              Éditer mon profil
              <FaArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      <ImportCVModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImported={handleImported}
        onManual={() => navigate("/candidate/profil")}
      />
    </>
  );
}

export default ProfileCard;
