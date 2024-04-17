import React  from "react";
import moment from "moment";
import "moment/locale/fr";
import CreneauHoraire from "./Calendar/Creanaux";

const WeekComponent = () => {
  moment.locale("fr");
  const currentDate = moment();
  const weekDays = [];
  // Remplir le tableau avec les jours de la semaine à partir de la date actuelle
  for (let i = 0; i < 5; i++) {
    const day = currentDate.clone().add(i, "days");

    // Défini les créneaux horaires au format num pour pouvoir requeter dans la BDD
    const creneaux = [
      { heure: 8, dispo: 0 },
      { heure: 10, dispo: 2 },
      { heure: 12, dispo: 1 },
      { heure: 14, dispo: 0 },
      { heure: 16, dispo: 1 },
    ]; 

    weekDays.push(
      <div className="containeur_jour" key={i}>
        <div className="jour">{day.format("dddd DD MMMM")}</div>
        <CreneauHoraire heures={creneaux} date={day.format("dddd-DD-MMMM")} />
      </div>
    );
  }

  return (
    <div className="containeur RDV">
      <h2> Nombre actuel de rendez-vous dans la BDD :  </h2>
      <section>{weekDays}</section>
    </div>
  );
};

export default WeekComponent;
