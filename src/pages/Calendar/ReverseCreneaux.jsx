import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
 
const ReverseCreneaux = ({ date, heure, listeRDV, constant }) => {
  const rdvParCreneau = listeRDV.filter(
    (rdv) => rdv.date === date && rdv.heure === heure
  );

  let dispo = constant.pont - rdvParCreneau.length;
  if (
    (moment(date).day() === 0) // 0 = numéro du jour pour dimanche
    || 
    (moment(date).day() === 6 && heure >= constant.saturday_end) // 6 = samedi / 
  ) {
    dispo = -1;
  }

  const url = dispo === 0 ? "" : `../Reservation/${date}/${heure}`;

  return (
    <Link
      to={`${url} `}
      title={`${dispo >= 1 && (`${dispo} place${dispo > 1 ? "s" : ""} disponible${dispo > 1 ? "s" : ""}`) }`}
      className={`creneau 
        ${dispo === 0 && "Complet"}  
        ${dispo === -1 && "Ferme" } 
        ${dispo >= 1 && "Dispo" } 
        `
      }
    >
      <div className="icon">
        {dispo === -1 && <FontAwesomeIcon icon={faXmark} /> }
        {dispo === 0 && <FontAwesomeIcon icon={faXmark} /> }
        {dispo >= 1 && <FontAwesomeIcon icon={faCheck} /> }
      </div>
    </Link>
  );
};

export default ReverseCreneaux;
