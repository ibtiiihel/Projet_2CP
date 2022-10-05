import React from 'react'
import Image from '../../images/vlans.png' 
import './vlans.css'
import Navbar from '../../components/navbaraide/Aidenav'
import Sidebar from '../../components/Sidebar'
import Help from './Helpvlans'
const  Vlansaide = () => {
  return (
    <div>
    
       <Sidebar/>
       <Navbar/> 
       <Help/> 
    
     <div >
       
      <h1 className="titreaideVlans">Aide Vlans</h1>

       <div className="vlan-image">
         <img id ="hlp6" src={Image} />
      </div>

     </div>
    
    
    </div>
    

  )
}

export default Vlansaide