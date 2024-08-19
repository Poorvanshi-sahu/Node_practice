const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/getFiles", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    if (err) {
      return res.status(400).json({ Error: err.message });
    }
    return res.status(200).json({ files });
  });
});

router.get("/readFile/:filename", (req, res) => {
  const nameOfFile = req.params.filename;

  if (!nameOfFile) {
    return res.status(400).json({ message: "Name of file is not given." });
  }

  fs.readdir(`./files`, (err, files) => {
    if (err) {
      return res.status(400).json({ Error: err.message });
    }

    if (files.indexOf(nameOfFile) >= 0) {
      fs.readFile(`./files/${nameOfFile}`, "utf-8", (err, data) => {
        if (err) {
          return res.status(400).json({ Error: err.message });
        }
        return res.status(200).json({ data });
      });
    } else {
      return res.status(400).json({ message: "File not Present" });
    }
  });
});

router.delete("/deleteFile/:filename",(req, res)=>{
    const filename = req.params.filename;

    if(!filename){
        return res.status(400).json({"message":"File not found"})
    }
    
    fs.readdir(`./files`,(err, files)=>{
      if(err){
        return res.status(400).json({"Error":err.message})
      }
      if(files.indexOf(filename)>=0){
        fs.unlink(`./files/${filename}`,(err)=>{
          if(err){
              return res.status(400).json({"Error":err.message})
          }
          return res.status(200).json({"message":"File deleted successfully"})
      })
      }else{
          return res.status(400).json({"message":"File not found"})
      }
    })  
})

router.post("/createFile",(req,res)=>{
  const {fileName, data} = req.body
  if(!fileName){
       return res.status(201).json({"message":"File name not provided"})
  }

  fs.readdir(`./files`,(err, files)=>{
    if(err){
      return res.status(400).json({"message":"File not found"})
    }

    if(files.indexOf(fileName)>=0){
       return res.status(201).json({"message":"File with same name already exists"})
    }else{
       fs.writeFile(`./files/${fileName}`,data, (err)=>{
          if(err){
            return res.status(400).json({ Error: err.message });
          }
          return res.status(200).json({"message":"File created successfully"})
       })
    }
  })
})

router.post("/updateFile",(req,res)=>{
   const {fileName, fileContent} = req.body;
  
   fs.writeFile(`./files/${fileName}`,fileContent, (err)=>{
      if(err){
        return res.status(400).json(err.message)
      }
       return res.status(200).json({"message":"File updated successfully"})
   })
})

module.exports = router;
