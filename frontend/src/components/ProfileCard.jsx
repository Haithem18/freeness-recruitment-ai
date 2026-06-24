function ProfileCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      <div className="h-20 border-b border-gray-200 bg-white flex items-center justify-center">

        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt=""
          className="h-16 opacity-70"
        />

      </div>

      <div className="p-4">

        <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
          BF
        </div>

        <div className="mt-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[11px] text-gray-400 uppercase font-semibold">
                SCORE DE
              </p>

              <p className="text-[11px] text-gray-400 uppercase font-semibold">
                PROFIL
              </p>
            </div>

            <div className="flex items-end gap-1">

              <span className="text-[#2d0fd5] font-bold text-[14px]">
                18
              </span>

              <span className="text-gray-400 text-[12px]">
                /100
              </span>

            </div>

          </div>

          <div className="h-1.5 bg-gray-100 rounded-full mt-2">
            <div className="h-1.5 w-[18%] bg-[#2d0fd5] rounded-full"></div>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-4 pt-4">

          <h3 className="font-semibold text-[15px]">
            ben fraj haythem
          </h3>

          <p className="text-gray-400 text-sm">
            —
          </p>

        </div>

        <div className="border-t border-gray-200 mt-6 pt-4">

          <p className="text-[12px] text-gray-400 font-bold">
            RECOMMANDATION
          </p>

          <p className="text-[14px] text-gray-600 mt-3 leading-6">
            Complétez votre portfolio :
            photo, bio, titre, CV et lien
            portfolio.
          </p>

          <ul className="mt-4 text-[14px] text-gray-400 space-y-2">
            <li>• Photo de profil</li>
            <li>• Bio</li>
            <li>• Titre</li>
            <li>• CV</li>
            <li>• Portfolio</li>
          </ul>

          <button className="w-full h-10 mt-5 bg-[#2d0fd5] text-white rounded-lg text-sm font-medium">
            Remplir avec mon CV →
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;