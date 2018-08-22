const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  picture: String,
  bio: String,
  languages: [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
