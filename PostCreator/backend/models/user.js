const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     name:{
        type:String
     },
     username:{
        type:String
     },
     email:{
        type:String,
        unique:true
     },
     password:{
        type:String
     },
     posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
     ]
})

module.exports = mongoose.model("user", userSchema)