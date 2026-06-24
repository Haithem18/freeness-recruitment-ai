import { FaRegFileLines } from "react-icons/fa6";

function ApplicationsCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 h-70">

      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">

        <div className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center">
          <FaRegFileLines
            size={12}
            className="text-[#3b1ee8]"
          />
        </div>

        <h3 className="font-semibold text-[15px]">
          Candidatures envoyées
        </h3>

      </div>

      <div className="flex flex-col items-center justify-center h-[190px]">

        <FaRegFileLines
          size={70}
          className="text-gray-300"
        />

        <p className="text-center font-semibold text-[15px] mt-5">
          Vous n'avez pas encore postulé
          à des offres.
        </p>

        <p className="text-gray-500 text-center text-sm mt-2 px-6">
          Commencez à postuler aux offres
          correspondant à votre profil.
        </p>

      </div>

    </div>
  );
}

export default ApplicationsCard;