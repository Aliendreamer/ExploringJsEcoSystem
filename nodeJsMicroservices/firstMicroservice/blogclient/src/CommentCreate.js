import axios from "axios";
import React, { useState } from "react";

export default ({postId,setRefresh})=>{
   const [comment,setComment]=useState("");
   const onSubmit=async(e)=>{
      e.preventDefault();
      await axios.post(`http://posts.com/posts/${postId}/comments`,{ content:comment});
      setComment("");
      setRefresh(true);
   }
   return(
      <div>
         <form onSubmit={onSubmit}>
            <div className="form-group">
               <label>New Comment</label>
               <input className="form-control"  value={comment} onChange={e=>setComment(e.target.value)}/>
            </div>
            <button className="btn btn-primary">Submit</button>
         </form>
      </div>
   )
}