const express = require("express")
const connectDB=require("./config/Database")

const app = express();
const User = require("./models/users")

app.post("/signup" , async(req,res)=>{
    const user = new User({
        firstName : "Ashish",
        lastName : "pandey",
        emailId  : "ap1700080@gmail.com",
        password : "15466421"
 });
 await user.save();
 res.send("user addes succesfully")
})

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(3000, ()=>{
    console.log("server is bieng succesfully running on the port 3000")
})

    })
    .catch((err) => {
        console.error("Database cannot be connected!!");
        console.error(err);
    });


