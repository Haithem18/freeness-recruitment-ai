import { useEffect, useState } from "react";
import API from "../../services/api";
import CandidateLayout from "../../layouts/CandidateLayout";

function Recommandations() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const offreId = "ID_OFFRE_ICI";

      const res = await API.get(
        `/recommendations/${offreId}`
      );

      setResults(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CandidateLayout>
      <h1 className="text-3xl font-bold mb-6">
        Recommandations IA
      </h1>

      {results.map((item, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl shadow mb-4"
        >
          <h2>
            {item.candidat?.name}
          </h2>

          <p>
            Score : {item.score} %
          </p>
        </div>
      ))}
    </CandidateLayout>
  );
}

export default Recommandations;