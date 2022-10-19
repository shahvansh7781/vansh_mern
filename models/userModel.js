const mongoose = require("mongoose");
const passportlocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: [3, "Name must be of minimum 3 characters"],
    maxLength: [30, "Name can have maximum 30 characters"],
    required: [true, "Name cannot be empty!"],
  },
  lastName: {
    type: String,
    maxLength: [30, "Name can have maximum 30 characters"],
    required: [true, "Name cannot be empty!"],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    // validate: [validator.isEmail, "Invalid Email Address"],
    required: [true, "Email cannot be empty"],
  },
  password:{
    type:String,
  },
  confirmPassword:{
    type:String,
  },
  registeredDate:{
    type:Date,
    default:Date.now
  }
});

userSchema.plugin(passportlocalMongoose);

const User = mongoose.models.user || mongoose.model("user",userSchema);

module.exports = User;