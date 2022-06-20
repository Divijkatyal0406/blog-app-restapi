const express=require("express");
const { read } = require("fs");
const User =require("../models/user_model");
const app=express();
const router=express.Router();

router.route("/register").post((req,res)=> {
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

router.route("/update/:username").patch((req,res)=> {
    User.findOneAndUpdate({username:req.params.username},{$set:{password:req.body.password}},(err,result)=>{
        if(err) return res.status(500).json({msg:err});
        const msg={
            msg:"Password updated Successfully",
            username:req.params.username
        }
        return read.json(msg);
    });
});


router.route("/delete/:username").delete((req,res)=> {
    User.findOneAndDelete({username:req.params.username},(err,result)=>{
        if(err) return res.status(500).json({msg:err});
        const msg={
            msg:"Deleted Successfully",
            username:req.params.username
        }
        return read.json(msg);
    });
});

module.exports=router;