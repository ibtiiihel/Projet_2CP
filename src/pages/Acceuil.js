import React from 'react'
import '../App.css'

import Sidebar from '../components/Sidebar' ;
import Profile from '../components/Profile';
import Header1 from '../containers/Header1';


function Acceuil() {
  return (
    <div className='Acceuil'>

     <Sidebar/>
     <Header1/>
     <Profile/>

    </div>
  )
}

export default Acceuil