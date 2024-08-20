const express = require("express");
const connectDatabase = require("./connect");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes");
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/api", userRoutes)
app.use("/api", postRoutes)

app.listen(process.env.PORT,async()=>{
    await connectDatabase()
    console.log(`Listening on port ${process.env.PORT}`);  
})
