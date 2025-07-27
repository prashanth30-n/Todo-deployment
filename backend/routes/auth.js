const express=require("express");
const router=express.Router();
const jwt=require('jsonwebtoken');
const User=require("../models/user");
const bcrypt=require("bcrypt");
const JWT_SECRET=process.env.JWT_SECRET;
const authMiddleware=require("../middlewares/authmiddlewares");
router.post("/signup",async(req,res)=>{
const{username,password}=req.body;

const userExists=await User.findOne({username});
if(userExists){
    return res.status(400).json({
        message:"User already exists"
    })
}
const hashedPassword=await bcrypt.hash(password,10);
const user=new User({
    username,
    password:hashedPassword
})
await user.save();
res.status(201).json({
    msg:"user created successfully"
});
});
router.post("/login",async(req,res)=>{
   
    const {username,password}=req.body;
    const user=await User.findOne({username});
    if(!user){
        return res.status(400).json({
            msg:"user does not exist"
        })
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            msg:"Invalid credentials"
        })
    }
   const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });

});
router.get("/profile",authMiddleware,(req,res)=>{
    res.json({
        userId:req.userId
    })
})
module.exports=router;
