const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const db = require('./config/db').mongoURI;
const userRoutes = require('./routes/users');
// SetUp mongodb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/user', userRoutes); // Agrego la ruta de usuarios

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port 5000');
});
