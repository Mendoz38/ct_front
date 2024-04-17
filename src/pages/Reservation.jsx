import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import Input from "./Form/Input";
import { addRDV } from "../api/ct";

const Reservation = (props) => {
  const params = useParams();
  const [msg, setMsg] = useState(null);

  const [formData, setFormData] = useState({
    date: moment().format("YYYY-MM-DD"),
    heure: params.heure,
    prenom: "",
    nom: "",
    mail: "",
    telephone: "",
    compagnie: "",
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
        compagnie: formData.compagnie,
        marque: formData.marque,
        modele: formData.modele,
        immatriculation: formData.immatriculation,
      },
    ];
    console.log("Données RDV :", RDV[0]);
    addRDV(RDV[0]);
    setMsg(
      "Votre rendez-vous est confirmé, un mail de confirmation vient de vous être envoyé"
    );
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
            type="text"
            name="prenom"
            label="Votre prénom : "
            defaultValue="Gérard"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="nom"
            label="Votre nom : "
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="mail"
            label="Votre email : "
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="telephone"
            label="Votre téléphone : "
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="compagnie"
            label="Votre entreprise : "
            onChange={handleInputChange}
          />
        </div>
        <div className="form_vehicule form_group">
          <h2>Votre véhicule</h2>
          <Input
            type="text"
            name="marque"
            label="Marque : "
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="modele"
            label="Modèle : "
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="immatriculation"
            label="Immatriculation : "
            onChange={handleInputChange}
          />
        </div>
        <button className="bouton"> Reserver</button>
        <p className="msgOK">{msg}</p>
      </form>
    </div>
  );
};

export default Reservation;
