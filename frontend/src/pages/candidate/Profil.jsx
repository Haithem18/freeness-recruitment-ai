import { useEffect, useState } from "react";
import {
  Camera,
  Clock,
  Sparkles,
  Plus,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import API from "../../services/api";
import CandidateLayout from "../../layouts/CandidateLayout";

export default function Profile() {
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      const { data } = await API.get("/candidate/profil");
      setProfil(data);
    } catch (error) {
      console.log(error);
    }
  };

  // "ben fraj haythem" -> "bfh"
  const initials = profil?.nom
    ? profil.nom
        .trim()
        .split(/\s+/)
        .map((w) => w.charAt(0).toLowerCase())
        .join("")
    : "";

  const completionPercent = 0; // wire this up to real completion logic later

  return (
    <CandidateLayout>
      <div className="max-w-[1150px] mx-auto pt-20 pb-6 space-y-6">
        {/* TALENT STORY CTA BANNER */}
        <div className="bg-[#4F46E5] rounded-2xl px-6 py-4 flex items-center justify-between">
          <p className="text-white font-medium">
            Montrez votre côté humain ! Créez votre talent story.
          </p>
          <button className="bg-white text-[#4F46E5] font-semibold text-sm px-4 py-2 rounded-lg shrink-0">
            Créer maintenant
          </button>
        </div>

        {/* HEADER CARD */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="relative h-48 bg-gradient-to-r from-indigo-100 to-purple-100">
            <button className="absolute top-4 right-4 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm">
              <Camera size={16} />
              Ajouter une bannière
            </button>
          </div>

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
              bg-indigo-100
              border-4
              border-white
              shadow-lg
              flex
              items-center
              justify-center
              text-3xl
              font-semibold
              text-gray-500
            "
            >
              {initials || "vp"}
            </div>

            <div className="pt-24 text-center px-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {profil?.nom || "Votre Nom"}
              </h1>

              <p className="text-gray-400 italic mt-2">
                {profil?.titre ||
                  "ex: Développeur Senior | Expert en Développement Web"}
              </p>

              <div className="mt-4">
                <span
                  className="
                  inline-flex
                  items-center
                  gap-1.5
                  px-4
                  py-1.5
                  rounded-full
                  bg-orange-50
                  text-orange-600
                  text-sm
                  font-medium
                "
                >
                  <Clock size={14} />
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
              Complétez votre portfolio pour de meilleures candidatures
            </h2>

            <span className="font-bold text-[#4F46E5]">
              {completionPercent}%
            </span>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F46E5] rounded-full transition-all"
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
            <div className="flex flex-wrap gap-3">
              {["Bio", "Expérience", "Formation", "Compétences", "Langues"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>

            <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 shadow-sm shrink-0">
              <Sparkles size={16} className="text-[#4F46E5]" />
              Compléter avec un CV
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-3">
            Touchez une section pour y accéder et la remplir.
          </p>
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
                  Nom Complet *
                </label>

                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    value={profil?.nom || ""}
                    readOnly
                    className="w-full border border-gray-200 rounded-xl p-3 pl-9 bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Titre Professionnel
                </label>

                <input
                  placeholder="ex: Développeur Senior | Expert en ..."
                  className="w-full border border-gray-200 rounded-xl p-3"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Email *
                </label>

                <input
                  value={profil?.email || ""}
                  readOnly
                  className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Numéro de Téléphone
                </label>

                <input
                  placeholder="+33 1 23 45 67 89"
                  className="w-full border border-gray-200 rounded-xl p-3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-500 block mb-2">
                  Localisation
                </label>

                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    placeholder="Ville, Pays"
                    className="w-full border border-gray-200 rounded-xl p-3 pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase size={18} className="text-[#4F46E5]" />
                Expérience professionnelle
              </h2>

              <button className="flex items-center gap-1.5 bg-[#4F46E5] text-white text-sm font-medium px-3 py-2 rounded-lg">
                <Plus size={16} />
                Ajouter
              </button>
            </div>

            {profil?.experiences?.length > 0 ? (
              profil.experiences.map((exp, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0"
                >
                  <h3 className="font-semibold">{exp.poste}</h3>
                  <p className="text-gray-500">{exp.entreprise}</p>
                </div>
              ))
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-400 mb-1">
                  Ajoutez vos expériences. Elles apparaissent sur votre
                  portfolio public.
                </p>
                <p className="text-gray-400 mt-4">
                  Aucune expérience disponible
                </p>
              </div>
            )}
          </div>

          {/* FORMATION */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <GraduationCap size={18} className="text-[#4F46E5]" />
                Formations
              </h2>

              <button className="flex items-center gap-1.5 bg-[#4F46E5] text-white text-sm font-medium px-3 py-2 rounded-lg">
                <Plus size={16} />
                Ajouter
              </button>
            </div>

            {profil?.formations?.length > 0 ? (
              profil.formations.map((formation, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0"
                >
                  <h3 className="font-semibold">{formation.diplome}</h3>
                  <p className="text-gray-500">{formation.etablissement}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-6">
                Aucune formation disponible
              </p>
            )}
          </div>

          {/* COMPETENCES ET LANGUES */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Award size={18} className="text-[#4F46E5]" />
                Compétences et Langues
              </h2>

              <button className="flex items-center gap-1.5 bg-[#4F46E5] text-white text-sm font-medium px-3 py-2 rounded-lg">
                <Plus size={16} />
                Ajouter
              </button>
            </div>

            <div className="mb-5">
              <h3 className="text-sm text-gray-500 mb-3">Compétences</h3>
              {profil?.competences?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {profil.competences.map((comp, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm"
                    >
                      {comp.nom}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Aucune compétence ajoutée</p>
              )}
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-3">Langues</h3>
              {profil?.langues?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {profil.langues.map((langue, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm"
                    >
                      {langue.nom}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">Aucune langue ajoutée</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </CandidateLayout>
  );
}
