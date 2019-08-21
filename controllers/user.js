
const mongoose = require("mongoose");
const User = require('../models/User');

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

exports.createUser = async (req, res) => {
  try {
    const { name, surname, password, location, email, category } = req.body;
    if (!name) return res.status(400).send('name is required');
    if (!surname) return res.status(400).send('surname is required');
    if (!password) return res.status(400).send('password is required');
    if (!location) return res.status(400).send('location is required');
    if (!email) return res.status(400).send('email is required');
    if (!category) return res.status(400).send('category is required');
    const newUser = new User({ name, surname, password, location, email, category });
    return res.json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send('an error ocurred while creating the user');
  }
};

exports.getUser = async (req, res) => {
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

exports.editUser = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
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
