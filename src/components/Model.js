import React from "react";
import "./Model.css";
import Axios from "axios";
Axios.defaults.withCredentials = true;
function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="title">
          <h1>Voulez vous faire la configuration de ce switch ? </h1>
        </div>
        <div className="body">
          <p>Si oui , veuillez cliquer sur configurer , sinon veuillez cliquer sur annuler </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
           >
            Annuler
          </button>

          <button> Configurer </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;