import React , {useState} from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Home = () => {

  const[isOpen , setIsOpen ] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  } ; 
   
  return (
    <>
     <Navbar toggle ={toggle}/>
     <Header/>
     
    </>
  ); 
} ; 

export default Home; 