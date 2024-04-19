import React, { useState, useEffect } from "react";
import moment from "moment";
import getAllRDV from "../api/ct";
import ReverseCreneaux from "./Calendar/ReverseCreneaux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Reverse = (props) => {
  const [listeRDV, setListeRDV] = useState([]);
  const [hidePrev, setHidePrev] = useState(false)
  
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0] + "T00:00:00.000Z"); // Initialisation de currentDate

  useEffect(() => {
    getAllRDV()
      .then((result) => {
        setListeRDV(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const prevWeeks = () => {
    const today = moment().startOf('week').toISOString(); // Récupération du début de la semaine actuelle
    if (moment(currentDate).isSame(today, 'week')) {// Si la semaine actuelle est la même que la semaine courante, on stoppe et on masque le bouton
      setHidePrev(true)
      return;
    }
    setCurrentDate(moment(currentDate).subtract(1, "week").toISOString());
  };

  const nextWeeks = () => {
    setCurrentDate(moment(currentDate).add(1, "week").toISOString());
    setHidePrev(false)
  };

  const heures = [8, 10, 12, 14, 16];

  return (
    <div className="containeur RDV">
      <div className="calNavigation">
        <button onClick={prevWeeks} className={`btn faChevronRight ${hidePrev === true ? "hide" : ""}`}>Précédent</button>
        <span>Semaine du {moment(currentDate).startOf('week').format("DD MMMM")} au {moment(currentDate).endOf('week').format("DD MMMM")}</span>
        <button onClick={nextWeeks} className="btn faChevronRight">Suivant</button>
      </div>
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">
              Jour /<br /> Heure
            </div>
            {Array.from({ length: 7 }).map((_, index) => (
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
          {heures.map((heure, index) => (
            <div className="tr" key={index}>
              <div className="td heure">{heure}h</div>
              {Array.from({ length: 7 }).map((_, jIndex) => (
                <div className="td" key={jIndex}>
                  <ReverseCreneaux
                    listeRDV={listeRDV}
                    date={moment(currentDate)
                      .clone()
                      .add(jIndex, "days")
                      .toISOString()}
                    heure={heure}
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
