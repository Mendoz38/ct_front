import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import Input from "./Form/Input";
import { addRDV } from "../api/ct";

const Reservation = (props) => {
  const params = useParams();

  const [formData, setFormData] = useState({
    date: moment().format('YYYY-MM-DD'),
    heure: params.heure,
    prenom: "",
    nom: "",
    mail: "",
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
    const RDV = [
      {
        date: formData.date,
        heure: formData.heure,
        prenom: formData.prenom,
        nom: formData.nom,
        mail: formData.mail,
        telephone: formData.telephone,
        marque: formData.marque,
        modele: formData.modele,
        immatriculation: formData.immatriculation,
      },
    ];
    console.log("Données RDV :", RDV[0]);
    addRDV(RDV[0]);
  };

  return (
    <div>
      <h1>
        Votre réservation pour le {params.date} à {params.heure}h |{" "}
        <Link to="/" className="bouton">
          Changer de date
        </Link>
      </h1>
      <h3></h3>
      <form onSubmit={handleSubmit}>
        <div className="form_civilite form_group">
          <h2>Vos coordonnées</h2>
          <Input
            name="prenom"
            label="Votre prénom : "
            defaultValue="Gérard"
            onChange={handleInputChange}
          />
          <Input name="nom" label="Votre nom : " onChange={handleInputChange} />
          <Input
            name="mail"
            label="Votre email : "
            onChange={handleInputChange}
          />
          <Input
            name="telephone"
            label="Votre téléphone : "
            onChange={handleInputChange}
          />
        </div>
        <div className="form_vehicule form_group">
          <h2>Votre véhicule</h2>
          <Input name="marque" label="Marque : " onChange={handleInputChange} />
          <Input name="modele" label="Modèle : " onChange={handleInputChange} />
          <Input
            name="immatriculation"
            label="Immatriculation : "
            onChange={handleInputChange}
          />
        </div>
        <button className="bouton"> Reserver</button>
      </form>
    </div>
  );
};

export default Reservation;
