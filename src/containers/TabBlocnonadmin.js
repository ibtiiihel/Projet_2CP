import React, { useState, useEffect } from "react";
import "../App.css";
import  "./Tabswitch.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Table } from "react-bootstrap";
import { toggleButtonClasses } from "@mui/material";
import _ from "lodash";
const pagesize = 9;


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
           
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td  style={{ textAlign: "center" }}>{item.Nom_Bloc}</td>
                <td  style={{ textAlign: "center" }}>{item.Nombre_Etages}</td>
                <td  style={{ textAlign: "center" }}>{item.NbrSwitchs}</td>

           
               
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
    </div>
  );
};

export default TabBlocs;
