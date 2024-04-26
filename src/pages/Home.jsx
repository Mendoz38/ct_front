import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/fr";
import { getConstant, getAllRDV } from "../api/ct";
import ReverseCreneaux from "./Calendar/ReverseCreneaux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Reverse = (props) => {
  moment.locale("fr");
  const [listeRDV, setListeRDV] = useState([]);
  const [hidePrev, setHidePrev] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0] + "T00:00:00.000Z"
  );
  const endOfWeek = moment(currentDate).add(6, "days").toISOString();

  const windowWidth = window.innerWidth; // récupère la largeur de l'écran / Attention nécessite un F5 pour voir le rendu
  const daysFormat = windowWidth <= 768 ? "dd" : "dddd";

  // Méthode statique pour déclarer les heures d'ouverture et la durée des créneau, difficilement maintenable
  //const creneaux = [8, 10, 12, 14, 16];

  // Méthode dynamique avec appel BDD
  const [constant, setConstant] = useState([]);
  const creneaux = [];
  const nouveauTableau = []; // Pour stocker uniquement les heures
  // définition de nos contantes métier
  const start_time = constant.start_time;
  const end_time = constant.end_time;
  const duration = constant.duration;
  let current_time = start_time;
  while (current_time < end_time) {
    nouveauTableau.push(current_time); // Ajouter l'heure au nouveau tableau
    creneaux.push({ heure: current_time }); // Ajouter l'objet complet au tableau original
    current_time += duration;
  }

  useEffect(() => {
    getConstant() // Récupérer toutes nos constantes
      .then((result) => {
        setConstant(result[0]);
        //console.log(result[0])
      })
      .catch((err) => console.log(err));

    getAllRDV() // Récupérer tous les RDV
      .then((result) => {
        setListeRDV(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const prevWeeks = () => {
    const today = moment().startOf("week").toISOString(); // Récupération du début de la semaine actuelle
    if (moment(currentDate).isSame(today, "week")) {
      setHidePrev(true);
      return;
    }
    setCurrentDate(moment(currentDate).subtract(1, "week").toISOString());
  };

  const nextWeeks = () => {
    setCurrentDate(moment(currentDate).add(1, "week").toISOString());
    setHidePrev(false);
  };

  const handleDateChange = (event) => {
    setCurrentDate(event.target.value+ "T00:00:00.000Z"); // Important, rajouter l'heure pour pouvoir checker les RDV
  };

  return (
    <div className="containeur RDV">
      <h2>Selectionnez votre date pour prendre un rendez-vous</h2>
      <div className="calNavigation">
        {hidePrev === true ? (
          <button className="btn black"></button>
        ) : (
          <button
            onClick={prevWeeks}
            className={`btn faChevronRight ${hidePrev === true ? "hide" : ""}`}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        <p>
          <span className="hidden-xs"> Du </span>
          {moment(currentDate).format("DD MMMM")} au{" "}
          {moment(endOfWeek).format("DD MMMM YYYY")}
          <input
            type="date"
            id="date"
            value={currentDate}
            onChange={handleDateChange}
            min={moment().format("YYYY-MM-DD")}
          />
        </p>
        <button onClick={nextWeeks} className="btn faChevronRight">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="calendar">
        <div className="cal_lign">
          <div className="cal_lign_header">
            <span>
              Jour /<br /> Heure
            </span>
          </div>
          {Array.from({ length: constant.show_days }).map((_, index) => (
            <div className="cal_lign_header" key={index}>
              {moment(currentDate)
                .clone()
                .add(index, "days")
                .format(daysFormat)}
              <br />
              {moment(currentDate).clone().add(index, "days").format("DD")}
            </div>
          ))}
        </div>
        {creneaux.map((creneau, index) => (
          <div className="cal_lign" key={index}>
            <div className="cal_day heure">{creneau.heure}h</div>
            {Array.from({ length: constant.show_days }).map((_, jIndex) => (
              <div className="cal_day" key={jIndex}>
                <ReverseCreneaux
                  listeRDV={listeRDV}
                  constant={constant}
                  date={moment(currentDate)
                    .clone()
                    .add(jIndex, "days")
                    .toISOString()}
                  heure={creneau.heure}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reverse;
