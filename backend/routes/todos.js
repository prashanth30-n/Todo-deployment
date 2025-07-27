const express=require("express");
const router=express.Router();
const jwt=require('jsonwebtoken');
const Todo=require("../models/Todo");
const authMiddleware=require("../middlewares/authmiddlewares");
router.post("/",authMiddleware,async(req,res)=>{
    const{title}=req.body;
    try{
        const todo=new Todo({
            title,
            userId:req.userId
        });
        await todo.save();
        res.status(201).json({
            msg:"Todo created successfully",
            todo
        });
    }
     catch (err) {
    res.status(500).json({ msg: "Error creating todo", err });
  }
});
router.get("/",authMiddleware,async(req,res)=>{
    try{
        const todos=await Todo.find({userId:req.userId});
        res.status(200).json(todos);
    }
    catch(err){
        res.status(500).json({ msg: "Error fetching todos", err });
    }
});
router.put("/:id",authMiddleware,async(req,res)=>{
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { completed:true },
            { new: true }
        );
         res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: "Error updating todo", err });
  }
});
router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        await Todo.findOneAndDelete({
            _id:req.params.id,
            userId:req.userId
        });
        res.json({
            msg:"Todo deleted successfully"
        });

    }
    catch(err){
        res.status(500).json({
            msg:"Error deleting todo",
            err
        })
    }
});
module.exports=router;