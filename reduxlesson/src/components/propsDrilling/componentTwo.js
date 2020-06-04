import React from 'react';
import ComponentThree from "./componentThree";
const ComponentTwo=({value, changeValue})=>{

   return (
      <ComponentThree value={value} changeValue={changeValue}/>
   )
}
export default ComponentTwo;