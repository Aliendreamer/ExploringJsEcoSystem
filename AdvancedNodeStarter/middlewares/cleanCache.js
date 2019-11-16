const {clearCache} = require("../services/cache");

module.exports =async (req,res,next)=>{

    await next();
    if(re)
    clearCache(req.user.id);
} 