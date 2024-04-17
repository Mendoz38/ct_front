import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//import {findByHour} from "../../api/ct.js"

const CreneauHoraire = ({ heures, date }) => {
  useEffect(() => {
    //findByHour()
    //console.log("aaaa")
  });

  return (
    <div className="bloc_heures">
      {heures.map((heure, index) => (
        <Link
          to={`../Reservation/${date}/${heure.heure}`}
          key={index}
          className={`creneau ${heure.dispo === 0 ? "Complet" : ""}`}
        >
          <div className="heure">{heure.heure}h</div>
          <div className="dispo">
            {heure.dispo === 0
              ? "Complet"
              : `${heure.dispo} place${heure.dispo > 1 ? "s" : ""} disponible${
                  heure.dispo > 1 ? "s" : ""
                }`}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CreneauHoraire;
