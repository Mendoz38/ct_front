import React, { useState, useEffect } from "react";
import moment from "moment";
import { getConstant, getAllRDV } from "../api/ct";
import ReverseCreneaux from "./Calendar/ReverseCreneaux";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Reverse = (props) => {
  const [listeRDV, setListeRDV] = useState([]);
  const [constant, setConstant] = useState([]);
  const [hidePrev, setHidePrev] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0] + "T00:00:00.000Z"
  ); // Initialisation de currentDate

  useEffect(() => {
    // Récupérer toutes nos constantes
    getConstant()
      .then((result) => {
        //console.log("Toues les constatntes : ", result[0]);
        setConstant(result[0]);
      })
      .catch((err) => console.log(err));
    // Récupérer tous les RDV et les mettre sous forme d'un tableau par jour et par creneau
    getAllRDV()
      .then((result) => {
        setListeRDV(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const prevWeeks = () => {
    const today = moment().startOf("week").toISOString(); // Récupération du début de la semaine actuelle
    if (moment(currentDate).isSame(today, "week")) {
      // Si la semaine actuelle est la même que la semaine courante, on stoppe et on masque le bouton
      setHidePrev(true);
      return;
    }
    setCurrentDate(moment(currentDate).subtract(1, "week").toISOString());
  };

  const nextWeeks = () => {
    setCurrentDate(moment(currentDate).add(1, "week").toISOString());
    setHidePrev(false);
  };

  // définition denos contantes
  const start_time = constant.start_time;
  const end_time = constant.end_time;
  const duration = constant.duration;
  const nbrPont = constant.pont;

  // Calculer les heures intermédiaires
  const creneaux = [];
  const nouveauTableau = []; // Pour stocker uniquement les heures
  let current_time = start_time;
  while (current_time < end_time) {
    nouveauTableau.push(current_time); // Ajouter l'heure au nouveau tableau
    creneaux.push({ heure: current_time }); // Ajouter l'objet complet au tableau original
    current_time += duration;
  }

  return (
    <div className="containeur RDV">
      <div className="calNavigation">
        <button
          onClick={prevWeeks}
          className={`btn faChevronRight ${hidePrev === true ? "hide" : ""}`}
        >
          Précédent
        </button>
        <span>
          Semaine du {moment(currentDate).startOf("week").format("DD MMMM")} au{" "}
          {moment(currentDate).endOf("week").format("DD MMMM")}
        </span>
        <button onClick={nextWeeks} className="btn faChevronRight">
          Suivant
        </button>
      </div>
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">
              Jour /<br /> Heure
            </div>
            {Array.from({ length: constant.show_days }).map((_, index) => (
              <div className="th" key={index}>
                {moment(currentDate).clone().add(index, "days").format("dddd ")}
                <br />
                {moment(currentDate).clone().add(index, "days").format(" DD")}
                <br />
                {moment(currentDate).clone().add(index, "days").format(" MMMM")}
              </div>
            ))}
          </div>
        </div>
        <div className="tbody">
          {creneaux.map((creneau, index) => (
            <div className="tr" key={index}>
              <div className="td heure">{creneau.heure}h</div>
              {Array.from({ length: constant.show_days }).map((_, jIndex) => (
                <div className="td" key={jIndex}>
                  <ReverseCreneaux
                    listeRDV={listeRDV}
                    date={moment(currentDate)
                      .clone()
                      .add(jIndex, "days")
                      .toISOString()}
                    heure={creneau.heure} // Utilisez l'heure du créneau actuel
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reverse;
