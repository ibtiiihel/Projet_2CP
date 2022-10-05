import React, { useState, useEffect } from "react";
import "./TabBloc.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Table } from "react-bootstrap";
import { toggleButtonClasses } from "@mui/material";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import{FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import "../components/Module";
import "../components/module.css";
import Popup from '../components/Module';
import _ from "lodash";

const pagesize = 7;

const TabBlocs = () => {

  const [paginatedData, setpaginatedData] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const pagination = (pageNb) => {
    setcurrentPage(pageNb);
    const startIndex = (pageNb - 1) * pagesize;
    const paginatedData = _(data).slice(startIndex).take(pagesize).value();
    setpaginatedData(paginatedData);
  };

  const [data, setData] = useState([]);
  const [buttonpop,setbuttonpop]=useState(false);
  const[blocname,setnvbloc]=useState("");
  const[floarnbr,setetage]=useState(0);
  function changerstatepop(){
    setbuttonpop(false);
  }

  const ajblc = ()=>{
    axios.post('http://localhost:5000/ajtbloc',{
     blocname:blocname,
     floarnbr:floarnbr
    }).then(()=>{
      console.log("succseed!");
      setbuttonpop(false);
      
    })
  }

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getBlocs");
    setData(response.data);
    setpaginatedData(_(response.data).slice(0).take(pagesize).value());
  };

  useEffect(() => {
    loadData();
  }, []);

  /** for the pagination  */
  const pageCount = data ? Math.ceil(data.length / pagesize) : 0;
  const pages = _.range(1, pageCount + 1);

  //pour la fenetre e renommer
  const [model, setModel] = useState(false);
  const toggleModel = () => {
    setModel(!model);
  };
  return (
    <div >
     <button className="btn-add" onClick={()=>{setbuttonpop(true)}}> Ajouter un Bloc </button>
   
     {!paginatedData ? (
        <p className="yapasdeswitch">
          {"  "}
          Il n'y a pas des données ! <br />
          Veuillez remplir la table !{" "}
        </p>
        ) :(
      <Table className="Styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}> # </th>
            <th style={{ textAlign: "center" }}> Nom Bloc </th>
            <th style={{ textAlign: "center" }}> Nombre d'etage </th>
            <th style={{ textAlign: "center" }}> Nombre Switchs </th>
            <th style={{ textAlign: "center" }}> Action </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td style={{ textAlign: "center" }}>{item.Nom_Bloc}</td>
                <td style={{ textAlign: "center" }}>{item.Nombre_Etages}</td>
                <td style={{ textAlign: "center" }}>{item.NbrSwitchs}</td>

                <td style={{ textAlign: "center" }}>
            
                  <Link to={`/renommerBloc/${item.Nom_Bloc}`}>
                  <button className=" btn-view ">
                        Renommer 
                    </button>
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
      <Popup  trigger={buttonpop}>
   <div  className='modifie'>
   <FontAwesomeIcon id ="close" onClick={changerstatepop} icon={faClose}></FontAwesomeIcon>
     <label id="texte">Le nom du nouveau bloc</label>
     
     <input type ="text" id="nombloc" placeholder=' Nom du bloc' onChange={(event)=>{setnvbloc(event.target.value)}}/>
     <label id="texte">Le nbr des etages</label>
     
     <input type ="number" id="nombloc" placeholder='  Le nombre des étages ' onChange={(event)=>{setetage(event.target.value)}}/>
     <button onClick={ajblc} id="confirmer">Confirmer</button> 
    
     
   </div>
   
   </Popup>
    </div>
  );
};

export default TabBlocs;
