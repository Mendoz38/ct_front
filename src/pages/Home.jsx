import React, { useState, useEffect } from "react";
import moment from 'moment'
import { Link } from "react-router-dom";
import getAllRDV from "../api/ct"
import Calendar from "./Calendar/Calendar";

const Home = (props) => {

const [listeRDV, setListeRDV ] = useState([])

    useEffect(()=> {
        getAllRDV()
            .then((result) => {
                console.log("zzz", result)
                setListeRDV(result)
            })
            .catch(err=> console.log(err))
    }, [props])

    return (
        <div className="containeur RDV">
            <h2> Nombre actuel de rendez-vous dans la BDD : {listeRDV.length} </h2>

            <section>
            <div className="containeur_jour">
                <div className="jour">Lundi 20 mai</div>
                <div className="bloc_heures">
                    <a href="#" className="creneau Complet">
                        <div className="heure">8h</div>
                        <div className="dispo">Complet</div>
                    </a>
                    <a href="#" className="creneau">
                            <div className="heure">10h</div>
                            <div className="dispo">2 places disponibles</div>
                    </a>
                    <a href="#" className="creneau Complet">
                        <div className="heure">12h</div>
                        <div className="dispo">Complet</div>
                    </a>
                    <a href="#" className="creneau">
                        <div className="heure">14h</div>
                        <div className="dispo">1 place disponible</div>
                    </a>
                    <a href="#" className="creneau">
                        <div className="heure">16h</div>
                        <div className="dispo">1 place disponible</div>
                    </a>
                </div>
            </div>
            <div className="containeur_jour">
                <div className="jour">Mardi 21 mai</div>
                <div className="bloc_heures">
                    <a href="#"  className="creneau">
                        <div className="heure">8h</div>
                        <div className="dispo">2 places disponibles</div>
                    </a>
                    <a href="#"  className="creneau Complet">
                        <div className="heure">10h</div>
                        <div className="dispo">Complet</div>
                    </a>
                    <a href="#"  className="creneau">
                        <div className="heure">12h</div>
                        <div className="dispo">1 place disponible</div>
                    </a>
                    <a href="#"  className="creneau Complet">
                        <div className="heure">14h</div>
                        <div className="dispo">Complet</div>
                    </a>
                    <div href="#"  className="creneau">
                        <div className="heure">16h</div>
                        <div className="dispo">1 place disponible</div>
                    </div>
                </div>
            </div>
            <div className="containeur_jour">
                <div className="jour">Mercredi 22 mai</div>
                <div className="bloc_heures">
                    <a href="#"  className="creneau">
                        <div className="heure">8h</div>
                        <div className="dispo">2 places disponibles</div>
                    </a>
                    <a href="#"  className="creneau Complet">
                        <div className="heure">10h</div>
                        <div className="dispo">Complet</div>
                    </a>
                    <a href="#"  className="creneau">
                        <div className="heure">12h</div>
                        <div className="dispo">1 place disponible</div>
                    </a>
                    <a href="#"  className="creneau Complet">
                        <div className="heure">14h</div>
                        <div className="dispo">Complet</div>
                    </a>
                    <a href="#"  className="creneau">
                        <div className="heure">16h</div>
                        <div className="dispo">1 place disponible</div>
                    </a>
                </div>
            </div>

            </section>
            <hr />
            <h3>Dates automatiques</h3>
            <Calendar numDays={7} />
        </div>
    )
}

export default Home

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