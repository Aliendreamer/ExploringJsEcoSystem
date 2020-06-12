import React,{useState,useEffect} from 'react';

const CounterComponentLocal = ()=>{

   const [fieldValue,setFieldValue]=useState(0);
   useEffect(()=>{

   },[fieldValue])
   return(
      <div style={{marginLeft:"100px", marginTop:"100px"}}>
      <input type='text' value={fieldValue} label="Current counter" disabled/>
      <button type='button' onClick={()=>setFieldValue(fieldValue+1)}>
         Increment
      </button>
      <button type='button' onClick={()=>setFieldValue(fieldValue-1>=0?fieldValue-1:0)} >
         Decrement
      </button>
      </div>
   )
      
}

export default CounterComponentLocal;