import React from 'react'
import "./Header.css" ;
/* les images qu'on va utiliser  */


import Rectangle35 from '../assests/Rectangle35.png' ;
import image7 from '../assests/image7.png' ;


/*  *************************** */ 

function Header1() {
    return (
     <div className="Header1">
           

           <div className='Pic'>
             <img  id="headerpic" src = {Rectangle35} alt ="Rectangle35" />
           </div>
           <div className='location'>
             <img src = {image7} alt ="image7" />
           </div>
           <h1 className='Bienvenue'>
                Bienvenue 
           </h1>
           <h1 className='auswitch'>
                au SwitchEsi 
           </h1>
           <h1 className='esi'>
            Ecole Nationnale Superieur d'Informatique
           </h1>
           <h1 className='ouedsmar'>
                Oued Smar Alger  
           </h1>

     </div> 
    );
}

export default Header1