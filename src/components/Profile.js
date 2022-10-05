import React , { useEffect, useState } from 'react';
import "./Profile.css" ;
import Log from '../assests/Group 19.png';
import {BrowserRouter as Router, Route ,Routes ,Link  }from "react-router-dom" ;

import Axios from 'axios';
Axios.defaults.withCredentials = true;

function Profile() {

  const [role, setRole] = useState("");

  const [username, setUsername] = useState("");

   

  useEffect(() => { 
    Axios.get("http://localhost:5000/login").then((response) => {

       if (response.data.loggedIn === true) {
        setUsername(response.data.user[0].username);
      }
    }
    );
    
  }, []);
  
  useEffect(() => { 
    document.getElementById("user").style.display = "initial";

    Axios.get("http://localhost:5000/login").then((response) => {
      console.log(role);
       if (response.data.loggedIn === true) {
        setRole(response.data.user[0].role);
        //console.log("if"+role);
      //  toast.error(role);
        //toast.error("if"+role);
      }
    }
    );
    
  }, []);
const logout = ()=>
  { Axios.post("http://localhost:5000/logout");
   window.location.replace("../");
   
  }

  useEffect(() => {
    console.log(role);
     if (role == "admin" || role == "gestionnaire"  ||  role == "visiteur" ) {
     // console.log("admin "+role);
      document.getElementById("user").style.display = "initial";
      //document.getElementById("user").style.display = "none";

    }
   

  }, [role]);
  return (
    <div className="Profile" id="user"  >
        <div>
          <img id="log" src = {Log} alt ="log" />
        </div>
         
        <Link to="/infoaccount">
        <button title='Mon Compte' className='btn-username'> Mon Compte : {username}</button>
        </Link>
        
        <button  className = "btn-logout"  id="logout" onClick={logout}> Deconnecter</button>  
        
    </div>
  )
}

export default Profile
