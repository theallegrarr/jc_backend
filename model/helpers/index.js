const db = require('../db-config');



const getUserByEmail = async(user_mail) => {
  const user = await db('users').where({ email: user_mail }).first();
  return user;
}

const getUserById = async(user_id) => {
  const user = await db('users').where({ id: user_id }).first();
  return user;
}

function addUser(userData){
  return db('users')
          .insert(userData);
}
function updateUser(user_id, data) {
  return db('users')
    .update(data)
    .where({ id: user_id });
}

module.exports = {
  getUserByEmail,
  addUser,
  updateUser,
  getUserById
}