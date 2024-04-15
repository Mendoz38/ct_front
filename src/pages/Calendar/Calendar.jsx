import React from "react";

const Calendar = ({ numDays }) => {
  // Fonction pour obtenir la date à partir d'aujourd'hui
  const getDate = (offset) => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

  // Générer les heures de 8h à 16h
  const generateHeures = () => {
    const heures = [];
    for (let i = 8; i < 18; i += 2) {
      heures.push(`${i}h`);
    }
    return heures;
  };

  // Générer les dates pour les prochains jours
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < numDays; i++) {
      dates.push({ date: getDate(i), heures: generateHeures() });
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <div>
      {dates.map((dateObj, index) => (
        <div className="containeur_jour" key={index}>
          <div className="jour"> {dateObj.date}</div>
          <div className="bloc_heures">
            {dateObj.heures.map((heure, indexHeure) => (
              <a href="#" className="creneau" key={indexHeure}>
                <div className="heure">{heure}</div>
                <div className="dispo">2 places disponibles</div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;