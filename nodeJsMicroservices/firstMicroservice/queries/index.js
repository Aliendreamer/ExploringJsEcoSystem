const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const axios= require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const info={};
app.post("/events",(req,res)=>{
      const {type,data }=req.body;
      handleEvent(type,data);
      res.send({});
});

const handleEvent=(type,data)=>{
   if(type ==="PostCreated"){
      const {id,title}=data;
      info[id]={id,title,comments:[]};
   }
   if(type === "CommentCreated"){
      const {postId,id,content,status}=data;
      const post = info[postId];
      if(post){
         post.comments.push({id,content,status});
      }
   }
   if(type==="CommentUpdated"){
      const{id,content,postId,status}= data;
      const comments = info[postId].comments;
      const comment = comments.find(x=>x.id===id);
      comment.status = status;
      comment.content=content;
   }
}

app.get("/posts",(req,res)=>{
   res.send(info);
})

app.listen(4002,async()=>{
   console.log("listening on 4002");
   const res = await axios.get("http://localhost:4005/events");
   for (const event of res.data) {
      const {type,data}=event;
      handleEvent(type,data);
   }
})

