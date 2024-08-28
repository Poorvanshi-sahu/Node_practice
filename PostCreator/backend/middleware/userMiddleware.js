const jwt = require("jsonwebtoken");

const isLoggedIn = (req,res,next)=>{   
     
    const {token} = Object.keys(req.cookies).length>0 ? req.cookies : req.headers;
   
    if(!token){
        return res.status(400).json({"message":"Please log-In first"})
    }  
    
    const user = jwt.verify(token ,process.env.SECRET )

    req.user = user
    
    next()
}

module.exports = {isLoggedIn};