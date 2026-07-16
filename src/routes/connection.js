const { validateSignUpData } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/users");
const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

// this api is for the sending the request we are getting the data of the user to which we are sending from the url params.
// and from the user who is sending the data from the user auth middleware the loggedin user ...
requestRouter.post(
  "/request/send/:status/:toUserId",  // the dynamic data which is coming fromm the url can be wriiten like this :/name , the status and toUserId are the dynamic data which can be diffrent according to the user.
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status; //we need the three things according to  connection schema to put into the connection databse..
      // now validations in the api are bieng made 
      // 1st validation is that the status can only be interseted or ignored as the user can only send these two , the sending user has no control over the request bieng accepted or rejected he can send only interested or ignoredd..
      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
     throw new Error("Invalid Status Type");
      } 
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });  // making a new document each time for the upcoming request..


      //second validation is to check that even the userid is correct or not or the user exists in the DB or not.. 


      //third validation 
      const existingConnectionRequest = await ConnectionRequest.findOne({
    $or: [ // this statement stores the array of conditions which follows the or pattern which means if any of the statement is true then, the statement is true
        {
            fromUserId,
            toUserId,
        }, // the first condition which is bieng stored is that if a connection request from a person to another person is bieng stored, then another same request cannot be stored..
        {
            fromUserId: toUserId,
            toUserId: fromUserId,
        }, // the second condition is that if a connection request is bieng send by a person to another person then the another person cannot send the connection request to the person(id a-->b exist then b-->a cannot exist )
        // because this is the mutual connection the touserid has only two option to accept [then the connection is bieng established no option to send the request again .]
        // the connection is a one entity which can be happend mutually  there is no need to send it both side..
        //how this validation works  like if in DB one request is bieng present , then this will check for the new request is the new request has same user as the previous connections reques if yes then throw error
    ],
});

if (existingConnectionRequest) {
    throw new Error("Connection Request Already Exists!!");
}

      const data = await connectionRequest.save(); //saving the document in the connection request collection database.. 

      res.json({
        message: "Connection Request Sent Successfully!",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;




module.exports = connectionrouter;
