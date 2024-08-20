const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content:{
        type:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    time:{
        type: Date,
        default: Date.now
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        post:"user"
    }
})

module.exports = mongoose.model("post", postSchema)