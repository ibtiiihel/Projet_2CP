import React, {useEffect, useState } from "react";
import './signin.css' ;  
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import log from '../assests/Group 19.png';
import circle1 from '../images/Ellipse 3.png';
import circle2 from '../images/Ellipse 4.png'; 
toast.configure()
Axios.defaults.withCredentials = true;
function Signin() {
  const [password, setpassword] = useState(""); 
  const [nomuser, setNomuser] = useState(""); 
  
  const [loginstatus,setloginstatus]=useState("");
  const restaurer =() => {
    console.log(nomuser);
    console.log(password);
    Axios.post(`http://localhost:5000/restaurer`, {
       username :nomuser,
          
       }).then((response) => {
       console.log(response.data.message); 
           if(response.data.message_success)
          { console.log(response.data);
            toast.success(response.data.message_success);
            console.log(response.data);
          } 
         else
          {console.log(response.data.message);
           toast.error(response.data.message); 
          }
        });
   };
   
     const login =() => {
      console.log(nomuser);
      console.log(password);
      Axios.post("http://localhost:5000/login", {
             nomuser : nomuser,
             password:password,
            
         }).then((response) => {
          console.log(response.data.message);
             if(response.data.message)
            { toast.error(response.data.message);
          
           console.log(response.data);

          } else
          {
            toast.success("connexion");
            window.location.replace("../Home");
             
              
          }
          }  );
     }; 
  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if(response.data.loggedIn ===true)
      setloginstatus(response.data.user[0].username);
    
    });
  }, []); 


    return ( 
    <div className = "signinapp" >
      <div className="logo_app"> 
      <img src={log}  id="log" />
      </div>
      <div className="circle1">
        <img src={circle1} />
      </div>
      <div className="circle2">

        <img src={circle2} />
      </div>
      <div className="signin">
      <div className="sub-main">
       <div>
       <h1 id="connexionh1"> Connexion </h1>
       </div>
       <div className="app__signin__first-input"> 
           <input id="usernameinput" type="text" placeholder="Nom d'utilisateur.."
        onChange = {(event) => { setNomuser(event.target.value) } } /> 
        </div>
        <div className="app__signin__second-input">
            <input  id="mdpinput" type="text" placeholder="Mot de passe.." 
        onChange = {(event) => { setpassword(event.target.value) } } /> 
        <div/>
        <div >
          < button  className="mdpoublié" onClick = { restaurer}   > mot de passe oublié ?</button>
        </div>
         <div className="app__signin__button">
          <button type="button" onClick={ login} >Confirmer</button>
         </div>
       
        </div>
        </div> 
    </div> 
    </div>
    );      
}
    

export default Signin ;