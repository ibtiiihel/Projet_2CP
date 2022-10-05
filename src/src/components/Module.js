import React from 'react'
import './module.css'
import Axios from "axios";
Axios.defaults.withCredentials = true;
function Popup (props){
    return (props.trigger) ? (
        <div className="popup">
            <div className='popup-inner'>
             
             
             { props.children}  
            </div>
        </div>
    ):"";
}
export default Popup