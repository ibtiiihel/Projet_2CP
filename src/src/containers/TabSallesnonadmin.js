import React ,{ useState , useEffect }from 'react' ;
import '../App.css' ;
import {Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios" ;
import { Table } from 'react-bootstrap';
import "../components/Module";
import "../components/module.css";
import Popup from '../components/Module';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import{FontAwesomeIcon}from '@fortawesome/react-fontawesome';



const TabSalles = () => {

  const [data,setData] = useState([]) ;
  const [buttonpopsalle,setbuttonpopsalle]=useState(false);
  const[bloc,setblocc]=useState("");
  const [salle,setsalle]=useState("");
  const[et,setet]=useState(0);
  function changerstatesalle(){
  setbuttonpopsalle(false);
  }
  const loadData = async () => {
    const response = await axios.get ("http://localhost:5000/api/getLocaux") ;
    setData (response.data);
  };
   
  useEffect (() => {
      loadData() ;
  },[] )
  const ajsalle = ()=>{
    axios.post('http://localhost:5000/ajsalle',{
     bloc:bloc,
     et:et,
     salle:salle
    }).then(()=>{
      console.log("succseed!");
      setbuttonpopsalle(false);
      
    })
  }




  return (
    
    <div >
  

      

      <Table className='Styled-table'>
        <thead>
          <tr>
              <th style={{textAlign: "center" }}> Id  </th>
              <th style={{textAlign: "center" }}> Bloc </th>
              <th style={{textAlign: "center" }}> Salle </th>
              <th style={{textAlign: "center" }}> etage  </th>
       
          </tr>
        </thead>
         <tbody>
             {data.map((item ,index) =>{
               return (
                 <tr key={item.id}>
                    <th scope="row">{index+1}</th>
                    <td>{item.bloc}</td>
                    
                    <td>{item.salle}</td>
                    <td>{item.etage}</td>
            
                  
                 </tr>
               )
             })

             }
         </tbody>
      </Table>
      <Popup  trigger={buttonpopsalle}>
      <div  className='modifie'>
      <FontAwesomeIcon id ="close" onClick={changerstatesalle} icon={faClose}></FontAwesomeIcon>
        <label id="texte">Le nom du nouveau bloc</label>
        
        <input type ="text" placeholder='   nom_du_bloc' onChange={(event)=>{setblocc(event.target.value)}}/>
        <label id="texte">Le numero de l'etage</label>
        
        <input type ="number"  onChange={(event)=>{setet(event.target.value)}}/>
     
        <label id="texte">Le nom de la salle</label>
        
        <input type ="text" placeholder='  nom_salle' onChange={(event)=>{setsalle(event.target.value)}}/>
        <button onClick={ajsalle} id="confirmer">Confirmer</button>
      </div>
      
      </Popup>
      
    </div>

  );
};

export default TabSalles ;