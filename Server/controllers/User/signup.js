const User = require("../../models/User")
const bcrypt = require("bcryptjs");
const dbConnect = require("../../utils/dbConnect")
const signup=async(req,res)=>{
    if(req.method==="POST"){
        const {email,password}=req.body;
        if(email&&password?.length>5){
            dbConnect();
            const isAlreadyuser = await User.findOne({ email });
            if (isAlreadyuser) {
              return res.json({
                success: false,
                message: "User already exist.",
              });
            }
           try {
                const hashedPass = bcrypt.hashSync(password, 10);
                await User.create({
                    email,
                    password: hashedPass,
                });
                res.json({success:true,message:"User created successfully."})
           } catch (err) {
               res.json({success:false,message:err.message})
           }
            
        }else{
            return res.json({success:false,message:"Please provide required fields."})
        }
    }

}
module.exports=signup