import { FaChartColumn } from "react-icons/fa6";

function StatsCards() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">

        <div className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center">
          <FaChartColumn
            size={11}
            className="text-[#3b1ee8]"
          />
        </div>

        <h3 className="text-[15px] font-semibold">
          Analyses
        </h3>

      </div>

      <div className="grid grid-cols-4 border-b border-gray-200">

        <div className="p-5 border-r border-gray-200">
          <p className="text-[14px] text-gray-600">
            Total candidatures
          </p>

          <h2 className="text-[20px] font-bold mt-3">
            0
          </h2>

          <p className="text-[13px] text-gray-400">
            depuis 0
          </p>
        </div>

        <div className="p-5 border-r border-gray-200">
          <p className="text-[14px] text-gray-600">
            Portfolio et services
          </p>

          <h2 className="text-[20px] font-bold mt-3">
            1
          </h2>
        </div>

        <div className="p-5 border-r border-gray-200">
          <p className="text-[14px] text-gray-600">
            Répartition par statut
          </p>

          <h2 className="text-[20px] font-bold mt-3">
            0
          </h2>
        </div>

        <div className="p-5">
          <p className="text-[14px] text-gray-600">
            Scores par offre
          </p>

          <h2 className="text-[20px] font-bold mt-3">
            —
          </h2>
        </div>

      </div>

      <div className="h-105"></div>

    </div>
  );
}

export default StatsCards;