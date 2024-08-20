const express = require("express");
const { isLoggedIn } = require("../middleware/userMiddleware");
const router = express.Router()

router.post("/createPost",isLoggedIn, (req,res)=>{
    const {content} = req.body;

    
})

module.exports = router