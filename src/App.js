import './App.css';
import {Routes, Route} from 'react-router-dom'
import { Navigate } from "react-router";

import Header from './pages/Header'
import Footer from './pages/Footer'
import Home from './pages/Home'

import './pages/styles.css';

function App() {
  return (
    <div className="autosur">
      <Header />
      <Routes>
        <Route exact path="/Home" element={<Home />} />
        
        <Route path="*" element={<Navigate to="/Home" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;