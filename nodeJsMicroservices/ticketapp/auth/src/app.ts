import { NotFoundError } from './errors/notFoundError';
import { erroHandler } from './middlewares/errorHandler';
import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import {currentUserRouter} from "./routes/current-user";
import {signUpRouter} from "./routes/signup";
import { signInRouter} from "./routes/signin";
import {signOutRouter} from "./routes/signout";
import cookieSession from "cookie-session";

const app = express();
app.use(json());
app.set("trust-proxy",true);
app.use(cookieSession({
   signed:false,
   secure:process.env.NODE_ENV !== "test"
}))
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(currentUserRouter);
app.all("*", async (req,res)=>{
   throw new NotFoundError();
})
app.use(erroHandler);

export { app };