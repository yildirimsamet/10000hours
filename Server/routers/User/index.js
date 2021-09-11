const express = require("express");
const createCategory = require("../../controllers/User/createCategory");
const signin = require("../../controllers/User/signin");
const signup = require("../../controllers/User/signup");
const updateCategory = require("../../controllers/User/updateCategory");
const authCheck = require("../../middleware/authCheck");
const router = express.Router();

router.use("/signin",signin);
router.use("/signup",signup);

router.use("/update-category",authCheck,updateCategory)
router.use("/create-category",authCheck,createCategory)

module.exports=router;