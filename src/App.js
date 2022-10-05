import React from 'react' ;
import './App.css' ;
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Acceuil from './pages/Acceuil';
import Switchs from './pages/Switchs' ;
import Utilisteurs from './pages/Utilisateurs' ;
import Vlans from './pages/Vlans' ;
import Addswitch from './operations/Addswitch';
import AddEditVlan from "./containers/AddEditVlan";
import Salles from "./containers/Salles";
import Blocs from "./containers/Blocs";
import RenommerBloc from './containers/RenommerBloc';
import RenommerSalle from './containers/RenommerSalle';
import Home from  './pages/Home';
import Signin from './pages/Signin';
import Config from './pages/Config';
import Affich_user from './components/Affich_user' ;
import Ajout_user from './components/Ajout_user' ;
import Delete_user from './components/Delete_user' ;
import Changer_mtps from './components/Changer_mtps';
import Switch from './aide_pages/switch/switch'
import Vlansaide from './aide_pages/vlans/Vlansaide'
import Apropos from './pages/Apropos'
import {BrowserRouter as Router, Route ,Routes  }from "react-router-dom" ;
import DetailConfig from './containers/DetailConfig';
import Reset_password from './components/Reset_password';
import Barchart from './components/Barchart';
import Nbswitchparbloc from './components/Nbswitchparbloc';
import Nbportparetat from './components/Nbportparetat';
import Switchparetat from './components/Switchparetat';
import Infoaccount from './operations/Infoaccount';

function App() {
  return (
     <div  >
       <ToastContainer position ="top-center" />
           <Router>
             <Routes>
                 <Route exact path='/'  element={<Home/>} />
                 <Route exact path='/Affich_user'  element={<Affich_user/>} />
                 <Route exact path='/Ajout_user'  element={<Ajout_user/>} />
                 <Route exact path='/Delete_user'  element={<Delete_user/>} />
                 <Route exact path='/Changer_mtps'  element={<Changer_mtps/>} />
                 <Route exact path='/reset_password/:id'  element={<Reset_password/>} />
                 <Route exact path='/Home'  element={<Acceuil/>} />
                 <Route exact path='/Config'  element={<Config/>} />  
                 <Route exact path='/signin'  element={<Signin/>} />
                 <Route exact path='/touslesswitchs'  element={<Switchs/>} />
                 <Route exact path="/view/:id" element={<DetailConfig/>} />{" "}
                 <Route exact path='/vlan' element={<Vlans/>} />
                 <Route exact path='/aideenligne' element={<Switch/>} />
                 <Route exact path='/utilisateurs' element={<Utilisteurs/>} />
                 <Route exact path='/addswitch' element={<Addswitch/>} />
                 <Route path="/AddVlan" element={<AddEditVlan/>} />{" "} 
                 <Route path="/AddEditVlan/:id" element={<AddEditVlan />} />{" "} 
                 <Route exact path="/renommerBloc/:id" element={<RenommerBloc/>} />{" "}
                 <Route exact path="/renommerSalle/:id" element={<RenommerSalle/>} />{" "}
                 <Route exact path="/locaux/Salles" element={<Salles />} />{" "} 
                 <Route exact path="/locaux/Blocs" element={<Blocs/>} />{" "}
                 <Route exact path="/aideswitch" element={<Switch/> } />
                 <Route exact path="/aidevlans" element={<Vlansaide/> } />
                 <Route exact path='/tabdebord' element={<Barchart/>} />
                 <Route exact path='/tabdebordBlocs' element={<Nbswitchparbloc/>} />
                 <Route exact path='/tabdebordetatswitch' element={<Switchparetat/>} />
                 <Route exact path='/tabdebordetatport' element={<Nbportparetat/>} />
                 <Route exact path='/apropos' element={<Apropos/>} />
                 <Route exact path='/infoaccount' element={<Infoaccount/>} />
             </Routes>{" "}
          </Router>{" "}
     </div>
)
}
export default App

