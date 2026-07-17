import { useState, useRef } from "react";
import { FaXmark, FaFileArrowUp, FaClipboard } from "react-icons/fa6";
import API from "../services/api";

const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function ImportCVModal({ isOpen, onClose, onImported, onManual }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  if (!isOpen) return null;

  const resetAndClose = () => {
    setFile(null);
    setError("");
    setDragActive(false);
    onClose();
  };

  const validateAndSetFile = (f) => {
    setError("");
    if (!f) return;

    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Format non supporté. Utilisez un fichier PDF ou DOCX.");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Le fichier dépasse ${MAX_SIZE_MB} Mo.`);
      return;
    }
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  };

  const handleImport = async () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("cv", file);

      // TODO: backend endpoint that parses the CV (PDF/DOCX) and returns
      // structured fields (competences, experiences, formations, langues)
      // to pre-fill the Profil — e.g. POST /api/profil/import-cv
      const res = await API.post("/profil/import-cv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onImported(res.data);
      resetAndClose();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'import du CV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white w-[430px] max-w-full rounded-2xl p-6 relative">
        <button
          onClick={resetAndClose}
          className="absolute right-4 top-4 text-gray-400"
        >
          <FaXmark size={16} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#eeecfd] flex items-center justify-center mb-4">
            <FaClipboard size={26} className="text-[#2d0fd5]" />
          </div>

          <h2 className="text-xl font-bold text-[#2d0fd5]">
            Complétez votre portfolio
          </h2>
          <p className="text-[14px] text-gray-500 mt-2 leading-relaxed">
            Importez votre CV (PDF ou DOCX) pour compléter automatiquement votre
            profil.
          </p>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`mt-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer transition ${
            dragActive
              ? "border-[#2d0fd5] bg-[#f5f3ff]"
              : "border-gray-200 bg-[#fafafa]"
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-2">
            <FaFileArrowUp size={14} className="text-gray-500" />
          </div>
          <p className="text-[14px] font-medium text-gray-800">
            {file ? file.name : "Glisser-déposer ou cliquer"}
          </p>
          <p className="text-[12px] text-gray-400 mt-0.5">
            PDF ou DOCX · max {MAX_SIZE_MB} Mo
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(e) => validateAndSetFile(e.target.files?.[0])}
          />
        </div>

        {error && (
          <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-4">
            {error}
          </p>
        )}

        <button
          onClick={handleImport}
          disabled={loading || !file}
          className="w-full h-11 mt-5 bg-[#2d0fd5] text-white rounded-lg text-[14px] font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FaFileArrowUp size={13} />
          {loading ? "Import en cours..." : "Importer mon CV"}
        </button>

        <button
          onClick={() => {
            resetAndClose();
            onManual();
          }}
          className="w-full h-11 mt-2.5 border border-gray-200 text-gray-700 rounded-lg text-[14px] font-medium"
        >
          Compléter manuellement
        </button>
      </div>
    </div>
  );
}

export default ImportCVModal;
