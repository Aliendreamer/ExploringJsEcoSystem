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
   await axios.post("http://localhost:4005/events",{type:"CommentCreated",data:{id,content,postId:req.params.id,status:"pending"}})
   res.send(201).send(comments);
});

app.post("/events",(req,res)=>{
   console.log("Event  received",req.body.type);
   res.send({});
});
app.listen(4001,()=>{
   console.log("listening on 4001");
})