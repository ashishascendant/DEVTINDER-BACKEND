const express = require("express")
const connectDB=require("./config/Database")

const app = express();
const User = require("./models/users")

app.use(express.json()) // this middleware is converting the json object into the js object for all the  routes.

app.post("/signup" , async(req,res)=>{
    console.log(req.body);

    const user = new User(req.body);

    try{
        await user.save();
        res.send("user saved succesfully")
    }
    catch(err){
        res.status(400).send("error saving the data"+ err.message);
    }


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


