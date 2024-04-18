import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//import {findByHour} from "../../api/ct.js"

const CreneauHoraire = ({ date, listeRDV }) => {
  // les variables que l'on défini aujourd'hui mais que l'on pourra modifier à la demande du client
  const creneaux = [
    { heure: 8 },
    { heure: 10 },
    { heure: 12 },
    { heure: 14 },
    { heure: 16 },
  ];
  const nbrPont = 2;

  return (
    <div className="bloc_heures">
      {creneaux.map((creneau, index) => {
        const rdvParCreneau = listeRDV.filter(
          (rdv) => rdv.date === date && rdv.heure === creneau.heure
        );

        const dispo = nbrPont - rdvParCreneau.length;

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
              <b>{dispo}</b> place{dispo !== 1 ? "s" : ""} disponible
              {dispo !== 1 ? "s" : ""}
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
let heureCourante = heureDebut;
while (heureCourante < heureFin) {
  creneaux.push({ heure: heureCourante });
  heureCourante += dureeCreneau;
}

*/
