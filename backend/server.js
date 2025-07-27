const express=require("express");
const app=express();
const mongoose=require("mongoose");
const authRoutes=require("./routes/auth");
const todoRoutes=require("./routes/todos");
const cors=require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("error occurred");
});

app.use("/api/auth",authRoutes);
app.use("/api/todos",todoRoutes);

app.get("/",(req,res)=>{
    res.send("Hello world");
})

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log("server is running");
})
