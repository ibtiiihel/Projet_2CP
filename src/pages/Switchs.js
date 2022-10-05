import React, { useEffect, useState } from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom'; 
import './Switch.css';

import {BrowserRouter as Router, Route ,Routes ,Link  }from "react-router-dom" ;

import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

import Tabswitch from '../containers/Tabswitch';
import Tabswitchnonadmin from '../containers/Tabswitchnonadmin';


Axios.defaults.withCredentials = true;


function Switchs() {

  const [role, setRole] = useState("");
  useEffect(() => { 
  
    Axios.get("http://localhost:5000/login").then((response) => {
   console.log("hellooo"+role);
       if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
        console.log("ifffhellooo"+role);
      }
    }
    );
    
  }, []);


  


  return (
    <div className='Switchs'>
    
      {role == "gestionnaire" && <Tabswitch />}
      {role == "intervenant" && < Tabswitchnonadmin/>}
      {role == "admin" && <Tabswitch  />}
        <Sidebar/>
        <Profile/>
       
        
      
    </div>
  )
}

export default Switchs