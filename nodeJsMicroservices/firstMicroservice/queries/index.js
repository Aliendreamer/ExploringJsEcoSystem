const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const info={};
app.post("/events",(req,res)=>{
      const {type,data }=req.body;
      if(type ==="PostCreated"){
         const {id,title}=data;
         info[id]={id,title,comments:[]};
      }
      if(type === "CommentCreated"){
         const {postId,id,content,status}=data;
         const post = info[postId];
         post.comments.push({id,content,status});
      }
      res.send({});
});

app.get("/posts",(req,res)=>{
   res.send(info);
})

app.listen(4002,()=>{
   console.log("listening on 4002");
})