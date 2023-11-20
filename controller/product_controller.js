const ProductModel = require("../models/product_model");
// For displaying all products
const getAllProducts = async (req, res) => {
  try {
    const product = await ProductModel.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//For retrieving top 5 products
const topProducts = async (req, res) => {
  try {
    // Sorting the values and displaying in descending order limiting to 5 rows
    const topProducts = await ProductModel.find().sort({ amount: -1 }).limit(5);
    res.status(200).json(topProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Sum of all products sale amount
const totalAmount = async (req, res) => {
  try {
    const result = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          totalAmount: 1,
        },
      },
    ]);

    const { totalAmount } = result[0];

    res.status(200).json({ totalAmount });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Adding new products to the database
const addProduct = async (req, res) => {
  const { productName, quantity, amount } = req.body;
  const newProduct = new ProductModel({ productName, quantity, amount });
  if (!productName || !quantity || !amount) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  const product = await ProductModel.findOne({ productName });
  if (product) {
    return res.status(400).json({ message: "Product already exists" });
  }
  try {
    const resp = await newProduct.save();
    res.status(201).json({ message: "Product added successfully", data: resp });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { getAllProducts, addProduct, topProducts, totalAmount };
