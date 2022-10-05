import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import TabBlocs from "./TabBlocs";
import TabBlocsnonadmin from "./TabBlocnonadmin";

import BlocLocaux from "../components/BlocLocaux";

Axios.defaults.withCredentials = true;
function Blocs() {
  
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
  
  return (
    <div className="Blocs">
    <div id="admin">
    {role == "gestionnaire" && < TabBlocs/>}
      {role == "intervenant" && <TabBlocsnonadmin />}
      {role == "admin" && < TabBlocs/>}
  
      <BlocLocaux />

      <Sidebar />
      <Profile />
      </div>
      
      </div>
    
  );
}

export default Blocs;
