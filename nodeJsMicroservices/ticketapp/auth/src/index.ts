import { NotFoundError } from './errors/notFoundError';
import { erroHandler } from './middlewares/errorHandler';
import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import {currentUserRouter} from "./routes/current-user";
import {signUpRouter} from "./routes/signup";
import { signInRouter} from "./routes/signin";
import {signOutRouter} from "./routes/signout";
import mongoose from "mongoose";

const app = express();
app.use(json());
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(currentUserRouter);
app.all("*", async (req,res)=>{
   throw new NotFoundError();
})
app.use(erroHandler);

const startUp = async()=>{
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