import React, { useState, useEffect } from "react";
//import moment from 'moment'
//import { Link } from "react-router-dom";

const Home = (props) => {


    return (
        <div className="containeur">
            <h1> Réservez votre créneau </h1>
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
                    <a href="#" className="creneau">
                        <div className="heure">12h</div>
                        <div className="dispo">1 place disponible</div>
                    </a>
                    <a href="#" className="creneau">
                        <div className="heure">14h</div>
                        <div className="dispo">Complet</div>
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
                    <div className="creneau">
                        <div className="heure">8h</div>
                        <div className="dispo">Complet</div>
                    </div>
                    <div className="creneau">
                        <div className="heure">10h</div>
                        <div className="dispo">2 places disponibles</div>
                    </div>
                    <div className="creneau">
                        <div className="heure">12h</div>
                        <div className="dispo">1 place disponible</div>
                    </div>
                    <div className="creneau">
                        <div className="heure">14h</div>
                        <div className="dispo">Complet</div>
                    </div>
                    <div className="creneau">
                        <div className="heure">16h</div>
                        <div className="dispo">1 place disponible</div>
                    </div>
                </div>
            </div>
            <div className="containeur_jour">
                <div className="jour">Mercredi 22 mai</div>
                <div className="bloc_heures">
                    <div className="creneau">
                        <div className="heure">8h</div>
                        <div className="dispo">Complet</div>
                    </div>
                    <div className="creneau">
                        <div className="heure">10h</div>
                        <div className="dispo">2 places disponibles</div>
                    </div>
                    <div className="creneau">
                        <div className="heure">12h</div>
                        <div className="dispo">1 place disponible</div>
                    </div>
                    <div className="creneau">
                        <div className="heure">14h</div>
                        <div className="dispo">Complet</div>
                    </div>
                    <div className="creneau">
                        <div className="heure">16h</div>
                        <div className="dispo">1 place disponible</div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Home
