const unset = require("lodash/unset");

const user_json = user => {
  const userObject = {
    id: user.id,
    email: user.email,
    title: user.title,
    first_name: user.f_name,
    last_name: user.l_name,
    phone: user.phone,
    dob: user.dob,
    registered: user.createdAt
  }
  return userObject;
};

module.exports = user_json;
