import React,{ useState } from "react";
import Axios from 'axios';

Axios.defaults.withCredentials = true;


//  apres cration de la connection bdd server on vas installer la librerie axios 
// axios permet d'effectuer les requetes a un API 
function Visitor() {
    const [liste, setListe] = useState([]);


 const Afficher = () => {
        Axios.get("http://localhost:5000/affich_users").then((response) => {
            console.log(response) // afficher la reponse otenue dans le console de la page web 
                // recuperer les donnée dans un tableau de switch ( la liste ) 
            setListe(response.data)

        });

    };
return(
    <div className = 'utilisateurs' >

        <button onClick = { Afficher } > Affiicher les utilisateurs </button>

    {liste.map((val, cle) => { // parcourir les donnéees 
            return <div classname = '' >
                username: { val.username }
                ----email:{val.email}
                -- --role: { val.role} </div >
        })
    } </div>

)
}
export default  Visitor 