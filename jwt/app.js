const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const port = 3000
const bcrypt = require("bcrypt")
const mongoConnection = require("./connect")
const UserModel = require("./models/user")
const jwt = require("jsonwebtoken")

app.use(cookieParser())
app.use(express.json())

app.get("/login", async(req, res)=>{
     let {email, password} = req.body;    

     const userExists = await UserModel.findOne({email})

     if(!userExists){
         return res.send({"message":"User does not exists"})
     }

     let {password:hashedPassword} = userExists 

     const isPasswordMatch = await bcrypt.compare(password,hashedPassword )
     
     if(!isPasswordMatch){
        return res.send("Password does not match")
     }

     let token = jwt.sign({"payload":userExists},"ThisIsTheSecret")
     res.cookie("token",token)
     res.send({userExists, token})
})

app.post("/register", async(req,res)=>{
    let {name, username, email, password} = req.body;
    
    const userExists = await UserModel.findOne({email});
    
    if(userExists){
        return res.send({"message":"User already exists"})
    }

    password = await bcrypt.hash(password, 10)
    const newUser = await UserModel.create({
        name,username,email,password
    })

    const userWithoutPassword = await UserModel.findById(newUser._id).select('-password');     
    const token = jwt.sign({"payload":userWithoutPassword}, "ThisIsTheSecret")
    res.cookie("token",token)
    return res.send(newUser)
})

app.get("/logout",(req,res)=>{
    res.cookie("token","")
    res.send({"message":"message logged out successfully"})
})

app.get("/read", (req, res)=>{
    res.send(req.cookies)
})

app.listen(port,async()=>{
    await mongoConnection()
    console.log(`Listening on port ${port}`);
})