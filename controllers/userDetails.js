const db = require('../model/helpers');

const updateProfile = async (id, user) => {
  try {
    const tryUpdate = await db.updateUser(id, user);
    const newUser = await db.getUserById(id);

    return {
      status: true, 
      user: newUser, 
      message: tryUpdate
    };
  } catch (error) {
    return {status: false, message: error};
  }
}

const getProfile = async (email) => {
  try {
    const userInfo = await db.getUserByEmail(email);
    return {status: true, message: userInfo};
  } catch (error) {
    return {status: false, message: error};
  }
}

module.exports = { updateProfile, getProfile };