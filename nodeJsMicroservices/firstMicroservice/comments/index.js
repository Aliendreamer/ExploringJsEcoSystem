const express =require("express");
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require('cors');
const app =express();
app.use(bodyParser.json());
app.use(cors());
const axios =require("axios");

const commentsByPostId={};
app.get('/posts/:id/comments',(req,res)=>{
   res.send(commentsByPostId[req.params.id]||[]);
});

app.post("/posts/:id/comments", async (req,res)=>{
   const id = randomBytes(4).toString("hex");
   const {content} = req.body;
   const comments = commentsByPostId[req.params.id]||[];
   comments.push({id,content,status:"pending"});
   commentsByPostId[req.params.id]=comments;
   await axios.post("http://event-bus-srv:4005/events",{type:"CommentCreated",data:{id,content,postId:req.params.id,status:"pending"}})
   res.status(201).send(comments);
});

app.post("/events",async(req,res)=>{
   console.log("Event  received",req.body.type);
   const {type,data} = req.body;
   if(type==="CommentModerated"){
         const {postId,id,content,status}=data;
         const comments = commentsByPostId[postId];
         const comment = comments.find(x=>x.id===id);
         comment.status=status;
         comment.content=content;
         await axios.post("http://event-bus-srv:4005/events",{type:"CommentUpdated",data:{id,postId,content,status}});
   }
   res.send({status:'ok'});
});
app.listen(4001,()=>{
   console.log("listening on 4001");
})