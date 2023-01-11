const mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  namaLembaga: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // imageUrl: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(autoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);
