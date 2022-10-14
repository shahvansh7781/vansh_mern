const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/vansh-mern-app").then(()=>{
        console.log("Database connected successfully")
    }).catch(()=>{
        console.log("Database connection was unsuccessful")
    })
}
module.exports = connectDB;