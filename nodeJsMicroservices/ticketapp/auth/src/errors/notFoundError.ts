import CustomError from "./customError";

export class NotFoundError extends CustomError{
   constructor(){
      super("not found")
      Object.setPrototypeOf(this,NotFoundError.prototype);

   }
   statusCode=404;
   serializeErrors(){
      return [{message:"Not Found"}]
   }
}