import { NotAuthorizedError } from '../errors/notauthorizedError';
import { Response,Request, NextFunction } from 'express';

export const requireAuth = (req:Request,res:Response,next:NextFunction)=>{

   if(!req.currentUser){
     throw new NotAuthorizedError();
   }
   next();
}