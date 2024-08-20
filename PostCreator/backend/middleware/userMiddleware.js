const jwt = require("jsonwebtoken");

const isLoggedIn = (req,res,next)=>{
    console.log(req.headers["token"]);

    console.log("cookies", req.cookies);
    
    const {token} = Object.keys(req.cookies).length>0 ? req.cookies : req.headers;

    console.log("token",token);
    
    if(!token){
        return res.status(401).json({"message":"Please log-In first"})
    }  
    
    const user = jwt.verify(token ,process.env.SECRET )
    
    next()
}

module.exports = {isLoggedIn};