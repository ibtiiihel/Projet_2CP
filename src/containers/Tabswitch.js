import React, { useState, useEffect } from "react";
import "./Tabswitch.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Table } from "react-bootstrap";
import Rectangle47 from "../assests/search.png";
import _ from "lodash";

const pagesize = 7;

const Tabswitch = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [nbswitch, setNbswitch] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/nbr_switches_total").then((response) => {
      console.log(response)
      setNbswitch(response.data)
    });
    
  }, []);

  

  const [paginatedData, setpaginatedData] = useState();
  const [currentPage, setcurrentPage] = useState(1);

  // data vas contenir les switch
  const [data, setData] = useState([]);
  const pagination = (pageNb) => {
    setcurrentPage(pageNb);
    const startIndex = (pageNb - 1) * pagesize;
    const paginatedData = _(data).slice(startIndex).take(pagesize).value();
    setpaginatedData(paginatedData);
  };

  // variable de recherche--------------------------------------------------------
  const [rech, setRech] = useState("");

  // use effect pour charger les donner lors d'une recherche
  useEffect(() => {
    if (rech) {
      axios
        .get(`http://localhost:5000/api/getSwitchRech/${rech}`)
        .then((resp) => {
          setData(resp.data);

          setpaginatedData(_(resp.data).slice(0).take(pagesize).value());
        });
    } else {
      if (!VLANfiltre || VLANfiltre === "VLAN") {
        loadData();
        console.log("load ");
      }
    }
  }, [rech]);

  // message d'erreur pour la recherche
  useEffect(() => {
    if (!data[0] && !(rech === "")) {
      toast.error("aucun Switch correspondant !");
    }
  }, [data[0]]);

  // message d'erreur pour le filtre par vlan
  useEffect(() => {
    if (!data[0] && VLANfiltre) {
      toast.error("aucun Switch utilisant ce VLAN !", VLANfiltre);
    }
  }, [data[0]]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getSwitchs");
    setData(response.data);
    setpaginatedData(_(response.data).slice(0).take(pagesize).value());
  };

  /**why do we use useEffect in general 
   actually they were using :  componentDidMount | componentWillUnmount  Lifecycle Methods
   in order to make data refresh without making refresh {par ex l'heure dans un site change sans faire actualiser}
   but here we can do componentDidMount or componentWillUnmount just with use effect and also useeffect contain an 
   array of dependecies , with this dependecies change , the function will fire again , but since we give an empty array
   it will fire just one time when the component initially loads 
  */

  //charge les contenue de la teble //
  useEffect(() => {
    loadData();
  }, []);

  // variable qui vas contenir  les blocs pour les filtres

  const [blocs, setBlocs] = useState([]);
  const [blocfiltre, setBlocfiltre] = useState("");
  //  fonction qui recupere les nlocs
  const loadBloc = async () => {
    const response = await axios.get("http://localhost:5000/api/getBlocs");
    setBlocs(response.data);
    //console.log("blocs recuperer ", blocs);
  };

  useEffect(() => {
    loadBloc();
  }, [data]);

  const [VLANS, setVLANS] = useState([]);
  const [VLANfiltre, setVLANfiltre] = useState("");

  const loadVLANS = async () => {
    const response = await axios.get("http://localhost:5000/api/getVLANS");
    setVLANS(response.data);
    //console.log("VLANS recuperer ", VLANS);
  };

  useEffect(() => {
    loadVLANS();
  }, [data]);

  // useeffect poue le filtre vlan

  useEffect(() => {
    console.log("hangement du filtre ", VLANfiltre);
    if (VLANfiltre !== "VLAN" && VLANfiltre) {
      axios
        .get(`http://localhost:5000/SWITCHES_PAR_VLAN/${VLANfiltre}`)
        .then((resp) => {
          setData(resp.data);
          setpaginatedData(_(resp.data).slice(0).take(pagesize).value());
        });
    } else {
      loadData();
      console.log("load ");
    }
  }, [VLANfiltre]);

  // filtre par etat
  const [etat, setEtat] = useState([
    "Passif",
    "au magazin",
    "Actif",
  ]);
  const [EtatFiltre, setETATfiltre] = useState("");

  useEffect(() => {
    if (EtatFiltre !== "Etat" && EtatFiltre) {
      axios
        .get(`http://localhost:5000/CHERCHER_SWITCHES_PAR_Etat/${EtatFiltre}`)
        .then((resp1) => {
          setData(resp1.data);
          setpaginatedData(_(resp1.data).slice(0).take(pagesize).value());
        });
    } else {
      loadData();
      console.log("load");
    }
  }, [EtatFiltre]);

  /** for the pagination  */
  const pageCount = data ? Math.ceil(data.length / pagesize) : 0;
  const pages = _.range(1, pageCount + 1);

  /**for the sorting  */
  /*const sorting= (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a,b)=> 
      a[col].toLowerCase()>b[col].toLowerCase() ? 1 : -1 
      );
      setData (sorted) ;
      setorder("DSC") ;
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a,b)=> 
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 
      );
      setData (sorted) ;
      setorder("ASC") ;
    }
  }*/

  //// la recherche par prise

  const [rechSalle, setRechSalle] = useState("");
  const [rechPrise, setRechPrise] = useState("");
  const [TypePortPrise, setTypePortPrise] = useState("");
  const [NumPortPrise, setNumPortPrise] = useState();
  // use effect pour charger les donner lors d'une recherche d'une prise
  useEffect(() => {
    if (rechSalle && rechPrise) {
      console.log(" recherche prise salle ", rechSalle, rechPrise);
      axios
        .put("http://localhost:5000/api/getSwitchRechPrise", {
          rechSalle,
          rechPrise,
        })
        .then((resp) => {
          setData(resp.data);
          if (resp.data[0]) {
            setTypePortPrise(resp.data[0].Type_Port);
            setNumPortPrise(resp.data[0].N_port);
          }
          setpaginatedData(_(resp.data).slice(0).take(pagesize).value());
        });
    } else {
      loadData();
      setTypePortPrise("");
       setNumPortPrise("");
      console.log("load ");
    }
  }, [rechPrise, rechSalle]);

  return (
    <div>
      <input
        type="text"
      title="Faire la recherche selon le nom du switch , N° Inventaire ..."
        placeholder="Chercher...."
        className="searchfilter"
        onChange={(e) => {
          setRech(e.target.value);
          // setsearchnum(e.target.value) ;
        }}
      />

      <input
        type="text"
        placeholder="PRISE...."
        title="Chercher le switch correspond au prise entrée"
        className="searchPrise"
        onChange={(e) => {
          setRechPrise(e.target.value);
          // setsearchnum(e.target.value) ;
        }}
      />

      <input
        type="text"
        title="Entrer le nom de la salle  et la prise "
        placeholder="Salle...."
        className="searchSalle"
        onChange={(e) => {
          setRechSalle(e.target.value);
        }}
      />
      <label className="typeport">
        {" "}
        Port : {TypePortPrise} /  N° : {NumPortPrise}
      </label>

      <select
        //filtrer les switchs selon le nom du VLAN
        id="listeClasse1"
        title="Filtrer les switchs selon le nom du VLAN"
        onChange={(event) => {
          setVLANfiltre(event.target.value);
        }}
      >
        <option value="VLAN" selected>
          VLAN
        </option>

        {VLANS.map((val, cle) => {
          // parcourir les donnéees
          return (
            <option className="options" value={val.NomVLAN} selected>
              {val.NomVLAN}
            </option>
          );
        })}
      </select>

      <select
        //filtrer les switchs selon l'etat du switch'
        id="listeClasse2"
        title="Filtrer les switchs selon l'état du switch"
        onChange={(event) => {
          setETATfiltre(event.target.value);
        }}
      >
        <option value="Etat" selected>
          Tous Etat
        </option>

        {etat.map((val, cle) => {
          // parcourir les donnéees
          return (
            <option value={val} selected>
              {val}
            </option>
          );
        })}
      </select>
        
       <Link to="/addswitch" id="ajt" >
          <button className='btn-add'> Ajouter un Switch </button>
        </Link>
                  
       {!paginatedData ? (
        <p className="yapasdeswitch">
          {"  "}
          Il n'y a pas des données ! <br />
          Veuillez remplir votre données depuis le bouton ajouter switch !{" "}
        </p>
        ) : (
        
        <Table className="Styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}> # </th>
              <th style={{ textAlign: "center" }}> Switch </th>
              <th style={{ textAlign: "center" }}> Local </th>
              <th style={{ textAlign: "center" }}> N° Inventaire </th>
              <th style={{ textAlign: "center" }}> N° Série </th>
              <th style={{ textAlign: "center" }}> Etat de switch </th>
              <th style={{ textAlign: "center" }}> Action </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textAlign: "center" }}>{item.nom_switch}</td>
                  <td style={{ textAlign: "center" }}>
                    B: {item.bloc} / S: {item.salle} / E: {item.etage} / A:{" "}
                    {item.armoire}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.N_inventaire}</td>
                  <td style={{ textAlign: "center" }}>{item.N_serie}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className={
                        item.Etat_switch === "actif"
                          ? "switch-actif"
                          : item.Etat_switch === "passif"
                          ? "switch-passif"
                          : "switch-au-magazin"
                      }
                    >
                      {" "}
                      {item.Etat_switch}{" "}
                    </button>
                  </td>

                  <td>
                    <Link to={`/view/${item.N_inventaire}`}>
                      <button className=" btn-view">Details/Config</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        )}
 
     
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                page === currentPage ? "page-item-active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
      <div className="searchloop">
        <img id="loup" src={Rectangle47} alt="Rectangle47" />
      </div>

      <div> {
           nbswitch.map((val,cle) => {
           return <div  className="lab-el" style={ {width:340 , height:35}}>  Nombre Totale des switchs est : {val.nombreTotal}</div>
            })
       }  
       </div>
    </div>
  );
};

export default Tabswitch;
