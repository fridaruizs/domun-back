const express = require('express');

const router = express.Router();

const { getUsers, getUser, createUser, editUser, deleteUser } = require('../controllers/user');

router.get('/all', getUsers);
router.get('/find', getUser);
router.post('/signup', createUser);
router.patch('/edit', editUser);
router.delete('/delete', deleteUser);


router.get('/show-data', (req, res) => {
  res.send({
    Texto: 'שבת שלום',
  });
});

module.exports = router;
