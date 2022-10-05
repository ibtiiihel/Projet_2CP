import "./Barchart.css";
import axios from "axios";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Tabdebord from "../pages/Tabdebord";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barchart = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getVlansDetails");
    setData(response.data);
    console.log(data);
  };

  // charger les données lors du lancement de la page
  useEffect(() => {
    loadData();
  }, []);

 
  const [chartData, setChartData] = useState({
    datasets: [],
  });
 
  const [chartOptions, setChartOptions] = useState({});
 
  useEffect(() => {
    setChartData({
      labels: data.map((item)=> item.NomVLAN)  ,
      datasets: [

        {
          label: "Le nombre des ports",
          color: "black",
          size: 20,
          data: data.map((item)=> item.NbrPorts),
          backgroundColor : ["#6b92ef","#6b92ef"],
          hoverBackgroundColor : ["#224494","#224494"]
        },
      ],
      

    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Le nombre des ports pour chaque VLAN",
          color: "black",
          size: 20,
          style :'oblique',
        },
      },
    });
  }, [data]);


  return (
    <div >
      <Sidebar/>
      <Profile/>
      <Tabdebord/>
       
      <div className="chart" style={ {width:1000}}>
       <Bar  options={chartOptions} data={chartData}  />
      </div>

      
      
    </div>
  );
};

export default Barchart;
