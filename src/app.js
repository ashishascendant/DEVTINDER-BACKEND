const express = require("express");
const connectDB = require("./config/Database");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRouter = require("./routes/connection");

const app = express();




app.use(express.json()) // this middleware is converting the json object into the js object for all the  routes.
app.use(cookieParser());









// these below ones are only for learning but helps for learning for devtinder we have officailly some better api with good preactices.... which are all above..
//  get the user by the emailId.
// app.get("/user",async(req,res)=>{
//  const useremail = req.body.emailId
//  try{
//     const users = User.find({emailId:useremail})
//     if(users.length===0) {
//         res.status(400).send("user not found")
//     }
//     else{
//         send(users)
//     }
//  }
//  catch(err){
//     res.status(400).send("something went wrong")
//  }
// })

//  feed api to get all the users from the database to the frontend.
// app.get("/feed", async(req,res)=>{
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }
//     catch(err){
//         res.status(400).send("something went wrong")
//     }
// })

// delete user by ID
// app.delete("/user", async(req,res)=>{
//     const userid = req.body.userId; // Just taking the userid of the sent data and saving in the variable. 
//     try{
//         const user = User.findByIdAndDelete(userid)
//         res.send("user deleted succesfully")
//     }
//     catch(err){
//         res.status(400).send("error occured..")
//     }
// })

// update user
// app.patch("/user/:userid",async(req,res)=>{
//     const userid=req.params?.userid; //this userid is bieng sent in the object from the frontend. // now taking from the url itself
//     const data =req.body; //this is the data or the updated data which is bieng also send by the client and which is needed to be updated in the database
//      firstly the user in the document is bieng finded by the userid and data is bieng pass which needed to be updated..

    
//     try{
//         const ALLOWED_UPDATE = ["userid","Photourl","about","skills","age"]
//         const isUpdateAllowed = Object.keys(data).every(
//       (k) => ALLOWED_UPDATE.includes(k)
//     );

//     if(data?.body.skills.length>10){
//         throw new Error("skills are too much ")
//     }

//     if(!isUpdateAllowed){
//       throw new Error("Update not allowed")
//     }
//         await User.findByIdAndUpdate(userid,data,{runValidators: true})
//         res.send("user updated successfully")
//     }
//     catch(err){
//         res.status(400).send("error occured")
//     }
// })

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


