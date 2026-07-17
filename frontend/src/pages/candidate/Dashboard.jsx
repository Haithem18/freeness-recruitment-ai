import { useEffect, useState } from "react";
import CandidateLayout from "../../layouts/CandidateLayout";
import StatsCards from "../../components/StatsCards";
import ProfileCard from "../../components/ProfileCard";
import ApplicationsCard from "../../components/ApplicationsCard";
import MessagesRecentsCard from "../../components/MessagesRecentsCard";
import QuickActionsCard from "../../components/QuickActionsCard";
import API from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStats(false);
    }
  };

  return (
    <CandidateLayout>
      <div className="mt-14 px-6 py-8">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-[26px] font-bold text-[#3b1ee8] mb-6">
            Mon Tableau de Bord Carrière
          </h1>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <StatsCards stats={stats} loading={loadingStats} />
            </div>

            <div className="col-span-4">
              <ProfileCard />
            </div>

            <div className="col-span-4">
              <MessagesRecentsCard />
            </div>

            <div className="col-span-4">
              <QuickActionsCard />
            </div>

            <div className="col-span-4">
              <ApplicationsCard />
            </div>
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
}

export default Dashboard;
