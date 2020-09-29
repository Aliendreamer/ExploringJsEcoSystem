import React, { useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = ()=>{
   const [refresh,setRefresh]=useState(false);
   return <div className="container">
      <h1>Create Post</h1>
      <PostCreate setRefresh={setRefresh}/>
      <hr/>
      <PostList refresh={refresh} setRefresh={setRefresh}/>
   </div>
}

export default App;