import { useState } from "react";
import { FaXmark, FaWandMagicSparkles } from "react-icons/fa6";
import API from "../services/api";

const MAX_CHARS = 4000;

function GenererOffreModal({ isOpen, onClose, onGenerated, onManual }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setPrompt("");
    setError("");
    onClose();
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Veuillez décrire le poste.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await API.post("/offres/generate-ai", { prompt });
      onGenerated(res.data);
      setPrompt("");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la génération.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl">
        <div className="flex items-center justify-between px-6 pt-6">
          <h2 className="font-bold text-[20px] text-gray-900">
            Générez une offre avec l'IA en quelques secondes
          </h2>
          <button onClick={handleClose} className="text-gray-400 shrink-0">
            <FaXmark size={18} />
          </button>
        </div>

        <p className="px-6 mt-2 text-[14px] text-gray-600">
          Décrivez ce que vous recrutez en une ou deux phrases.
        </p>

        <div className="px-6 mt-4">
          <textarea
            value={prompt}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) setPrompt(e.target.value);
            }}
            rows={6}
            placeholder="Restez naturel, comme si vous expliquiez le poste à un collègue !"
            className="w-full px-4 py-3 border border-[#e5e7eb] rounded-xl text-[14px] outline-none focus:border-[#4F46E5] resize-none"
          />

          <div className="flex items-center justify-between mt-1.5 text-[12px] text-gray-400">
            <span>Obligatoire</span>
            <span>
              {prompt.length} / {MAX_CHARS} caractères maximum
            </span>
          </div>

          {error && (
            <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-2">
              {error}
            </p>
          )}
        </div>

        <div className="border-t border-[#e5e7eb] mt-5 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              handleClose();
              onManual();
            }}
            className="text-[14px] text-gray-700 flex items-center gap-1"
          >
            Rédiger la description manuellement <span>›</span>
          </button>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-[#4F46E5] text-white text-[14px] font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-60"
          >
            <FaWandMagicSparkles size={13} />
            {loading ? "Génération..." : "Générer l'offre"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GenererOffreModal;
