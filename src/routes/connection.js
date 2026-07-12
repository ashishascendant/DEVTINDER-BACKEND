const express = require("express");



const connectionrouter = express.Router();

const connectDB = require("../config/Database");
const { validateSignUpData } = require("../utils/validations");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");

const User = require("../models/users");




connectionrouter.get("/connection" , userAuth  , async(req,res)=>{
    const user = req.body // the request is bieng modified by the auth middleware , and now it's body only contains the user which is logged in .

})

module.exports = connectionrouter;
