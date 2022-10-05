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
import { Bar, Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Nbportparetat = () => {
  const [charg, setCharg] = useState(true);
 
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/ETAT_PORT");
    setData(response.data);
    console.log(data);
  };
 
  // charger les données lors du lancement de la pge

  useEffect(() => {
    
    loadData();
    
  }, []);

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    
      setChartData({
        labels: data.map((item) => item.Etat_Port),
        datasets: [
          {
            label: "Le nombre des ports ",
            data: data.map((item) => item.nbr_ports),
            backgroundColor : ["#8df3ed","#8df3ed"],
            hoverBackgroundColor : ["#1cdfd2","#1cdfd2"]
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
            text: "Cette charte affiche le nombre de ports selon l'état de port ",
            color: "black",
            size: 20,
            style :'oblique',
          },
        },
      });
    
  }, [data]);

  return (
    <div>
        <Sidebar/>
        <Profile/>
        <Tabdebord/>
      <div className="chart" style={ {width:1000}}>
        <Bar options={chartOptions} data={chartData} />
       </div>
    </div>
    
  );
};

export default Nbportparetat;
