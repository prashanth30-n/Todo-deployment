const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;
function  authMiddleware(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            msg:"No token provied"
        })
 
}
try{
    const decoded=jwt.verify(token,JWT_SECRET)
    req.userId = decoded.userId;
    next();
}
catch(err){
    return res.status(403).json({
        msg:"Invalid token"
    })  
}
}
module.exports=authMiddleware;