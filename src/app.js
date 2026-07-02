const express = require("express")

const app = express();

app.get("/",(req,res)=>{
    res.send("hello from the server")  // this callback function inside the use method  is called the request handler function....
})

app.get("/test",(req,res)=>{
    res.send("hello from the test route")  // this callback function inside the use method  is called the request handler function....
})


app.listen(3000, ()=>{
    console.log("server is bieng succesfully running on the port 3000")
})
