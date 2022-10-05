import React, { useEffect, useState } from "react";
import Axios from "axios";
import Sidebar from '../components/Sidebar'
import Profile from './../components/Profile';
import Application from './../components/Application';
import Applicationnonadmin from './../components/Applicationnonadmin';
Axios.defaults.withCredentials = true;

const DetailConfig = () => {
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
    <div>
    
      {role == "gestionnaire" && < Application/>}
      {role == "intervenant" && <Applicationnonadmin />}
      {role == "admin" && < Application/>}
  

      <Sidebar/>
      <Profile />



    </div>
  )
}

export default DetailConfig