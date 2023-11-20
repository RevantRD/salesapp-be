const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
//Json parser and cors for connecting backend to frontend
app.use(express.json());
app.use(cors());
//Importing user route and product route from routes folder
require("./routes/user_route");
require("./routes/product_route");
//Providing url to different api's
app.use("/api/user/", require("./routes/user_route"));
app.use("/api/product/", require("./routes/product_route"));
//Calling connection to the database function
connectDB();

//Starting server on port 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
