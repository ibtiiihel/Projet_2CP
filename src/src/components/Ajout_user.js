import React,{ useEffect, useState } from "react";
import './Ajout_user.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Axios from 'axios';

Axios.defaults.withCredentials = true;


//  apres cration de la connection bdd server on vas installer la librerie axios 
// axios permet d'effectuer les requetes a un API 
function Ajout_user() {

/*
  const [ControleUsername, setControleUsername] = useState([]); // controle d'existance du username
  const [ControleEmail, setControleEmail] = useState([]); // controle d'existance du email

  // controle d'existance du num invantaire
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/affich_usersUsername/${username}`)
      .then((resp) => setControleUsername({ ...resp.data[0] }));
  }, [username]);

  // controle d'existance du dmac
  useEffect(() => {
   
    Axios
      .get(`http://localhost:5000/affich_usersUsername/${email}`)
      .then((resp) => setControleEmail({ ...resp.data[0] }));
  }, [email]);*/
    
   

    const [password, setpassword] = useState(""); 
    const [nomuser, setNomuser] = useState(""); 
    const [email, setadresse] = useState(""); 
    const [role,setrole]=useState("intervenant");
    const[nom,setNom]=useState("");
    const[prenom,setPrenom]=useState("");

    const [loginstatus,setloginstatus]=useState("");
    const register = () => {
        //console.log(nomuser);
        console.log(password);
          Axios.post("http://localhost:5000/register",{
              username:nomuser,
              password:password,
              nom:nom,
              prenom:prenom,
              email:email,
              role : role 
          }).then((response)=>{
              console.log(response.data.message);
              if(response.data.message)
              { toast.success(response.data.message);
              window.location.replace('../utilisateurs');
            } 

          });
      };
       
    
return(

 <div className="form"  >
   <h2 className="sty-leh2"> Ajouter un nouveau utilisateur </h2>

        <form 
         style={{
          margin: "auto",
          alignContent: "center",
        }}>
         <input
          type="text"
          style ={{left : "250px",top :" 60px"}}
          name="username"
          placeholder="le nom d'utilisateur ...."
          onChange = {(event) => { setNomuser(event.target.value) } }
         />

        <input
          type="email" 
          className="email"
          placeholder="l'adresse mail ...."
          onChange = {(event) => { setadresse(event.target.value) } }
         />

        <input
          
          type="text" 
          className="mdp"
          name="mdp"
          style ={{left : "250px",top :" 180px"}}
          placeholder="le mot de passe ...."
          onChange = {(event) => { setpassword(event.target.value) } } 
         />
        <input
          type="text"
          className="nom"
          style ={{left : "250px",top :" 240px"}}
          placeholder="le nom ...."
          onChange = {(event) => { setNom(event.target.value) } } 
         />
        <input
        
          type="text" 
          className="prenom"
         
          style ={{left : "250px",top :" 300px"}}
          placeholder="le prenom ...."
          onChange = {(event) => { setPrenom(event.target.value) } } 
         />
         
 
          <select id="select-role" onChange={(event)=>{setrole(event.target.value)}}>
          <option>intervenant</option>
          <option>gestionnaire</option>
         </select>
         
        </form>

       
        
        < button className="btn-adduser" onClick = { register}  > Ajouter </button>  
       
        
     </div>
  
    
)
}
export default  Ajout_user