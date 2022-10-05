import React, {useEffect, useState } from "react";
import Axios from 'axios'
import{useParams} from 'react-router-dom';
import './confirmation.css'; 
import logoapp from '../assests/applogo.png'; 
import circle1 from '../assests/Ellipse 3.png';
import circle2 from '../assests/Ellipse 4.png'; 
import { Password } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Reset_password.css';
toast.configure();
Axios.defaults.withCredentials = true;



function Reset_password() {
  const [password2, setpassword2] = useState(""); 
  const [password1, setpassword1] = useState("");
  const [email, setemail] = useState(""); 
  const{id}=useParams();
  console.log("email recuperer ",id);

  
  useEffect(() => { 
    
    setemail(id);
    
  }, [id]);
const reset = () => {
  if(password1===password2)
  {

  Axios.post(`http://localhost:5000/changer_mtps_email`, {
          password:password1,
          email:email,  
         }).then((response) => {
          console.log(response.data.message); //cheak your mail
             if(response.data.message)
            { //setloginstatus(response.data.message);
          
           console.log(response.data);
        


          } else
          {
           // setloginstatus('');
            //window.location.replace("../Home");
             
              
          }
          }  );
          toast.success("confirm ");

          window.location.replace("../Signin");

        }
        else { 
          console.log('confirmation fause ');
          toast.error(" mot de passe non identique reverifiez ! ");

        }
     };


  
return (
    <div className="confirmationapp">

<div className="logo_app"> 
      <img src={logoapp} />
      </div>
      <div className="circle1">
        <img src={circle1} />
      </div>
      <div className="circle2">

        <img src={circle2} />
      </div>
      <div className="confirmation" >
       <h1 className="chnagemdp">Changer votre mot de passe </h1>
       <div id="nvmdp">
       <input type="text" placeholder="Nouveau mot de passe.." 
               onChange = {(event) => { setpassword1(event.target.value) } } /> 
              
       </div>
       <div id='cnfrmnvmdp'>
       <input type="text" placeholder="Confirmer mot de passe.." 
                      onChange = {(event) => { setpassword2(event.target.value) } } /> 

       </div>
       <div className="confirmation__button ">
       <button type="button" onClick={reset}>Confirmer</button>
       </div>
       </div>
    </div>
  );
}

export default Reset_password 