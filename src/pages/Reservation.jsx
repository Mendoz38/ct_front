import React, { useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import moment from "moment";
import Input from "./Form/Input";
import { addRDV, checkRDV } from "../api/ct";

const Reservation = (props) => {
  const params = useParams();
  moment.locale("fr");
  const date = moment(params.date).format("dddd DD MMMM");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const [formData, setFormData] = useState({
    date: params.date,
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
    //console.log("Données RDV :", RDV[0]);
    checkRDV(RDV[0])
    .then((result)=>{
        //console.log("Tous les RDV : ", result.count);
        if (result.count >= 2) {
            setError("Vous avez trop tardé avant de réserver !!!! Essayez un autre créneau")
        } else {
            addRDV(RDV[0]);
            setMsg("Votre rendez-vous est confirmé, un mail de confirmation vient de vous être envoyé");
            setTimeout(() => {
              setRedirect(true);
            }, 2500);
        }
    })
    .catch((error)=>{console.log({error})})

};

const navigate = useNavigate();
const handleClick = () => {
  navigate(-1);
};

  if (redirect) {
   // return <Navigate to="/" />;
  }

  return (
    <div>
        <h1>Votre réservation pour le {date} à {params.heure}h </h1>
      {msg || error ? 
        <div>
          <p className="msgOK">{msg}</p>
          <p className="errorMsg">{error}</p>


        </div>
      : 
      <div>
        <button onClick={handleClick} className="btn">Changer de date</button>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form_civilite form_group">
            <h2>Vos coordonnées</h2>

            <Input
              type="text"
              name="prenom"
              label="Votre prénom : "
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="nom"
              label="Votre nom : "
              onChange={handleInputChange}
            />
            <Input
              type="mail"
              name="mail"
              label="Votre email : *"
              onChange={handleInputChange}
              required={true} 
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
          <button className="btn"> Reserver</button>

        </form>
          <hr />
      </div>
      }
    </div>
  );
};

export default Reservation;
