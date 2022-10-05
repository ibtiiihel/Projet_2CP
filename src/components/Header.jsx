import React from 'react'
import './header.css'
import building from '../assests/Group 2.png'
import vector from '../assests/Vector 15.png'
import log from '../assests/Group 19.png';
const Header = () => {
  return (
    
    <div> 
         
        <div className="gpt3__header-content">
        
        <img src={vector} id="vec" />
        <img src={log}  id="log" />
             <img src={building} id="imghome" />
          <div className='suivi'>
          <h1 id='home'> Suivi et inventaire des Switchs </h1>
          </div>
          <div className='batim'>
           <p> Configurez , Consultez et localisez vos switch ! ... </p>
           </div>
           <div className="gpt3__header-image">
          
           
            
             
          </div>
         </div> 
         

   </div>
  )
}

export default Header 