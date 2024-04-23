import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const CreneauHoraire = ({ date, listeRDV, constant }) => {
   // définition denos contantes 
   const start_time = constant.start_time; 
   const end_time = constant.end_time; 
   const duration = constant.duration;
   const nbrPont = constant.pont;
   
   // Calculer les heures intermédiaires
   const creneaux = [];
   let current_time = start_time;
   while (current_time < end_time) {
     creneaux.push({ heure: current_time });
     current_time += duration;
   }

  return (
    <div className="bloc_heures">
      {creneaux.map((creneau, index) => {
        const rdvParCreneau = listeRDV.filter(
          (rdv) => rdv.date === date && rdv.heure === creneau.heure
        );

        // Bloquer les créneaux les samedi AM et les dimanches
        let dispo = nbrPont - rdvParCreneau.length;
        if(moment(date).day() === 0 || (moment(date).day() === 6 && creneau.heure>12 ) ) {
            dispo = 0;
         }
 
        // rendre "non cliquable" si il n'y a plus de place (est-ce bien )
        const url =
          dispo === 0 ? "" : `../Reservation/${date}/${creneau.heure}`;
        return (
          <Link
            to={`${url} `}
            className={`creneau ${dispo === 0 ? "Complet" : ""} dispo${dispo}`}
            key={index}
          >
            <div className="heure">{creneau.heure}h</div>
            <div className="dispo">
              <b>{dispo}</b> place{dispo > 1 ? "s" : ""} disponible {dispo > 1 ? "s" : ""} 
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CreneauHoraire;

/*   Solution plus longue mais plus claire (et plus sure ???) pour activer le lien de réservation

        // Rendre le lien cliquable uniquement si la disponibilité est supérieure à zéro
        if (dispo > 0) {
          return (
            <Link
              to={`../Reservation/${date}/${creneau.heure}`}
              className={`creneau dispo${dispo}`}
              key={index}
            >
              <div className="heure">{creneau.heure}h</div>
              <div className="dispo">
                <b>{dispo}</b> place{dispo !== 1 ? "s" : ""} disponible
                {dispo !== 1 ? "s" : ""}
              </div>
            </Link>
          );
        } else {
          // Si la disponibilité est égale à zéro, ne pas rendre la balise Link
          return (
            <div className={`creneau  Complet dispo${dispo}`} key={index}>
              <div className="heure">{creneau.heure}h</div>
              <div className="dispo">
                <b>{dispo}</b> place{dispo !== 1 ? "s" : ""} disponible
                {dispo !== 1 ? "s" : ""}
              </div>
            </div>
          );
        }

        ------------------------------------------------
 // définir dynamiquement les créneaux
const heureDebut = 8; 
const heureFin = 16; 
const dureeCreneau = 2;

// Calculer les heures intermédiaires
const creneaux = [];
let current_time = heureDebut;
while (current_time < heureFin) {
  creneaux.push({ heure: current_time });
  current_time += dureeCreneau;
}

*/
