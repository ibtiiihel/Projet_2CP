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

const TabUtilisateurs = () => {

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
    const response = await Axios.get("http://localhost:5000/affich_users");
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
    Axios.get (`http://localhost:5000/api/affich_users/${rech}`).then(
      (resp => setData(resp.data) )
    );
    console.log(data);
    /*console.log (" reche ''" ,rech, "''");*/

    }
    else {
      loadData();
       console.log ("load  ");
    }
    
  }, [rech]
  );

  useEffect(() => {
   if (!data[0] && !(rech==="")){
     toast.error("aucun utilisateur correspondant !"); 
   }
  }, [data[0]]);
  

  const suppUser = (id) => {
    if (
      window.confirm(
        "Vouler vous vraiment supprimer cet utilisateur ? "
        
      )
    ) {
      Axios.delete(`http://localhost:5000/delete_user/${id}`);
      setSupp(!supp);
      toast.success(" Utilisateur upprimée avec succé !");
      setTimeout(() => loadData(), 400);
    }
  };
  const [email, setEmail] =useState("");
  useEffect(() => { 
    Axios.get("http://localhost:5000/login").then((response) => {

       if (response.data.loggedIn === true) {
        setEmail(response.data.user[0].email);
      }
    }
    );
    
  }, []);

  return (
    <div>
     
      
      { !paginatedData ? (
        <p className='yapasdeswitch'> Il n'y a pas des données ! <br/> </p>
      ):(
      <Table className="Styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}> # </th>
            <th style={{ textAlign: "center" }}> Nom d'utilisateur </th>
            <th style={{ textAlign: "center" }}> L'adresse email </th>
            <th style={{ textAlign: "center" }}> Le rôle </th>
            <th style={{ textAlign: "center" }} className ='action'> Action  </th>
            
          </tr>
        </thead>
        <tbody>

          {paginatedData.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>


                <td>
                 <Link to={ `/reset_password/${email}`}>
                    <button className=" btn-view">Modifier</button>
                  </Link>
                
                  <button
                    className=" btn-delete"
                    onClick={() => suppUser(item.username)}
                  >
                    Supprimer
                  </button>
                </td>
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

    </div>
  );
};

export default TabUtilisateurs;