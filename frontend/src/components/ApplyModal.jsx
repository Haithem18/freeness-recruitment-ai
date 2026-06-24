function ApplyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white w-[500px] rounded-2xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold">
          Complétez votre portfolio
        </h2>

      </div>
    </div>
  );
}

export default ApplyModal;