import { useEffect, useState } from "react";
import API from "../../services/api";
import CandidateLayout from "../../layouts/CandidateLayout";

export default function Profile() {
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      const { data } = await API.get("/candidats/profil");
      setProfil(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CandidateLayout>
      <div className="max-w-[1150px] mx-auto py-6 space-y-6">
        {/* HEADER CARD */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="h-48 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]" />

          <div className="relative pb-10">
            {/* Avatar */}
            <div
              className="
              absolute
              left-1/2
              -translate-x-1/2
              -top-16
              w-32
              h-32
              rounded-full
              bg-white
              border-4
              border-white
              shadow-lg
              flex
              items-center
              justify-center
              text-4xl
              font-bold
              text-[#4F46E5]
            "
            >
              {profil?.nom?.charAt(0) || "H"}
            </div>

            <div className="pt-24 text-center px-6">
              <h1 className="text-4xl font-bold text-gray-900">
                {profil?.nom || "Votre Nom"}
              </h1>

              <p className="text-gray-500 mt-2">Développeur Full Stack MERN</p>

              <div className="mt-4">
                <span
                  className="
                  px-4
                  py-1.5
                  rounded-full
                  bg-orange-50
                  text-orange-600
                  text-sm
                  font-medium
                "
                >
                  Non disponible
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">
              Complétion du profil
            </h2>

            <span className="font-bold text-[#4F46E5]">60%</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-[#4F46E5]" />
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <span className="px-4 py-2 border rounded-full text-sm">Bio</span>

            <span className="px-4 py-2 border rounded-full text-sm">
              Expérience
            </span>

            <span className="px-4 py-2 border rounded-full text-sm">
              Formation
            </span>

            <span className="px-4 py-2 border rounded-full text-sm">
              Compétences
            </span>

            <span className="px-4 py-2 border rounded-full text-sm">
              Langues
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* INFOS */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">
              Informations personnelles
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Nom complet
                </label>

                <input
                  value={profil?.nom || ""}
                  readOnly
                  className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  p-3
                  bg-gray-50
                "
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Titre professionnel
                </label>

                <input
                  placeholder="Développeur Full Stack"
                  className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  p-3
                "
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Email
                </label>

                <input
                  value={profil?.email || ""}
                  readOnly
                  className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  p-3
                  bg-gray-50
                "
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Téléphone
                </label>

                <input
                  placeholder="+216 xx xxx xxx"
                  className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  p-3
                "
                />
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Compétences</h2>

            {profil?.competences?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {profil.competences.map((comp, index) => (
                  <span
                    key={index}
                    className="
                    px-4
                    py-2
                    rounded-full
                    bg-indigo-100
                    text-indigo-700
                    text-sm
                  "
                  >
                    {comp.nom}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Aucune compétence ajoutée</p>
            )}
          </div>

          {/* EXPERIENCE */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">
              Expériences professionnelles
            </h2>

            {profil?.experiences?.length > 0 ? (
              profil.experiences.map((exp, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 mb-4">
                  <h3 className="font-semibold">{exp.poste}</h3>

                  <p className="text-gray-500">{exp.entreprise}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Aucune expérience disponible</p>
            )}
          </div>

          {/* FORMATION */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Formations</h2>

            {profil?.formations?.length > 0 ? (
              profil.formations.map((formation, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 mb-4">
                  <h3 className="font-semibold">{formation.diplome}</h3>

                  <p className="text-gray-500">{formation.etablissement}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Aucune formation disponible</p>
            )}
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
}
