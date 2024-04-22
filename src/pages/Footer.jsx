import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faAt } from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {

  return (
    <div className="footer">

          <Link to="tel:0123456789"> <FontAwesomeIcon icon={faPhone} /> 01 23 45 67 89</Link>
          <Link to="/">2024 - TruckBuster</Link>
          <Link to="Contact"> <FontAwesomeIcon icon={faAt} /> Contact</Link>
    </div>
  );
};

export default Home;
