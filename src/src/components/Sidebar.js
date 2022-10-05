import React from 'react'
import "./Sidebar.css" ;

import signesi from '../assests/signesi.png' ;
import Vector20 from '../assests/Vector20.png' ;

import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HelpIcon from '@mui/icons-material/Help';
import TableRowsIcon from '@mui/icons-material/TableRows';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';

export const SidebarData = [ 
    {
        title: "Acceuil " ,
        icon : <HomeIcon/> ,
        link :"/Home" 
    },
    {
        title: "Switchs " ,
        icon : <TableRowsIcon/> ,
        link :"/touslesswitchs" 
    },
    {
        title: "VLANS " ,
        icon : <SettingsIcon/> ,
        link :"/vlan" 
    },
    {
      title: "Locaux " ,
      icon : <SettingsIcon/> ,
      link :"/locaux/blocs" 
    },
    {
        title: "Tableau de bord " ,
        icon : <LeaderboardIcon/> ,
        link :"/tabdebord" 
    },
    {
        title: " Aide en ligne  " ,
        icon : <HelpIcon/> ,
        link :"/aideenligne" 
    },
    {
        title: "Utilisateurs " ,
        icon : <GroupIcon/> ,
        link :"/utilisateurs" 
    },
];

function Sidebar() {
  return (
     <div className="Sidebar">
          <div className='Sidebarlogo'>
             <img src = {signesi} alt ="signesi" />
            </div>

           <div className='Vector'>
            <img src = {Vector20} alt ="Vector20" />
           </div>
       <ul className="SidebarList">

         {SidebarData.map ((val,key ) => {
          return (
           <li 
            key={key} 
            className ='row'
            id= {window.location.pathname === val.link ? "active" : ""}
            onClick = { () => {window.location.pathname = val.link ;
            }}
           >  
           {""}
            <div id ="icon">
                {val.icon}
            </div>
            <div id="title">
                {val.title}
            </div> 
          </li>
           );
          })}

        </ul>
     </div>
  ); 
}

export default Sidebar ;