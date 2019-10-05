const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usersController = require("../../controllers/api_v1/users");

// POST /api_1/users
router.post(
  "/users",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .normalizeEmail(),
    body("title")
      .trim()
      .escape(),
    body("first_name")
      .trim()
      .escape(),
    body("last_name")
      .trim()
      .escape(),
    body("phone")
      .trim()
      .isLength({min: 11})
      .withMessage("Phone number is too short!"),
    body("password").trim()
  ],
  usersController.createUser
);

module.exports = router;
