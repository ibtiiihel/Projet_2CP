import React from 'react'
import logoesi from './../images/sign esi.png'
import logoapp from './../images/applogo.png'
import './apropos.css'; 
const Apropos = () => {
  return (
    <div className="apropos">
     <div className="logoesi">
     <img src={logoesi}/>
     </div>
     <div className="logoapp">
     <img src={logoapp}/> 
     </div>
     <div className="titre">
       <h1 className="gradient__text">A propos de SwitchEsi</h1>
       </div> 
       <div className="text">
       <p>
         <br>SwitchEsi est une application web réalisé par des étudiants de deuxiéme année</br>
         <br>  cicle préparatoire dans le cadre de Projet 2CP pour le service réseau </br>
         <br> de l'école nationale supérieure d'informatique Esi "ex INI"  </br>
         <br>   il s'agit d'une application qui facilitera le suivi les switchs existant</br>
         <br> dans les différents services et locaux de l'école , et leurs configurations .</br>
         <br> Il est réalisé par : Maroua AMROUCHE , Ibtihel Sansri , MeryemBatoul karim ,</br>
         <br>  Hiba Guerrouache,Iness Bendach , Chaima Meradji .</br>
          
         
       
         
         
         
       

       </p>
     </div>
    </div>
  )
}

export default Apropos