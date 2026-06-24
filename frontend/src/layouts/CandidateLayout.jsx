import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function CandidateLayout({ children }) {
  return (
    <div className="h-screen bg-[#f6f7fb]">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <main>
          {children}
        </main>

      </div>

    </div>
  );
}

export default CandidateLayout;