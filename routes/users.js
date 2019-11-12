const express = require('express');

const router = express.Router();

const multer = require('multer');

const {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  userSignUp,
  userLogin,
  getUserEmail,
} = require('../controllers/user');
const upload = multer({
  dest: 'uploads/',
});
router.get('/all', getUsers);
router.get('/find', getUser);
router.post('/signup', upload.single('photo'), userSignUp);
router.patch('/edit', editUser);
router.delete('/delete', deleteUser);
router.post('/login', userLogin);
router.post('/get-by-email', getUserEmail);
router.get('/show-data', (req, res) => {
  res.send({
    Texto: 'Shabat Shalom',
  });
});

module.exports = router;
