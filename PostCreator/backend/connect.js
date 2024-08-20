const mongoose = require("mongoose")

const connectDatabase = ()=>{
     return mongoose.connect("mongodb://127.0.0.1:27017/PostCreator").then(()=>{
        console.log(`Connected to Database`);
   })
}

module.exports = connectDatabase;