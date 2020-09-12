import {Router,Request,Response, NextFunction} from "express";


function requireAuth(req:Request,res:Response,next:NextFunction){
   if(req.session && req.session.loggedIn)
      return next();
    res.status(403);
    res.send("No access")
}  

const router = Router();

router.get("/",(req,res)=>{
      if(req.session && req.session.loggedIn){
         res.send(`
         <div>
         <div>
         logged in
         </div>
         <a href="logout">logout </a>
         </div>`)
      }else{
         res.send(`
         <div>
         <div>you are not logged in</div>
         <a href="login">login</a>
         </div>
         `)
      }
})

router.get('/login',(req:Request,res:Response)=>{
   res.send(`
      <form method="POST">
         <div>
         <label>Email</label>
         <input name="email">
         </div>
         <div>
         <label>password</label>
         <input name="password" type="password">
         </div>
         <button>Submit</button>
      </form>
   `)
});
router.post('/login',(req:Request,res:Response)=>{
   const {email,password} = req.body;
   if(email && password && email ==="h@h" && password==="aa"){
      req.session={loggedIn:true}
      res.redirect("/")
   }else{

      res.send("invalid data");
   }
});
router.get('/logout',(req:Request,res:Response)=>{
   req.session = null;
   res.redirect("/")
});
router.get("/protected",requireAuth,(req,res)=>{
   res.send(`
   <div>
   protected route
   </div>`)
})
export {router}