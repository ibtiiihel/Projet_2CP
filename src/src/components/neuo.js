import React from "react";
import{faEdit}from '@fortawesome/free-solid-svg-icons';
import { faPen } from "@fortawesome/free-solid-svg-icons";
import{FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import './neuo.css';
const Neuo=()=>{
    return(
        <label className="Neuo">
        
          <button id="neuo" ></button>
          <FontAwesomeIcon id="pen"  icon={faPen}></FontAwesomeIcon>
        </label>
    );
    
};
export default Neuo;