const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dbConnect = require("../../utils/dbConnect");
const signin = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (email && password) {
      dbConnect();
      const user = await User.findOne({ email });
      if (user) {
        const isPassTrue = await bcrypt.compare(password, user.password);
        if (isPassTrue) {
          const token = jwt.sign(
            { 
              _id:user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );
          return res.json({ success: true, data: {email:user.email,categories:user.categories,token},message:"Successfully logged in." });
        } else {
          return res.json({ success: false, message: "Wrong password." });
        }
      }else{
          return res.json({success:false,message:"User doesn't exist."})
      }
    } 
    else {
      return res.json({
        success: false,
        message: "Please provide required fields.",
      });
    }
  }
};
module.exports = signin;
