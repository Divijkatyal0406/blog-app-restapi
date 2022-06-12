const express=require("express");
const mongoose=require("mongoose");

const app=express();
mongoose.connect('mongodb://localhost:27017/myapp');
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB connected")
});

app.route("/").get((req,res)=> res.send("Test"));

const Port=process.env.port || 3000

app.listen(Port,()=> console.log(`Server running on port ${Port}`));