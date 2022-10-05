import React , {useState} from 'react'; 
import './navbar.css'; 
import {useNavigate} from 'react-router-dom'; 
import logo from '../assests/sign esi.png'; 
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    let navigate =useNavigate(); 
  return (
   <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
         <div className="gpt3__navbar-links_logo">
          <img src = {logo} id="esil"/>
         </div>
        <div className="gpt3__navbar-links_container">
          <p id="prop"><a  onClick={()=>navigate("/apropos")}>A propos</a></p>
  
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <button type="button" id="cnx" onClick={()=> navigate("/signin")} > Connexion </button>
      </div> 
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fcfcfc" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fcfcfc" size={27} onClick={() => setToggleMenu(true)} />}
          {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
          <p><a   onClick={()=> navigate("/apropos")} >A propos</a></p>
          
          </div>
          
            <button type="button" id="cnx"> Connexion </button>
         
        </div>
        )}
      </div>
     </div> 
  )
}

export default Navbar ; 