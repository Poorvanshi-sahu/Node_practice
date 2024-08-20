const express = require("express");
const router = express.Router()
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const tokenGenerate = require("../utils/generateToken");
const { isLoggedIn } = require("../middleware/userMiddleware");

router.get("/login",async(req,res)=>{
    // const {email, password} = req.body;

    let email = "abc@gmail.com"
    let password = "abc"

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(201).json({"message":"Something went wrong"})
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch){
        return res.status(201).json({"message":"Something went wrong"})
    }

    let token = tokenGenerate(user)
    
    res.cookie("token", token)    
    
    res.status(200).json({user, token})
})

router.post("/register",async(req,res)=>{
    const {name, email, username, password} = req.body

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const userExists = await userModel.findOne({email});

    if(userExists){
        return res.status(201).json({"message":"User already exists"})
    }

    const user = await userModel.create({
        name,
        username,
        email,
        password:hashPassword
    }) 

    let token = tokenGenerate(user)
    
    res.cookie("token", token)
    
    await user.save();

    res.status(200).json({user, token})
})

router.get("/logOut",isLoggedIn,(req,res)=>{
    res.cookie("token","")
    res.status(200).json({"message":"Logged out successfully"})
})

module.exports = router