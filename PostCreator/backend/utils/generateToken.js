const jwt = require("jsonwebtoken");

const tokenGenerate = (user)=>{
    const { username, _id } = user;

    const options = {
        expiresIn:"1d"
    }

    const token = jwt.sign({username, userId: _id}, process.env.SECRET, options)

    return token;
}

module.exports = tokenGenerate;