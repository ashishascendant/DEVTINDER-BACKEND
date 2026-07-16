

const express = require("express");

const profilerouter = express.Router();

const connectDB = require("../config/Database");
const { validateSignUpData } = require("../utils/validations");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const { userAuth } = require("../middlewares/auth");

 const {validateEditProfileData} = require("../utils/validations")



 profilerouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

profilerouter.patch("/profile/edit" , async(req,res) =>{
    
})

profilerouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user; // the middleware is attaching or modifying the user document with the logged in user according to the cookie verification.
    
    Object.keys(req.body).forEach((key) => {
    loggedInUser[key] = req.body[key]; // you are just changing the value of the keys of the same object.. nothing more.. , not creating a new object..
}); // attaching the logged in users data with the upcoming data from the user.body send by the client basically the updated data...
 await loggedInUse.save(); //now the changed data is also saved in the database
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// change the password like creating a new password after validating the old password.... old password and an new password affter validating the old password..
profilerouter.patch(
  "/profile/password",
  userAuth,
  async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body; // from client or the frontend we are getting the oldpassword and new password..

      if (!oldPassword || !newPassword) { // both should be present there by the client..
        throw new Error("Both passwords are required");
      }

      const loggedInUser = req.user; // now taking the information of the logged in user which is bieng attached by the middleware userauth... 

      // Compare old password
      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        loggedInUser.password
      ); 

      if (!isPasswordValid) {
        throw new Error("Old password is incorrect"); // validating the old password 
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10); //hashing the new password

      loggedInUser.password = hashedPassword; //now editing the old password with the new password

      await loggedInUser.save(); // saving the edits we have done with the object 
 
      res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
);


module.exports = profilerouter;