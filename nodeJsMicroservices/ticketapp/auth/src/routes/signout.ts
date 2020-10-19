import  express from "express";

const router = express.Router();

router.get("/api/users/signout",(req,res)=>{
   res.send("works")
})

export {router as signOutRouter}