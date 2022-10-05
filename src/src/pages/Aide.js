import React from 'react'
import '../App.css'

import Sidebar from '../components/Sidebar' ;
import Profile from '../components/Profile';
import Aidenav from '../components/navbaraide/Aidenav';

function Aide() {
  return (
    <div className='Aide'>
        
        <Sidebar/>
        <Profile/>
        <Aidenav/> 
        
    </div>
  )
}

export default Aide
