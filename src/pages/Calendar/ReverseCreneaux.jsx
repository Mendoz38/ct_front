import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const ReverseCreneaux = ({ date, heure, listeRDV }) => {
  const rdvParCreneau = listeRDV.filter(
    (rdv) => rdv.date === date && rdv.heure === heure
  );

  let dispo = 2 - rdvParCreneau.length;
  if (moment(date).day() === 0 || (moment(date).day() === 6 && heure > 12)) {
    dispo = 0;
  }

  const url = dispo === 0 ? "" : `../Reservation/${date}/${heure}`;

  return (
    <Link
      to={`${url} `}
      className={`creneau ${dispo === 0 ? "Complet" : ""} dispo${dispo}`}
    >
      <div className="heure"><b>{dispo}</b> </div>
      <div className="reverse_dispo">disponibilité{`${dispo > 1 ? "s" : ""}`}</div>
    </Link>
  );
};

export default ReverseCreneaux;
