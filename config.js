const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Creating the connecting to the MongoDB database
async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectDB;
