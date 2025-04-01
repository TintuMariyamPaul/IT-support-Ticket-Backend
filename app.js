const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const engineerRouter = require("./routes/engineerRoute");

app.use(cors());// for browser configuration 
app.use(express.json()); // for sending and reciving json response 

app.use("/api/auth", authRouter);
app.use("/api/engineer", engineerRouter);
app.use("/api/user", userRouter);
module.exports = app;
