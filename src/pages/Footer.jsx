import React from "react";

import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="footer">
      <div>
        <p>
          <Link to="moment">2024 - TruckBuster</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
