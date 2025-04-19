const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoute");
const engineerRouter = require("./routes/engineerRoute");
const ticketRouter = require("./routes/ticketRoute");

app.use(cors()); // for browser configuration
app.use(express.json()); // for sending and reciving json response
// helmet 
//express limiter -for limit attack 
//express mongo sanitize


app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/engineer", engineerRouter);
app.use("/api/user", userRouter);
app.use("/api/ticket", ticketRouter);
module.exports = app;
