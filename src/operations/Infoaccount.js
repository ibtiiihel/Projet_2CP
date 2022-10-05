import React , { useEffect, useState }from 'react'
import Axios from 'axios';
import './Infoaccount.css';
import { Link } from 'react-router-dom';

Axios.defaults.withCredentials = true;
const Infoaccount = () => {

    
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] =useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
  
     
  
    useEffect(() => { 
      Axios.get("http://localhost:5000/login").then((response) => {
  
         if (response.data.loggedIn === true) {
            setNom(response.data.user[0].nom);
        }
      }
      );
      
    }, []);

    useEffect(() => { 
        Axios.get("http://localhost:5000/login").then((response) => {
    
           if (response.data.loggedIn === true) {
            setPrenom(response.data.user[0].prenom);
          }
        }
        );
        
      }, []);
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
    
           if (response.data.loggedIn === true) {
            setEmail(response.data.user[0].email);
          }
        }
        );
        
      }, []);
      useEffect(() => { 
        Axios.get("http://localhost:5000/login").then((response) => {
    
           if (response.data.loggedIn === true) {
            setRole(response.data.user[0].role);
          }
        }
        );
        
      }, []);
  return (
    <div>
        <div className='AccountInfo' style={ {width:750}}>
            <h1 className='infooo'>Mes informations :</h1>
            <h3 className='inf'>Mon nom : {nom} </h3>
            <h3 className='inf'>Mon prénom :  {prenom}</h3>
            <h3 className='inf'>Mon email : {email}</h3>
            <h3 className='inf'>Mon nom d'utilisateur : {username}</h3>
            <h3 className='inf'>Mon rôle : {role} </h3>
            
        </div>
        <Link to={ `/reset_password/${email}`}>

            <button className='btn-change-mdp'>
                  Modifier le mot de passe 
            </button>

        </Link>
        
    </div>
  )
}

export default Infoaccount