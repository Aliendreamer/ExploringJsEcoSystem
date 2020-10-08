import React,{useState} from "react";
import axios from 'axios';

export default ({setRefresh})=>{
   const [title,setTitle] =useState("");

   const onSubmit =async(e)=>{
      e.preventDefault();
      await axios.post('http://posts.com/posts/create',{title}, {
         'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
     });
      setTitle("");
      setRefresh(true);
   }
   return (
      <div>
         <form onSubmit={onSubmit}>
            <div className="form-group">
            <label>Title</label>
            <input className="form=control" onChange={e=>setTitle(e.target.value)} value={title}/>
            </div>
            <button className="btn btn-primary">Submit</button>
         </form>
      </div>
   )
}