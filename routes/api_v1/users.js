const express = require("../../node_modules/express");
const router = express.Router();
const { body } = require("../../node_modules/express-validator/src");
const usersController = require("../../controllers/api_v1/users");

router.get("/users", usersController.getAllUsers);
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
      .isLength({ min: 11 })
      .withMessage("Phone number is too short!"),
    body("password").trim()
  ],
  usersController.createUser
);
router.get('/users/:id', usersController.getSingleUser)
router.put('/users/:id', [
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
      .isLength({ min: 11 })
      .withMessage("Phone number is too short!")
],usersController.editUser)

module.exports = router;
