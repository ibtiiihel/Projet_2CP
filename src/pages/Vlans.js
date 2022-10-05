import React, { useEffect, useState } from "react";
import Axios from "axios";

import '../App.css'

import Sidebar from '../components/Sidebar' ;
import Profile from '../components/Profile';
import TabVlans from '../containers/TabVlans';
import TabVlannonadmin from '../containers/TabVlannonadmin';
Axios.defaults.withCredentials = true;



function Vlans() {
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
    <div className='Vlans'>
   
       {role == "gestionnaire" && < TabVlans />}
      {role == "intervenant" && <TabVlannonadmin/>}
      {role == "admin" && < TabVlans />}
        <Sidebar/>
       <Profile/>
       </div>
      
    
  )
}

export default Vlans