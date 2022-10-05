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

const Nbswitchparbloc = () => {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/nbr_switches");
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
        labels: data.map((item) => item.Nom_bloc),
        datasets: [
          {
            label: "Le nombre des switchs ",
            color: "black",
            size: 20,
            data: data.map((item) => item.nbr_switches),
            backgroundColor : ["#63d471","#63d471"],
            hoverBackgroundColor : ["#1f6727","#1f6727"]
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
            text: "Cette charte affiche le nombre des switchs par bloc",
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

export default Nbswitchparbloc;
