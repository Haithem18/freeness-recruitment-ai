import { FaBell, FaGlobe } from "react-icons/fa";

function Navbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">

      {/* Left */}
      <div className="flex items-center">

        <div className="flex bg-[#f5f5f7] border border-gray-200 rounded-full p-1">

          <button className="px-5 py-1.5 rounded-full bg-white shadow-sm text-[13px] font-medium text-black">
            Candidat
          </button>

          <button className="px-5 py-1.5 rounded-full text-[13px] text-gray-600">
            Recruteur
          </button>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button>
          <FaBell
            size={14}
            className="text-gray-600"
          />
        </button>

        <button>
          <FaGlobe
            size={14}
            className="text-gray-600"
          />
        </button>

        <div className="w-8 h-8 rounded-lg bg-[#f3f4f6] flex items-center justify-center text-[12px] font-semibold text-gray-500">
          BF
        </div>

      </div>

    </header>
  );
}

export default Navbar;