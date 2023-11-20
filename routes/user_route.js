const express = require("express");
const { getAllUsers, signUp, logIn } = require("../controller/user_controller");
// Adding user routes for the different api's
const router = express.Router();
router.route("/").get(getAllUsers);
router.route("/signup").post(signUp);
router.route("/login").post(logIn);
module.exports = router;
