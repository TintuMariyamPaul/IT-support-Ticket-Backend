const mongoose = require("mongoose");

//connection logic
mongoose.connect(process.env.CONN_STR);

//connection stata
const db = mongoose.connection;

db.on("connection", () => {
  console.log("DB Connection Successful!");
});
db.on("err", () => {
  console.log("DB Connection Failes!");
});

module.exports = db;
