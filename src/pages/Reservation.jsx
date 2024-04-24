import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Form/Input";
import { addRDV, checkRDV } from "../api/ct";

const Reservation = (props) => {
  const params = useParams();
  moment.locale("fr");
  const date = moment(params.date).format("dddd DD MMMM");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  /* ------------------- YUP --------------------------*/
  const schema = yup
    .object({
      prenom: yup.string().required(" Prénom obligatoire "),
      nom: yup.string().required(" Nom obligatoire "),
      driver: yup.string().required(" Nom du chauffeur obligatoire "),
      telephone: yup.string()
      .matches(/^(\s*\d\s*){10}$/, 'Numéro invalide')
      .required('Numéro de téléphone obligatoire'),
      mail: yup.string()
        .email('Adresse email invalide')
        .required('Adresse email obligatoire'),
      compagnie: yup.string().required("Entreprise obligatoire").max(20, "20 caractères max"),
      immatriculation: yup
          .string()
          .required("Immatriculation obligatoire")
          .matches(
            /^[A-Za-z]{2}-\d{3}-[A-Za-z]{2}$/,
            "Le format doit être AX-612-KA"
          ),
    })
    .required();

  /* ------------------- REACT HOOK FORM --------------------------*/
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /* ------------------- OnSubmit form --------------------------*/
  const onSubmit = (data) => {
    // je rajoute la date et l'heure dans mes données du formulaire
    data = {
      ...data,
      date: params.date,
      heure: params.heure,
    };

    console.log("Data :", data);
    checkRDV(data)
      .then((result) => {
        //console.log("Tous les RDV : ", result.count);
        if (result.count >= 2) {
          setError(
            "Vous avez trop tardé avant de réserver !!!! Essayez un autre créneau"
          );
        } else {
          addRDV(data);
          setMsg(
            "Votre rendez-vous est confirmé, un mail de confirmation vient de vous être envoyé"
          );
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div>
      <h1>TruckBuster </h1>
      <hr className="margin40" />
      <h2>
        Votre réservation pour le {date} à {params.heure}h{" "}
      </h2>
      {msg || error ? (
        <>
        <div className={`${msg && "msgOK"} ${error && "errorMsg"} response`}>
          <p>{msg}</p>
          <p>{error}</p>
        </div>
        
        <h2 className="margin40">Toute l'équipe de TruckBuster vous remercie pour votre confiance</h2>
        </>
      ) : (
        <div>
          <button onClick={handleClick} className="btn">
            Changer de date
          </button>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_civilite form_group">
              <h2>Vos coordonnées</h2>

              <Input
                type="text"
                name="prenom"
                label="Votre prénom : "
                register={register}
                error={errors.prenom ? errors.prenom.message : null}
              />
              <Input
                type="text"
                name="nom"
                label="Votre nom : "
                register={register}
                error={errors.nom ? errors.nom.message : null}
              />
              <Input
                type="mail"
                name="mail"
                label="Votre email : *"
                register={register}
                error={errors.mail ? errors.mail.message : null}
              />
              <Input
                type="text"
                name="telephone"
                label="Votre téléphone : "
                register={register}
                error={errors.telephone ? errors.telephone.message : null}
              />
              <Input
                type="text"
                name="compagnie"
                label="Votre entreprise : "
                register={register}
                error={errors.compagnie ? errors.compagnie.message : null}
              />
              <Input
                type="text"
                name="driver"
                label="Nom du chauffeur : "
                register={register}
                error={errors.driver ? errors.driver.message : null}
              />
            </div>
            <div className="form_vehicule form_group">
              <h2>Votre véhicule</h2>
              <Input
                type="text"
                name="marque"
                label="Marque : "
                register={register}
              />
              <Input
                type="text"
                name="modele"
                label="Modèle : "
                register={register}
              />
              <Input
                type="text"
                name="immatriculation"
                label="Immatriculation : "
                register={register}
                error={errors.immatriculation ? errors.immatriculation.message : null}
              />
            </div>
            <button type="submit" className="btn"> Reserver </button>
          </form>
          <hr />
        </div>
      )}
    </div>
  );
};

export default Reservation;
