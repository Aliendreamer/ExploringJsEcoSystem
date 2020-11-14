import React, { useState } from "react";
import { useAlert } from "react-alert";

const  SomeComponent =()=>{
     const [inputValue,setInputValue] = useState("")
     const alert = useAlert();
   return (
      <div>
         <input name="text" value={inputValue} onChange={e =>setInputValue(e.target.value)}/>
         <button  onClick={() => alert.info(inputValue)}>
            Click me
         </button>
      </div>
   )
}

export default SomeComponent;