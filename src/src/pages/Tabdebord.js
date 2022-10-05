import React from 'react'
import '../App.css'
import './Tabdebord.css'
import {Link } from 'react-router-dom';
function Tabdebord() {
  return (
    <div >
       <Link className='satatlinks1' to= "/tabdebord" >          Chart 1  </Link>
       <Link className='satatlinks2' to="/tabdebordBlocs" >      Chart 2 </Link>
       <Link className='satatlinks3' to="/tabdebordetatswitch" > Chart 3</Link>
       <Link className='satatlinks4' to= "/tabdebordetatport" >  Chart 4</Link>
    </div>
  )
}

export default Tabdebord;
