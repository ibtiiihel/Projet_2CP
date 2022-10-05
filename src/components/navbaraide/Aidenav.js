import React from 'react'; 
import './Aidenav.css'; 

import {Link } from 'react-router-dom';  

const Navbar  = () => {
    
  return (
     
     <div className="Nav">
       <div className="Navcont">
       <div className="NavMenu">
          <div className="NavItem">
             <div className="NavLinks" >


             <Link to= "/aideswitch" >
                <p> Switch</p> </Link>
             <Link to="/aidevlans" > 
                <p> Vlans </p> </Link>
             
                
             
             </div>
             
          </div> 
       </div>
       </div> 
     </div>
   
   
  )
}

export default Navbar 
