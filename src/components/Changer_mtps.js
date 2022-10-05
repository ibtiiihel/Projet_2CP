import React,{ useEffect, useState } from "react";
import Axios from 'axios';

Axios.defaults.withCredentials = true;


//  apres cration de la connection bdd server on vas installer la librerie axios 
// axios permet d'effectuer les requetes a un API 
function Changer_mtps() {

    const [nomuser, setNomuser] = useState(""); 
    const [password,setpassword]=useState("");
    const [loginstatus,setloginstatus]=useState("");


    useEffect(() => {
        Axios.get("http://localhost:5000/login").then((response) => {
          if (response.data.loggedIn == true) {
            setNomuser(response.data.user[0].username);
          }
        }
        );
        
      }, []);
 const changer_mtps = () => {
        //console.log(nomuser);
        console.log(password);
          Axios.post("http://localhost:5000/changer_mtps",{
              username:nomuser,
              password:password
          }).then((response)=>{
              console.log(response.data.message);
              if(response.data.message)
              { setloginstatus(response.data.message);
         
            }

          });
      };

       
    
return(
   

 <div className = "information" >
 
        <header > changer votre mot de passe </header>   
        <label> nouveau mot de passe : </label> 
        <input type = "text"
        onChange = {(event) => { setpassword(event.target.value) } } /> 
       
        <div>-----------------------------------------------------------------</div>
        < button onClick = { changer_mtps}  > confirmer</button>  
        <div>-----------------------------------------------------------------</div>
        <h1>{loginstatus}</h1>
     
         </div> 
)
}
export default  Changer_mtps