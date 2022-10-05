import React, { useEffect, useState } from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom'; 
import './Switch.css';
import {BrowserRouter as Router, Route ,Routes ,Link  }from "react-router-dom" ;
import Tabswitch from '../containers/Tabswitch';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
Axios.defaults.withCredentials = true;
function Switchs() {

  let navigate =useNavigate(); 
  const [role, setRole] = useState("");
  useEffect(() => { 
    document.getElementById("ajt").style.display = "none";
        Axios.get("http://localhost:5000/login").then((response) => {
      console.log(role);
       if (response.data.loggedIn === true) {
        setRole(response.data.user[0].role);
      }
    }
    );
    
  }, []);
const logout = ()=>
  { Axios.post("http://localhost:5000/logout");
   window.location.replace("../");
   
  }
  return (
    <div className='Switchs'>
    <div id="admin">
    {role == "gestionnaire" && <Tabswitch />}
      {role == "intervenant" && < Tabswitch/>}
      {role == "admin" && <Tabswitch  />}
        <Sidebar/>
        <Profile/>
        <div  >
        <Link to="/addswitch" id="ajt" >
          <button className='btn-add'> Ajouter un Switch </button>
        </Link>
        </div>
      </div>  
      
    </div>
  )
}

export default Switchs