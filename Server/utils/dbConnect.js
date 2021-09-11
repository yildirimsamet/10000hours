const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true,useUnifiedTopology:true},
    (err) => {
      if (err) console.log(err);
      console.log("DB connected.");
    }
  );
};
module.exports = dbConnect;