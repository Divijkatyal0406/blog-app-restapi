const express=require("express");
const User =require("../models/user_model");
const router=express.Router();
const jwt=require("jsonwebtoken");
const config=require("../config")
const middleware=require("../middleware")

router.route("/:username").get(middleware.checkToken,(req,res)=>{
    User.findOne({username:req.params.username},(err,result)=>{
        if(err){
            res.status(500).json({msg:err});
        }
        res.json({
            data:result,
            username:req.params.username
        });
    });
});

router.route("/login").post((req,res)=>{
    User.findOne({username:req.body.username},(err,result)=>{
        if(err){
            res.status(500).json({msg:err});
        }
        if(!result){
            res.status(403).json("Either the password or username is not correct");
        }
        if(result.password==req.body.password){
            let token=jwt.sign({username:req.body.username},config.key,{expiresIn:"24h"});
            res.json({
                token:token,
                msg:"Success!!"
            });
        }
        else{
            res.status(403).json("Password is incorrect");
        }
    })
})

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
    });
});

router.route("/update/:username").patch(middleware.checkToken,(req,res)=> {
    User.findOneAndUpdate({username:req.params.username},{$set:{password:req.body.password}},(err,result)=>{
        if(err) return res.status(500).json({msg:err});
        const msg={
            msg:"Password updated Successfully",
            username:req.params.username
        };
        return res.json(msg);
    });
});


router.route("/delete/:username").delete(middleware.checkToken,(req,res)=> {
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