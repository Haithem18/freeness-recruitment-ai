import CandidateLayout from "../../layouts/CandidateLayout";

import StatsCards from "../../components/StatsCards";
import ProfileCard from "../../components/ProfileCard";

import ApplicationsCard from "../../components/ApplicationsCard";

function Dashboard() {
  return (
    <CandidateLayout>

      <h1 className="text-[24px] font-semibold text-[#2d0fd5] mb-6">
        Mon Tableau de Bord Carrière
      </h1>

      <div className="grid grid-cols-12 gap-4">

        <div className="col-span-8">
          <StatsCards />
        </div>

        <div className="col-span-4">
          <ProfileCard />
        </div>


        <div className="col-span-8">
          <ApplicationsCard />
        </div>

      </div>

    </CandidateLayout>
  );
}

export default Dashboard;