const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique : true,
        lowercase: true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid email address")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("not enough strong password")
        }
        }
    },
    age: {
        type: Number,
        min : 18 // minimum age should be 18 in the app.
    },
    gender: {
        type: String,
        validate(value){
        if(!["male","female","other"].includes(value)){
            throw new Error("Gender Data is not Validated")
        }
        }
    },
    Photourl:{
        type:string,
        validate(value){
         if(!validator.isURL(value)){
            throw new Error("photo is not an url")
         }
        }
    },
    about:{
        type:string
    },
    skills:{
      type:[String]
    }
},{
    timestamps:true,
});

const User = new mongoose.model("user",userSchema);

module.exports=User;