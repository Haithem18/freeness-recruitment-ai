import { FaChartColumn } from "react-icons/fa6";

function StatsCards({ stats, loading }) {
  const data = [
    {
      label: "Total candidatures",
      value: stats?.totalCandidatures ?? 0,
      sub: `depuis ${stats?.totalCandidatures ?? 0}`,
    },
    {
      label: "Portfolio et services",
      value: stats?.portfolioServices ?? 0,
    },
    {
      label: "Répartition par statut",
      value: stats?.repartitionParStatut ?? 0,
    },
    {
      label: "Scores par offre",
      value: stats?.scoreProfil ?? "—",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
        <div className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center">
          <FaChartColumn size={11} className="text-[#3b1ee8]" />
        </div>
        <h3 className="text-[15px] font-semibold">Analyses</h3>
      </div>

      <div className="grid grid-cols-4 border-b border-gray-200">
        {data.map((item, i) => (
          <div
            key={item.label}
            className={`p-5 ${i < data.length - 1 ? "border-r border-gray-200" : ""}`}
          >
            <p className="text-[14px] text-gray-600">{item.label}</p>
            <h2 className="text-[20px] font-bold mt-3">
              {loading ? "…" : item.value}
            </h2>
            {item.sub && !loading && (
              <p className="text-[13px] text-gray-400">{item.sub}</p>
            )}
          </div>
        ))}
      </div>

      <div className="h-105" />
    </div>
  );
}

export default StatsCards;
