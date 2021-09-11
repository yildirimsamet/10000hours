const User = require("../../models/User");

const jwt = require("jsonwebtoken");
const dbConnect = require("../../utils/dbConnect");
const updateCategory = async (req, res) => {
  const { name, hours, action } = req.body;

  let { authorization } = req.headers;
  authorization = authorization.replace("Bearer ", "");

  dbConnect();

  const decodedToken = jwt.verify(authorization, process.env.JWT_SECRET);
  const findedUser = await User.findById(decodedToken["_id"]);

  if (!findedUser)
    return res.json({ success: false, message: "User not found" });

  switch (action) {
    case "increment":
      findedUser.categories = await findedUser.categories.map((category) => {
        if (category.name === name) {
          const maxHours = category.hours + +hours;
          const maxHoursLimit = 10000;
          return {
            ...category,
            hours: maxHours <= maxHoursLimit ? maxHours : maxHoursLimit,
          };
        } else {
          return { ...category };
        }
      });
      await findedUser.save();
      return res.json({ success: true });

    case "decrement":
      findedUser.categories = await findedUser.categories.map((category) => {
        if (category.name === name) {
          const minHours = category.hours - +hours;
          const minHoursLimit = 0;
          return {
            ...category,
            hours: minHours > minHoursLimit ? minHours : minHoursLimit,
          };
        } else {
          return { ...category };
        }
      });
      await findedUser.save();
      return res.json({ success: true });

    case "remove":
      findedUser.categories = await findedUser.categories.filter((category) => {
        return category.name !== name;
      });
      await findedUser.save();
      return res.json({
        success: true,
        message: "Category successfully removed",
      });
  }
};
module.exports = updateCategory;
