import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Table } from "react-bootstrap";
import { toggleButtonClasses } from "@mui/material";

const TabBlocs = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getBlocs");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  //pour la fenetre e renommer
  const [model, setModel] = useState(false);
  const toggleModel = () => {
    setModel(!model);
  };
  return (
    <div >

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
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.Nom_Bloc}</td>
                <td>{item.Nombre_Etages}</td>
                <td>{item.NbrSwitchs}</td>

           
               
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TabBlocs;
