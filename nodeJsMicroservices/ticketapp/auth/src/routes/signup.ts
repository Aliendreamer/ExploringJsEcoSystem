import { DatabaseConnectionError } from './../errors/databaseConnectionError';
import { RequestValidationError } from './../errors/requestValidationError';
import  express,{Request,Response} from "express";
import {body,validationResult} from "express-validator";

const router = express.Router();

router.post("/api/users/signup",[
   body('email').isEmail().withMessage("Email must be valid"),
   body('password').trim().isLength({min:4,max:20}).withMessage("Password must be between 4 and 20 characters")
],async(req:Request,res:Response)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
     const error = new RequestValidationError(errors.array());
     throw error;
   }
   throw new DatabaseConnectionError();
   const {email,password}= req.body;
   res.send({});
})

export {router as signUpRouter}