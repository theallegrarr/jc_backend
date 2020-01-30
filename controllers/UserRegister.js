const db = require('../model/helpers');
const hasher = require('../middlewares/hashPassword');
const tokenGenerator = require('../middlewares/generateToken');

const register = async (user) => {
  try {
    
    const findUser = await db.getUserByEmail(user.email);
    
    if(findUser){
      return {status: false, message: 'user exists'};
    }
    
    const hashedPassword = await hasher(user.password);
    user.password = hashedPassword;
    
    const insert = await db.addUser(user);
    if(insert) {
      const userToken = await tokenGenerator(user);
      const addedUser = await db.getUserByEmail(user.email);
      return {status: true, userInfo: addedUser, message: userToken};
    } else {
      return {status: false, message: 'insert failed'};
    }
  } catch (error) {
    return {status: false, message: error};
  }
}

module.exports = register;