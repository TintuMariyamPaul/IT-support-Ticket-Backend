const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const userRouter = require("./controllers/userController");
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
module.exports = app;
