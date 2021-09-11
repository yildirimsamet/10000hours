const User = require("../../models/User");
const dbConnect = require("../../utils/dbConnect");
const jwt = require("jsonwebtoken");
const createCategory = async (req, res) => {
  const { name, initialHours } = req.body;
  if (!name )
    return res.json({ success: false, message: "Provide name field" });
  let { authorization } = req.headers;
  authorization = authorization.replace("Bearer ", "");

  dbConnect();

  const decodedToken = jwt.verify(authorization, process.env.JWT_SECRET);
  const findedUser = await User.findById(decodedToken["_id"]);
  if (findedUser) {
    const isThereSameCategory = await findedUser.categories.filter(
      (category) => category.name === name
    );
    if (isThereSameCategory.length > 0)
      return res.json({ success: false, message: "Category already exist." });
    await findedUser.categories.push({ name, hours: initialHours || 0 });
    await findedUser.save();
    return res.json({ success: true, message: "Category successfully added." });
  } else {
    return res.json({ success: false, message: "User not found" });
  }
};
module.exports = createCategory;
