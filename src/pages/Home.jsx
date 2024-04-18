import React, { useState, useEffect } from "react";
import moment from "moment";
//import { Link } from "react-router-dom";
import getAllRDV from "../api/ct";
import "moment/locale/fr";
import CreneauHoraire from "./Calendar/Creanaux";

const Home = (props) => {
  const [listeRDV, setListeRDV] = useState([]);

  useEffect(() => {
    // Récupérer tous les RDV et les mettre sous forme d'un tableau par jour et par creneau
    getAllRDV()
      .then((result) => {
        //console.log("RDV par jour", result);
        setListeRDV(result);
      })
      .catch((err) => console.log(err));
  }, []);

  moment.locale("fr");
  // Je récupère la date au format ISO 8601, je supprime l'heure actuelle que je remplace par T00:00:00.000Z pour avoir pareil que dans ma BDD
  const currentDate = new Date().toISOString().split('T')[0] + "T00:00:00.000Z";
  const weekDays = [];
  // Remplir le tableau avec les jours de la semaine à partir de la date actuelle
  for (let i = 0; i < 5; i++) {
    const day = moment(currentDate).clone().add(i, "days");
    const rdvForDay = listeRDV.filter((rdv) =>
      moment(rdv.date).isSame(day, "day")
    );
  
    weekDays.push(
      <div className="containeur_jour" key={i}>
        <div className="jour">
          {day.format("dddd DD MMMM")} - {rdvForDay.length} RDV
        </div>
        <CreneauHoraire listeRDV={listeRDV} date={day.toISOString()} />
      </div>
    );
  }
  
  return (
    <div className="containeur RDV">
      <h2> Nombre actuel de rendez-vous dans la BDD : {listeRDV.length} </h2>
      <section>{weekDays}</section>
    </div>
  );
};

export default Home;
