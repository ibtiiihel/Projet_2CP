import React, { useState, useEffect } from "react";
import "../App.css";
import "./TabVLAN.css";
import "./Tabswitch.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import { Table } from "react-bootstrap";
import Rectangle47 from '../assests/search.png';
import _ from "lodash" ;

const pagesize =  7;

const TabVlans = () => {
  const [data, setData] = useState([]);
  const [paginatedData,setpaginatedData] =useState() ;
  const [currentPage,setcurrentPage] =useState(1) ;
  const pagination =(pageNb) => {
     setcurrentPage(pageNb) ;
     const startIndex = (pageNb -1)*pagesize ;
     const paginatedData = _(data).slice(startIndex).take(pagesize).value() ;
     setpaginatedData(paginatedData) ;
  }


  const loadData = async () => {
    const response = await Axios.get("http://localhost:5000/api/getVlansDetails");
    setData(response.data);
    console.log(data);
    setpaginatedData(_(response.data).slice(0).take(pagesize).value()) ;
  };

  // charger les données lors du lancement de la page

  useEffect(() => {
    loadData();
  }, []);

    /** for the pagination  */
    const pageCount = data? Math.ceil(data.length/pagesize) : 0 ;
    const pages =_.range(1,pageCount+1) ;

  // variable pour refraicher le tableau apres supression
  const [supp, setSupp] = useState(false);
  // use effect pour regracher les donner lors d'une suppression

  useEffect(() => {
    loadData();
  }, [supp]);


 // variable de recherche--------------------------------------------------------
  const [rech, setRech] = useState("");
  
  // use effect pour regracher les donner lors d'une suppression
  useEffect(() => {
    if(rech){
    Axios.get (`http://localhost:5000/api/getVlanRechDetails/${rech}`).then(
      (resp => {
        setData(resp.data) ;
        setpaginatedData(_(resp.data).slice(0).take(pagesize).value());
      } )
  


    );
    console.log(data);
    /*console.log (" reche ''" ,rech, "''");*/}
    else {
      loadData();
       console.log ("load  ");
    }
    
  }, [rech]);

  useEffect(() => {
   if (!data[0] && !(rech==="")){
     toast.error("aucune VLAN correspondante !"); 
   }
  }, [data[0]]);
  

  const suppVLAN = (id) => {
    if (
      window.confirm(
        "Vouler vous vraiment supprimer le VLAN "
        
      )
    ) {
      Axios.delete(`http://localhost:5000/SuppVlan/${id}`);
      setSupp(!supp);
      toast.success(" Vlan upprimée avec succeS");
      setTimeout(() => loadData(), 400);
    }
  };
  return (
    <div>
      
  
      <input
        type="text"
        id="rech"
        name="rech"
        className='searchfilter'
        placeholder="Chercher ...."
        onChange={(event) => {
          setRech(event.target.value);
        }}
      />
    
    
      
      { !paginatedData ? (
        <p className='yapasdeswitch'> Il n'y a pas des données ! <br/>
        Veuillez remplir votre données depuis le bouton ajouter VLAN ! </p>
      ):(
      <Table className="Styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}> # </th>
            <th style={{ textAlign: "center" }}> N° VLAN </th>
            <th style={{ textAlign: "center" }}> Nm VLAN </th>
            <th style={{ textAlign: "center" }}> @IP </th>
            <th style={{ textAlign: "center" }}> Masque</th>
            <th style={{ textAlign: "center" }}> Nbr Ports</th>
            <th style={{ textAlign: "center" }}> Nbr Switchs</th>
       
          </tr>
        </thead>
        <tbody>

          {paginatedData.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td  style={{ textAlign: "center" }}>{item.NumVLAN}</td>
                <td  style={{ textAlign: "center" }}>{item.NomVLAN}</td>
                <td  style={{ textAlign: "center" }}>{item.IP}</td>
                <td  style={{ textAlign: "center" }}>{item.Masque}</td>
                <td  style={{ textAlign: "center" }}>{item.NbrPorts}</td>
                <td  style={{ textAlign: "center" }}>{item.NbrSwitch}</td>

               
              </tr>
            );
          })
        }
        </tbody>
      </Table>
  )}
     
     <nav>
              <ul className="pagination">
                  {
                    pages.map((page) => (
                          
                     <li className= {
                        page === currentPage? "page-item-active" : "page-item"
                      }> 
                        <p className='page-link'
                        onClick={ ()=>pagination(page)}>
                          {page}</p>
                       </li>
         
                    ))
                  }
               

              </ul>
          </nav>

          <div className='searchloop'>
          <img id="loup" src = {Rectangle47} alt ="Rectangle47" />
          </div>
    </div>
  );
};

export default TabVlans;
