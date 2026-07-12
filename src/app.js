const express = require("express")
const connectDB=require("./config/Database")
const {validateSignUpData}= require("./utils/validations")
const bcrypt = require("/bcrypt")
const cookieparser = require("/cookie-parser")
const jwt = require("jsonwebtoken")

const app = express();
const User = require("./models/users")

app.use(express.json()) // this middleware is converting the json object into the js object for all the  routes.
app.use(cookieParser());

// new user api .
app.post("/signup" , async(req,res)=>{
//the flow of the signup should be : 
// 1. validate the upcoming data on the server level by the validation functions written on the custom level by the user
validateSignUpData(req);

const { password } = req.body;

// 2.  Encrypt the password
const passwordHash = await bcrypt.hash(password, 10);


    console.log(req.body);

// 3. Creating a new instance of the User model
const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
});// these are the minimum things which are needed for the signup of the data then after going in the app the user can edit and update the other things like photo etc...

    try{
        await user.save();
        res.send("user saved succesfully")
    }
    catch(err){
        res.status(400).send("error saving the data"+ err.message);
    }
})
// login api
app.post("/login", async (req, res) => {

    
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("invalid credentials");//you should not expicitly say that emailid is present or not in the Db for the attacker to leak the information..
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (isPasswordValid) {
            //if password is valid then we need to send back the jwt token encapsulated inside the cookie.
            //1.creating the token 
            const token = await jwt.sign({_id:user._id}, "AshPandey@267") //sending the user id and a password which only known by the server.
            // as we have send the user id in the token also the server will keeps the check of every user also.
            //2.sending of the cookie.
            res.cookie("cookiename", token) // third parameter is the option object
            // now the cookie has been sent and stored in the user browser and after each of the request send by the client , the cookie is also bieng sent and then it is bieng always validated you have to validate it if expired then login is requird again.
            //cookie can not be read by the server for it this has a middleware name 
            res.send("Login Successful!!!");
        } else {
            throw new Error("Password id not correct");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.get("/profile", async(req,res)=>{
    const cookie = req.cookie // every request after the login has now cookie which is stored in the browser.
    // you will have to validate the cookie if validation passes then only send the profile data to the user.
    const isTokenValid = await jwt.verify(cookie,"AshPandey@267");// it first verifiy the token then only sends the decode message which has the id...
    //this above verification method sends a decoded message which has the data which we have send during the token creation which is here the userid,
})

// get the user by the emailId.
app.get("/user",async(req,res)=>{
 const useremail = req.body.emailId
 try{
    const users = User.find({emailId:useremail})
    if(users.length===0) {
        res.status(400).send("user not found")
    }
    else{
        send(users)
    }
 }
 catch(err){
    res.status(400).send("something went wrong")
 }
})

// feed api to get all the users from the database to the frontend.
app.get("/feed", async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
})

//delete user by ID
app.delete("/user", async(req,res)=>{
    const userid = req.body.userId; // Just taking the userid of the sent data and saving in the variable. 
    try{
        const user = User.findByIdAndDelete(userid)
        res.send("user deleted succesfully")
    }
    catch(err){
        res.status(400).send("error occured..")
    }
})

//update user
app.patch("/user/:userid",async(req,res)=>{
    const userid=req.params?.userid; //this userid is bieng sent in the object from the frontend. // now taking from the url itself
    const data =req.body; //this is the data or the updated data which is bieng also send by the client and which is needed to be updated in the database
    // firstly the user in the document is bieng finded by the userid and data is bieng pass which needed to be updated..

    
    try{
        const ALLOWED_UPDATE = ["userid","Photourl","about","skills","age"]
        const isUpdateAllowed = Object.keys(data).every(
      (k) => ALLOWED_UPDATE.includes(k)
    );

    if(data?.body.skills.length>10){
        throw new Error("skills are too much ")
    }

    if(!isUpdateAllowed){
      throw new Error("Update not allowed")
    }
        await User.findByIdAndUpdate(userid,data,{runValidators: true})
        res.send("user updated successfully")
    }
    catch(err){
        res.status(400).send("error occured")
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


