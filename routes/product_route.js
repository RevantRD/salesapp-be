const express = require("express");
const {
  getAllProducts,
  addProduct,
  topProducts,
  totalAmount,
} = require("../controller/product_controller");
// Adding product routes for the different api's
const router = express.Router();
router.route("/").get(getAllProducts).post(addProduct);
router.route("/topsales").get(topProducts);
router.route("/total").get(totalAmount);

module.exports = router;
