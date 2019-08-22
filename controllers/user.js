
const mongoose = require("mongoose");
const User = require('../models/User');
const bcrypt = require("bcrypt");
exports.getUsers = async (req, res) => {
  try {
    //const { name } = req.body;
    //if (!name) return res.status(400).send('name is required');
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send('an error ocurred while getting all users');
  }
};



module.exports.createUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              name: req.body.name,
              surname: req.body.surname,
              password: hash,
              //address: req.body.address,
              location: req.body.location,
              category: req.body.category
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};
module.exports.getUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send('name is required');
    const user = await User.findOne({ name });
    if (!user) return res.status(404).send('could not find user');
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send('an error ocurred while getting all users');
  }
};

module.exports.editUser = async (req, res) => {
  try {
    const { name, surname, password, location, email, category } = req.body;
    if (!name) return res.status(400).send('name is required');
    const updatedUser = await User.updateOne(
      { name },
      { surname, password, location, email, category }
    );
    return res.json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send('an error ocurred while editing the user');
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send('name is required');
    await User.deleteOne({ name });
    return res.send('user deleted');
  } catch (err) {
    console.error(err);
    return res.status(500).send('an error ocurred while deleting the user');
  }
};
