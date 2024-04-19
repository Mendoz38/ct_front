import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <>
      <div className="header">
        <Link to={"/"} >
          <h1> TruckBusters </h1>
        </Link>
      </div>
    </>
  );
};

export default Home;
