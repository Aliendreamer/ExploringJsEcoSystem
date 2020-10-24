import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/requestValidationError';
import { Request,Response,NextFunction } from 'express';
export const validateRequestHandler = (req:Request,res:Response,next:NextFunction)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
     const error = new RequestValidationError(errors.array());
     throw error;
   }
   next()
}