const authCheck = (req,res,next)=>{
    const { authorization } = req.headers;
    if(authorization){
       return next();
    }else{
        return res.json({success:false,message:"No token found."})
    }
}
module.exports=authCheck;