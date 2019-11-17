const Keygrip = require("keygrip");
const keys = require('../../config/keys');
const Buffer = require('safe-buffer');

module.exports = (user) =>{
    const sessionObj = {
        passport:{
            user: user._id.toString()
        }
    };
    const session = Buffer.Buffer.from(JSON.stringify(sessionObj))
                                 .toString('base64');
 
    const keyGrip = new Keygrip([keys.cookieKey]);
    const sig = keyGrip.sign('session='+session);

    return {session,sig};
}