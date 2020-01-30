const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
  const payload = {
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
  }
  const options = {
    expiresIn: '365d',
  }
  const result = jwt.sign(
    payload,
    process.env.SECRET,
    options
  )

  return result;
}

module.exports = generateToken;