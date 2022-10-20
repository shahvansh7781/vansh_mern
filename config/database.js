const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.DB_HOST).then(()=>{
        console.log("Database connected successfully")
    }).catch((err)=>{
        console.log("Database connection was unsuccessful")
    })
}
module.exports = connectDB;