import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Navigate } from "react-router";

import Header from './pages/Header'
import Footer from './pages/Footer'
import Home from './pages/Home'
import Reservation from './pages/Reservation';

import './pages/styles.css';

function App() {
  return (
    <div className="autosur">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Reservation/:date/:heure" element={<Reservation />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
