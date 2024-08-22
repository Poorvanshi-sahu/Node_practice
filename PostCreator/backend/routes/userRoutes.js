const express = require("express");
const router = express.Router()
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const tokenGenerate = require("../utils/generateToken");
const { isLoggedIn } = require("../middleware/userMiddleware");

router.post("/login",async(req,res)=>{ 
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(201).json({"message":"Something went wrong user h"})
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch){
        return res.status(201).json({"message":"Something went wrong password galt"})
    }

    let token = tokenGenerate(user)
    
    res.cookie("token", token)    
    
    res.status(200).json({"message":"Login successful", user, token})
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

    return res.status(200).json({user, token})
})

router.get("/logOut",(req,res)=>{
    res.cookie("token","")
    return res.status(200).json({"message":"Logged out successfully"})
})

router.get("/getProfile",isLoggedIn,async(req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.user.userId})
        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({"error":error})
    }
})

module.exports = router