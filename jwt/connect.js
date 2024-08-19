const mongoose = require("mongoose");

function mongoConnection(){
    return mongoose.connect("mongodb://127.0.0.1:27017/trying").then(()=>{
        console.log("Connected");
    })
}

module.exports = mongoConnection

