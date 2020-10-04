import React,{useState,useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default ({refresh,setRefresh})=>{
   const [posts,setPosts]= useState({});

   useEffect(()=>{
      (async()=>{
         const res = await axios.get("http://localhost:4002/posts")
         setPosts(res.data);
         setRefresh(false);
      })()
   },[refresh,setRefresh])
   const renderedPosts = Object.values(posts).map(post=>{
      return( <div className="card" style={{width:"30%",marginBottom:"20px"}} key={post.id}>
            <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList comments={post.comments}/>
            <hr/>
            <CommentCreate postId={post.id}  setRefresh={setRefresh}/>
            </div>
      </div>)
   });
  return(<div className="d-flex flex-row flex-wrap justify-content-between">
     {renderedPosts}
   </div>)
}