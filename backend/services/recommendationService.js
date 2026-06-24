const niveaux = {
  DEBUTANT: 1,
  INTERMEDIAIRE: 2,
  AVANCE: 3,
  EXPERT: 4,
};

export const calculateMatchScore = (
  profil,
  offre
) => {
  if (
    !offre.competencesRequises ||
    offre.competencesRequises.length === 0
  ) {
    return 0;
  }

  let total = 0;

  offre.competencesRequises.forEach(
    (requiredSkill) => {
      const skill =
        profil.competences.find(
          (c) =>
            c.nom.toLowerCase() ===
            requiredSkill.nom.toLowerCase()
        );

      if (skill) {
        const candidatLevel =
          niveaux[skill.niveau] || 0;

        const requiredLevel =
          niveaux[
            requiredSkill.niveau
          ] || 0;

        if (
          candidatLevel >=
          requiredLevel
        ) {
          total += 100;
        } else {
          total +=
            (candidatLevel /
              requiredLevel) *
            100;
        }
      }
    }
  );

  return Math.round(
    total /
      offre.competencesRequises.length
  );
};