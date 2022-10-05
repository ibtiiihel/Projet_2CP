import React, { useEffect, useState } from "react";

import "../App.css";

import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import TabSalles from "../containers/TabSalles";
import TabSallesnonadmin from "../containers/TabSallesnonadmin";
import BlocLocaux from "../components/BlocLocaux";
import BlocLocauxnonadmin from "../components/BlocLocaux";
import Axios from "axios";
Axios.defaults.withCredentials = true;
function Salles() {
  
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
    <div className="Salles">
     
      <div id="admin">
      {role == "gestionnaire" && < TabSalles/>}
      {role == "intervenant" && < TabSallesnonadmin/>}
      {role == "admin" && < TabSalles/>}
      <BlocLocaux />
      <Sidebar />
      <Profile />
      </div>
     
    </div>
    
  );
}

export default Salles;
