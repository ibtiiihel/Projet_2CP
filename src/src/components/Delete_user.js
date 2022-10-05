import React,{ useEffect, useState } from "react";
import Axios from 'axios';

Axios.defaults.withCredentials = true;


//  apres cration de la connection bdd server on vas installer la librerie axios 
// axios permet d'effectuer les requetes a un API 
function Delete_user() {

    const [nomuser, setNomuser] = useState(""); 
    const [loginstatus,setloginstatus]=useState("");
  
    const delete_user = () => {
     Axios.post("http://localhost:5000/delete_user",{
     username :nomuser
 }).then((response) => {
            console.log(response) // afficher la reponse otenue dans le console de la page web 
                // recuperer les donnée dans un tableau de switch ( la liste ) 
                if(response.data.message)
                { setloginstatus(response.data.message);
           
              }
  
            });
        
        };
    
return(
   

 <div className = "information" >
 
        <header > supprimer utilisateur</header>   
        <label> nom utilisateur : </label> 
        <input type = "text"
        onChange = {(event) => { setNomuser(event.target.value) } } /> 
       
        <div>-----------------------------------------------------------------</div>
        < button onClick = { delete_user}  > supprimer utilisateur</button>  
        <div>-----------------------------------------------------------------</div>
        <h1>{loginstatus}</h1>
     
         </div> 
)
}
export default  Delete_user