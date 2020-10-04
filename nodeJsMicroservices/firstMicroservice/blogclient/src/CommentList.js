import React from "react";
export default ({comments})=>{
   return(
         <ul>
        {comments.map(c=> <li key={c.id}>{c.content}</li>)}
         </ul>
   )
}