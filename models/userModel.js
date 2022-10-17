const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: [4, "Name must be of minimum 4 characters"],
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
    validate: [validator.isMobilePhone, "Enter Valid Phone Number"],
    required: true,
  },
  email: {
    type: String,
    unique: [true,"User already Exists!"],
    validate: [validator.isEmail, "Invalid Email Address"],
    required: [true, "Email cannot be empty"],
  },
  password:{
    type:String,
    required:true
  },
  confirmPassword:{
    type:String,
    required:true
  },
  registeredDate:{
    type:Date,
    default:Date.now
  }
});

const User = mongoose.models.user || mongoose.model("user",userSchema);

module.exports = User;