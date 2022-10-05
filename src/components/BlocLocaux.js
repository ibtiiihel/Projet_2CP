import React from "react";
import "../App.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import "./BlocLocaux.css";
import Axios from "axios";
Axios.defaults.withCredentials = true;
function BlocLocaux() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div >
  
    <table className="Styled-table1">
      <thead>
        
         
            <Link to="/locaux/Blocs">
            <button id ="btnbloc"> Blocs </button>
            </Link>
          
             <Link to="/locaux/Salles">
             <button id ="btnsalle" > Salles </button>
             </Link>
          
        
      </thead>
    </table>
    
    
  </div>


  );
}

export default BlocLocaux;
