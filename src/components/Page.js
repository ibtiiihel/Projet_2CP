import{useState} from "react";
import{useEffect} from "react";
import React from 'react';
export default function Page ({sendb}){
const[elem,setelem]=useState([]);
useEffect(()=>{
    setelem(sendb())
    console.log("AFTER UPDATING");

},[sendb])

return elem.map(elem=> <div key={elem}></div> )
}