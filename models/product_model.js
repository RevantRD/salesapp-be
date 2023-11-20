const mongoose = require("mongoose");
// Product model for storing products details
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("ProductModel", ProductSchema);
