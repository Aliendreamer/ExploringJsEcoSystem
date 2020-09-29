import React,{useState,useEffect} from "react";
import axios from "axios";
export default ({postId})=>{
   const [comments,setComments]=useState([]);
   useEffect(()=>{
        (async()=>{
           const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
           setComments(res.data);
         })()
   })


   return(
         <ul>
        {comments.map(c=> <li key={c.id}>{c.content}</li>)}
         </ul>
   )
}