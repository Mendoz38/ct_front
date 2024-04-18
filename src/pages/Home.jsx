import React, { useState, useEffect } from "react";
import moment from "moment";
import getAllRDV from "../api/ct";
import "moment/locale/fr";
import CreneauHoraire from "./Calendar/Creanaux";

const Home = (props) => {
  const [listeRDV, setListeRDV] = useState([]);
  // les variables que l'on défini aujourd'hui mais que l'on pourra modifier à la demande du client
  const freeRdvByDay = 10; // RDV dispo par jour (à voir comment le récupérer dynamiquement)
  const [numWeeksLoaded, setNumWeeksLoaded] = useState(1);

  const loadMoreWeeks = () => {
    setNumWeeksLoaded(prevNumWeeks => prevNumWeeks + 1);
  };

  useEffect(() => {
    // Récupérer tous les RDV et les mettre sous forme d'un tableau par jour et par creneau
    getAllRDV()
      .then((result) => {
        //console.log("Tous les RDV : ", result);
        setListeRDV(result);
      })
      .catch((err) => console.log(err));
  }, []);

  moment.locale("fr");
  // Je récupère la date au format ISO 8601, je supprime l'heure actuelle que je remplace par T00:00:00.000Z pour avoir pareil que dans ma BDD
  const currentDate = new Date().toISOString().split("T")[0] + "T00:00:00.000Z";
  const weekDays = [];
  // Remplir le tableau avec les jours de la semaine à partir de la date actuelle
  for (let i = 0; i < 4 * numWeeksLoaded; i++) {
    const day = moment(currentDate).clone().add(i, "days");

    // Pour savoir le nombre de RDV par jour, filtre par date et compte le nombre de RDV
    const rdvForDay = listeRDV.filter((rdv) =>
      moment(rdv.date).isSame(day, "day")
    );

    weekDays.push(
      <div className="containeur_jour" key={i}>
        <div className="jour">
          {day.format("dddd DD MMMM")} - {freeRdvByDay - rdvForDay.length} RDV
          disponibles
        </div>
        <CreneauHoraire listeRDV={listeRDV} date={day.toISOString()} />
      </div>
    );
  }

  return (
    <div className="containeur RDV">
      <h2> Prendre un rendez-vous </h2>
      <section>{weekDays}</section>
      <button onClick={loadMoreWeeks} className="more_date">Voir plus de dates</button>
    </div>
  );
};

export default Home;
