import { useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa6";

function MessagesRecentsCard({ messages = [] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 h-70 flex flex-col">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center">
          <FaRegComment size={12} className="text-[#3b1ee8]" />
        </div>
        <h3 className="font-semibold text-[15px]">Messages récents</h3>
      </div>

      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <FaRegComment size={40} className="text-gray-300" />
          <p className="text-gray-500 text-sm mt-4">Aucun message</p>
          <button
            onClick={() => navigate("/candidate/messages")}
            className="mt-4 h-9 px-4 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700"
          >
            Aller aux messages
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto mt-2 space-y-2">
          {messages.slice(0, 4).map((msg) => (
            <div
              key={msg._id}
              className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[11px] font-semibold text-gray-600 shrink-0">
                {msg.sender?.nom?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-gray-900 truncate">
                  {msg.sender?.nom || "Utilisateur"}
                </p>
                <p className="text-[12px] text-gray-400 truncate">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessagesRecentsCard;
