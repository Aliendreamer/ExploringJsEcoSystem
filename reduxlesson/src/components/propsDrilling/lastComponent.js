import React from 'react';


const LastComponent =({value,changeValue})=>{
   const changeValu=()=>{

   }
   return(
      <>
      <button type="button"onClick={()=>changeValue(value+1)} >Increment</button>
      <button type='button' onClick={()=>changeValu(value-1>=0?value-1:0)} >Decrement</button>
      </>
   )
}
export default LastComponent;