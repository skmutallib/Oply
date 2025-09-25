require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db.config");

connectDB();
app.listen(4000, () => {
  console.log("server is running on port 4000");
});
