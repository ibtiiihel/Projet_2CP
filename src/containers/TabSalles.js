import React ,{ useState , useEffect }from 'react' ;
import '../App.css' ;
import './TabBloc.css';
import {Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios" ;
import { Table } from 'react-bootstrap';
import "../components/Module";
import "../components/module.css";
import Popup from '../components/Module';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import{FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import _ from "lodash";

const pagesize = 7;


const TabSalles = () => {
  /*******************pagination */
  const [paginatedData, setpaginatedData] = useState();
  const [currentPage, setcurrentPage] = useState(1);
  const pagination = (pageNb) => {
    setcurrentPage(pageNb);
    const startIndex = (pageNb - 1) * pagesize;
    const paginatedData = _(data).slice(startIndex).take(pagesize).value();
    setpaginatedData(paginatedData);
  };

  const [data,setData] = useState([]) ;
  const [buttonpopsalle,setbuttonpopsalle]=useState(false);
  const[bloc,setblocc]=useState("");
  const [salle,setsalle]=useState("");
  const[et,setet]=useState(0);
  const [chg,setchg]=useState(false);
  function changerstatesalle(){
  setbuttonpopsalle(false);
  }
  const loadData = async () => {
    const response = await axios.get ("http://localhost:5000/api/getLocaux") ;
    setData (response.data);
    setpaginatedData(_(response.data).slice(0).take(pagesize).value());
  };
   
  useEffect (() => {
      loadData() ;
  },[] );

  useEffect (() => {
    loadData() ;
},[chg] );
  

   /** for the pagination  */
   const pageCount = data ? Math.ceil(data.length / pagesize) : 0;
   const pages = _.range(1, pageCount + 1);
   

  const ajsalle = ()=>{
    axios.post('http://localhost:5000/ajsalle',{
     bloc:bloc,
     et:et,
     salle:salle,
    }).then(()=>{
      console.log("succseed!");
      setbuttonpopsalle(false);
      
    });
    setchg(!chg);
    changerstatesalle(false);
  }
  



  return (
    
    <div >
  
  <button className='btn-add'onClick={()=>{setbuttonpopsalle(true)}}> Ajouter une Salle</button>
      
  {!paginatedData ? (
        <p className="yapasdeswitch">
          {"  "}
          Il n'y a pas des données ! <br />
          Veuillez remplir la table !{" "}
        </p>
        ) : (
      <Table className='Styled-table'>
        <thead>
          <tr>
              <th style={{textAlign: "center" }}> Id  </th>
              <th style={{textAlign: "center" }}> Bloc </th>
              <th style={{textAlign: "center" }}> Salle </th>
              <th style={{textAlign: "center" }}> etage  </th>
              <th style={{textAlign: "center" }}> Action  </th>

          </tr>
        </thead>
         <tbody>
             {paginatedData.map((item ,index) =>{
               return (
                 <tr key={item.id}>
                    <th scope="row">{index+1}</th>
                    <td style={{ textAlign: "center" }}>{item.bloc}</td>
                    
                    <td style={{ textAlign: "center" }}>{item.salle}</td>
                    <td style={{ textAlign: "center" }}>{item.etage}</td>
            
                   <td style={{ textAlign: "center" }}>

                     <Link to= {`/renommerSalle/${item.id_local}`}> 
                       <button className=" btn-view" >
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
      <Popup  trigger={buttonpopsalle}>
      <div  className='modifie'>
      <FontAwesomeIcon id ="close" onClick={changerstatesalle} icon={faClose}></FontAwesomeIcon>
        <label id="texte">Le nom du  bloc</label>
        
        <input type ="text" id="nombloc" placeholder=' Nom du bloc' onChange={(event)=>{setblocc(event.target.value)}}/>
        <label id="texte"> l'etage </label>
        
        <input type ="number" id="nombloc" placeholder="  N° d'étage " onChange={(event)=>{setet(event.target.value)}}/>
     
        <label id="texte">Le nom de la salle</label>
        
        <input type ="text" id="nombloc"  placeholder='  Nom de la salle ' onChange={(event)=>{setsalle(event.target.value)} }/>
        <button onClick={ajsalle} id="confirmer" style ={{marginRight:"200px" ,}}>Confirmer</button>
      </div>
      
      </Popup>
      
    </div>

  );
};

export default TabSalles ;