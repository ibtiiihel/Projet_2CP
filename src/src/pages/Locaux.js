import React from 'react'
import '../App.css'
import Axios from "axios";
import Sidebar from '../components/Sidebar' ;
import Profile from '../components/Profile';
import BlocLocaux from '../components/BlocLocaux'
Axios.defaults.withCredentials = true;
function Locaux() {
  return (
    <div className='Locaux'>
       <BlocLocaux/>
       <Sidebar/>
       <Profile/>
    </div>
  )
}

export default Locaux