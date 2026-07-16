const jwt = require("jsonwebtoken");
const User = require("../models/users");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies; // token is bieng taken from the request.

        if (!token) {
            throw new Error("Token is not valid!!!!!!!!!!");
        }
        // every request after the login has now cookie which is stored in the browser.
    // you will have to validate the cookie if validation passes then only send the profile data to the user.

        const decodedObj = jwt.verify(token, "AshPandey@267");// verification and sending back the decoded message which has the user id , the token is bieng created at the login api after the user is bieng logged in.
        // above one // it first verifiy the token then only sends the decode message which has the id...
    //this above verification method sends a decoded message which has the data which we have send during the token creation which is here the userid,
        const { _id } = decodedObj;

        const user = await User.findById(_id);//only the logged in user can get the profile information of himself and not of other person.

        if (!user) {
            throw new Error("User not found");
        }
 req.user = user; // as we know the middleware can modify the request here the finded user is bieng attached to the request so that the last route handler can get the information of the user directly..
 // here the request is object of multiple objects and this object is just generally attaching a new object named user to the request which contains the information about the logged in user from the cookie verification.

     next(); // for running the next middle ware or the route handler..
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

module.exports = {
    userAuth,
};