const express = require('express');

const router = express.Router();

const { getUsers, getUser, createUser, editUser, deleteUser } = require('../controllers/user');

router.get('/all', getUsers);
router.post('/find', getUser);
router.post('/signup', createUser);
router.patch('/edit', editUser);
router.delete('/delete', deleteUser);

router.get('/show-data', (req, res) => {
  res.send({
    Texto: 'Shabat Shalom',
  });
});

module.exports = router;
