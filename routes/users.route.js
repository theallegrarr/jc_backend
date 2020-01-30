const router = require('express').Router();
const register = require('../controllers/UserRegister');
const login = require('../controllers/userLogin');
const profile = require('../controllers/userDetails');
const setPassword = require('../controllers/setPassword');
const validateToken = require('../middlewares/validateToken');
const db = require('../model/helpers/index');

router.patch('/update-profile/:id', validateToken, async (req, res) => {
  const user = req.body;
  try {
    const updateProfile = await profile.updateProfile(req.params.id, user);
    if(updateProfile.status) {
      res.status(201).json({
        status: 'success', 
        userInfo: updateProfile.user, 
        message: 'Profile Updated'
      });
    } else {
      res.status(400).json({status: 'failed', error: addUser.message});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/register', async (req, res) => {
  const user = req.body;
  try {
    const addUser = await register(user);
    if(addUser.status) {
      res.status(201).json({
        status: 'saved', 
        userInfo: addUser.userInfo, 
        token: addUser.message
      });
    } else {
      res.status(400).json({status: false, error: addUser.message});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = req.body;
    const userLogin = await login(user.email, user.password);

    if(userLogin.status) {
      res.status(200).json({
        message: `Welcome ${user.email}!`,
        userInfo: userLogin.userInfo,
        token: userLogin.token
      });
    } else {
      res.status(401).json({ message: userLogin.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unknown error occurred' });
  }
});

router.post('/get-data', validateToken, async (req, res) => {
  try {
    const userInfo = await db.getUserById(req.body.id);

    if(userInfo.name) {
      res.status(200).json(userInfo)
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unknown error occurred' });
  }
});

router.post('/change-password', validateToken, async (req, res) => {
  try {
    const { id, old_password, current_password} = req.body;
    const userInfo = await setPassword(id, old_password, current_password);

    if(userInfo.status) {
      res.status(200).json({ status: true, message: 'password updated' })
    } else {
      res.status(401).json({ status: false, message: 'unable to set password' });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: 'Unknown error occurred' });
  }
});

module.exports = router;