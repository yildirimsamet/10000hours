require("dotenv").config();
const cors =require("cors")
const express=require("express");
const app = express();
const PORT=process.env.PORT||5000;
const user = require("./routers/User")

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>res.send("Server on"))

app.use("/user",user)


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})