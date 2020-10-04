import React from "react";
export default ({comments})=>{
   return(
         <ul>
        {comments.map(c=>  {
            let content;
            if(c.status==="approved"){
                  content=c.content;
            }

              if(c.status==="pending"){
                    content="this comment await moderation"
              }

              if(c.status==="rejected"){
                  content="comment is rejected"
            }
               return <li key={c.id}>{content}</li>
         })}
         </ul>
   )
}