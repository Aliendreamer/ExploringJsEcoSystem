import mongoose from "mongoose";
import {app} from "./app";

const startUp = async()=>{
   if(!process.env.JWT_KEY){
      throw new Error("JWT_KEY must be defined")
   }
   try{
   await mongoose.connect("mongodb://auth-mongo-srv:27017/auth",{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useCreateIndex:true
   })
   console.log("connected to db")
   }catch(err){
      console.log(err)
   }
   app.listen(3000,()=>{
      console.log("listening at 3000")
   })
}
startUp()