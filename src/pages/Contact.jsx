import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Form/Input";

const Contact = () => {
  const [msg, setMsg] = useState(null);
  /* ------------------- YUP --------------------------*/
  const schema = yup
    .object({
      nom: yup.string().required(" Nom obligatoire "),
      mail: yup
        .string()
        .email("Adresse email invalide")
        .required("Adresse email obligatoire"),
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
    console.log("Data :", data);
    setMsg(data);
  };

  return (
    <>
      <div>
        <h2>Contactez-nous</h2>
        {msg ? (
          <>
            <div className={`msgOK response`}> 
              <p>Message envoyé</p>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_civilite form_group">
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
                label="Votre email : "
                register={register}
                error={errors.mail ? errors.mail.message : null}
              />

              <div className="InputAddOn">
                <span className="InputAddOn-item"> Votre message : </span>
                <textarea id="myTextarea"></textarea>
              </div>
            </div>
            <button type="submit" className="btn">
              {" "}
              Envoyer{" "}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Contact;
