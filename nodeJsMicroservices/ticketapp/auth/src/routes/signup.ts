import { BadRequestError } from './../errors/badRequestError';
import {validateRequestHandler}  from "../middlewares/validateRequest";
import jwt from "jsonwebtoken";
import  express,{Request,Response} from "express";
import {body} from "express-validator";
import { User } from '../models/user';

const router = express.Router();

router.post("/api/users/signup",[
   body('email').isEmail().withMessage("Email must be valid"),
   body('password').trim().isLength({min:4,max:20}).withMessage("Password must be between 4 and 20 characters")
],validateRequestHandler,async(req:Request,res:Response)=>{
   const {email,password}= req.body;
   const existingUser = await User.findOne({email});
   if(existingUser)
      throw new BadRequestError("Email in use already")

    const user = await User.build({email,password}).save();

    const userJwt = jwt.sign({
       id:user.id,
       email:user.email
    },process.env.JWT_KEY!
    );
    req.session={ jwt:userJwt }

    return res.status(201).send(user)
})

export {router as signUpRouter}