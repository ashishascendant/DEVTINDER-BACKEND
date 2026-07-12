const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
        type:String,
        validate(value){
         if(!validator.isURL(value)){
            throw new Error("photo is not an url")
         }
        }
    },
    about:{
        type:String
    },
    skills:{
      type:[String]
    }
},{
    timestamps:true,
});


const jwt = require("jsonwebtoken");



userSchema.methods.getJWT = async function () {
    const user = this;//maps to the current object , this 

    const token = await jwt.sign(
        { _id: user._id },
        "AshPandey@267",
        {
            expiresIn: "7d",
        }//sending the user id and a password which only known by the server.
            // as we have send the user id in the token also the server will keeps the check of every user also.
    );
    return token;
}; // this is just a helper function which is here to create the jwt token wherever you needed because there can be multiple login places so instead of writting the token creating everywhere you just write the code once for jwt creatin and use it everywhhere you want it.....




userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;

    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;
};

const User = new mongoose.model("user",userSchema);

module.exports=User;