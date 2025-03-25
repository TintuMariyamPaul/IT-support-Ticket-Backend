const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // env should import before app imported
const dbConfig = require("./config/dbConfig");
const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening to requests on PORT :", port);
});
