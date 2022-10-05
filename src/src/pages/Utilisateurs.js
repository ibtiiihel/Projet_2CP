import React, { useEffect, useState } from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom'; 
import './Switch.css';
import {BrowserRouter as Link  }from "react-router-dom" ;
import TabUtilisateurs from '../containers/TabUtilisateurs';
import TabUtilisateurnonadmin from '../containers/TabUtilisateurnonadmin';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
Axios.defaults.withCredentials = true;
function Utilisateurs() {
  const [role, setRole] = useState("");
  let navigate =useNavigate(); 
  useEffect(() => { 
    document.getElementById("admin").style.display = "none";
    document.getElementById("gestion").style.display = "none";
    Axios.get("http://localhost:5000/login").then((response) => {
   console.log("hellooo"+role);
       if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
        console.log("ifffhellooo"+role);
      }
    }
    );
    
  }, []);

  useEffect(() => {
     if (role == "admin" ) {
      console.log("admin "+role);
      document.getElementById("admin").style.display = "initial";
    }
     if (role == "gestionnaire" ) { 
      document.getElementById("gestion").style.display = "initial";
      console.log("gest"+role);
      }
   
    if(role == "intervenant" )
     {
     document.getElementById("gestion").style.display = "initial";
     console.log("visit"+role);

    }
  

  }, [role]);
  return (
    <div className='Utilisateurs'  >
        <div id="admin">   
        <TabUtilisateurs/>
        <Sidebar/>
        <Profile/>
        <Link to="/Ajout_user"  >
          <button  className='btn-add'> + utilisateur </button>
        </Link>
        </div>
        <div id="gestion">   
        <TabUtilisateurnonadmin/>
        <Sidebar/>
        <Profile/>
        </div>
       
    </div>
  )
}

export default Utilisateurs;