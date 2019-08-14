const express = require('express');

const router = express.Router();

const { getUsers, getUser, createUser, editUser, deleteUser } = require('../controllers/user');

router.get('/all', getUsers);
router.get('/', getUser);
router.post('/', createUser);
router.patch('/', editUser);
router.delete('/', deleteUser);

router.get('/show-data', (req, res) => {
  res.send({
    Texto: 'Shabat Shalom',
  });
});

module.exports = router;
