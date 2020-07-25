require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");
let log = require("./controllers/logcontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();
app.use(express.json());
app.use("/api", user);
app.use(require("./middleware/validate-session"));
app.use("/api/log", log);

app.listen(3002, function () {
  console.log("App is listening on port 3002");
});
