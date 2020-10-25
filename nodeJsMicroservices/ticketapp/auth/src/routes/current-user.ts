import { currentUser } from '../middlewares/currentuser';
import express,{Request,Response} from "express";
const router = express.Router();

router.get("/api/users/currentuser",currentUser,(req:Request,res:Response)=>{
      res.send(req.currentUser)
})

export {router as currentUserRouter}