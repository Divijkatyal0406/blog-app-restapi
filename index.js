const express=require("express");
const mongoose=require("mongoose");

const app=express();
// mongoose.connect("mongodb+srv://Divij0406:divij0406@cluster0.u7k1p.mongodb.net/blogdb1");
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB connected")
});

app.route("/").get((req,res)=> res.json("Test"));

//middleware 
app.use(express.json());
const userRoute=require("./routes/user");
//anything after user like user/register,user/delete will be handled by user.js file 
app.use("/user",userRoute);

const Port=process.env.port || 3000

app.listen(Port,()=> console.log(`Server running on port ${Port}`));