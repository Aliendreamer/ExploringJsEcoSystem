const express = require("express");
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const events=[];

app.post("/events",(req,res)=>{
   const event = req.body;
   events.push(event);
   axios.post("http://posts-clusterip-srv:4000/events",event);
   axios.post("http://localhost:4001/events",event);
   axios.post("http://localhost:4002/events",event);
   axios.post("http://localhost:4003/events",event);
   res.send({status:'ok'})
})

app.get("/events",(req,res)=>{
   res.send(events);
})

app.listen(4005,()=>{ console.log("listening on 4005")});