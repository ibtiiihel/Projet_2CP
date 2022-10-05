import React, { useState, useEffect } from "react";
import "../App.css";
import "./RenommerSalle.css";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  New_Nom: "",
};

const RenommerSalle = () => {
  const [state, setState] = useState({ initialState });

  const { New_Nom } = state;

  const  Salle  = useParams();
  console.log(useParams());
  
  

  const navigate=useNavigate(); 
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/getSalle/${Salle.id}`)
    .then((resp)=>setState({...resp.data[0]}))
    
  }, [Salle]);

  const handleSubmit = (e) => {
      console.log("sabmit ! ");
    e.preventDefault();
    if (!New_Nom) 
    {
      console.log("Nom vide ");
      toast.error("veuillez fournir un nom non vide ");
    } else {
    console.log("update operation  ");
      axios.put(`http://localhost:5000/api/putSalle/${Salle.id}`, {
        New_Nom:New_Nom,
      })
        .then(() => {
          console.log("Salle renommé avec succes ");
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Salle renommé avec succes !");
      setTimeout(() => navigate("/locaux/Salles"), 500); //to return to touslesswitchs page
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
      
    <div >
      <h2 className="h2rename"> Renommer la salle  </h2>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        
        <input
          type="text"
          name="New_Nom"
          className="New_Nom_salle"
          placeholder="Nouveau nom ...."
          value={New_Nom}
          onChange={handleInputChange}
        />
         

        <input type="submit" value="Valider" className="validerrename"/>

        <Link to="/Locaux/Salles">
          <input type="button" value="Annuler" className="annulerrename" />
        </Link>
        
      </form>
    </div>
  );
};

export default RenommerSalle;
