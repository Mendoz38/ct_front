import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Input from "./Form/Input";
import {addRDV} from "../api/ct"

const Reservation = (props) => {
  const params = useParams();

  
  const [formData, setFormData] = useState({
    date: params.date,
    heure: params.heure,
    firstname: "",
    lastname: "",
    email: "",
    email: "",
    telephone: "",
    marque: "",
    modele: "",
    immatriculation: "",

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonFormData = JSON.stringify(formData);
    console.log('Données soumises :', jsonFormData);
    addRDV(jsonFormData)
  };

  return (
    <div>
      <h1>
        Votre réservation pour le {params.date} à {params.heure}h | <Link to="/" className="bouton">Changer de date</Link>
      </h1>
      <h3>
       
      </h3>
      <form  onSubmit={handleSubmit} >
        <div className="form_civilite">
          <h2>Vos coordonnées</h2>
          <Input name="firstname" label="Votre prénom : " defaultValue="Gérard" onChange={handleInputChange}/>
          <Input name="name" label="Votre nom : " onChange={handleInputChange}/>
          <Input name="mail" label="Votre email : " onChange={handleInputChange}/>
          <Input name="telephone" label="Votre téléphone : " onChange={handleInputChange}/>
        </div>
        <div className="form_vehicule">
        <h2>Votre véhicule</h2>
          <Input name="marque" label="Marque : " onChange={handleInputChange}/>
          <Input name="modele" label="Modèle : " onChange={handleInputChange}/>
          <Input name="immatriculation" label="Immatriculation : " onChange={handleInputChange}/>
        </div>
        <button  className="bouton"> Reserver</button>
      </form>
    </div>
  );
};

export default Reservation;
