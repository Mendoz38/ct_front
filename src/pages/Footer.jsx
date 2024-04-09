import React from 'react'

import { Link } from "react-router-dom";

const Home = (props) => {

    return (
        <div className="footer">
                <div>
                    <p> Bienvenue -  <Link to="/Deposer">Deposer</Link></p>
                </div>


        </div>

    )

}

export default Home