const UserModel = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
//For retrieving all the user information
const getAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//SignUp function for creating a new user
const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are mandatory" });
  }
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  // Using bcryptjs for encrypting the password
  try {
    const hashedPassword = await bcrypt.hash(password, 16);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const resp = await newUser.save();
    res.status(201).json({ message: "User saved successfully", data: resp });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Login function to verify the user
const logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are mandatory" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  try {
    // Compare the login credentials for already registered users
    const didMatch = await bcrypt.compare(password, user.password);
    if (didMatch) {
      //Creating tokens using JWT
      const jwtToken = jwt.sign({ _id: user._id }, JWT_SECRET);
      const userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
      };
      return res
        .status(200)
        .json({ message: { token: jwtToken, user: userInfo } });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { getAllUsers, signUp, logIn };
