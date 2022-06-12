const express=require("express");
const User =require("../models/user_model");
const app=express();
const router=express.Router();

app.route("/register").post((req,res)=> {
    const user=new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
    });
    user.save().then(()=>{
        res.status(200).json("ok");
    })
    .catch((err)=>{
        res.status(403).json({msg:err});
    })
    res.json("Registered");
});

module.exports=router;