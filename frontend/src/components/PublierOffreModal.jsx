import { useState, useEffect } from "react";
import { FaXmark, FaPlus, FaTrash } from "react-icons/fa6";
import API from "../services/api";

const contrats = ["CDI", "CDD", "STAGE", "FREELANCE"];

function PublierOffreModal({ isOpen, onClose, onCreated, initialData }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [lieu, setLieu] = useState("");
  const [typeContrat, setTypeContrat] = useState("CDI");
  const [competences, setCompetences] = useState([{ nom: "", niveau: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill the form whenever AI-generated data arrives
  useEffect(() => {
    if (initialData) {
      setTitre(initialData.titre || "");
      setDescription(initialData.description || "");
      setLieu(initialData.lieu || "");
      setTypeContrat(initialData.typeContrat || "CDI");
      setCompetences(
        initialData.competencesRequises?.length
          ? initialData.competencesRequises
          : [{ nom: "", niveau: "" }],
      );
    }
  }, [initialData]);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setLieu("");
    setTypeContrat("CDI");
    setCompetences([{ nom: "", niveau: "" }]);
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const updateCompetence = (index, field, value) => {
    setCompetences((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    );
  };

  const addCompetence = () => {
    setCompetences((prev) => [...prev, { nom: "", niveau: "" }]);
  };

  const removeCompetence = (index) => {
    setCompetences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!titre.trim() || !description.trim() || !lieu.trim()) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        titre,
        description,
        lieu,
        typeContrat,
        competencesRequises: competences.filter((c) => c.nom.trim()),
      };

      const res = await API.post("/offres", payload);
      onCreated(res.data);
      resetForm();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la publication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
          <h2 className="font-semibold text-[16px] text-gray-900">
            Publier une offre
          </h2>
          <button onClick={handleClose} className="text-gray-400">
            <FaXmark size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="text-[13px] font-medium text-gray-700">
              Titre du poste *
            </label>
            <input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex: Agent Commercial"
              className="w-full mt-1 h-10 px-3 border border-[#e5e7eb] rounded-lg text-[14px] outline-none focus:border-[#4F46E5]"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-gray-700">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Décrivez le poste, les missions, le profil recherché..."
              className="w-full mt-1 px-3 py-2 border border-[#e5e7eb] rounded-lg text-[14px] outline-none focus:border-[#4F46E5] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] font-medium text-gray-700">
                Lieu *
              </label>
              <input
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
                placeholder="Ex: Tunis, Tunisia"
                className="w-full mt-1 h-10 px-3 border border-[#e5e7eb] rounded-lg text-[14px] outline-none focus:border-[#4F46E5]"
              />
            </div>

            <div>
              <label className="text-[13px] font-medium text-gray-700">
                Type de contrat *
              </label>
              <select
                value={typeContrat}
                onChange={(e) => setTypeContrat(e.target.value)}
                className="w-full mt-1 h-10 px-3 border border-[#e5e7eb] rounded-lg text-[14px] outline-none focus:border-[#4F46E5]"
              >
                {contrats.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-medium text-gray-700">
                Compétences requises
              </label>
              <button
                type="button"
                onClick={addCompetence}
                className="text-[12px] text-[#4F46E5] font-medium flex items-center gap-1"
              >
                <FaPlus size={9} /> Ajouter
              </button>
            </div>

            <div className="space-y-2 mt-2">
              {competences.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={c.nom}
                    onChange={(e) => updateCompetence(i, "nom", e.target.value)}
                    placeholder="Compétence (ex: React)"
                    className="flex-1 h-9 px-3 border border-[#e5e7eb] rounded-lg text-[13px] outline-none focus:border-[#4F46E5]"
                  />
                  <input
                    value={c.niveau}
                    onChange={(e) =>
                      updateCompetence(i, "niveau", e.target.value)
                    }
                    placeholder="Niveau (ex: Confirmé)"
                    className="w-32 h-9 px-3 border border-[#e5e7eb] rounded-lg text-[13px] outline-none focus:border-[#4F46E5]"
                  />
                  {competences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCompetence(i)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-[#e5e7eb] text-gray-700 text-[14px] font-medium rounded-lg py-2.5"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#4F46E5] text-white text-[14px] font-medium rounded-lg py-2.5 disabled:opacity-60"
            >
              {loading ? "Publication..." : "Publier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PublierOffreModal;
