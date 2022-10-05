
import React, { useState, useEffect } from "react";
import "../App.css";
import "./AddEditVlan.css";
import { useHistory, useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
Axios.defaults.withCredentials = true;


const initialState = {
  NomVLAN: "",
  IP: "",
  Masque: "",
};

const AddEditVlan = () => {
  const [state, setState] = useState(initialState); // contien les variable chaines 

  let navigate = useNavigate(); 

  const { NomVLAN, IP, Masque } = state;  

  const [NumVLAN, setNumVLAN] = useState();
  
  const [ControleNom, setControleNom] = useState([]); // controle d'existance du nom Vlan 
  const [ControleNum, setControleNum] = useState([]); // controle d'existance du Num Vlan
  const [ControleIP, setControleIP] = useState([]); // controle d'existance du Num Vlan
  const { id } = useParams();
  
  
  useEffect(() => { // actualiser les changement des valeurs 
    const setAll = (e) => {
      console.log(e);
      setState(e);
      setNumVLAN(e.NumVLAN);
    };
    Axios.get(`http://localhost:5000/api/getVLANNom/${id}`).then(
      (resp /* (()=>{*/) => setAll({ ...resp.data[0] })
    );

  }, [id]);


  // controle d'existance du Nom VLAN avant ajout 
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/getVLANNom/${NomVLAN}`).then(
      (resp /* (()=>{*/) => setControleNom({ ...resp.data[0] })
      
    );
  }, [NomVLAN]);
  
  useEffect(() => {//Controle d'existance du NumVLAN   Avant Ajout 
    Axios.get(`http://localhost:5000/api/getVLANNum/${NumVLAN}`).then(
      (resp /* (()=>{*/) => setControleNum({ ...resp.data[0] })
      
    );
  }, [NumVLAN]);

  useEffect(() => {//Controle d'existance du IP   Avant Ajout 
    Axios.get(`http://localhost:5000/api/getVLANIP/${IP}`).then(
      (resp /* (()=>{*/) => setControleIP({ ...resp.data[0] })
      
    );
  }, [IP]);

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) { // s'il ya pas de  id la page servira pour l 'ajout
      if (!NomVLAN || !NumVLAN || !IP || !Masque) { // controle d'existance des chaps 
        toast.error("veuillez fournir une valeur dans chaque champ de saisie");
      } else {
       // controlz d'existance si le Nom du lan existe deja 
      if (ControleNom.NomVLAN) {
          toast.error(" nom VLAN  Existe deja  ! verifier vos information ! ");
          
        } else {
          if (ControleNum.NumVLAN) {
            toast.error(" Le numero VLAN  Existe deja  ! verifier vos information ! ");
            
          } else {  if (ControleIP.IP) {
            toast.error(" l'adresse IP Existe deja ! verifier vos information ! ");
            
          } else { // y'a pas des valeur correspondantes on peut ajouter 
          
          Axios.post(`http://localhost:5000/AjouterVlan`, {
            NomVLAN,
            NumVLAN,
            IP,
            Masque,
          })
            .then(() => {
              setState({ NomVLAN: "", NumVLAN: "", IP: "", Masque: "" });

              toast.success("VLAN est ajouté avec succès !");
            })
            .catch((err) => toast.error(err.response.data));

            setTimeout (()=> navigate("/vlan"),500); 
        }}
      }}
    } else {  
      //le id et present c'est une modification on charge les données precedante pour la mosification eventuelle 
      //console.log(" modification !!!!!");
      //console.log({ NomVLAN, NumVLAN, IP, Masque });
      Axios.put(`http://localhost:5000/EditVlan/${id}`, {
        NomVLAN,
        NumVLAN,
        IP,
        Masque,
      })
        .then(() => {
          console.log("Vlan modifiée  avec succes  ");
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("VLAN est modifié avec succès !");
      setTimeout (()=> navigate("/vlan"),500); 
    }
  };

  // focnction qui met a jours les valeur lors du changement des inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };


  
  return ( // le resultats a affihcer  ( un foemulaire )
    <div className='form' id='fond' >
      <h2 className="styleh2"> Ajouter un nouveau Vlan </h2>

      <form
        style={{
        margin:"auto",
        alignContent :"center",    
       }}
        onSubmit={handleSubmit}
      >

        <input
      
          type="text"
          id="NomVLAN"
          name="NomVLAN"
          className="NomVLAN"
          placeholder="le nom du VLAN ...."
          value={NomVLAN || ""}
          onChange={handleInputChange}
        />

        
        <input
         
          type="number"
          id="NumVlAN"
          name="NumVlAN"
          className="NumVlan"
          placeholder={id ? { NumVLAN } : "le numero du VLAN  ...."}
          value={NumVLAN}
          onChange={(event) => {
            setNumVLAN(event.target.value);
          }}
        />

       
        <input
         
          type="text"
          id="IP"
          name="IP"
          className="IP"
          placeholder=" IP di VLAN  ...."
          value={IP || ""}
          onChange={handleInputChange}
        />
        
        <input
         
          type="text"
          id="Masque"
          className="Masque"
          name="Masque"
          placeholder="Masque "
          value={Masque || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Modifier" : "Valider"} />

        <Link to="/vlan">
          <input type="button" value="Annuler" />
        </Link>
      </form>
    </div>
  );
};

export default AddEditVlan;
