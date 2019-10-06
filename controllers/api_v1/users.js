const User = require("../../models/user");
const { validationResult } = require("express-validator");
const serializer = require("../../serializer/user_serializer");

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const title = req.body.title;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone = req.body.phone;
  const dob = req.body.dob;
  const password = req.body.password;
  User.findOrCreate({
    where: {
      email: email
    },
    defaults: {
      email: email,
      title: title,
      f_name: first_name,
      l_name: last_name,
      phone: phone,
      dob: dob,
      password: password
    }
  })
    .then(([user, created]) => {
      if (!created) {
        const error = new Error("This email has been taken.");
        error.statusCode = 500;
        res.status(500).json({ error });
        throw error;
      }
      res.json({ user });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then(data => data.map(user => serializer(user)))
    .then(users => res.json({ users }))
    .catch(err => {
      const error = new Error("Try again later or contact admin.");
      error.statusCode = 500;
      res.status(500).json({ error });
    });
};
