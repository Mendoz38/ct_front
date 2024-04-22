import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <>
      <div className="header">
        <Link to={"/"}>
          <h1> TruckBusters </h1>
        </Link>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/">Prendre Rendez-vous</Link>
          <Link to="Contact">Contact</Link>
        </nav>
      </div>
    </>
  );
};

export default Home;
