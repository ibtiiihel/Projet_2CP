import React, { useState, useEffect } from "react";
import "./Addswitch.css";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Vector24 from "../assests/Vector24.png";
import Axios from 'axios';

Axios.defaults.withCredentials = true;

const initialState = {
  marque: "",
  modele: "",
  N_inventaire: "",
  N_serie: "",
  DMAC: "",
  date_d_achat: "",
  Nombre_de_ports_FE: "",
  Nombre_de_ports_GE: "",
  Nombre_de_ports_SFP: "",
  Nombre_de_ports_SFP_plus: "",
};

const Addswitch = () => {
  const [state, setState] = useState(initialState);
  const [modalOpen, setModalOpen] = useState(false);
  let navigate = useNavigate();

  const {
    marque,
    modele,
    N_inventaire,
    N_serie,
    DMAC,
    date_d_achat,
    Nombre_de_ports_FE,
    Nombre_de_ports_GE,
    Nombre_de_ports_SFP,
    Nombre_de_ports_SFP_plus,
  } = state;

  const [ControleN, setControleN] = useState([]); 
  const [ControleDMAC, setControleDMAC] = useState([]); 

  // controle d'existance du num invantaire
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/getSwitchN/${N_inventaire}`)
      .then((resp) => setControleN({ ...resp.data[0] }));
  }, [N_inventaire]);

  // controle d'existance du dmac
  useEffect(() => {
    console.log("dmac",DMAC);
    axios
      .get(`http://localhost:5000/api/getSwitchDMAC/${DMAC}`)
      .then((resp) => setControleDMAC({ ...resp.data[0] }));
  }, [DMAC]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !marque ||
      !modele ||
      !N_inventaire ||
      !N_serie ||
      !DMAC ||
      !date_d_achat ||
      !Nombre_de_ports_FE ||
      !Nombre_de_ports_GE ||
      !Nombre_de_ports_SFP 
      
    ) {
      toast.error("veuillez fournir une valeur dans chaque champ de saisie ");
    } else {
      console.log(ControleN);
      // controlz d'existance si le N inventaire existe deja
      if (ControleN.N_inventaire) {
        toast.error(
          "  N inventaire  Existe deja  ! verifier vos information ! ");
      } else {
        // controlz d'existance si l'adresse mac' existe deja
        if (ControleDMAC.DMAC) {
          toast.error(
            " @ DMAC  Existe deja  ! verifier vos information ! "
          );
        } else {
          axios
            .post("http://localhost:5000/api/AddSwitch", {
              marque,
              modele,
              N_inventaire,
              N_serie,
              DMAC,
              date_d_achat,
              Nombre_de_ports_FE,
              Nombre_de_ports_GE,
              Nombre_de_ports_SFP,
              Nombre_de_ports_SFP_plus,
            })
            .then(() => {
              setState({
                marque: "",
                modele: "",
                N_inventaire: "",
                N_serie: "",
                DMAC: "",
                date_d_achat: "",
                Nombre_de_ports_FE: "",
                Nombre_de_ports_GE: "",
                Nombre_de_ports_SFP: "",
                Nombre_de_ports_SFP_plus: "",
              });
            })
            .catch((err) => toast.error(err.response.data));
          toast.success("Le switch est ajouté avec succès !");

          setTimeout(() => navigate("/touslesswitchs"), 500); //to return to touslesswitchs page
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="form" id="fond">
      <h2 className="styleh2"> Ajouter un nouveau Switch </h2>

      <form
        
        style={{
          margin: "auto",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="marque"
          name="marque"
          placeholder="La marque de Switch ...."
          value={marque}
          onChange={handleInputChange}
        />

        <input
          type="text"
          className="modele"
          name="modele"
          placeholder="Le modèle de Switch ...."
          value={modele}
          onChange={handleInputChange}
        />

        <input
          type="number"
          className="N_inventaire"
          name="N_inventaire"
          placeholder="Le numéro d'inventaire ...."
          value={N_inventaire}
          onChange={handleInputChange}
        />

        <input
          type="text"
          className="N_serie"
          name="N_serie"
          placeholder="Le numéro de série ...."
          value={N_serie}
          onChange={handleInputChange}
        />

        <input
          type="text"
          className="DMAC"
          name="DMAC"
          placeholder="L'adresse MAC ...."
          value={DMAC}
          onChange={handleInputChange}
        />

        <input
          type="date"
          className="date_d_achat"
          name="date_d_achat"
          placeholder="La date d'achat ...."
          value={date_d_achat}
          onChange={handleInputChange}
        />

        <input
          type="number"
          className="Nombre_de_ports_FE"
          name="Nombre_de_ports_FE"
          placeholder="Le nombre de ports Fast Ethernet  ...."
          value={Nombre_de_ports_FE}
          onChange={handleInputChange}
        />

        <input
          type="number"
          className="Nombre_de_ports_GE"
          name="Nombre_de_ports_GE"
          placeholder="Le nombre de ports Gégabyte Ethernet ...."
          value={Nombre_de_ports_GE}
          onChange={handleInputChange}
        />

        <input
          type="number"
          className="Nombre_de_ports_SFP"
          name="Nombre_de_ports_SFP"
          placeholder="Le nombre de ports SFP ...."
          value={Nombre_de_ports_SFP}
          onChange={handleInputChange}
        />

        <input
          type="number"
          className="Nombre_de_ports_SFP_plus"
          name="Nombre_de_ports_SFP_plus"
          placeholder="Le nombre de ports SFP+ ...."
          value={Nombre_de_ports_SFP_plus}
          onChange={handleInputChange}
        />

        <input type="submit" value="Valider" />

        <Link to="/touslesswitchs">
          <input type="button" value="Revenir" />
        </Link>
        <div className="droite">
          <img id="M" src={Vector24} alt="Vector24" />
        </div>
      </form>
    </div>
  );
};

export default Addswitch;
