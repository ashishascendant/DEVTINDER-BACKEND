const express = require("express");

const authrouter = express.Router();


const { validateSignUpData } = require("../utils/validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const { userAuth } = require("../middlewares/auth");

// new user api .
authrouter.post("/signup" , async(req,res)=>{
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
authrouter.post("/login", async (req, res) => {

    
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("invalid credentials");//you should not expicitly say that emailid is present or not in the Db for the attacker to leak the information..
        }

        const isPasswordValid = user.validatePassword(password)

        if (isPasswordValid) {
            //if password is valid then we need to send back the jwt token encapsulated inside the cookie.
            //1.creating the token 
            const token = user.getJWT(); //simply calling the token generating function from the model. 
            res.cookie("token", token ) // third parameter is the option object which can have the epiration time for the cookie.. so that a new cookie has to be made..
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

module.exports = authrouter;