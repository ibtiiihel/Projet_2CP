import React from 'react'
import '../App.css'
import './Tabdebord.css'
import {Link } from 'react-router-dom';


function Tabdebord() {
 
  return (
    <div >
       <Link className='satatlinks1' to= "/tabdebord" >          Port par VLAN  </Link>
       <Link className='satatlinks2' to="/tabdebordBlocs" >      Switch par Bloc </Link>
       <Link className='satatlinks3' to="/tabdebordetatswitch" > Switch par état </Link>
       <Link className='satatlinks4' to= "/tabdebordetatport" >  Port selon l'état </Link>
  
    </div>
  )
}

export default Tabdebord;