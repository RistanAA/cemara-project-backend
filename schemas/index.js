const mongoose = require("mongoose");

const connect = () => {
  mongoose
    // .connect("mongodb://localhost:27017/week1_pt_2")
    .connect("mongodb+srv://RistanAA:admin@cluster0.xldtokf.mongodb.net/cemara_project")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;