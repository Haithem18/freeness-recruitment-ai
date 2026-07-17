import { useState } from "react";
import { FaXmark, FaCheck } from "react-icons/fa6";
import API from "../services/api";

function ApplyModal({ isOpen, onClose, offre, onApplied }) {
  const [lettreMotivation, setLettreMotivation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const resetAndClose = () => {
    setLettreMotivation("");
    setError("");
    setSuccess(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!offre?._id) {
      setError("Offre introuvable.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/candidatures", {
        offre: offre._id,
        lettreMotivation,
      });
      setSuccess(true);
      onApplied?.(offre._id);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de l'envoi de votre candidature.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white w-[500px] max-w-full rounded-2xl p-6 relative">
        <button
          onClick={resetAndClose}
          className="absolute right-4 top-4 text-gray-400"
        >
          <FaXmark size={16} />
        </button>

        {success ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <FaCheck size={20} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Candidature envoyée !
            </h2>
            <p className="text-[14px] text-gray-500 mt-2">
              Votre candidature pour <strong>{offre?.titre}</strong> a bien été
              transmise au recruteur.
            </p>
            <button
              onClick={resetAndClose}
              className="mt-6 bg-[#2d0fd5] text-white text-[14px] font-medium px-6 py-2.5 rounded-lg"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900">Postuler</h2>
            <p className="text-[14px] text-gray-500 mt-1">
              {offre?.titre} — {offre?.lieu}
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              {error && (
                <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
                  {error}
                </p>
              )}

              <label className="text-[13px] font-medium text-gray-700">
                Lettre de motivation (optionnel)
              </label>
              <textarea
                value={lettreMotivation}
                onChange={(e) => setLettreMotivation(e.target.value)}
                rows={5}
                placeholder="Expliquez pourquoi vous êtes fait(e) pour ce poste..."
                className="w-full mt-1 px-3 py-2 border border-[#e5e7eb] rounded-lg text-[14px] outline-none focus:border-[#2d0fd5] resize-none"
              />

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="flex-1 border border-[#e5e7eb] text-gray-700 text-[14px] font-medium rounded-lg py-2.5"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#2d0fd5] text-white text-[14px] font-medium rounded-lg py-2.5 disabled:opacity-60"
                >
                  {loading ? "Envoi..." : "Envoyer ma candidature"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ApplyModal;
