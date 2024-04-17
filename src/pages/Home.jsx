import React, { useState, useEffect } from "react";
import moment from "moment";
//import { Link } from "react-router-dom";
import getAllRDV from "../api/ct";
import "moment/locale/fr";
import CreneauHoraire from "./Calendar/Creanaux";

const Home = (props) => {
    const [listeRDV, setListeRDV] = useState([]);
  
    useEffect(() => {
      // Récupérer tous les RDV et les mettre sous forme d'un tableau par jour et par créneau
      getAllRDV()
        .then((result) => {
          console.log("RDV par jour", result);
          setListeRDV(result);
        })
        .catch((err) => console.log(err));
    }, [props]);
  
    // Fonction pour construire le tableau des créneaux dynamiquement en fonction de listeRDV
    const buildCreneaux = () => {
      const creneaux = [];
      for (let heure = 8; heure < 18; heure += 2) {
        const totalRDV = listeRDV.reduce((acc, rdv) => {
          if (rdv.heure === heure) {
            return acc + rdv.RDV;
          } else {
            return acc;
          }
        }, 0);
        const dispo = 2 - totalRDV;
        creneaux.push({ heure, dispo });
      }
      return creneaux;
    };
  
    moment.locale("fr");
    const currentDate = moment();
    const weekDays = [];
    // Remplir le tableau avec les jours de la semaine à partir de la date actuelle
    for (let i = 0; i < 5; i++) {
      const day = currentDate.clone().add(i, "days");
  
      const creneaux = buildCreneaux(); // Appeler la fonction pour construire les créneaux
  
      weekDays.push(
        <div className="containeur_jour" key={i}>
          <div className="jour">{day.format("dddd DD MMMM")}</div>
          <CreneauHoraire heures={creneaux} date={day.format("dddd DD MMMM")} />
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

/*

            <Calendar numDays={7} />


            <div className="menu">
                <Link to="" className="bouton"> Prendre actuel de rendez-vous dans la BDD </Link>
                <Link className="bouton">Liste des RDV</Link>
            </div>
            <section>
                {listeRDV.map((liste)=>{
                    return(
                        <div key={liste._id}>
                            <div className="date">
                                <p>{liste.date} - {liste.vehicule.marque} - {liste.client.nom} - {liste.client.prenom}</p>
                            </div>
                        </div>
                    )
                })}
            </section>
*/
