const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post("/events",async (req,res)=>{
   const {type,data }=req.body;

   if(type === "CommentCreated"){
      const {postId,id,content}=data;
      const status = content.includes("orange")?"rejected":"approved";
      await axios.post("http://localhost:4005/events",{type:"CommentModerated",data:{id,content,postId,status}});
   }
   res.send({});
});


app.listen(4003,()=>{
   console.log("listening ond 4003");
});