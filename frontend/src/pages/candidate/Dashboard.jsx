import CandidateLayout from "../../layouts/CandidateLayout";

import StatsCards from "../../components/StatsCards";
import ProfileCard from "../../components/ProfileCard";

import ApplicationsCard from "../../components/ApplicationsCard";

function Dashboard() {
  return (
    <CandidateLayout>
      <div className="mt-14 p-6">
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
      </div>
    </CandidateLayout>
  );
}

export default Dashboard;
