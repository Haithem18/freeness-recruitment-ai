import RecruteurSidebar from "../components/RecruteurSidebar";
import Navbar from "../components/Navbar";

function RecruteurLayout({ children }) {
  return (
    <div className="h-screen bg-[#f6f7fb]">
      <RecruteurSidebar />

      <div className="ml-64">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default RecruteurLayout;
