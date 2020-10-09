import express from "express";
import {json} from "body-parser";

const app = express();
app.use(json());

app.get("/api/users/currentuser",(req,res)=>{
   res.send("works")
});

app.listen(4000,()=>{
   console.log("listening at 4000")
})