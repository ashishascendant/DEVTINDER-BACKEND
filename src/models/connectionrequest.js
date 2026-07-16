const mongoose = require("mongoose");


// for this connnection request schema only 4-5 fileds are required which are from ,to (from which user connection request is bieng coming from and to which user the connection request is bieng coming from)
// status of the connnection request...
// timestamps for the connections
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: { 
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    status: {
      type: String,
      required: true,
      enum: {    // enum is used for the parameters which you want to restrict the value into some things only..
        // like here the status can be only 4 things which is bieng defined in the values array of the string...
        values: ["ignore", "interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type", 
      },
    },
  },
  {
    timestamps: true,
  }
);

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;