const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ASHPANDEY:15466421@cluster0.nn5uue8.mongodb.net/devTinder?retryWrites=true&w=majority&appName=DEVTINDER");
};

module.exports=connectDB;

