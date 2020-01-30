const bcrypt = require('bcryptjs');
const db = require('../model/helpers');
const hasher = require('../middlewares/hashPassword');
const tokenGenerator = require('../middlewares/generateToken');

const login = async (email, password) => {
  try {
    const user = await db.getUserByEmail(email);
    const isValid = bcrypt.compareSync(password, user.password);
    if(isValid) {
      const userToken = await tokenGenerator(user);
      return {status: true, userInfo: user, token: userToken};
    } else {
      return {status: false, message: 'wrong password'};
    }
  } catch (error) {
    return {status: false, message: error.message};
  }
}

module.exports = login;