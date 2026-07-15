// pages/recruiter/Campagne.jsx
import { useState } from "react";
import RecruteurLayout from "../../layouts/RecruteurLayout";
import {
  FaFileLines,
  FaBriefcase,
  FaPlus,
  FaWandMagicSparkles,
} from "react-icons/fa6";

const campaignTypes = [
  {
    id: "entreprise",
    icon: FaFileLines,
    title: "Carrousel entreprise",
    subtitle: "Histoire de marque, valeurs et équipe",
    slides: "5 slides",
    status: "NON COMMENCÉ",
  },
  {
    id: "offres",
    icon: FaBriefcase,
    title: "Carrousel offres",
    subtitle: "Postes, culture et candidature",
    slides: "6 slides",
    status: "NON COMMENCÉ",
  },
];

const steps = [
  { id: 1, label: "Type" },
  { id: 2, label: "Entreprise" },
  { id: 3, label: "Créer" },
  { id: 4, label: "Partager" },
];

function CampaignTypeCard({ type, isSelected, onSelect }) {
  const Icon = type.icon;

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-2xl p-5 cursor-pointer transition ${
        isSelected
          ? "border-2 border-[#4F46E5] ring-1 ring-[#4F46E5]/20"
          : "border border-[#e5e7eb]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-[#eeecfd] flex items-center justify-center">
          <Icon className="text-[#4F46E5]" size={16} />
        </div>

        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4F46E5] uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
          {type.status}
        </span>
      </div>

      <h3 className="font-semibold text-[15px] text-gray-900 mt-4">
        {type.title}
      </h3>
      <p className="text-[13px] text-gray-500 mt-1">{type.subtitle}</p>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#f0f0f2]">
        <span className="text-[12px] text-gray-400">{type.slides}</span>
        <span className="text-[13px] font-medium text-[#4F46E5]">
          {isSelected ? "Sélectionné" : "Choisir une offre"}
        </span>
      </div>
    </div>
  );
}

function Stepper({ currentStep }) {
  return (
    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[#e5e7eb]">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                step.id === currentStep
                  ? "bg-[#4F46E5] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.id}
            </span>
            <span
              className={`text-[13px] ${
                step.id === currentStep
                  ? "text-[#4F46E5] font-medium"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && <span className="text-gray-300">→</span>}
        </div>
      ))}
    </div>
  );
}

function Campagne() {
  const [selectedType, setSelectedType] = useState("entreprise");
  const [hasEntreprise, setHasEntreprise] = useState(false);
  const [currentStep] = useState(1);

  return (
    <RecruteurLayout>
      <div className="mt-14 p-6">
        <h1 className="text-[24px] font-bold text-[#3b1ee8]">Campagnes</h1>
        <p className="text-[14px] text-gray-500 mt-1">
          Créez et exportez des carrousels LinkedIn — commencez par l'histoire
          de votre entreprise.
        </p>

        <div className="border-b border-[#e5e7eb] mt-4" />

        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mt-6 mb-3">
          Types de campagne
        </p>

        <div className="grid grid-cols-2 gap-4">
          {campaignTypes.map((type) => (
            <CampaignTypeCard
              key={type.id}
              type={type}
              isSelected={selectedType === type.id}
              onSelect={() => setSelectedType(type.id)}
            />
          ))}
        </div>

        <Stepper currentStep={currentStep} />

        <p className="text-[14px] text-gray-700 mt-4">
          Choisissez l'entreprise pour votre carrousel marque.
        </p>

        {!hasEntreprise ? (
          <div className="bg-white border border-dashed border-[#e5e7eb] rounded-2xl p-8 mt-4 text-center">
            <h3 className="font-semibold text-[16px] text-gray-900">
              Vous avez besoin d'un profil entreprise pour lancer des campagnes.
            </h3>

            <button
              onClick={() => setHasEntreprise(true)}
              className="mt-4 bg-[#4F46E5] text-white text-[14px] font-medium px-5 py-2.5 rounded-lg inline-flex items-center gap-2"
            >
              <FaPlus size={12} /> Créer une entreprise
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8 mt-4">
            <p className="text-[14px] text-gray-700">
              Sélectionnez l'entreprise pour laquelle vous voulez créer une
              campagne.
            </p>
            {/* Replace with a real list of the user's companies */}
          </div>
        )}

        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8 mt-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center shrink-0">
            <FaWandMagicSparkles className="text-gray-400" size={16} />
          </div>

          <div>
            <h3 className="font-semibold text-[15px] text-gray-900">
              Sélectionnez une entreprise
            </h3>
            <p className="text-[13px] text-gray-500 mt-1">
              Choisissez l'entreprise pour laquelle vous souhaitez créer ou
              exporter un carrousel.
            </p>

            <button
              disabled={!hasEntreprise}
              className={`mt-4 text-[13px] font-medium px-5 py-2.5 rounded-lg ${
                hasEntreprise
                  ? "bg-[#4F46E5] text-white"
                  : "bg-[#c7c2f5] text-white cursor-not-allowed"
              }`}
            >
              Créer le carrousel marque
            </button>
          </div>
        </div>
      </div>
    </RecruteurLayout>
  );
}

export default Campagne;
