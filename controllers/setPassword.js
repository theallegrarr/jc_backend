const bcrypt = require('bcryptjs');
const db = require('../model/helpers');
const hasher = require('../middlewares/hashPassword');

const setPassword = async (id, old, new_password) => {
  try {
    const user = await db.getUserById(id);
    const isValid = bcrypt.compareSync(old, user.password);
    const hashed = await hasher(new_password);
    if(isValid) {
      await db.updateUser(id, { password: hashed });
      return {status: true, userInfo: user, message: 'password changed'};
    } else {
      return {status: false, message: 'check your password'};
    }
  } catch (error) {
    return {status: false, message: error.message};
  }
}

module.exports = setPassword;