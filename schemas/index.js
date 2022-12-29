const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.DB_CONNECTION)
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;