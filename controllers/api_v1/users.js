const User = require("../../models/user");
const { validationResult } = require("../../node_modules/express-validator/src");
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
    .then(users => res.status(200).json({ users }))
    .catch(err => {
      const error = new Error("Try again later or contact admin.");
      error.statusCode = 500;
      res.status(500).json({ error });
    });
};

exports.getSingleUser = (req, res, next) => {
  const userId = req.params.id;
  User.findByPk(userId)
    .then(user => {
      serialized_user = serializer(user);
      res.status(200).json({ user: serialized_user });
    })
    .catch(err => {
      const error = new Error("Try again later or contact admin.");
      error.statusCode = 500;
      res.status(500).json({ error });
    });
};
exports.editUser = (req, res, next) => {
  const userId = req.params.id;

  const title = req.body.title
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const dob = req.body.dob
  const phone = req.body.phone

  User.findByPk(userId)
  .then(user => {
    user.title = title,
    user.f_name = first_name,
    user.l_name = last_name,
    user.phone = phone
    user.dob = dob
    return user.save()
  })
  .then(result => {
    serialized_user = serializer(result)
    res.status(200).json(serialized_user)
  })
  .catch(err => {
    const error = new Error("Try again later or contact admin.");
    error.statusCode = 500;
    res.status(500).json({ error });
  })

};
