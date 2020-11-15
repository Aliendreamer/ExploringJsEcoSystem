import express,{Request,Response} from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import {json} from "body-parser";
import { erroHandler,NotFoundError,currentUser } from '@ticketstest/common';
import {createTicketRouter} from "./routes/new";
import { showTicketRouter} from "./routes/show";
import { indexTicketRouter} from "./routes/index";
import { updateTicketRouter} from "./routes/update";

const app = express();
app.use(json());
app.set("trust-proxy",true);
app.use(cookieSession({
   signed:false,
   // this should be done like this but I have problems with ssl
   //secure:process.env.NODE_EN !== "test"
   secure: false
}))
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter)
app.all("*", async (req:Request,res:Response)=>{
   throw new NotFoundError();
})
app.use(erroHandler);

export { app };