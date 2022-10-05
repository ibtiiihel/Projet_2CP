
import './Application.css';
import React from 'react';
import{FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import { useHistory, useParams, Link } from "react-router-dom";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import{faBuilding, faEdit}from '@fortawesome/free-solid-svg-icons';
import{faDashboard}from '@fortawesome/free-solid-svg-icons';
import{faHome}from '@fortawesome/free-solid-svg-icons';
import{faUser}from '@fortawesome/free-solid-svg-icons';
import{faQuestion}from '@fortawesome/free-solid-svg-icons';
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import{faNetworkWired}from '@fortawesome/free-solid-svg-icons';
import './switch.css';
import{useState} from "react";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import{useEffect} from "react";
import Axios from 'axios';
import Popup from './Module';
import './module.css';
import ARR from '../assests/Vector 21.png';
import logo from '../assests/Ellipse 4.png';
import Barre from '../assests/Rectangle 23.png'
import Log from '../assests/Group 19.png';
import sign from '../assests/sign esi.png';
import lign from '../assests/Vector 20.png';
import note from '../assests/Group 21 (1).png';
import color1 from '../assests/Rectangle 46.png';
import color2 from '../assests/Rectangle 53.png';
import section from '../assests/Rectangle 60.png';
import car from '../assests/Rectangle 54.png';
import Switch from './switch';
import renom from '../assests/Rectangle 72 (1).png';
import nom from '../assests/1159633.png';
import Neuo from './neuo';

function Application() {
  var tying;
  var floar;
  var etg;
  var table=new Array();
  var tabarm=new Array();
  var vlans=new Array();
  var vlanajt=new Array();
  var controle=0;
  var tabtypeport=new Array();
  var tab=new Array();
  const [buttonpopup,setbuttonpopup]=useState(false);
  const [buttonrename,setbuttonrename]=useState(false);
  const [buttonconfig,setbuttonconfig]=useState(false);
  const [buttoncascade,setbuttoncascade]=useState(false);
  const [buttonautre,setbuttonautre]=useState(false);
  const [buttonsalle,setbuttonsalle]=useState(false);
  const [buttondelete,setbuttondelete]=useState(false);
  const [buttonarm,setbuttonarm]=useState(false);
  const [buttondeconnect,setbuttondeconnect]=useState(false);
  const [buttonconnect,setbuttonconnect]=useState(false);
  const [Nlocal,  setnlocal]= useState(0);
  const [ref,setref]=useState(false);
  const [Bloc,  setbloc]= useState("");
  const [Netage,  setnetage]= useState([]);
  const [Listsalle,  setlistesalle]= useState([]);
  const [blocliste, setblocliste]=useState([]);
  const [ blocname ,  setblocname]=useState("");
  const [ floarnbr, setfloar]=useState(0);
  const [Nsalle,setnsalle]=useState("");
  const [typep,settypep]=useState("");
  const [vlanp,setvlanp]=useState("");
  const[toggletabs,settoggletabs]=useState(1);
  const[istoggled,setistoggled]=useState(false);
  const[listeport,setlisteport]=useState([]);
  const[cont3,setcont3]=useState(false);
  const[cont2,setcont2]=useState(false);
  const [buttonreforme,setbuttonreforme]=useState(false);
  const[nb,setnb]=useState(false);
  const[sal,setsal]=useState(false);
  const[ar,setar]=useState(false);
  const[updatevlan,setupdatevlan]=useState(false);
  const[update,setupdate]=useState(false);
  const [debran,setdebranche]=useState(false);
  const[valdebr,setvaldeb]=useState(0);
  const[vari,setvari]=useState(false);
  const[newnom,setnewnom]=useState("");
  const[refrechname,setrefrechname]=useState(false);
  function changerstatereformn(){
    setbuttonreforme(false);
  }
  const toogletab=(index)=>{
   settoggletabs(index);
   if(index===4)
   {
     document.getElementById("sel").disabled=false;
     document.getElementById("etage").disabled=false;
    document.getElementById("salle").disabled=false;
    document.getElementById("armoires").disabled=false;
    
   }
   else{
    document.getElementById("sel").disabled=true;
    document.getElementById("etage").disabled=true;
   document.getElementById("salle").disabled=true;
   document.getElementById("armoires").disabled=true;
   
   
   }
   if(index===1)
   {
     document.getElementById("contenu1").style.display='flex';
     document.getElementById("contenu2").style.display='none';
     document.getElementById("contenu3").style.display='none';
     document.getElementById("contenu4").style.display='none';
   }
   if(index===2)
   {
    setcont2(true);
     document.getElementById("contenu2").style.display='flex';
     document.getElementById("contenu1").style.display='none';
     document.getElementById("contenu3").style.display='none';
     document.getElementById("contenu4").style.display='none';
   }
  
   if(index===3)
   {
     document.getElementById("contenu3").style.display='flex';
     setcont3(true);
     document.getElementById("contenu1").style.display='none';
     document.getElementById("contenu2").style.display='none';
     document.getElementById("contenu4").style.display='none';
   }
   
   if(index===4)
   {
     document.getElementById("contenu4").style.display='flex';
     setnb(true);
     setar(true);
     setsal(true);
     document.getElementById("contenu1").style.display='none';
     document.getElementById("contenu2").style.display='none';
     document.getElementById("contenu3").style.display='none';
   }
   
   
 }
  function selection(){
    var sel = document.getElementById("sel"); 

     for(var i = 0; i < tab.length; i++) {
        var opt = tab[i];
        var el = document.createElement("option");
       el.textContent = opt.Nom_Bloc;
        el.value = opt.Nom_Bloc;
       sel.appendChild(el);
       console.log(tab[i]);
       
      }
      
}


function selectionetage(){
  var sel = document.getElementById("etage"); 
  var nbr =0;
   nbr= etg;
  console.log("le nbr des etages est : ",nbr);
  
  
  var opt=0;
  for(var i = 0; i < nbr; i++) {
      opt= i+1;
     var el = document.createElement("option");
    el.textContent = opt
     el.value = opt
    sel.appendChild(el);
    
   
   }
}

const ajouterbloc=()=>{

 var way =document.getElementById("sel").value;
 
  if (way == "Autres")
  { 
    console.log("heeeeey");
    setbuttonpopup(true);
    
  }
  else{
    setbloc(way);
    console.log(way);
    tying=way;
    sendbloc();
  }
      
};
const veriftp=()=>{
  var way =document.getElementById("typeport").value;
  
   if (way == "Autres")
   { 
     
   }
   else{
     settypep(way);
   }
       
 };

const [arm,setarm]=useState("");

 useEffect(()=>{
   if(buttonautre===true){
    var port = document.getElementById("vlanconfigport");
    for(var i = 0; i <vlanswitch.length; i++) {
       var opt = vlanswitch[i];
       var el = document.createElement("option");
      el.textContent = opt.VLAN;
       el.value = opt.VLAN;
      port.appendChild(el);
     
     }
   }

 },[buttonautre])
 function remplirtp(){
  var sel = document.getElementById("typeport"); 
  

for(var i = 0; i < tabtypeport.length; i++) {
  var opt = tabtypeport[i];
  var el = document.createElement("option");
 el.textContent = opt.Etat_Port;
  el.value = opt.Etat_Port;
 sel.appendChild(el);
 
}
 }
 
 const gettypeport=()=>{
  Axios.get('http://localhost:5000/gettypeport').then((response)=>{
  
  tabtypeport=response.data;
  remplirtp();
   console.log(tabtypeport);
 
  
});

 };


 useEffect(()=>{
  if(buttonautre===true){
     gettypeport();
     
   }

},[buttonautre])


function configutil (){
  
  setbuttonautre(true);
  setbuttonconfig(false);
  
}


 const sendbloc = () =>{
   Axios.put('http://localhost:5000/sendbloc',{
     tying:tying,
   }).then((response)=>{
     setnetage(response.data);
     etg=response.data[0].Nombre_Etages;
     console.log("succseed!");
     selectionetage();
   })
   
 };
 function selectionsalle (){
  var sel = document.getElementById("salle"); 
    

  for(var i = 0; i < tab.length; i++) {
     var opt = tab[i];
     var el = document.createElement("option");
    el.textContent = opt.salle;
     el.value = opt.salle;
    sel.appendChild(el);
    
   
   }
 }
// recuperer le num inventaire de l url 
 const { id } = useParams();

  
const Entrer = ()=> {
Axios.post('http://localhost:5000/create',{
  
  Nsalle:Nsalle,
  floarnbr:floarnbr,
  Bloc:Bloc,
  
}).then(()=>{
  console.log("succseed!");
  settoggletabs(4);
  window.location.reload();
  
})
setbuttonsalle(false);

 };
 
 useEffect (()=>{
   
   {
  Axios.get('http://localhost:5000/blocs').then((response)=>{
    setblocliste(response.data);
    tab=response.data;
    console.log(tab);
    selection();
  });
 

}
  
},[])


useEffect (()=>{
  document.getElementById("contenu2").style.display='none';
  document.getElementById("contenu3").style.display='none';
  document.getElementById("contenu4").style.display='none';
  document.getElementById("contenu1").style.display='flex';
  
},[])


 const ajoutbloc =() => {
   
  Axios.post('http://localhost:5000/ajtbloc',{
    blocname : blocname,
    floarnbr : floarnbr,
  }).then(()=>{
    console.log("succseed!");
    setbuttonpopup(false);
    
  })
  ///setnb(!nb);
};


const ajouterarm =() => {
  Axios.post('http://localhost:5000/ajtarm',{
    arm:arm
  }).then(()=>{
    setbuttonarm(false);
    window.location.reload();
  })
};

function changerstate (){
  setbuttonpopup(false);
}
function changerstatetwo (){
  setbuttonsalle(false);
}
function changerstatetroi (){
  setbuttonarm(false);
}
function changerstateqtr (){
  setbuttondelete(false);
}
function changerstate5 (){
  setbuttonconfig(false);
}
function changerstate6(){
  setbuttonautre(false);
}
function changerstate7(){
  setbuttoncascade(false);
}
function changerstate8(){
  setbuttonrename(false);
}
function changerstatedeco(){
  setbuttondeconnect(false);
}
function changerstatecon(){
  setbuttonconnect(false);
}
function changerstatereformn(){
  setbuttonreforme(false);
}
function affichersalle (){
  var etg =document.getElementById("etage").value; 
  setfloar(etg);
  floar=etg;
  getsalle();
};
const getsalle = () =>{
  Axios.put('http://localhost:5000/getsalle',{
    Bloc:Bloc,
    floar:floar,
  }).then((response)=>{
    setlistesalle(response.data);
    console.log(tab);
    tab=response.data;
    selectionsalle();
    
  });
  
};

function checksalle (){
  var check =document.getElementById("salle").value;
 
  if (check == "Autres")
  { 
    setbuttonsalle(true);
    
  }
  else{
    setnsalle(check);
    console.log(check);
  }
};



function acceuil(){
  document.getElementById("btn").style.backgroundColor="#8773B2";
}
const [contr,setcontrole]=useState(false);
const [switchinfo,setswitchinfo]=useState([]);
const[localisation,setlocalisation]=useState([]);

const getlocal = ()=>{
  Axios.put('http://localhost:5000/getlocal',{
    idlocal:idlocal 
  }).then((response)=>{
    setlocalisation(response.data);
    console.log(response.data);
  })
};

 const [name,setname]=useState();

var idlocal;

useEffect (()=>{
  Axios.get(`http://localhost:5000/api/getSwitchN/${id}`,{
     
  }).then((response)=>{
    setswitchinfo(response.data);
    console.log(response.data);
    setname(switchinfo[0].nom_switch);
    console.log(name);
    idlocal=response.data[0].local;
    console.log(switchinfo);
    getlocal();
  }
  
  
  );
  
},[id]);


const[etat,setetat]=useState(false);
useEffect (()=>{
  console.log("etat changé ");
  
  Axios.get(`http://localhost:5000/api/getSwitchN/${id}`,{
    
  }).then((response)=>{
    setswitchinfo(response.data);
    idlocal=response.data[0].local;
    getlocal();
  });
  
  
},[etat]);


useEffect (()=>{
  console.log(" new nom chargé  ");
  
  Axios.get(`http://localhost:5000/api/getSwitchN/${id}`,{
    
  }).then((response)=>{
    setswitchinfo(response.data);
    idlocal=response.data[0].local;
    getlocal();
  });
  
},[refrechname]);


useEffect (()=>{
  console.log("etat changé ");
 
  Axios.get(`http://localhost:5000/api/getSwitchN/${id}`,{
    
  }).then((response)=>{
    setswitchinfo(response.data);
    idlocal=response.data[0].local;
    getlocal();
  });
  
  
},[vari]);

useEffect (()=>{
  Axios.get(`http://localhost:5000/api/getSwitchN/${id}`,{
   
  }).then((response)=>{
    setswitchinfo(response.data);
    idlocal=response.data[0].local;
   
    getlocal();
  });
  
},[]);

var idinsert=0;
const configid = () =>{
  Axios.put(`http://localhost:5000/config/${id}`,{
    Bloc:Bloc,
    floarnbr : floarnbr,
    Nsalle:Nsalle,
    arm:arm
  }).then((response)=>{
    idinsert=response.data[0].id_local;
    console.log(response.data);
    validation();
  });
  
};
const validation = () =>{
  Axios.post(`http://localhost:5000/validation/${id}`,{
    idinsert:idinsert,

    arm:arm
  }).then(()=>{
    console.log("success !");
    window.location.reload();
  });
  
};
const[vlanswitch,setvlanswitch]=useState([]);
useEffect (()=>{
  Axios.put(`http://localhost:5000/vlanswitch/${id}`,{
    
  }).then((response)=>{
    setvlanswitch(response.data);
  });
  console.log("vlans recuperée ",vlanswitch);
  
},[name]);
useEffect (()=>{
  Axios.put(`http://localhost:5000/vlanswitch/${id}`,{
    
  }).then((response)=>{
    setvlanswitch(response.data);
  });
  
},[cont2]);
useEffect (()=>{
 
  Axios.put(`http://localhost:5000/vlanswitch/${id}`,{
    
  }).then((response)=>{
    setvlanswitch(response.data);
  });

},[update]);

useEffect (()=>{
  if(cont3===true)
  {
   console.log("chargemenet des ports de switch ",id);
  Axios.get(`http://localhost:5000/listeport/${id}`,{
     
  }).then((response)=>{ 
    setlisteport(response.data);
    
  });
  console.log("ports " , id , " : ",listeport);
}
},[cont3]);
useEffect (()=>{
  
  
  Axios.get(`http://localhost:5000/listeport/${id}`,{
    
  }).then((response)=>{
    setlisteport(response.data);
  });

},[ref]);
useEffect (()=>{
  if(debran===true)
  {
  Axios.get(`http://localhost:5000/listeport/${id}`,{
    name:name  
  }).then((response)=>{
    setlisteport(response.data);
  });
}
},[debran]);
useEffect (()=>{
  if(cont3===true)
  {
  Axios.get(`http://localhost:5000/listeport/${id}`,{
     
  }).then((response)=>{
    setlisteport(response.data);
  });
}
},[name]);
const[idsupp,setidsupp]=useState(0);
function deleting(id){
 setidsupp(id);
console.log(id);
  setbuttondelete(true)
}


const delet = () =>{
 
  Axios.post('http://localhost:5000/deletvlan',{
    idsupp:idsupp
  }).then(()=>{
    console.log("success !");
   
  });
  setcont2(!cont2);
  changerstateqtr();
};

const configportvlan = () =>{
  setcont3(false);
  Axios.post('http://localhost:5000/configportvlan',{
    idport:idport,
    typep:typep,
    vlanp:vlanp
  }).then(()=>{
    console.log("success !");
    setbuttonautre(false);
    setcont3(true);
  });
  changerstateqtr();
};
const [listevlan,setlistevlan]=useState([]);
useEffect (()=>{
  Axios.get(`http://localhost:5000/vlans/${id}`,{
   
  }).then((response)=>{
    setlistevlan(response.data);
  });
  
},[]);


useEffect (()=>{
  console.log("false");
  
  Axios.get(`http://localhost:5000/vlans/${id}`,{
   
  }).then((response)=>{
    setlistevlan(response.data);
    console.log(true);
  });
  
},[cont2]);
useEffect (()=>{
  
  console.log("false");
  Axios.get(`http://localhost:5000/vlans/${id}`,{
   
  }).then((response)=>{
    setlistevlan(response.data);
    console.log(true);
  });
  
  
},[update]);

useEffect (()=>{
  setdebranche(false);
  Axios.put('http://localhost:5000/debrancher',{
   valdebr:valdebr
  }).then((response)=>{
   setdebranche(true); 
    
  });
  
  
},[valdebr]);

var i=0;

var vlanjt;
const ajoutvlan = () =>{
  
  console.log("la valeur de update avant est : ",update);
  Axios.post(`http://localhost:5000/ajtvlan/${id}`,{
    
    vlanjt:vlanjt,
    
  }).then(()=>{
    
  });
 
  setupdate(!update); 
  console.log("la valeur de update est apres: ",update);
 
};

const[cascadevers,setcascadevers]=useState("");
const[portcascade,setportcascade]=useState(0);
const submit = () =>{
  Axios.post('http://localhost:5000/cascade',{
    cascadevers:cascadevers,
    portcascade:portcascade,
    idport:idport,
    name:name
  }).then(()=>{
    console.log("success !");
    changerstate7();
  });
  
};
const [accept,setaccept]=useState(false);
const handlechange=(etat,name)=>{
  console.log(name);
 console.log(etat);
}



function ajoutervlan (){
  console.log(listevlan.length);
  var indi=0;
  for(var i=0;i<listevlan.length;i++)
  {
   
    var e=document.getElementById(listevlan[i].NomVLAN).checked;
    if(e===true)
    {
      vlanajt[indi]=listevlan[i].NomVLAN;
      indi++;
      vlanjt=listevlan[i].NomVLAN;
      ajoutvlan();
       
    }
  }
  for(i=0;i<vlanajt.length;i++)
  {
    console.log(vlanajt[i]);
  }
  
 
}
const[idport,setidport]=useState(0);
function preparation (id){
  setbuttonconfig(true);
   setidport(id);

}

const rename = () =>{
  Axios.put(`http://localhost:5000/rename/${id}`,{
    newnom:newnom,
    
  }).then((response)=>{
    
    
    
    setbuttonrename(false);
  });
  setname(newnom);
  setrefrechname(!refrechname);
  console.log("newnom :  ",newnom);
  
};
function controltoogl (value) {
  setistoggled(value);
  if(value===false)
  {
    setbuttondeconnect(true);
  }
  if(value===true)
  {
    setbuttonconnect(true);
  }


}


const deconnecter = () =>{
  Axios.put(`http://localhost:5000/deconnecter/${id}`,{
    
  }).then((response)=>{
   
 
    
    
  });
  setvari(!vari);
  console.log("heey", vari);
    changerstatedeco();
};

const connecter = () =>{
  
  Axios.put(`http://localhost:5000/connecter/${id}`,{
    
  }).then((response)=>{
  
    
     
     
  });
  changerstatecon();
  setetat(!etat);
  console.log("connectée ! etat",etat);
};


const reforme = () =>{
  console.log("idportref" ,idportreforme);
  Axios.put('http://localhost:5000/reforme',{
    idportreforme:idportreforme
  }).then((response)=>{
  
    
   changerstatereformn(false);
  });
  setref(!ref);
};

const [idportreforme,setidportreforme]=useState(0);
function fonc(para){
  setidportreforme(para);
  setbuttonreforme(true);

};
  return (
   
    <html>
      <head>
        <title>SwitchEsi</title>
      </head>
      
      <body>
    <div className="Application">
    
    
    
    <div className='contain'>  
     
    <div className='contain_anglet'>
    <div className={toggletabs===1 ? 'anglet active':'anglet'}  onClick={()=>toogletab(1)}>Information</div>
   
    <div className={toggletabs===1? 'contenu activecontenu' : 'contenu'} id="contenu1" >
      <div id='problem'>
       <img id ="note" alt="B" src={note}/>
       <img id='color1' alt='c'src={color1}/>
       <img id='color2' alt='v' src={color2}/>
       <h2 id="port">Ports</h2>
       <h2 id="port1">Vlan</h2>
       <h4 id='portot'>ports en totale</h4>
       <h4 id='portot1'>vlan en totale</h4>
       <h1 id="nbrport1">{vlanswitch.length}</h1>
       <img id='renom' alt='r' src={renom}/>
       
       <img id="section" alt="d" src={section}/>
       
       
      
       
       
       {
         switchinfo.map((val)=>{
           return<div className='try'>
                  <div className='part1'>
                 <label>Nom de switch </label>
                   <h3> {val.nom_switch}</h3>
                   <label>N°inventaire </label>
                   <h3> {val.N_inventaire}</h3>
                   <label>N°serie </label>
                   <h3> {val.N_serie}</h3>
                   <label> @mac </label>
                   <h3>{val.DMAC}</h3>
                   <label>Armoire</label>
                   <h3>{val.Armoire}</h3>
                   </div>
                   <div className='part2'>
                   <label>Localisation </label>
                   {localisation.map((val)=>{
                     return<h3>{val.bloc}/{val.etage}/{val.salle} </h3>
                   })}
                   <label>Marque </label>
                   <h3> {val.marque}</h3>
                   <label>Modele </label>
                   <h3> {val.modele}</h3>
                   <label>Date d'achat </label>
                   <h3>{val.date_d_achat}</h3>
                   <label>Etat de switch </label>
                   <h3>{val.Etat_switch}</h3>
                   <h1 id="nbrport">{(val.Nombre_de_ports_FE)+(val.Nombre_de_ports_GE)+(val.Nombre_de_ports_SFP)+(val.Nombre_de_ports_SFP_plus)}</h1>
                   <div className='fege'>
                   <label>nbr_ports FE </label> <h3 id="txt0"> {val.Nombre_de_ports_FE}</h3>
                  
                   <label>nbr_ports GE </label><h3 id="txt1">{val.Nombre_de_ports_GE}</h3>
                   
                   <div className='sfp'>
                   <label>nbr_ports SFP </label><h3 id="txt2">{val.Nombre_de_ports_SFP}</h3>
                   
                   <label>nbr_ports SFP+ </label><h3 id="txt3">{val.Nombre_de_ports_SFP_plus}</h3>
                  
                   </div>
                     </div>
                     </div>
                   </div>
                   
              
           
         })
       }
       </div>
   
    </div>
   
    </div>

    </div>
        </div>

        </body>
      
     </html>
  );
}


export default Application;
