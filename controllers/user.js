const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let config = require('../config/token-config');
const fs = require('fs');
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

module.exports.userSignUp = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const img = fs.readFileSync(req.photo.path);
            const encode_image = img.toString('base64');
            const finalImg = {
              contentType: req.photo.mimetype,
              image: new Buffer(encode_image, 'base64'),
            };
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              name: req.body.name,
              surname: req.body.surname,
              password: hash,
              //address: req.body.address,
              location: req.body.location,
              category: req.body.category,
              photo: finalImg,
            });
            user
              .save()
              .then(result => {
                console.log(result);
                const token = jwt.sign(
                  {
                    email: result.email,
                    userId: result._id,
                  },
                  config.secret,
                  // process.env.JWT_KEY,
                  {
                    expiresIn: '23h',
                  }
                );

                res.status(201).json({
                  message: 'User created',
                  user: {
                    email: result.email,
                    name: result.name,
                    surname: result.surname,
                    location: result.location,
                    category: result.category,
                    id: result._id,
                  },
                  token: token,
                });
              })
              .catch(err => {
                console.log(err);
                res.status(400).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

module.exports.getUserEmail = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(userData => {
      if (userData.length < 1) {
        return res.status(401).json({
          message: 'No se ha encontrado ningun usuario',
        });
      }
      return res.status(200).json({
        user: {
          email: userData[0].email,
          name: userData[0].name,
          surname: userData[0].surname,
          location: userData[0].location,
          category: userData[0].location,
          id: userData[0]._id,
        },
      });
    });
};
module.exports.userLogin = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            config.secret,
            // process.env.JWT_KEY,
            {
              expiresIn: '23h',
            }
          );
          // const r = get_user(decodeToken(token))

          return res.status(200).json({
            message: 'Auth successful',
            token: token,
            user: {
              email: user[0].email,
              name: user[0].name,
              surname: user[0].surname,
              location: user[0].location,
              category: user[0].category,
              id: user[0]._id,
            },
          });
        }
        res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
module.exports.createUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
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
              category: req.body.category,
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User created',
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};
module.exports.getUser = async (req, res) => {
  try {
    const { name } = req.query;
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
