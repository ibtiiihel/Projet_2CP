import React from 'react'
import Image from '../../images/switch.png' 
import './switch.css'
import Navbar from '../../components/navbaraide/Aidenav'
import Sidebar from '../../components/Sidebar'
import Help from './Helpswit'
const Switch = () => {
  return (
    <>
    <Sidebar/>
    <Navbar/>
    <Help/>  
    <div className="switch"> 
        <div className="switch-content">
          <h1 className="titre">Aide Switch</h1>
      
           <div className="switch-image">
             <img id ="hlp4" src={Image} />
          </div>
         </div>
   </div>
   </>
  )
}

export default Switch