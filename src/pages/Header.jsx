import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {
  return (
    <>
      <div className="header">
        <Link to={"/"}>
          <h1> 
            <span className="hidden">TruckBuster</span>
             <img src={logo} alt="covoit" className='logo' /> 
          </h1>
        </Link>

          <Link to="/"><FontAwesomeIcon icon={faCalendarDays} /> Prendre Rendez-vous</Link>
      </div>
    </>
  );
};

export default Home;
