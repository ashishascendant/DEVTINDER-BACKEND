

const express = require("express");

const profilerouter = express.Router();

const connectDB = require("../config/Database");
const { validateSignUpData } = require("../utils/validations");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const { userAuth } = require("../middlewares/auth");


profilerouter.get("/profile", userAuth ,async(req,res)=>{
    try{
      
     const user = req.body;

        if (!user) {
            throw new Error("User does not exist");
        }
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = profilerouter;