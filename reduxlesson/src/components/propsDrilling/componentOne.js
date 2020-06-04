
import React,{useState, useEffect} from 'react';

import ComponentTwo from "./componentTwo";
const ComponentOne =()=>{
   const [fieldValue,setFieldValue]=useState(0);
   useEffect(()=>{

   },[fieldValue])
   return(
      <div style={{marginLeft:"100px", marginTop:"100px"}}>
      <input type='text' value={fieldValue} label="Current counter" disabled/>
      <ComponentTwo value={fieldValue} changeValue={setFieldValue}/>
      </div>
   )
}
export default ComponentOne;