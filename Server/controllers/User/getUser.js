const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const dbConnect = require("../../utils/dbConnect");
const getUser=async(req,res)=>{
    let { authorization } = req.headers;
    authorization = authorization.replace("Bearer ", "");
    const token_id = await jwt.verify(authorization,process.env.JWT_SECRET)._id;
    console.log(token_id)
    dbConnect();
    const findedUser = await User.findOne({_id:token_id})
    if(findedUser){
        return res.json({success:true,data:{email:findedUser.email,categories:findedUser.categories}})
    }
    return res.json({success:false,message:"Something went wrong."})
}
module.exports=getUser;