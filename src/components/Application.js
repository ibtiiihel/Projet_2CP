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
import { set } from 'lodash';

Axios.defaults.withCredentials = true;

function Application() {
  var tying;
  var floar;
  var concatination;
  var floarprise;
  var prisebloc;
  var etg;
  var etgprise;
  var table=new Array();
  var tabarm=new Array();
  var vlans=new Array();
  var vlanajt=new Array();
  var controle=0;
  var tabtypeport=new Array();
  var tab=new Array();
  var tabprise=new Array();
  const[saveetage,setsaveetage]=useState(0);
  const [buttonpopup,setbuttonpopup]=useState(false);
  const [buttonrename,setbuttonrename]=useState(false);
  const [buttondebrancher,setbuttondebrancher]=useState(false);
  const [buttonconfig,setbuttonconfig]=useState(false);
  const [buttoncascade,setbuttoncascade]=useState(false);
  const [buttonautre,setbuttonautre]=useState(false);
  const [buttonsalle,setbuttonsalle]=useState(false);
  const [buttondelete,setbuttondelete]=useState(false);
  const [buttonarm,setbuttonarm]=useState(false);
  const [buttondeconnect,setbuttondeconnect]=useState(false);
  const [buttonconnect,setbuttonconnect]=useState(false);
  const [Nlocal,  setnlocal]= useState(0);
  const[updatesalle,setupdatesalle]=useState(false)
  const [ref,setref]=useState(false);
  const [Bloc,  setbloc]= useState("");
  const [Netage,  setnetage]= useState([]);
  const [Listsalle,  setlistesalle]= useState([]);
  const [blocliste, setblocliste]=useState([]);
  const [ blocname ,  setblocname]=useState("");
  const [ floarnbr, setfloar]=useState(0);
  const [ floarnbrprise, setfloarprise]=useState(0);
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
  const[changed,setchanged]=useState(false);
  const[updatevlan,setupdatevlan]=useState(false);
  const[update,setupdate]=useState(false);
  const [debran,setdebranche]=useState(false);
  const[valdebr,setvaldeb]=useState(0);
  const[vari,setvari]=useState(false);
  const[newnom,setnewnom]=useState("");
  const[refrechname,setrefrechname]=useState(false);
  const[prise,setprise]=useState("");
  const[localprise,setlocaleprise]=useState("");
  const[typeofport,settypeofport]=useState("");
  const[blocprise,setblocprise]=useState("");
  const[etageprise,setetageprise]=useState("");
  const[salleprise,setsalleprise]=useState("");
  const[idpdebrancher,setidpdebrancher]=useState(0);
  const [switchinfo,setswitchinfo]=useState([]);
  const[portparvlan,setportparvlan]=useState(false);
  const[chek,setchek]=useState(false);
  const [etatPorts, setEtatPorts]=useState([]);

  const [Portfiltre, setPortfiltre]=useState("");
  
  const loadEtatsPorts = async () => {
    const response = await Axios.get("http://localhost:5000/gettypesport");
    setEtatPorts(response.data);
    
  };

  // charger les type des ports pour le filtre 
  useEffect(() => {
    loadEtatsPorts();
    console.log(" etats ports ", etatPorts );
  }, []);
  
  // useeffect poue le filtre port

useEffect(() => {
  console.log("hangement du filtre ",Portfiltre);
  if (Portfiltre) {
    Axios
      .put(`http://localhost:5000/FiltrePorts/`,{Portfiltre,id,}
      )
      .then((resp) => {
        setlisteport(resp.data);
        console.log("resp ports",resp.data);
        
        //setpaginatedData(_(resp.data).slice(0).take(pagesize).value());
       
      });
    
  } else {
    Axios.get(`http://localhost:5000/listeport/${id}`,{
     
  }).then((response)=>{ 
    setlisteport(response.data);
    
  });

    console.log("load ");
  }
}, [Portfiltre]);
  function changerstatereformn(){
    setbuttonreforme(false);
  }
  function changerstatedebrancher(){
    setbuttondebrancher(false);
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
    setportparvlan(!portparvlan);
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
 
function selectionprise(){
  var sel = document.getElementById("sely"); 

   for(var i = 0; i < tabprise.length; i++) {
      var opt = tabprise[i];
      var el = document.createElement("option");
     el.textContent = opt.Nom_Bloc;
      el.value = opt.Nom_Bloc;
     sel.appendChild(el);
     console.log(tabprise[i]);
     
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
function selectionetageprise(){
  var sel = document.getElementById("etage2"); 
  var nbr =0;
   nbr= etgprise;
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

 const sendblocprise = () =>{
  Axios.put('http://localhost:5000/sendblocprise',{
    prisebloc:prisebloc
  }).then((response)=>{
    setetageprise(response.data);
    etgprise=response.data[0].Nombre_Etages;
    selectionetageprise();
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

 function selectionsalleprise (){
  var sel = document.getElementById("salle2"); 
    

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
 setupdatesalle(false);
Axios.post('http://localhost:5000/create',{
  
  Nsalle:Nsalle,
  floarnbr:floarnbr,
  Bloc:Bloc,
  
}).then(()=>{
  console.log("succseed!");
  settoggletabs(4);
  setupdatesalle(true);
  setbuttonsalle(false);
})


 };
 
 useEffect (()=>{
   
  Axios.get('http://localhost:5000/blocs').then((response)=>{
    setblocliste(response.data);
    //tab=response.data;
    console.log("------------lwla ",response.data);
   // selection();
  });
 
},[id]);

useEffect (()=>{
   if(changed==true)
   {
  Axios.get('http://localhost:5000/blocs').then((response)=>{
    setblocliste(response.data);
    console.log("------------changed ",response.data);
    tab=response.data;
    console.log(tab);
    //selection();
  });
}
 
},[changed]);
useEffect (()=>{
   if(buttonautre==true)
   {
  Axios.get('http://localhost:5000/blocs').then((response)=>{
    setblocliste(response.data);
    console.log("------------bottonnautre ",response.data);
    tabprise=response.data;
    console.log(tabprise);
    selectionprise();
   
  });
 }
 
},[buttonautre])




useEffect (()=>{
  document.getElementById("contenu2").style.display='none';
  document.getElementById("contenu3").style.display='none';
  document.getElementById("contenu4").style.display='none';
  document.getElementById("contenu1").style.display='flex';
  
},[])

 const ajoutbloc =() => {
  setchanged(false);
  Axios.post('http://localhost:5000/ajtbloc',{
    blocname : blocname,
    floarnbr : floarnbr,
  }).then(()=>{
    console.log("succseed!");
    setbuttonpopup(false);
    setchanged(true);
   
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
function affichersalleprise (){
  var etg =document.getElementById("etage2").value; 
  setfloarprise(etg);
  floarprise=etg;
  getsalleprise();
};
const getsalle = () =>{
  setsaveetage(floar);
  Axios.put('http://localhost:5000/getsalle',{
    Bloc:Bloc,
    floar:floar,
  }).then((response)=>{
    setlistesalle(response.data);
    console.log(tab);
    tab=response.data;
    //selectionsalle();
    
  });
  
};

useEffect (()=>{
  if(updatesalle==true)
  {
    console.log("you are heeereee");
    console.log("le bloc est ",Bloc);
    console.log("l'etage est ",saveetage);
  Axios.put('http://localhost:5000/getsalle2',{
    Bloc:Bloc,
    saveetage:saveetage,
  }).then((response)=>{
    setlistesalle(response.data);
    
    tab=response.data;
    console.log(tab);
    //selectionsalle();
    
  });
}

},[updatesalle]);
const getsalleprise = () =>{
  Axios.put('http://localhost:5000/getsalleprise',{
    blocprise:blocprise,
    floarprise:floarprise,
  }).then((response)=>{
    tab=response.data;
    selectionsalleprise();
    
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
    setname(switchinfo[0].nom_switch);
    
    idlocal=response.data[0].local;
    
    
    console.log(switchinfo);
    getlocal();
    

    
  }
  );
  setchek(true);
  
},[id]);

useEffect (()=>{
 if(switchinfo[0]!=null)
 {
  var eta=switchinfo[0].Etat_switch;
  //console.log("l'etat du switch est : ",switchinfo[0].Etat_switch);
  if(eta=="actif")
  {
    setistoggled(true);
  }
  else{
    setistoggled(false);
  }
}
  
},[switchinfo]);



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
  Axios.put("http://localhost:5000/config",{
    Bloc:Bloc,
    floarnbr : floarnbr,
    Nsalle:Nsalle,
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
  
},[portparvlan]);
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
 console.log(idsupp);
  Axios.post(`http://localhost:5000/deletvlan/${id}`,{
    idsupp:idsupp
  }).then(()=>{
    console.log("success !");
   
  });
  setcont2(!cont2);
  changerstateqtr();
};

const configportvlan = () =>{
  setcont3(false);
  concatination=blocprise+"/"+floarnbrprise+"/"+salleprise;
  console.log("la valeur de la concatination est :" , concatination);
  Axios.post('http://localhost:5000/configportvlan',{
    idport:idport,
    typep:typep,
    vlanp:vlanp,
    blocprise:blocprise,
    floarnbrprise:floarnbrprise,
    salleprise:salleprise,
    prise:prise
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
  Axios.put(`http://localhost:5000/debrancher/${id}`,{
   valdebr:valdebr
  }).then((response)=>{
   setdebranche(true); 
   changerstatedebrancher();
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
  setcont3(false);
  Axios.post(`http://localhost:5000/cascade/${id}`,{
    cascadevers:cascadevers,
    portcascade:portcascade,
    idport:idport,
    typeofport:typeofport
  }).then((response)=>{
    console.log("success !");
    changerstate7();
    setcont3(true);
  });
  setportparvlan(!portparvlan);
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
  
  Axios.put(`http://localhost:5000/reforme/${id}`,{
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
function priseoperation(val){
  setblocprise(val);
prisebloc=val;
  sendblocprise();
}
function funcdebrancher(valeur){
  setidpdebrancher(valeur);
  setbuttondebrancher(true);
}
var vln;
const[nbrs,setnbrs]=useState([]);
useEffect(()=>{

Axios.put(`http://localhost:5000/nbrports/${id}`,{
  }).then((response)=>{
  setnbrs(response.data);
  console.log(response.data);
  
  });
  
},[id])
function nbrports(valor)
{
  vln=valor;
  Axios.put(`http://localhost:5000/nbrports/${id}`,{
    vln:vln
  }).then((response)=>{
  setnbrs(response.data[0].nbr);
  console.log("verifyyy",vln,response.data[0].nbr );
  });
  
}

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
    <div className={toggletabs===2 ? 'anglet active':'anglet'}  onClick={()=>toogletab(2)}>Config_vlan</div>
    <div className={toggletabs===3 ? 'anglet active':'anglet'} onClick={()=>toogletab(3)}>Config_ports</div>
    <div className={toggletabs===4 ? 'anglet active':'anglet'} onClick={()=>toogletab(4)}>Localisation</div>
    </div>
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
       
       
       <button id="neuom" onClick={()=>{setbuttonrename(true)}} />
   
       <FontAwesomeIcon id="pen" icon={faPen}></FontAwesomeIcon>
      
      
       <h4 id="nommer">Nommer</h4>
       <h6 id="nom">donner un nom pour le switch</h6>
      
       <h4 className='debrancher'>Activer</h4>
       <h4 className='brancher'>Desactiver</h4>
       
         <Switch className='swit' rounded={true} istoggled={istoggled} ontoggle={()=>controltoogl(!istoggled)} />
       
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
   <Popup trigger={buttonrename}>
   <div  className='modifie'>
     <FontAwesomeIcon id ="close" onClick={changerstate8} icon={faClose}></FontAwesomeIcon>
     <label>Entrer le nouveau nom du switch </label>
     <input type="text" placeholder='renommer' onChange={(event)=>setnewnom(event.target.value)} />
     <button onClick={rename} id="confirmer">Confirmer</button> 
     <button onClick={changerstate8} id="exit">EXIT</button>
   </div>
   </Popup>

   <Popup trigger={buttondeconnect}>
   <div  className='modifie'>
     <FontAwesomeIcon id ="close" onClick={changerstatedeco} icon={faClose}></FontAwesomeIcon>
     <label>est ce que vous voulez deconnecter le Switch </label>
     <button id="confirmer" onClick={deconnecter}>Confirmer</button> 
     <button onClick={changerstatedeco} id="exit">EXIT</button>
   </div>
   </Popup>

   <Popup trigger={buttonconnect}>
   <div  className='modifie'>
     <FontAwesomeIcon id ="close" onClick={changerstatecon} icon={faClose}></FontAwesomeIcon>
     <label>Est ce que vous connecter le switch </label>
     <button id="confirmer" onClick={connecter} >Confirmer</button> 
     <button onClick={changerstatecon} id="exit">EXIT</button>
   </div>
   </Popup>
    </div>
    <div className={toggletabs===2? 'contenu activecontenu' : 'contenu'} id="contenu2" >
      <img alt="img" id="bacy" src={car}/>

      
    <div className='tableau'>
    
      <h1>Liste des vlans</h1>
 <div className='tebv'>
  
 
     <table>
       <thead>
         <tr>
           <th>Nom Vlan   </th>
           <th>nbr_ports   </th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>
         { vlanswitch.map((val)=>{
           return<tr>
            <td>{val.VLAN}</td>
            <td>{val.nbr}</td>
            <td>
              <button type="button" onClick={()=>{deleting(val.VLAN)}} ><FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon></button>
               </td>
           </tr>
           }) }
           
        
       </tbody>
     </table>
     </div>
     </div>
     <div className='vlan'>
     <h2 id="vl">Vlan a ajouter</h2>
     <div className='vlan_inner'>
     {
       listevlan.map((val)=>{
         return <div className='zzz'>
                <input type="checkbox" id={val.NomVLAN} className='check'  />
                <label className='check' >{val.NomVLAN} </label>   
               
                </div>
       })      
      }
      </div>
      <button id="ajouter" onClick={ajoutervlan}>ajouter</button>
      </div>
     <Popup trigger={buttondelete}>
   <div  className='modifie'>
     <label>est ce que vous etes sur de supprimer le vlan ?</label>
     
     <button onClick={delet} id="confirmer">Confirmer</button> 
     <button onClick={changerstateqtr} id="exit">EXIT</button>
   </div>
   </Popup>

    </div>
    <div className={toggletabs===3? 'contenu activecontenu' : 'contenu'} id="contenu3" >
       <div className='all'>
       <h2 id="para">Table des ports</h2>
       <select
         //filtrer les switchs selon le nom du VLAN
         
          id="liste-Classe1"
          title="Filtrer les ports selon l'état de port "
          
           onChange={(event) => {
           setPortfiltre(event.target.value);
           }} >

           <option value="" selected >
              Filtrer 
           </option>

          {etatPorts.map((val, cle) => {
              
            return (
               <option className="options" value={val.Etat_Port} selected>
                {val.Etat_Port}
               </option>
              );
            })}
       </select>
      <div className='tabport'>
      <table>
       <thead>
         <tr>
         <th>Type</th>
           <th>N°</th>
           
           <th>Etat</th>
           <th>Vlan </th>
          
           <th> Prise </th>
           <th> Local_prise </th>
           <th> CascadeVers </th>
           <th> port_cascade </th>
           <th> CascadeDe </th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>
         { listeport.map((val)=>{
           return<tr>
            
            <td>{val.Type_Port}</td>
            <td>{val.N_port}</td>
            <td>{val.Etat_Port}</td>
            <td>{val.VLAN}</td>
            <td>{val.Prise}</td>
            <td>{val.bloc} / {val.etage} / {val.salle}</td>
            <td>{val.CascadeVers}</td>
            <td>{val.port_cascade}</td>
            <td>{val.CascadeDe}</td>
            <td>
            
              <button onClick={()=>{preparation(val.IdPort)}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
              <button id="off" onClick={()=>{funcdebrancher(val.IdPort)}} ><FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon></button>
              <button onClick={()=>{fonc(val.IdPort)}}><FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon></button>
     
            </td>
           </tr>
           }) }
        
       </tbody>
     </table>

      </div>
      <Popup trigger={buttonreforme}>
   <div  className='modifie'>
   <FontAwesomeIcon id ="close" onClick={changerstatereformn} icon={faClose}></FontAwesomeIcon>
     <label>est ce que vous voulez marquer le port comme reformé ?</label>
     
     <button onClick={reforme} id="confirmer">Confirmer</button> 
     
   </div>
   </Popup>

   <Popup trigger={buttondebrancher}>
   <div  className='modifie'>
   <FontAwesomeIcon id ="close" onClick={changerstatedebrancher} icon={faClose}></FontAwesomeIcon>
     <label>est ce que vous voulez debrancher le port ?</label>
     
     <button onClick={()=>{setvaldeb(idpdebrancher)}} id="confirmer">Confirmer</button> 
     
   </div>
   </Popup>
   <Popup trigger={buttonconfig}>
   <div  className='configuration'>
     <h2>Type du port</h2>
     <FontAwesomeIcon id ="close" onClick={changerstate5} icon={faClose}></FontAwesomeIcon>
     <button onClick={()=>setbuttoncascade(true)} id="config">En Cascade</button> 
     <button onClick={configutil} id="config">Utilisateurs</button> 
     
   </div>
   </Popup>
   <Popup trigger={buttoncascade}>
   <FontAwesomeIcon id ="close" onClick={changerstate7} icon={faClose}></FontAwesomeIcon>
   <div  className='configuration'>
     <label id="fix">le nom du switch en cascade</label>
     <input type="text" onChange={(event)=>{setcascadevers(event.target.value)}}/>
     <label id="fix">le num du port</label>
     <input type="number" id="nmrport" onChange={(event)=>{setportcascade(event.target.value)}}/>
     <label id="fix">le type du port</label>
     <select id="type" onChange={(event)=>{settypeofport(event.target.value)}}>
       <option></option>
       <option>FE</option>
       <option>GE</option>
       <option>SFP</option>
       <option>SFP+</option>
     </select>
     <button onClick={submit} id="submit">Confirmer</button>
     
   </div>
   </Popup>
   



   <Popup trigger={buttonautre}>
   <div  className='configuration'>
   <FontAwesomeIcon id ="close" onClick={changerstate6} icon={faClose}></FontAwesomeIcon>
     <label id="fix">type de port</label>
     <select onChange={veriftp} id="typeport" >
     <option value="Autres">Autres</option>
     <option value="Autres"></option>
   </select>
   <label id="fix">le num de la prise</label>
   <input type="text" id="nmrport" onChange={(event)=>{setprise(event.target.value)}}/>
   <label id="fix">locale du prise</label>
   <div className='localprise'>
   <select id="sely"  onChange={(event)=>{priseoperation(event.target.value)} }>
    <option ></option>
   </select>
   <select id="etage2" onChange={affichersalleprise}>
  </select>
  <select id="salle2" onChange={(event)=>{setsalleprise(event.target.value)}} >
    <option value="vide"> </option>

  </select>
  </div>

     <label id="fix">le nom du vlan</label>
     <select onChange={(event)=>{setvlanp(event.target.value)}} id="vlanconfigport" >
   </select>
     <button onClick={configportvlan} id="exite">confirmer</button>
    
   </div>
   </Popup>
      </div>
    </div>
    <div className={toggletabs===4? 'contenu activecontenu' : 'contenu'} id="contenu4" >
   
    <div className="formulaire">
  
     <h2>Emplacement du Switch </h2>
  <label>le nom du bloc</label>

  <select id="sel" onChange={ajouterbloc} >
   <option value="Autres" > Autres </option>
     {blocliste.map((val)=>{
       return <option value={val.Nom_Bloc}>{val.Nom_Bloc}</option>
     })}
   
   <option value="vide"> </option>
    
   </select>


   
   
   
  <label>le numero de l'etage</label>
  <select id="etage" onChange={affichersalle} disabled>
  </select>
  <label>le nom de la salle</label>
 
  <select id="salle" onChange={checksalle} >
    <option value="Autres">Autres</option>
     {Listsalle.map((val)=>{
       return <option value={val.salle}>{val.salle}</option>
     })}
    <option value="vide"> </option>

  </select>

   <label>le nom de l'armoire</label>
   <input type ="text" placeholder="   Nom de l'armoire " id="armoires" onChange={(event)=>{setarm(event.target.value)}}/>
   
   
   <button id="configuration" onClick={configid} >Entrer</button>
   <Popup  trigger={buttonpopup}>
   <div  className='modifie'>
    
     <label id="texte">Le nom du nouveau bloc</label>
     <FontAwesomeIcon id ="close" onClick={changerstate} icon={faClose}></FontAwesomeIcon>
     <input id="nombloc" type ="text" placeholder='   Nom du bloc' onChange={(event)=>{setblocname(event.target.value)}}/>
     <label id="texte">Le nbr des etages</label>
     
     <input type ="number" id="nombloc" placeholder="Nombre d'étages"   onChange={(event)=>{setfloar(event.target.value)}}/>
     <button onClick={ajoutbloc} id="confirmer">Confirmer</button> 
     <button onClick={changerstate} id="exit">EXIT</button>
     
   </div>
   
   </Popup>


   <Popup trigger={buttonsalle}>
   <div  className='modifie'>
   <FontAwesomeIcon id ="close" onClick={changerstatetwo} icon={faClose}></FontAwesomeIcon>
     <label id="texte">Le nom du nouvelle salle</label>
     <input id="nombloc"type ="text" placeholder='   Nom de la salle ' onChange={(event)=>{setnsalle(event.target.value)}}/>
     <button onClick={Entrer} id="confirmer">Confirmer</button> 
     <button onClick={changerstatetwo} id="exit">EXIT</button>
   </div>
   </Popup>
 
  
  </div>
    </div>
    </div>
        </div>

        </body>
      
     </html>
  );
}


export default Application;