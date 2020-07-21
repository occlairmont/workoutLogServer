const Sequelize = require("sequelize");
const sequelize = new Sequelize("workout-logs", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.authenticate().then(
  function () {
    console.log("Connected to workout-logs postgres database");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
